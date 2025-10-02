// test-block.js — quick PoW smoke test
// EN: Mine one block and print hash/nonce
// DE: Einen Block minen und Hash/Nonce ausgeben
// RU: Майним один блок и печатаем hash/nonce

const Block = require('./block');                     // EN: Import Block / DE: Block importieren / RU: Импорт Block

const b = new Block({                                 // EN: Build candidate / DE: Kandidat bauen / RU: Создаём кандидат
  index: 1,                                           // EN: Height / DE: Höhe / RU: Высота
  previousHash: '00',                                 // EN: Dummy parent / DE: Dummy-Vorgänger / RU: Заглушка предка
  timestamp: Date.now(),                              // EN: Now / DE: Jetzt / RU: Сейчас
  transactions: [],                                   // EN: No txs / DE: Keine Txs / RU: Без транзакций
  difficulty: 2                                       // EN: Need '00' prefix / DE: Prefix '00' nötig / RU: Нужен префикс '00'
});

console.log('⛏ Mining...');                           // EN/DE/RU: старт майнинга
b.mine();                                             // EN: Run PoW / DE: PoW ausführen / RU: Запускаем PoW
console.log('Hash:', b.hash);                         // EN/DE/RU: печать хэша
console.log('Nonce:', b.nonce);                       // EN/DE/RU: печать nonce
