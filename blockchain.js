// blockchain.js — BricksChain with token balances
// EN: Blockchain container with PoW + State (balances)
// DE: Blockchain-Container mit PoW + State (Kontostände)
// RU: Блокчейн-контейнер с PoW + State (балансы)

const Block = require('./block');     // EN: Import Block class / DE: Block-Klasse importieren / RU: Импортируем класс Block
const State = require('./state');     // EN: Import State class / DE: State-Klasse importieren / RU: Импортируем класс State

class Blockchain {                                          // EN: Blockchain class / DE: Blockchain-Klasse / RU: Класс блокчейна
  constructor({ difficulty = 2 } = {}) {                    // EN: Init with difficulty / DE: Initialisierung mit Schwierigkeit / RU: Инициализация со сложностью
    this.difficulty = difficulty;                           // EN: PoW difficulty / DE: Mining-Schwierigkeit / RU: Сложность PoW
    this.chain = [this.createGenesisBlock()];               // EN: Start chain with genesis / DE: Kette mit Genesis starten / RU: Начинаем цепочку с генезиса
    this.state = new State();                               // EN: Global balances state / DE: Globaler Kontostand-State / RU: Глобальное состояние балансов
  }

  createGenesisBlock() {                                    // EN: Create genesis block / DE: Genesis-Block erzeugen / RU: Создать генезис-блок
    return new Block({                                      // EN: Return Block object / DE: Block-Objekt zurückgeben / RU: Вернуть объект Block
      index: 0,                                             // EN: First block has index 0 / DE: Erster Block hat Index 0 / RU: Первый блок имеет индекс 0
      previousHash: '0'.repeat(64),                         // EN: Parent hash = 64 zeros / DE: Vorgänger-Hash = 64 Nullen / RU: Хэш предыдущего = 64 нуля
      timestamp: Date.now(),                                // EN: Current timestamp / DE: Aktueller Zeitstempel / RU: Текущий timestamp
      transactions: [],                                     // EN: Genesis has no txs / DE: Genesis ohne Transaktionen / RU: В генезисе нет транзакций
      difficulty: this.difficulty,                          // EN: Store difficulty / DE: Difficulty speichern / RU: Сохраняем сложность
      nonce: 0                                              // EN: No mining for genesis / DE: Kein Mining nötig / RU: Майнинг не нужен
    });
  }

  latest() {                                                // EN: Get latest block / DE: Letzten Block abrufen / RU: Получить последний блок
    return this.chain[this.chain.length - 1];               // EN: Tail of chain / DE: Ende der Kette / RU: Хвост цепочки
  }

  addBlock(block) {                                         // EN: Validate and append block / DE: Block validieren und anhängen / RU: Проверить и добавить блок
    const tip = this.latest();                              // EN: Get current tip / DE: Aktuelle Spitze / RU: Текущий хвост
    if (block.index !== tip.index + 1) throw new Error('Bad index');        // EN: Must be sequential / DE: Muss fortlaufend sein / RU: Должно быть по порядку
    if (block.previousHash !== tip.hash) throw new Error('Bad prevHash');   // EN: Must link to tip / DE: Muss zur Spitze verknüpfen / RU: Должен ссылаться на хвост
    if (!block.meetsDifficulty()) throw new Error('Not mined');             // EN: Must satisfy PoW / DE: Muss PoW erfüllen / RU: Должен пройти PoW
    if (block.computeHash() !== block.hash) throw new Error('Hash mismatch'); // EN: Integrity check / DE: Integritätsprüfung / RU: Проверка целостности

    // --- Apply transactions to balances (State) ---
    for (const tx of block.transactions) {                 // EN: Iterate txs / DE: Über alle Txs iterieren / RU: Перебираем транзакции
      const { from, to, amount } = tx;                     // EN: Destructure tx / DE: Tx zerlegen / RU: Разбираем транзакцию
      if (from === '0x0') {                                // EN: Special case = coinbase / DE: Spezialfall = Coinbase / RU: Особый случай = coinbase
        this.state.credit(to, amount);                     // EN: Mint tokens to recipient / DE: Tokens an Empfänger erzeugen / RU: Создаём токены получателю
      } else {
        if (!this.state.debit(from, amount)) {             // EN: Try to debit sender / DE: Sender belasten / RU: Списать у отправителя
          throw new Error(`Overspend detected from ${from}`); // EN: Overspend not allowed / DE: Überschuss nicht erlaubt / RU: Перерасход недопустим
        }
        this.state.credit(to, amount);                     // EN: Credit receiver / DE: Empfänger gutschreiben / RU: Зачислить получателю
      }
    }

    this.chain.push(block);                                // EN: Append block / DE: Block anhängen / RU: Добавляем блок
    return block;                                          // EN: Return appended / DE: Zurückgeben / RU: Вернуть
  }

  isValid() {                                              // EN: Validate full chain / DE: Ganze Kette validieren / RU: Проверить всю цепь
    for (let i = 1; i < this.chain.length; i++) {          // EN: Start from 1 / DE: Beginn bei 1 / RU: Начинаем с 1
      const prev = this.chain[i - 1];                      // EN: Prev block / DE: Vorheriger Block / RU: Предыдущий блок
      const cur = this.chain[i];                           // EN: Current block / DE: Aktueller Block / RU: Текущий блок
      if (cur.previousHash !== prev.hash) return false;    // EN: Link must match / DE: Verknüpfung muss stimmen / RU: Связь должна совпадать
      if (!cur.meetsDifficulty()) return false;            // EN: PoW must hold / DE: PoW muss stimmen / RU: PoW должен быть верным
      if (cur.computeHash() !== cur.hash) return false;    // EN: Hash must be stable / DE: Hash muss stabil sein / RU: Хэш должен совпадать
    }
    return true;                                           // EN: All good / DE: Alles ok / RU: Всё ок
  }
}

module.exports = Blockchain;                               // EN: Export class / DE: Klasse exportieren / RU: Экспорт класса
