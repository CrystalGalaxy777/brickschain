# DIARY.md — BricksChain (Abschlussprojekt)

**Repo:** `BricksChain`  
**Goal:** Tokenisierung von Immobilien (Real Estate Tokenization)  
**Date:** 02.10.2025  

> **EN:** This diary shows the reproducible build log of my final project.  
> **DE:** Dieses Tagebuch dokumentiert Schritt für Schritt mein Abschlussprojekt.  
> **RU:** Этот дневник фиксирует шаги создания моего выпускного проекта.

---

## Steps so far

1. **Init repository**  
   - EN: Created folder `brickschain`, added `README.md`.  
   - DE: Ordner `brickschain` erstellt, `README.md` hinzugefügt.  
   - RU: Создала папку `brickschain`, добавила `README.md`.

2. **State balances (`state.js`)**  
   - EN: Implemented safe credit/debit/transfer, with smoke test.  
   - DE: Sichere credit/debit/transfer implementiert, mit Smoke-Test.  
   - RU: Реализован учёт credit/debit/transfer, протестирован.

3. **Block + PoW (`block.js`)**  
   - EN: Implemented Block class with deterministic header, PoW mining.  
   - DE: Block-Klasse mit deterministischem Header, PoW-Mining.  
   - RU: Класс Block с PoW-майнингом.

4. **Blockchain (`blockchain.js`)**  
   - EN: Container with genesis, addBlock(), validation, and State integration.  
   - DE: Container mit Genesis, addBlock(), Validierung, und State-Integration.  
   - RU: Контейнер с генезисом, addBlock(), валидацией и интеграцией State.

5. **Demo (`demo-immotoken.js`)**  
   - EN: Mint 1000 tokens to owner, transfer 200 to investor, balances update.  
   - DE: 1000 Tokens an Besitzer minten, 200 an Investor übertragen, Kontostände aktualisieren.  
   - RU: Выпуск 1000 токенов владельцу, перевод 200 инвестору, обновление балансов.

6. **Overspend test (`test-overspend.js`)**  
   - EN: Attempt overspend rejected.  
   - DE: Overspend-Versuch abgelehnt.  
   - RU: Перерасход отклонён.

---

## Next steps (plan)

- EN: Add more tests (multi-transfers, multiple investors).  
- DE: Mehr Tests hinzufügen (Multi-Transfers, mehrere Investoren).  
- RU: Добавить больше тестов (мультипереводы, несколько инвесторов).  

- EN: Polish README with full instructions.  
- DE: README mit vollständigen Anleitungen ergänzen.  
- RU: Дополнить README инструкциями.

- EN: Prepare final presentation slides.  
- DE: Abschlusspräsentation vorbereiten.  
- RU: Подготовить финальную презентацию.
