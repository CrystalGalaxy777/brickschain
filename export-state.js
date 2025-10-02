// export-state.js — build BricksChain snapshot and write to public/state.json   // EN: Export balances & status / DE: Balances & Status exportieren / RU: Экспорт балансов и статуса
const fs = require('fs');                                                       // EN: File system / DE: Dateisystem / RU: Файловая система
const path = require('path');                                                   // EN: Paths helper / DE: Pfad-Helfer / RU: Помощник путей
const Blockchain = require('./blockchain');                                     // EN: Our chain / DE: Unsere Kette / RU: Наша цепь
const Block = require('./block');                                               // EN: Block class / DE: Block-Klasse / RU: Класс блока

// --- Build a small chain (same as multi-investors demo) ----------------------
const chain = new Blockchain({ difficulty: 1 });                                // EN: Low diff → fast / DE: Geringe Difficulty → schnell / RU: Низкая сложность → быстро
const owner = '0x111';                                                          // EN: Owner addr / DE: Besitzer-Adresse / RU: Адрес владельца
const A = '0xaaa', B = '0xbbb', C = '0xccc';                                    // EN: Investors / DE: Investoren / RU: Инвесторы

// Block #1: mint 1000 to owner
const b1 = new Block({                                                          // EN: Build #1 / DE: Block #1 bauen / RU: Блок #1
  index: chain.latest().index + 1,                                              // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                            // EN: Link / DE: Verknüpfen / RU: Связь
  timestamp: Date.now(),                                                        // EN: Now / DE: Jetzt / RU: Сейчас
  transactions: [ { from: '0x0', to: owner, amount: 1000, nonce: 0 } ],         // EN: Coinbase mint / DE: Coinbase-Mint / RU: Coinbase-выпуск
  difficulty: chain.difficulty,                                                 // EN: Same diff / DE: Gleiche Diff / RU: Та же сложность
  nonce: 0                                                                      // EN: Start nonce / DE: Start-Nonce / RU: Начальный нонс
});
b1.mine(); chain.addBlock(b1);                                                  // EN: Mine & append / DE: Minen & anhängen / RU: Майним и добавляем

// Block #2: distribute to A/B/C in one block
const b2 = new Block({                                                          // EN: Build #2 / DE: Block #2 bauen / RU: Блок #2
  index: chain.latest().index + 1,                                              // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                            // EN: Link / DE: Verknüpfen / RU: Связь
  timestamp: Date.now(),                                                        // EN: Now / DE: Jetzt / RU: Сейчас
  transactions: [
    { from: owner, to: A, amount: 300, nonce: 1 },                              // EN: owner→A / DE: Besitzer→A / RU: владелец→A
    { from: owner, to: B, amount: 250, nonce: 2 },                              // EN: owner→B / DE: Besitzer→B / RU: владелец→B
    { from: owner, to: C, amount: 150, nonce: 3 }                               // EN: owner→C / DE: Besitzer→C / RU: владелец→C
  ],
  difficulty: chain.difficulty,                                                 // EN: Same diff / DE: Gleiche Diff / RU: Та же сложность
  nonce: 0                                                                      // EN: Start nonce / DE: Start-Nonce / RU: Начальный нонс
});
b2.mine(); chain.addBlock(b2);                                                  // EN: Mine & append / DE: Minen & anhängen / RU: Майним и добавляем

// --- Compose export object ---------------------------------------------------
const exportObj = {                                                             // EN: Data for UI / DE: Daten für UI / RU: Данные для UI
  valid: chain.isValid(),                                                       // EN: Chain valid? / DE: Kette gültig? / RU: Цепь валидна?
  height: chain.chain.length,                                                   // EN: Number of blocks / DE: Anzahl Blöcke / RU: Кол-во блоков
  lastHash: chain.latest().hash,                                                // EN: Tip hash / DE: Hash der Spitze / RU: Хэш хвоста
  balances: chain.state.snapshot()                                              // EN: Balances map / DE: Kontostände-Map / RU: Снимок балансов
};

// --- Ensure output folder exists --------------------------------------------
const outDir = path.join(__dirname, 'public');                                  // EN: public/ path / DE: Pfad public/ / RU: Путь к public/
const outFile = path.join(outDir, 'state.json');                                // EN: File path / DE: Dateipfad / RU: Путь к файлу
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });          // EN: Create if missing / DE: Erstellen falls fehlt / RU: Создать, если нет

// --- Write JSON pretty -------------------------------------------------------
fs.writeFileSync(outFile, JSON.stringify(exportObj, null, 2), 'utf8');          // EN: Pretty JSON / DE: Schönes JSON / RU: Красивый JSON
console.log('✅ Wrote', outFile);                                               // EN: Confirm / DE: Bestätigung / RU: Подтверждение
console.log('   Balances:', exportObj.balances);                                // EN: Print balances / DE: Kontostände zeigen / RU: Печатаем балансы
console.log('   Chain valid?', exportObj.valid);                                // EN: Valid flag / DE: Gültig-Flag / RU: Флаг валидности
