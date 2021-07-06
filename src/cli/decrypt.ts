import encryption from "../util/encrypt";
import fs from "fs";
import chalk from "chalk";
import u from "./util";
import _logger from "clear-logger";
const logger = _logger.customName("QCERT");

export default async function decrypt(args: Record<string, any>) {
  u.checkConfig(args);
  const config = u.config.get(args.config);
  const privkey = u.keyResolver(args.key, args.keyfile);

  Object.entries(config).map(([key, value]) => {
    const decryptedValue = u.encrypt.decrypt(value, privkey);
    try {
      fs.writeFileSync(key, decryptedValue);
    } catch (e) {
      logger.error(e);
      logger.warn(`Skipping ${key}...`);
    }
  });

  u.config.set(args.config, config);

  console.log(`${chalk.green(`✔`)} Successfully decrypted credentials.`);
}
