// test-state.js — Smoke test for State balances (EN/DE/RU)
// EN: Run with `node test-state.js`
// DE: Ausführen mit `node test-state.js`
// RU: Запуск: `node test-state.js`

const assert = require('assert');                 // EN: Assertions / DE: Assertions / RU: Ассерты
const State = require('./state');                 // EN: Import / DE: Import / RU: Импорт

const s = new State();                            // EN: New state / DE: Neuer State / RU: Новый стейт
const A = '0xaaa';                                // EN: Addr A / DE: Adresse A / RU: Адрес A
const B = '0xbbb';                                // EN: Addr B / DE: Adresse B / RU: Адрес B

assert.strictEqual(s.get(A), 0, 'A starts at 0'); // EN/DE/RU: A должен начинать с 0
s.credit(A, 100);                                  // EN: +100 / DE: +100 / RU: +100
assert.strictEqual(s.get(A), 100);                 // EN/DE/RU: Проверяем 100

assert.strictEqual(s.debit(A, 30), true);          // EN: debit ok / DE: debit ok / RU: списание ок
assert.strictEqual(s.get(A), 70);                  // EN/DE/RU: теперь 70

assert.strictEqual(s.debit(A, 100), false);        // EN: overspend / DE: Überschuss / RU: перерасход
assert.strictEqual(s.get(A), 70);                  // EN/DE/RU: осталось 70

assert.strictEqual(s.transfer(A, B, 50), true);    // EN: transfer / DE: Transfer / RU: перевод
assert.strictEqual(s.get(A), 20);                  // EN/DE/RU: A=20
assert.strictEqual(s.get(B), 50);                  // EN/DE/RU: B=50

assert.strictEqual(s.transfer(A, B, 100), false);  // EN: cannot / DE: geht nicht / RU: нельзя
assert.strictEqual(s.get(A), 20);                  // EN/DE/RU: A остался 20
assert.strictEqual(s.get(B), 50);                  // EN/DE/RU: B остался 50

console.log('✅ State smoke test passed');          // EN/DE/RU: тест пройден
