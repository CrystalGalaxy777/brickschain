# BricksChain (JS)

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-brightgreen)](https://nodejs.org/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)  
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()  
[![Stars](https://img.shields.io/github/stars/CrystalGalaxy777/brickschain?style=social)](https://github.com/CrystalGalaxy777/brickschain/stargazers)  
[![Last Commit](https://img.shields.io/github/last-commit/CrystalGalaxy777/brickschain)](https://github.com/CrystalGalaxy777/brickschain/commits/main)  
[![Repo Size](https://img.shields.io/github/repo-size/CrystalGalaxy777/brickschain)](https://github.com/CrystalGalaxy777/brickschain)  

---

> **EN:** Final Project: Real Estate Tokenization on Blockchain  
> **DE:** Abschlussprojekt: Tokenisierung von Immobilien auf einer Blockchain  
> **RU:** Выпускной проект: токенизация недвижимости на блокчейне  

---

## ✨ Highlights

- **EN:** In-memory balances (`state.js`), Block with PoW (`block.js`), Blockchain with State integration (`blockchain.js`), Demo: mint + transfer (`demo-immotoken.js`), Overspend protection (`test-overspend.js`).  
- **DE:** In-Memory-Kontostände (`state.js`), Block mit PoW (`block.js`), Blockchain mit State-Integration (`blockchain.js`), Demo: Mint + Transfer (`demo-immotoken.js`), Overspend-Schutz (`test-overspend.js`).  
- **RU:** Учёт балансов в памяти (`state.js`), Блок с PoW (`block.js`), Блокчейн с интеграцией State (`blockchain.js`), Демо: выпуск + перевод (`demo-immotoken.js`), Защита от перерасхода (`test-overspend.js`).  

---

## ⚙️ How to run / Ausführen / Запуск

### 1. Run demo (mint + transfer)
```bash
node demo-immotoken.js
````

Example output:

```
⛏ Mining block #1 (Mint)...
Owner balance after mint: 1000
⛏ Mining block #2 (Transfer)...
Owner balance: 800
Investor balance: 200
Chain valid? true
```

---

### 2. Run overspend test

```bash
node test-overspend.js
```

Example output:

```
✅ Overspend detected: Overspend detected from 0xaaa
```

---

## 📚 Project structure / Projektstruktur / Структура проекта

* `state.js` — EN: Balances / DE: Kontostände / RU: Балансы
* `block.js` — EN: Block + PoW / DE: Block + PoW / RU: Блок + PoW
* `blockchain.js` — EN: Chain + apply state / DE: Kette + State anwenden / RU: Цепочка + применение State
* `demo-immotoken.js` — EN: Demo mint + transfer / DE: Demo Mint + Transfer / RU: Демо выпуск + перевод
* `test-overspend.js` — EN: Overspend protection / DE: Overspend-Schutz / RU: Защита от перерасхода
* `DIARY.md` — EN: Build log / DE: Projekt-Tagebuch / RU: Журнал проекта

---

## 🚀 Next steps / Nächste Schritte / Следующие шаги

* **EN:** Add multi-investor scenario & extended tests

* **DE:** Multi-Investor-Szenario & erweiterte Tests hinzufügen

* **RU:** Добавить сценарий с несколькими инвесторами и расширенные тесты

* **EN:** Optional Solidity Smart Contract prototype

* **DE:** Optionaler Solidity-Smart-Contract-Prototyp

* **RU:** Опционально прототип смарт-контракта на Solidity

