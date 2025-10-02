// demo-immotoken.js — BricksChain demo with real-estate tokens                   // EN: Demo: mint & transfer tokens / DE: Demo: Tokens minten & transferieren / RU: Демо: выпуск и перевод токенов
// EN: In this demo we mint tokens to the owner and transfer some to an investor  // DE: Wir minten Tokens an den Besitzer und übertragen einige an einen Investor  // RU: В этом демо мы выпускаем токены владельцу и переводим часть инвестору
// EN: coinbase (если помнишь: спец-тx без from, создаёт новые токены)            // DE: coinbase (если помнишь: spezielle Tx ohne from, erzeugt neue Tokens)      // RU: coinbase (если помнишь: особая tx без from, создаёт новые токены)

const Blockchain = require('./blockchain');                                        // EN: Import our Blockchain container / DE: Unsere Blockchain importieren / RU: Импортируем наш контейнер Blockchain
const Block = require('./block');                                                  // EN: Import Block class (PoW) / DE: Block-Klasse (PoW) importieren / RU: Импорт класса Block (PoW)

const chain = new Blockchain({ difficulty: 2 });                                   // EN: Create chain with difficulty=2 / DE: Kette mit Difficulty=2 erzeugen / RU: Создаём цепь со сложностью=2
const owner = '0x111';                                                             // EN: Real-estate owner address / DE: Adresse des Immobilien-Eigentümers / RU: Адрес владельца недвижимости
const investor = '0x222';                                                          // EN: Investor address / DE: Adresse des Investors / RU: Адрес инвестора

// --- Block #1: mint tokens to owner ------------------------------------------
const b1 = new Block({                                                             // EN: Build block #1 / DE: Block #1 bauen / RU: Создаём блок #1
  index: chain.latest().index + 1,                                                 // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                               // EN: Link to current tip / DE: Link zur aktuellen Spitze / RU: Ссылка на текущий хвост
  timestamp: Date.now(),                                                           // EN: Current time / DE: Aktuelle Zeit / RU: Текущее время
  transactions: [                                                                  // EN: Transactions list / DE: Transaktionsliste / RU: Список транзакций
    {                                                                              // EN: Single tx object / DE: Einzelne Tx / RU: Одна транзакция
      from: '0x0',                                                                 // EN: Coinbase (mint) / DE: Coinbase (Mint) / RU: Coinbase (выпуск)
      to: owner,                                                                   // EN: Receiver is owner / DE: Empfänger ist Besitzer / RU: Получатель — владелец
      amount: 1000,                                                                // EN: Mint 1000 tokens / DE: 1000 Tokens minten / RU: Выпускаем 1000 токенов
      nonce: 0                                                                     // EN: Nonce placeholder / DE: Nonce-Platzhalter / RU: Нонс-заглушка (не используется для coinbase)
    }
  ],
  difficulty: chain.difficulty,                                                    // EN: Same PoW target as chain / DE: Gleiches PoW-Ziel wie Kette / RU: Та же сложность, что у цепи
  nonce: 0                                                                         // EN: Start nonce at 0 / DE: Start-Nonce 0 / RU: Начальный нонс 0
});                                                                                // EN: End block build / DE: Blockaufbau Ende / RU: Конец сборки блока

console.log('⛏ Mining block #1 (Mint)...');                                       // EN: Inform we start mining / DE: Hinweis: Mining startet / RU: Сообщение о старте майнинга
b1.mine();                                                                         // EN: Run PoW loop / DE: PoW-Schleife ausführen / RU: Запускаем цикл PoW
chain.addBlock(b1);                                                                // EN: Validate & append / DE: Validieren & anhängen / RU: Проверка и добавление

console.log('Owner balance after mint:', chain.state.get(owner));                  // EN: Expect 1000 / DE: Erwartet 1000 / RU: Ожидаем 1000

// --- Block #2: transfer some tokens to investor --------------------------------
const b2 = new Block({                                                             // EN: Build block #2 / DE: Block #2 bauen / RU: Создаём блок #2
  index: chain.latest().index + 1,                                                 // EN: Next height / DE: Nächste Höhe / RU: Следующая высота
  previousHash: chain.latest().hash,                                               // EN: Link to tip / DE: Link zur Spitze / RU: Ссылка на хвост
  timestamp: Date.now(),                                                           // EN: Time now / DE: Zeit jetzt / RU: Текущее время
  transactions: [                                                                  // EN: Transactions / DE: Transaktionen / RU: Транзакции
    {                                                                              // EN: Transfer tx / DE: Transfer-Tx / RU: Транзакция перевода
      from: owner,                                                                 // EN: Sender = owner / DE: Sender = Besitzer / RU: Отправитель = владелец
      to: investor,                                                                // EN: Receiver = investor / DE: Empfänger = Investor / RU: Получатель = инвестор
      amount: 200,                                                                 // EN: Transfer 200 / DE: 200 übertragen / RU: Перевод 200
      nonce: 1                                                                     // EN: Nonce example / DE: Nonce-Beispiel / RU: Пример нонса (можно не использовать в этой модели)
    }
  ],
  difficulty: chain.difficulty,                                                    // EN: Same difficulty / DE: Gleiches Difficulty / RU: Та же сложность
  nonce: 0                                                                         // EN: Start nonce / DE: Start-Nonce / RU: Начальный нонс
});                                                                                // EN: End block build / DE: Blockaufbau Ende / RU: Конец сборки блока

console.log('⛏ Mining block #2 (Transfer)...');                                    // EN: Mining start info / DE: Mining-Start-Info / RU: Сообщение о старте майнинга
b2.mine();                                                                         // EN: Run PoW / DE: PoW ausführen / RU: Запускаем PoW
chain.addBlock(b2);                                                                // EN: Append to chain / DE: Zur Kette hinzufügen / RU: Добавляем в цепь

console.log('Owner balance:', chain.state.get(owner));                             // EN: Expect 800 / DE: Erwartet 800 / RU: Ожидаем 800
console.log('Investor balance:', chain.state.get(investor));                       // EN: Expect 200 / DE: Erwartet 200 / RU: Ожидаем 200
console.log('Chain valid?', chain.isValid());                                      // EN: Expect true / DE: true erwartet / RU: Ожидаем true
// --- Final snapshot table ---
console.log('\n=== Final balances snapshot ===');        // EN/DE/RU: заголовок
console.table(chain.state.snapshot());                    // EN: Pretty-print / DE: Schön ausgeben / RU: Красиво печатаем
