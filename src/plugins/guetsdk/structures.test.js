import { LoginCall } from './structures';

describe("LoginCall", () => {
  it(".postprocessor must return correct LoginResult if fetch successfully", () => {
    let mockResponse = {
      status: 200,
      data: {
        status: 2,
        cookie_key: "cookie_key",
        cookie: "cookie"
      }
    };
    let call = new LoginCall("username","password");
      return expect(call.callPostprocessor(mockResponse)).resolves.toMatchObject({
          cookieKey: "cookie_key",
          cookie: "cookie"
      });
  });
})
