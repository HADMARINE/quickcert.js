import crypto from "crypto";

function encryptSymmetry(
  value: string,
  privkey: string,
  settings?: {}
): string {
  const iv = crypto.randomBytes(16);
  const salt = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    crypto.scryptSync(privkey, salt, 32),
    iv
  );

  let result = cipher.update(value, "utf8", "base64");
  result += cipher.final("base64");
  return `${result}.${cipher.getAuthTag().toString("base64")}.${iv.toString(
    "base64"
  )}.${salt.toString("base64")}`;
}

function decryptSymmetry(
  pubkey: string,
  privkey: string,
  settings?: {}
): string {
  const p = pubkey.split(".");
  if (p.length !== 4) throw new Error("Public key invalid");
  const [pub, authTag, iv, salt] = p;
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    crypto.scryptSync(privkey, Buffer.from(salt, "base64"), 32),
    Buffer.from(iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(authTag, "base64"));
  let result = decipher.update(pub, "base64", "utf8");
  result += decipher.final("utf8");
  return result;
}

export default { encrypt: encryptSymmetry, decrypt: decryptSymmetry };
