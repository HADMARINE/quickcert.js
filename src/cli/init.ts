import _logger from 'clear-logger';
import fs from 'fs';
import prompts from 'prompts';
import define from '../define';
import chalk from 'chalk';
import u from './util';

const logger = _logger.customName('quickcert');

export default async function init(args: Record<string, any>) {
  const fileroot = args.config;

  await initConfig(fileroot);
  await initKey();
}

export async function initConfig(fileroot: string) {
  if (!fs.existsSync(fileroot)) {
    fs.writeFileSync(fileroot, JSON.stringify(define.configContent));
    console.log(
      `${chalk.green(`✔`)} Config created successfully at ${fileroot}`,
    );
  }
}

export async function initKey() {
  if (!fs.existsSync(define.defaultDirectory.key)) {
    console.log(`${chalk.cyan(`?`)} You seem to not having private key file.`);
    const result = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Do you want to create?',
    });
    if (result.value) {
      const password = await prompts({
        type: 'password',
        name: 'value',
        message: 'Please input your password.',
      });
      const credentialRoot = define.defaultDirectory.key;
      try {
        fs.writeFileSync(credentialRoot, password.value);
        console.log(
          `${chalk.green(
            `✔`,
          )} Credential created successfully at ${credentialRoot}`,
        );
      } catch (e) {
        logger.error(e as string);
      }

      await u.appendPreciseStringOnFileIfExists('.gitignore', credentialRoot);
    }
  }
}
