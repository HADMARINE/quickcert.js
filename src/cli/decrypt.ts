import encryption from '../util/encrypt';
import fs from 'fs';
import chalk from 'chalk';
import u from './util';
import _logger from 'clear-logger';
const logger = _logger.customName('quickcert');

export default async function decrypt(args: Record<string, any>) {
  await u.checkConfig(args);
  const config = u.config.get(args.config);
  const privkey = await u.keyResolver(args.key, args.keyfile);
  const file = args.filePath as string[] | [null];

  if (file[0] !== null) {
    (file as string[]).forEach((filePath) => {
      if (!config[filePath]) {
        logger.error(`File ${filePath} is not registered.`);
        logger.warn(`Skipping ${filePath}...`);
        return;
      }
      const decryptedValue = u.encrypt.decrypt(config[filePath], privkey);
      try {
        fs.writeFileSync(filePath, decryptedValue);
      } catch (e) {
        logger.error(e as string);
        logger.warn(`Skipping ${filePath}...`);
      }
    });
  } else {
    Object.entries(config).forEach(([key, value]) => {
      const decryptedValue = u.encrypt.decrypt(value, privkey);
      try {
        fs.writeFileSync(key, decryptedValue);
      } catch (e) {
        logger.error(e as string);
        logger.warn(`Skipping ${key}...`);
      }
    });
  }

  console.log(`${chalk.green(`✔`)} Successfully decrypted credentials.`);
}
