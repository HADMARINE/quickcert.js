import fs from 'fs';
import chalk from 'chalk';
import u from './util';
import prompts from 'prompts';

export default async function encrypt(args: Record<string, any>) {
  await u.checkConfig(args);

  const config = u.config.get(args.config);
  const privkey = await u.keyResolver(args.key, args.keyfile);
  const locs = args.filePath as string[];

  locs.forEach(async (loc) => {
    if (Object.keys(config).indexOf(loc) !== -1) {
      console.log(`${chalk.cyan(`!`)} File already exists.`);

      const response = await prompts({
        type: 'confirm',
        name: 'value',
        message: 'Do you want to overwrite?',
      });

      if (response.value) {
        delete config[loc];
      } else {
        console.log(`${chalk.red(`✘`)} Aborted.`);
        return;
      }
    }

    try {
      const file = fs.readFileSync(loc).toString();
      config[loc] = u.encrypt.encrypt(file, privkey);
    } catch (e) {
      throw e;
    }

    await u.appendPreciseStringOnFileIfExists('.gitignore', loc);
  });

  u.config.set(args.config, config);

  console.log(`${chalk.green(`✔`)} Successfully added credentials.`);
}
