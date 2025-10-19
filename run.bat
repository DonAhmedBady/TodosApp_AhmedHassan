@echo off
REM Run Python server
start /b python server.py

REM Run JSON Server
start /b json-server --watch data/todos.json --port 3001

REM Run Next.js dev server
start /b npm run dev

echo All servers started.
pause
