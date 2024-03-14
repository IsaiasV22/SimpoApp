const nextJest = require('next/jest')
const path = require('path');
/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
const mockFilePath = path.resolve(__dirname, 'src/app/components/actividades/react-responsive-pagination.js');
const mockFilePathUuid = path.resolve(__dirname, 'src/app/components/asistenciaActividades/uuidMock.js');

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],


  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^uuid$": mockFilePathUuid,
    "^react-responsive-pagination$": mockFilePath,
    // Add more mappings for other non-standard imports if needed
  },
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)