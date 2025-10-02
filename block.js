// block.js — Block with PoW mining via simple utils
// EN: Block + mining / DE: Block + Mining / RU: Блок + майнинг

const crypto = require('crypto');                       // EN: Node crypto / DE: Node-Krypto / RU: Модуль crypto

function sha256Hex(data) {                              // EN: SHA-256 → hex / DE: SHA-256 → hex / RU: SHA-256 → hex
  return crypto.createHash('sha256').update(data).digest('hex'); // EN/DE/RU: считаем хэш
}

function serializeHeader(h) {                           // EN: Deterministic header JSON / DE: Deterministisches Header-JSON / RU: Детерм. JSON заголовка
  const ordered = {                                     // EN: Canonical order / DE: Kanonische Reihenfolge / RU: Каноничный порядок
    index:        h.index,                              // EN: Height / DE: Höhe / RU: Высота
    previousHash: h.previousHash,                       // EN: Parent hash / DE: Vorgänger-Hash / RU: Хэш родителя
    timestamp:    h.timestamp,                          // EN: Unix ms / DE: Unix ms / RU: Unix мс
    txRoot:       h.txRoot,                             // EN: Tx root / DE: Tx-Root / RU: Корень транзакций
    difficulty:   h.difficulty,                         // EN: PoW difficulty / DE: PoW-Schwierigkeit / RU: Сложность PoW
    nonce:        h.nonce                               // EN: Nonce / DE: Nonce / RU: Нонс
  };
  return JSON.stringify(ordered);                       // EN: Stable string / DE: Stabile Zeichenkette / RU: Стабильная строка
}

function simpleTxRoot(transactions) {                   // EN: Simple hash of tx list / DE: Einfacher Hash der Tx-Liste / RU: Простой хэш списка tx
  const normalized = transactions.map(tx => {           // EN: Normalize fields / DE: Felder normalisieren / RU: Нормализуем поля
    const { from, to, amount, nonce } = tx;             // EN: Only canonical keys / DE: Nur kanonische Schlüssel / RU: Только каноничные поля
    return { from, to, amount, nonce };                 // EN/DE/RU: возвращаем нормализованную запись
  });
  return sha256Hex(JSON.stringify(normalized));         // EN: Hash JSON / DE: JSON hashen / RU: Хэшируем JSON
}

class Block {                                           // EN: Block class / DE: Block-Klasse / RU: Класс блока
  constructor({ index, previousHash, timestamp, transactions, difficulty = 2, nonce = 0 }) { // EN/DE/RU: конструктор
    this.index = index;                                 // EN: Height / DE: Höhe / RU: Высота
    this.previousHash = previousHash;                   // EN: Link to parent / DE: Link zum Vorgänger / RU: Ссылка на предыдущий
    this.timestamp = timestamp;                         // EN: Creation time / DE: Erstellzeit / RU: Время создания
    this.transactions = transactions || [];             // EN: Payload / DE: Nutzlast / RU: Полезная нагрузка
    this.txRoot = simpleTxRoot(this.transactions);      // EN: Deterministic root / DE: Deterministischer Root / RU: Детерм. корень
    this.difficulty = difficulty;                       // EN: PoW target / DE: PoW-Ziel / RU: Цель PoW
    this.nonce = nonce;                                 // EN: Changes in mining / DE: Ändert sich beim Mining / RU: Меняется при майнинге
    this.hash = this.computeHash();                     // EN: Initial header hash / DE: Initialer Header-Hash / RU: Начальный хэш заголовка
  }

  header() {                                            // EN: Build header object / DE: Header-Objekt bauen / RU: Собрать заголовок
    return {
      index: this.index,                                 // EN/DE/RU: высота
      previousHash: this.previousHash,                   // EN/DE/RU: хэш родителя
      timestamp: this.timestamp,                         // EN/DE/RU: время
      txRoot: this.txRoot,                               // EN/DE/RU: корень tx
      difficulty: this.difficulty,                       // EN/DE/RU: сложность
      nonce: this.nonce                                  // EN/DE/RU: нонс
    };
  }

  computeHash() {                                       // EN: SHA-256(header) / DE: SHA-256(Header) / RU: SHA-256(заголовка)
    return sha256Hex(serializeHeader(this.header()));   // EN/DE/RU: считаем хэш заголовка
  }

  recomputeHash() {                                     // EN: Refresh cached hash / DE: Cache-Hash erneuern / RU: Обновить кэш хэша
    this.hash = this.computeHash();                     // EN/DE/RU: пересчитать и сохранить
    return this.hash;                                   // EN/DE/RU: вернуть новый хэш
  }

  meetsDifficulty() {                                   // EN: Check 0-prefix / DE: 0-Präfix prüfen / RU: Проверка префикса нулей
    const prefix = '0'.repeat(this.difficulty);         // EN: Target pattern / DE: Zielmuster / RU: Целевой шаблон
    return this.hash.startsWith(prefix);                // EN: true if ok / DE: true wenn ok / RU: true если ок
  }

  mine(maxIterations = 1e7) {                           // EN: Brute-force nonce / DE: Nonce bruteforcen / RU: Перебор nonce
    const prefix = '0'.repeat(this.difficulty);         // EN: Target prefix / DE: Zielpräfix / RU: Целевой префикс
    let it = 0;                                         // EN: Iter counter / DE: Zähler / RU: Счётчик
    while (!this.hash.startsWith(prefix)) {             // EN: Loop until target / DE: Schleife bis Ziel / RU: Крутим до цели
      this.nonce++;                                     // EN: Change nonce / DE: Nonce erhöhen / RU: Увеличиваем nonce
      this.recomputeHash();                             // EN: Update hash / DE: Hash aktualisieren / RU: Обновляем хэш
      if (++it >= maxIterations)                        // EN: Safety limit / DE: Sicherheitslimit / RU: Лимит безопасности
        throw new Error('PoW: max iterations reached'); // EN/DE/RU: ошибка — лимит
    }
    return this;                                        // EN: Return mined block / DE: Geminten Block zurück / RU: Вернуть добытый блок
  }
}

module.exports = Block;                                  // EN: Export class / DE: Klasse exportieren / RU: Экспорт класса
