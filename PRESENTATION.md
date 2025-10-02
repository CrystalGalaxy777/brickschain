# BricksChain

**EN:** Final Project: Real Estate Tokenization  
**DE:** Abschlussprojekt: Tokenisierung von Immobilien  
**RU:** Выпускной проект: токенизация недвижимости  

---

## Motivation / Motivation / Мотивация

- **EN:** Real estate is valuable but illiquid. Tokenization makes it tradable.  
- **DE:** Immobilien sind wertvoll, aber illiquide. Tokenisierung macht sie handelbar.  
- **RU:** Недвижимость ценна, но неликвидна. Токенизация делает её ликвидной.  

---

## Architecture / Architektur / Архитектура

- **State.js** → balances (Kontostände / Балансы)  
- **Block.js** → block + PoW (Block + PoW / Блок + PoW)  
- **Blockchain.js** → chain + apply state (Kette + State / Цепочка + State)  
- **Demos & Tests** → mint, transfer, overspend protection  

---

## Demo Scenario / Demo-Szenario / Демо-сценарий

1. **Mint**: Owner receives 1000 tokens  
2. **Transfer**: Owner → Investor A/B/C  
3. **Validation**: Chain valid, balances updated  

---

## Output Example / Beispiel-Ausgabe / Пример вывода

```

Owner balance: 300
A balance: 300
B balance: 250
C balance: 150
Chain valid? true

```

---

## Online Demo / Online-Demo / Онлайн-демо

👉 https://CrystalGalaxy777.github.io/brickschain/  

---

## Next Steps / Nächste Schritte / Следующие шаги

- **EN:** Extend to Solidity Smart Contract (ERC-20)  
- **DE:** Erweiterung zu Solidity Smart Contract (ERC-20)  
- **RU:** Расширение до смарт-контракта в Solidity (ERC-20)  
```

---
