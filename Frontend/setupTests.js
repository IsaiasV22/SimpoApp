// Used for mocking the navigator.mediaDevices.getUserMedia function
// This is necessary because the function is not available in a testing environment
// and it is used to access the camera for QR scanning


global.navigator.mediaDevices = {
    getUserMedia: jest.fn().mockResolvedValue({}),
  };
  