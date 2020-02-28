import { GUETClient } from './client';

describe("GUETClient", () => {
    it("can hook 'cookie_not_found' for case which cookie is not found in client", () => {
        let calledTimes = 0;
        let mock = () => { calledTimes++; };
        let client = new GUETClient();
        client.on("cookie_not_found", mock);
        let x = client.isLogin; // .isLogin will trigger event if cookie not found
        expect(x).toBe(false);
        expect(calledTimes).toBe(1);
    });

    it("can hook 'cookie_set' for listening cookie was setteing", () => {
        let mock = jest.fn();
        let client = new GUETClient();
        client.on("cookie_set", mock);
        client.setUserCookie({});
        expect(mock).toBeCalledTimes(1);
    });
});
