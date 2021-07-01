import fs from "fs";
import u from "../cli/util";

function verifyCertificates(configRoot = "qcert.conf") {
  Object.keys(u.config.get(configRoot)).forEach((key) => {
    if (!fs.existsSync(key)) {
      throw new Error("Credential not found error!");
    }
  });
}
export default { verifyCertificates };
