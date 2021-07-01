import encrypt from "./util/encrypt";

const priv = "fjdasklfjkldsajfkljdaskljfdsjaklfjdsdjaklfjdklsafjdlsaj";
const key = "fdjskfkldsjfkljsdkfdsafdasfdsafdasfdsafdsfadfsadfslfjlksd";

const enc = encrypt.encrypt(priv, key);
console.log(enc);
const dec = encrypt.decrypt(enc, key);

console.log(priv == dec);
