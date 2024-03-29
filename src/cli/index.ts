#!/usr/bin/env node

import yargs from 'yargs';
import define from '../define';
import init from './init';
import renew from './renew';
import decrypt from './decrypt';
import encrypt from './encrypt';
import _delete from './delete';
import u from './util';

const w = u.wrapFunction;

const command: Record<string, any> = yargs
  .scriptName('quickcert')
  .usage(
    'Usage: yarn quickcert [command] <params>\nWhen encrypt/decrypt, you must provide key by string or file. default root is ' +
      define.defaultDirectory.key,
  )
  .command(
    'renew',
    'Re-register and update registered credentials.',
    {
      config: {
        alias: ['c', 'cfg'],
        default: define.defaultDirectory.config,
        type: 'string',
        describe: 'Custom config file root',
      },
      key: {
        alias: ['k'],
        default: null,
        type: 'string',
        describe: 'Private key of encryption',
      },
      keyfile: {
        alias: ['kf'],
        default: define.defaultDirectory.key,
        type: 'string',
        describe: 'Custom private key file root',
      },
    },
    async (args) => (await w(renew, 'Failed to execute command'))(args),
  )
  .command(
    'decrypt [filePath..]',
    'Decrypt credentials',
    (yargs) => {
      yargs
        .positional('filePath', {
          describe:
            "directory of file. if you don't provide, decrypt all files.",
        })
        .option('config', {
          alias: ['cfg'],
          describe: 'Custom config file root',
          default: define.defaultDirectory.config,
          type: 'string',
        })
        .option('key', {
          alias: ['k'],
          default: null,
          type: 'string',
          describe: 'Private string key of encryption',
        })
        .option('keyfile', {
          alias: ['kf'],
          default: define.defaultDirectory.key,
          type: 'string',
          describe: 'Private key file root',
        });
    },
    async (args) => (await w(decrypt, 'Failed to execute command'))(args),
  )
  .command(
    'init',
    'Initialize config file',
    {
      config: {
        alias: ['cfg'],
        default: define.defaultDirectory.config,
        type: 'string',
        describe: 'Custom config file root',
      },
    },
    async (args) => (await w(init, 'Failed to execute command'))(args),
  )
  .command(
    'encrypt <filePath..>',
    'Encrypts new ceritificate / credentials',
    (yargs) => {
      yargs
        .positional('filePath', {
          describe: 'directory of file',
          demandOption: true,
        })
        .option('config', {
          alias: ['cfg'],
          describe: 'Custom config file root',
          type: 'string',
          default: define.defaultDirectory.config,
        })
        .option('key', {
          alias: ['k'],
          default: null,
          type: 'string',
          describe: 'Private string key of encryption',
        })
        .option('keyfile', {
          alias: ['kf'],
          default: define.defaultDirectory.key,
          type: 'string',
          describe: 'Private key file root',
        });
    },
    async (argv) => (await w(encrypt, 'Failed to execute command'))(argv),
  )
  .command(
    'delete <filePath>',
    'Unregister credentials from configuration',
    (yargs) => {
      yargs
        .positional('filePath', {
          describe: 'directory of file',
          type: 'string',
          demandOption: true,
        })
        .option('config', {
          alias: ['cfg'],
          describe: 'Custom config file root',
          type: 'string',
          default: define.defaultDirectory.config,
        })
        .option('key', {
          alias: ['k'],
          default: null,
          describe: 'Private string key of encryption',
          type: 'string',
        })
        .option('keyfile', {
          alias: ['kf'],
          default: define.defaultDirectory.key,
          type: 'string',
          describe: 'Private key file root',
        });
    },
    async (argv) => (await w(_delete, 'Failed to execute command'))(argv),
  )
  .help('help')
  .recommendCommands()
  .strictCommands()
  .demandCommand(1, 1, 'Hey there. What do you want?', 'One at a time!').argv;
