// state.js — Token balances state for BricksChain
// EN: Minimal in-memory balances with safe credit/debit/transfer
// DE: Minimale In-Memory-Kontostände mit sicheren credit/debit/transfer
// RU: Минимальный учёт балансов в памяти с безопасными credit/debit/transfer

class State {                                              // EN: Container for balances / DE: Container für Kontostände / RU: Контейнер балансов
  constructor() {                                          // EN: Init storage / DE: Speicher initialisieren / RU: Инициализируем хранилище
    this._bal = Object.create(null);                       // EN: Plain object map / DE: Einfaches Objekt als Map / RU: Простая map на объекте
  }

  _norm(addr) {                                            // EN: Normalize address key / DE: Adress-Schlüssel normalisieren / RU: Нормализуем ключ адреса
    return String(addr || '').toLowerCase();               // EN: Lowercase for safety / DE: Kleinschreibung / RU: Приводим к нижнему регистру
  }

  get(addr) {                                              // EN: Read balance / DE: Kontostand lesen / RU: Получить баланс
    const key = this._norm(addr);                          // EN: Canonical key / DE: Kanonischer Schlüssel / RU: Каноничный ключ
    const v = this._bal[key];                              // EN: Raw value / DE: Rohwert / RU: Сырое значение
    return typeof v === 'number' ? v : 0;                  // EN: Default 0 / DE: Standard 0 / RU: По умолчанию 0
  }

  set(addr, amount) {                                      // EN: Force set balance / DE: Kontostand setzen / RU: Принудительно установить баланс
    const key = this._norm(addr);                          // EN: Canonical key / DE: Kanonischer Schlüssel / RU: Каноничный ключ
    if (!Number.isFinite(amount) || amount < 0)            // EN: Validate / DE: Validieren / RU: Проверка
      throw new Error('State.set: amount must be >= 0');   // EN: Error message / DE: Fehlermeldung / RU: Сообщение об ошибке
    this._bal[key] = amount;                               // EN: Write / DE: Schreiben / RU: Запись
    return this._bal[key];                                 // EN: Return new value / DE: Neuen Wert zurück / RU: Возврат значения
  }

  credit(addr, amount) {                                   // EN: Increase balance / DE: Kontostand erhöhen / RU: Увеличить баланс
    if (!Number.isFinite(amount) || amount <= 0)           // EN: Validate / DE: Validieren / RU: Проверка
      throw new Error('State.credit: amount must be > 0'); // EN: Error / DE: Fehler / RU: Ошибка
    const cur = this.get(addr);                            // EN: Current / DE: Aktuell / RU: Текущий
    return this.set(addr, cur + amount);                   // EN: Add / DE: Addieren / RU: Прибавляем
  }

  debit(addr, amount) {                                    // EN: Decrease if enough / DE: Verringern, falls genug / RU: Списать, если хватает
    if (!Number.isFinite(amount) || amount <= 0)           // EN: Validate / DE: Validieren / RU: Проверка
      throw new Error('State.debit: amount must be > 0');  // EN: Error / DE: Fehler / RU: Ошибка
    const cur = this.get(addr);                            // EN: Current / DE: Aktuell / RU: Текущий
    if (cur < amount) return false;                        // EN: Not enough / DE: Nicht genug / RU: Недостаточно средств
    this.set(addr, cur - amount);                          // EN: Subtract / DE: Subtrahieren / RU: Вычитаем
    return true;                                           // EN: Success / DE: Erfolg / RU: Успех
  }

  transfer(from, to, amount) {                             // EN: Move tokens / DE: Tokens bewegen / RU: Перевести токены
    if (!this.debit(from, amount)) return false;           // EN: Try debit / DE: Debit versuchen / RU: Пытаемся списать
    this.credit(to, amount);                               // EN: Credit target / DE: Ziel gutschreiben / RU: Зачисляем получателю
    return true;                                           // EN: Success / DE: Erfolg / RU: Успех
  }

  snapshot() {                                             // EN: Read-only copy / DE: Nur-Lesen-Kopie / RU: Снимок состояния
    return JSON.parse(JSON.stringify(this._bal));          // EN: Deep clone / DE: Tiefe Kopie / RU: Глубокая копия
  }
}

module.exports = State;                                     // EN: Export class / DE: Klasse exportieren / RU: Экспорт класса
