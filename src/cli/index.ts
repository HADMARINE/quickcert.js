#!/usr/bin/env node

import yargs from "yargs";
import define from "../define";
import init from "./init";
import renewal from "./renewal";
import decrypt from "./decrypt";
import encrypt from "./encrypt";
import u from "./util";

const w = u.wrapFunction;

const command: Record<string, any> = yargs
  .usage(
    "Usage: yarn quickcert [command] <params>\nWhen encrypt/decrypt, you must provide key by string or file. default root is " +
    define.defaultDirectory.key
  )
  .command(
    "renewal",
    "Renewals registered credentials.",
    {
      config: {
        alias: ["c", "cfg"],
        default: define.defaultDirectory.config,
        describe: "Custom config file root",
      },
      key: {
        alias: ["k"],
        default: null,
        describe: "Private key of encryption",
      },
      keyfile: {
        alias: ["f", "kf"],
        default: define.defaultDirectory.key,
        describe: "Custom private key file root",
      },
    },
    async (args) => (await w(renewal, "Failed to execute command."))(args)
  )
  .command(
    "decrypt",
    "Decrypt credentials",
    {
      config: {
        alias: ["c", "cfg"],
        default: define.defaultDirectory.config,
        describe: "Custom config file root",
      },
      key: {
        alias: ["k"],
        default: null,
        describe: "Private key of encryption",
      },
      keyfile: {
        alias: ["f", "kf"],
        default: define.defaultDirectory.key,
        describe: "Private key file root",
      },
    },
    async (args) => (await w(decrypt, "Failed to execute command."))(args)
  )
  .command(
    "init",
    "Initialize config file",
    {
      config: {
        alias: ["cfg"],
        default: define.defaultDirectory.config,
        describe: "Custom config file root",
      },
    },
    async (args) => (await w(init, "Failed to execute command."))(args)
  )
  .command(
    "encrypt <filePath>",
    "Encrypts new ceritificate /  credentials",
    (yargs) => {
      yargs.positional('filePath', {
        describe: "directory of file",
        demandOption: true
      }).option('config', {
        alias: ['cfg'],
        describe: "Custom config file root",
        default: define.defaultDirectory.config
      }).option('key', {
        alias: ['k'],
        default: null,
        describe: "Private string key of encryption"
      }).option('keyfile', {
        alias: ['f', 'kf'],
        default: define.defaultDirectory.key,
        describe: "Private key file root"
      })
    },
    async (argv) => (await w(encrypt, "Failed to execute command."))(argv)
  )
  .help("help")
  .recommendCommands()
  .strictCommands()
  .demandCommand(1, 1, "Hey there. What do you want?", "One at a time!").argv;
