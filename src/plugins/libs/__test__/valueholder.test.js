import { ValueHolder } from "../valueholder";

describe("ValueHolder", () => {
    it("can set initial value when construct and access later", () => {
        let holder = new ValueHolder(true);
        expect(holder.value).toBe(true);
    });

    it("can set value then access later", () => {
        let holder = new ValueHolder();
        holder.value = "test";
        expect(holder.value).toBe("test");
    });
});
