// test-chain.js — quick Blockchain smoke test
// EN: Create chain, mine one block, validate
// DE: Kette erstellen, einen Block minen, validieren
// RU: Создаём цепочку, майним блок, проверяем

const Blockchain = require('./blockchain');           // EN: Import Blockchain / DE: Blockchain importieren / RU: Импорт Blockchain
const Block = require('./block');                     // EN: Import Block / DE: Block importieren / RU: Импорт Block

const chain = new Blockchain({ difficulty: 2 });      // EN: New chain / DE: Neue Kette / RU: Новая цепь
console.log('Genesis hash:', chain.latest().hash);    // EN/DE/RU: печатаем хэш генезиса

const b1 = new Block({                                // EN: New block / DE: Neuer Block / RU: Новый блок
  index: chain.latest().index + 1,                    // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                  // EN: Link to genesis / DE: Link zu Genesis / RU: Ссылка на генезис
  timestamp: Date.now(),                              // EN: Now / DE: Jetzt / RU: Сейчас
  transactions: [],                                   // EN: No txs / DE: Keine Txs / RU: Без транзакций
  difficulty: chain.difficulty,                       // EN: Same diff / DE: Gleiche Diff / RU: Та же сложность
  nonce: 0                                            // EN: Start nonce / DE: Start-Nonce / RU: Начальный nonce
});

console.log('⛏ Mining block #1...');                  // EN/DE/RU: начинаем майнинг
b1.mine();                                            // EN: Mine / DE: Minen / RU: Майним
chain.addBlock(b1);                                   // EN: Append / DE: Anhängen / RU: Добавляем

console.log('Mined hash:', b1.hash);                  // EN/DE/RU: показываем хэш
console.log('Nonce:', b1.nonce);                      // EN/DE/RU: nonce
console.log('Chain valid?', chain.isValid());         // EN/DE/RU: проверка цепи
