import chalk from 'chalk';
import u from './util';
import fs from 'fs';

export default async function renewal(args: Record<string, any>) {
  await u.checkConfig(args);

  const config = u.config.get(args.config);
  const privkey = await u.keyResolver(args.key, args.keyfile);
  const result: Record<string, any> = {};

  Object.keys(config).forEach((key) => {
    result[key] = u.encrypt.encrypt(fs.readFileSync(key).toString(), privkey);
  });

  u.config.set(args.config, result);

  console.log(`${chalk.green(`✔`)} Successfully renewed credentials.`);
}
