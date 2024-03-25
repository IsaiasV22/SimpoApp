# Navega al directorio Backend
cd "$(dirname "$0")"/../Backend
echo "Installing new packages for Backend..."
npm install
echo "Starting Express server using nodemon..."
nodemon src/app.js
