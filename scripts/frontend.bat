@echo off
cd ../Frontend
echo Installing new packages
call npm install
echo Starting Next server and deploying Frontend
npm run dev