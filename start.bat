@echo off
echo Starting NetLearn local server...
echo.
echo Open your browser and go to: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server when done.
echo.

REM Try npx serve first (solves Windows MIME type issues for ES6 modules)
call npx serve -p 8080 . 2>nul
if %errorlevel% neq 0 (
    REM Fallback to Python 3
    echo npx serve not found, trying python...
    python -m http.server 8080 2>nul
    if %errorlevel% neq 0 (
        REM Try py launcher
        py -m http.server 8080 2>nul
        if %errorlevel% neq 0 (
            echo.
            echo ERROR: Could not start server automatically.
            echo Please install Node.js (npx serve) or Python.
            pause
        )
    )
)
pause
