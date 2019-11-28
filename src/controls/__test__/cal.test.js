/* eslint-disable */
import { isRuenYear } from "controls/cal";

describe("isRuenYear", () => {
    it("can point out 2008 is a ruen year", () => {
        let result = isRuenYear(2008);
        expect(result).toBeTruthy();
    });

    it("can point out 2400 is not a ruen year", () => {
        let result = isRuenYear(2400);
        expect(result).toBeFalsy();
    });
});
