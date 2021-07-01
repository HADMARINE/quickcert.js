#!/usr/bin/env node

import yargs from "yargs";
import define from "../define";
import init from "./init";
import encrypt from "./encrypt";
import decrypt from "./decrypt";
import register from "./register";

const command: Record<string, any> = yargs
  .usage(
    "Usage: yarn quickcert [encrypt|decrypt|...] <params>\nWhen encrypt/decrypt, you must provide key by string or file. default root is " +
      define.defaultDirectory.key
  )
  .command(
    "encrypt",
    "Encrypts certificates.",
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
    (args) => encrypt(args)
  )
  .command(
    "decrypt",
    "Decrypt certificates",
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
    (args) => decrypt(args)
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
    (args) => init(args)
  )
  .command(
    "register",
    "Register new ceritificate / private key",
    {
      directory: {
        alias: ["d", "dir"],
        require: true,
      },
      config: {
        alias: ["cfg"],
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
    (argv) => register(argv)
  )
  .help("help")
  .recommendCommands()
  .strictCommands()
  .demandCommand(1, 1, "Hey there. What do you want?", "One at a time!").argv;
