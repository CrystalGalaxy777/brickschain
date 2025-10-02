// demo-multi-investors.js — BricksChain multi-investor demo                 // EN: Multi-recipient transfers / DE: Transfers an mehrere Empfänger / RU: Переводы нескольким получателям
// EN: We mint to the owner, then distribute to three investors in one block  // DE: Erst Mint an Besitzer, dann Verteilung an drei Investoren in einem Block // RU: Сначала mint владельцу, затем раздача трем инвесторам в одном блоке
// EN: цель — проверить применение нескольких tx в одном блоке                // DE: Ziel — Anwendung mehrerer Txs in einem Block prüfen                     // RU: цель — проверить несколько tx в одном блоке

const Blockchain = require('./blockchain');                                   // EN: Import chain / DE: Kette importieren / RU: Импорт цепочки
const Block = require('./block');                                             // EN: Import block / DE: Block importieren / RU: Импорт блока

const chain = new Blockchain({ difficulty: 2 });                              // EN: New chain with diff=2 / DE: Neue Kette mit Diff=2 / RU: Новая цепь, сложность=2
const owner  = '0x111';                                                       // EN: Owner address / DE: Besitzer-Adresse / RU: Адрес владельца
const A = '0xaaa', B = '0xbbb', C = '0xccc';                                  // EN: Investors A/B/C / DE: Investoren A/B/C / RU: Инвесторы A/B/C

// --- Block #1: mint 1000 to owner ------------------------------------------
const b1 = new Block({                                                        // EN: Build block #1 / DE: Block #1 erstellen / RU: Создаём блок #1
  index: chain.latest().index + 1,                                            // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                          // EN: Link to tip / DE: Link zur Spitze / RU: Связь с хвостом
  timestamp: Date.now(),                                                      // EN: Now / DE: Jetzt / RU: Сейчас
  transactions: [ { from: '0x0', to: owner, amount: 1000, nonce: 0 } ],       // EN: Coinbase mint / DE: Coinbase-Mint / RU: Coinbase-выпуск
  difficulty: chain.difficulty,                                               // EN: Same diff / DE: Gleiche Diff / RU: Та же сложность
  nonce: 0                                                                    // EN: Start nonce / DE: Start-Nonce / RU: Начальный нонс
});
console.log('⛏ Mining block #1 (Mint 1000 to owner)...');                     // EN/DE/RU: лог майнинга
b1.mine();                                                                    // EN: PoW / DE: PoW / RU: PoW
chain.addBlock(b1);                                                           // EN: Append / DE: Anhängen / RU: Добавить
console.log('Owner after mint:', chain.state.get(owner));                     // EN: Expect 1000 / DE: Erwartet 1000 / RU: Ожидаем 1000

// --- Block #2: distribute to three investors in one block -------------------
const b2 = new Block({                                                        // EN: Build block #2 / DE: Block #2 erstellen / RU: Создаём блок #2
  index: chain.latest().index + 1,                                            // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                          // EN: Link prev / DE: Vorherigen verlinken / RU: Связь с предыдущим
  timestamp: Date.now(),                                                      // EN: Time / DE: Zeit / RU: Время
  transactions: [                                                             // EN: Three transfers / DE: Drei Transfers / RU: Три перевода
    { from: owner, to: A, amount: 300, nonce: 1 },                            // EN: Owner→A 300 / DE: Besitzer→A 300 / RU: Владельцу→A 300
    { from: owner, to: B, amount: 250, nonce: 2 },                            // EN: Owner→B 250 / DE: Besitzer→B 250 / RU: Владельцу→B 250
    { from: owner, to: C, amount: 150, nonce: 3 }                             // EN: Owner→C 150 / DE: Besitzer→C 150 / RU: Владельцу→C 150
  ],
  difficulty: chain.difficulty,                                               // EN: Same diff / DE: Gleiche Diff / RU: Та же сложность
  nonce: 0                                                                    // EN: Start nonce / DE: Start-Nonce / RU: Начальный нонс
});
console.log('⛏ Mining block #2 (Distribute to A/B/C)...');                    // EN/DE/RU: лог майнинга
b2.mine();                                                                    // EN: Mine / DE: Minen / RU: Майним
chain.addBlock(b2);                                                           // EN: Apply all 3 tx / DE: Alle 3 Txs anwenden / RU: Применяем все 3 tx

// --- Balances after distribution --------------------------------------------
console.log('Owner balance:', chain.state.get(owner));                        // EN: Expect 1000-300-250-150 = 300 / DE: Erwartet 300 / RU: Ожидаем 300
console.log('A balance:', chain.state.get(A));                                // EN: Expect 300 / DE: Erwartet 300 / RU: Ожидаем 300
console.log('B balance:', chain.state.get(B));                                // EN: Expect 250 / DE: Erwartet 250 / RU: Ожидаем 250
console.log('C balance:', chain.state.get(C));                                // EN: Expect 150 / DE: Erwartet 150 / RU: Ожидаем 150
console.log('Chain valid?', chain.isValid());                                 // EN: Expect true / DE: true erwartet / RU: Ожидаем true
// --- Final snapshot table ---
console.log('\n=== Final balances snapshot ===');        // EN/DE/RU: заголовок
console.table(chain.state.snapshot());                    // EN: Pretty-print / DE: Schön ausgeben / RU: Красиво печатаем
