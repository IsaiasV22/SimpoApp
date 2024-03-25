# Navega al directorio Frontend
cd "$(dirname "$0")"/../Frontend
echo "Installing new packages for Frontend..."
npm install
echo "Starting Next server and deploying Frontend..."
npm run dev
