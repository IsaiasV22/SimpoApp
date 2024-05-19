// Used for mocking the navigator.mediaDevices.getUserMedia function
// This is necessary because the function is not available in a testing environment
// and it is used to access the camera for QR scanning
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.navigator.mediaDevices = {
    getUserMedia: jest.fn().mockResolvedValue({}),
  };
  