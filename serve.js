// serve.js — ultra-simple static file server for BricksChain
// EN: Minimal HTTP server to serve ./public
// DE: Minimaler HTTP-Server, der ./public ausliefert
// RU: Минимальный HTTP-сервер для раздачи ./public

const http = require('http');                           // EN: HTTP module / DE: HTTP-Modul / RU: Модуль HTTP
const fs = require('fs');                               // EN: File system / DE: Dateisystem / RU: ФС
const path = require('path');                           // EN: Path utils / DE: Pfad-Utils / RU: Работа с путями

const HOST = '127.0.0.1';                               // EN: Localhost / DE: Localhost / RU: Локально
const PORT = 8080;                                      // EN: Port / DE: Port / RU: Порт
const ROOT = path.join(__dirname, 'public');            // EN: Serve ./public / DE: ./public ausliefern / RU: Раздаём ./public

const MIME = {                                          // EN: Basic MIME map / DE: Einfache MIME-Map / RU: Базовые MIME
  '.html':'text/html; charset=utf-8',
  '.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8',
  '.css':'text/css; charset=utf-8'
};

const server = http.createServer((req, res) => {        // EN: Handle request / DE: Anfrage verarbeiten / RU: Обработка запроса
  const urlPath = decodeURIComponent(req.url.split('?')[0]);  // EN: Clean path / DE: Pfad bereinigen / RU: Чистим путь
  const rel = urlPath === '/' ? '/index.html' : urlPath;      // EN: Default index / DE: Standard index / RU: По умолчанию index
  const filePath = path.normalize(path.join(ROOT, rel));      // EN: Full path / DE: Voller Pfad / RU: Полный путь

  if (!filePath.startsWith(ROOT)) {                    // EN: Prevent path escape / DE: Pfadflucht verhindern / RU: Защита от выхода за каталог
    res.writeHead(403); return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {               // EN: Read file / DE: Datei lesen / RU: Читаем файл
    if (err) {                                         // EN: On error / DE: Bei Fehler / RU: Ошибка
      res.writeHead(404); return res.end('Not Found'); // EN/DE/RU: 404
    }
    const ext = path.extname(filePath).toLowerCase();  // EN: File ext / DE: Endung / RU: Расширение
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' }); // EN/DE/RU: Заголовок типа
    res.end(data);                                     // EN: Send content / DE: Inhalt senden / RU: Отправляем данные
  });
});

server.listen(PORT, HOST, () => {                       // EN: Start server / DE: Server starten / RU: Запуск сервера
  console.log(`✅ BricksChain server → http://${HOST}:${PORT}`); // EN/DE/RU: адрес сервера
  console.log('Tip: run `node export-state.js` to refresh public/state.json');    // EN/DE/RU: подсказка обновления
});
