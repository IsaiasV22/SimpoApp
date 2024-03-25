@echo off
cd ../Frontend
echo Installing new packages
call yarn install
echo Starting Next server and deploying Frontend
yarn dev