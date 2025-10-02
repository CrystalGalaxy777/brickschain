// test-multi-transfers.js — assert balances for multi-investor scenario       // EN: Balance assertions / DE: Kontostand-Assertions / RU: Проверки балансов
const assert = require('assert');                                             // EN: Node assert / DE: Node-Assert / RU: Ассерты Node
const Blockchain = require('./blockchain');                                   // EN: Chain / DE: Kette / RU: Цепь
const Block = require('./block');                                             // EN: Block / DE: Block / RU: Блок

const chain = new Blockchain({ difficulty: 1 });                              // EN: Low diff for speed / DE: Geringe Diff für Tempo / RU: Низкая сложность для скорости
const owner = '0x111';                                                        // EN: Owner / DE: Besitzer / RU: Владелец
const A = '0xaaa', B = '0xbbb', C = '0xccc';                                  // EN: Investors / DE: Investoren / RU: Инвесторы

// --- Block #1: mint 1000 to owner ---
const b1 = new Block({                                                        // EN: Build block / DE: Block bauen / RU: Создаём блок
  index: chain.latest().index + 1,                                            // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                          // EN: Link / DE: Verknüpfung / RU: Связь
  timestamp: Date.now(),                                                      // EN: Time / DE: Zeit / RU: Время
  transactions: [ { from: '0x0', to: owner, amount: 1000, nonce: 0 } ],       // EN: Coinbase / DE: Coinbase / RU: Coinbase
  difficulty: chain.difficulty,                                               // EN: Same diff / DE: Gleiche Diff / RU: Та же сложность
  nonce: 0                                                                    // EN: Start nonce / DE: Start-Nonce / RU: Начальный нонс
});
b1.mine(); chain.addBlock(b1);                                                // EN/DE/RU: Майним и добавляем

assert.strictEqual(chain.state.get(owner), 1000, 'owner after mint must be 1000'); // EN/DE/RU: проверка 1000

// --- Block #2: three transfers in one block ---
const b2 = new Block({                                                        // EN: Build block / DE: Block bauen / RU: Создаём блок
  index: chain.latest().index + 1,                                            // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                          // EN: Link / DE: Verknüpfung / RU: Связь
  timestamp: Date.now(),                                                      // EN: Time / DE: Zeit / RU: Время
  transactions: [
    { from: owner, to: A, amount: 300, nonce: 1 },                            // EN/DE/RU: owner→A 300
    { from: owner, to: B, amount: 250, nonce: 2 },                            // EN/DE/RU: owner→B 250
    { from: owner, to: C, amount: 150, nonce: 3 }                             // EN/DE/RU: owner→C 150
  ],
  difficulty: chain.difficulty,                                               // EN/DE/RU: сложность
  nonce: 0
});
b2.mine(); chain.addBlock(b2);                                                // EN/DE/RU: майним и добавляем

// --- Assertions ---
assert.strictEqual(chain.state.get(owner), 300, 'owner must be 300');         // EN/DE/RU: владелец=300
assert.strictEqual(chain.state.get(A), 300, 'A must be 300');                 // EN/DE/RU: A=300
assert.strictEqual(chain.state.get(B), 250, 'B must be 250');                 // EN/DE/RU: B=250
assert.strictEqual(chain.state.get(C), 150, 'C must be 150');                 // EN/DE/RU: C=150
assert.strictEqual(chain.isValid(), true, 'chain must be valid');             // EN/DE/RU: цепь валидна

console.log('✅ Multi-investor test passed');                                  // EN/DE/RU: тест пройден
