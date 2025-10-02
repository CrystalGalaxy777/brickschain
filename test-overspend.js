// test-overspend.js — deny spending more than balance                     // EN: Overspend must be rejected / DE: Overspend muss abgelehnt werden / RU: Перерасход должен отклоняться

const Blockchain = require('./blockchain');                                 // EN: Import chain / DE: Kette importieren / RU: Импорт цепочки
const Block = require('./block');                                           // EN: Import block / DE: Block importieren / RU: Импорт блока

const chain = new Blockchain({ difficulty: 1 });                            // EN: Low diff for speed / DE: Niedrige Diff für Tempo / RU: Низкая сложность для скорости
const A = '0xaaa';                                                          // EN: Sender / DE: Sender / RU: Отправитель
const B = '0xbbb';                                                          // EN: Receiver / DE: Empfänger / RU: Получатель

// --- Block 1: mint 100 tokens to A -----------------------------------------
const b1 = new Block({                                                      // EN: Build block #1 / DE: Block #1 bauen / RU: Создаём блок #1
  index: chain.latest().index + 1,                                          // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                        // EN: Link / DE: Verknüpfung / RU: Связь
  timestamp: Date.now(),                                                    // EN: Time / DE: Zeit / RU: Время
  transactions: [ { from: '0x0', to: A, amount: 100, nonce: 0 } ],          // EN: Mint 100 to A / DE: 100 an A minten / RU: Выпуск 100 на счёт A
  difficulty: chain.difficulty,                                             // EN: Same diff / DE: Gleiche Diff / RU: Та же сложность
  nonce: 0                                                                  // EN: Start nonce / DE: Start-Nonce / RU: Начальный нонс
});
b1.mine();                                                                  // EN: Mine / DE: Minen / RU: Майним
chain.addBlock(b1);                                                         // EN: Append / DE: Anhängen / RU: Добавляем

// --- Block 2: try to send 150 (overspend) ----------------------------------
const b2 = new Block({                                                      // EN: Build block #2 / DE: Block #2 bauen / RU: Создаём блок #2
  index: chain.latest().index + 1,                                          // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                        // EN: Link / DE: Verknüpfung / RU: Связь
  timestamp: Date.now(),                                                    // EN: Time / DE: Zeit / RU: Время
  transactions: [ { from: A, to: B, amount: 150, nonce: 1 } ],              // EN: Try 150 > 100 / DE: 150 > 100 / RU: 150 больше 100
  difficulty: chain.difficulty,                                             // EN: Same diff / DE: Gleiche Diff / RU: Та же сложность
  nonce: 0                                                                  // EN: Start nonce / DE: Start-Nonce / RU: Начальный нонс
});
b2.mine();                                                                  // EN: Mine / DE: Minen / RU: Майним

try {                                                                       // EN: Expect error / DE: Fehler erwartet / RU: Ожидаем ошибку
  chain.addBlock(b2);                                                       // EN: Append attempt / DE: Anhängeversuch / RU: Попытка добавить
  console.log('❌ Overspend NOT detected (unexpected)');                    // EN: Should not happen / DE: Sollte nicht passieren / RU: Так быть не должно
} catch (e) {                                                               // EN: Catch error / DE: Fehler fangen / RU: Ловим ошибку
  console.log('✅ Overspend detected:', e.message);                         // EN: Good: rejected / DE: Gut: abgelehnt / RU: Отлично: отклонено
}
