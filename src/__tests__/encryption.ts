import encrypt from "../util/encrypt";

describe("Test Encryption / Decryption", () => {
  const testvalue = "test_value_1234_5678";
  const testkey = "12344431243214321";

  let encryptedResult: string;
  let decryptedResult: string;

  it("should encrypt with no error", () => {
    encryptedResult = encrypt.encrypt(testvalue, testkey);
  });

  it("should decrypt with no error", () => {
    decryptedResult = encrypt.decrypt(encryptedResult, testkey);
  });

  it("should be same", () => {
    expect(decryptedResult).toBe(testvalue);
  });
});
