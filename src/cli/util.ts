import fs from 'fs';
import _logger from 'clear-logger';
import encrypt from '../util/encrypt';
import chalk from 'chalk';
import prompts from 'prompts';
import { initConfig, initKey } from './init';
import define from '../define';
const logger = _logger.customName('quickcert');

function resolveConfig(root: string): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(root).toString());
  } catch (e) {
    throw e;
  }
}

function saveConfig(root: string, data: Record<string, any>): void {
  try {
    fs.writeFileSync(root, JSON.stringify(data));
  } catch (e) {
    throw e;
  }
}

async function keyResolver(keyValue: any, keyRoot: string): Promise<string> {
  if (keyValue) {
    return keyValue;
  } else if (keyRoot) {
    await initKey();
    try {
      return fs.readFileSync(keyRoot).toString();
    } catch (e: any) {
      if (e.errno === -4058) {
        throw new Error(`Key not found at ${keyRoot}`);
      }
      throw e;
    }
  } else {
    throw new Error('No key provided!');
  }
}

async function appendPreciseStringOnFileIfExists(
  filePath: string,
  string: string,
) {
  if (!fs.existsSync(filePath)) {
    console.log(`${chalk.cyan(`!`)} File "${filePath}" doesn't exists.`);
    const result = (
      await prompts({
        type: 'confirm',
        name: 'value',
        message: 'Do you want to create?',
      })
    ).value;

    if (result) {
      fs.closeSync(fs.openSync(filePath, 'wx'));
    } else {
      return;
    }
  }
  if (
    fs
      .readFileSync(filePath)
      .toString()
      .replace(' ', '')
      .split('\n')
      .indexOf(string) === -1
  ) {
    fs.appendFileSync(filePath, `\n${string}`);
    console.log(`${chalk.green(`✔`)} Added ${string} to ${filePath}`);
  }
}

async function wrapFunction<T>(func: T, errorMessage: string): Promise<T> {
  return async function (...args: any[]) {
    try {
      await (func as unknown as Function)(...args);
    } catch (e) {
      logger.error(`${errorMessage} : ${(e as Error).message || e}`);
      process.exit(1);
    }
  } as unknown as T;
}

async function checkConfig(args: Record<string, any>) {
  if (!fs.existsSync(args.config)) {
    if (args.config !== define.defaultDirectory.config) {
      throw new Error('No config file at ' + args.config);
    }
    console.log(`${chalk.cyan(`!`)} Config file doesn't exists!`);
    const result = (
      await prompts({
        type: 'confirm',
        name: 'value',
        message: 'Do you want to initialize?',
      })
    ).value;
    if (result) {
      await initConfig(args.config);
    } else {
      throw new Error('No config file');
    }
  }
}

export default {
  config: {
    set: saveConfig,
    get: resolveConfig,
  },
  keyResolver,
  encrypt,
  appendPreciseStringOnFileIfExists,
  wrapFunction,
  checkConfig,
};
