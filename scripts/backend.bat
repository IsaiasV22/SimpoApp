@echo off
cd ../Backend
echo Installing new packages
call npm install
echo Starting Express server using nodemon
nodemon src\app.js