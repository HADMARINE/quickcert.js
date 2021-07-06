import encryption from "../util/encrypt";
import fs from "fs";
import chalk from "chalk";
import u from "./util";

export default async function renewal(args: Record<string, any>) {
  u.checkConfig(args);

  const config = u.config.get(args.config);
  const privkey = u.keyResolver(args.key, args.keyfile);
  const result: Record<string, any> = {};

  Object.entries(config).forEach(([key, value]) => {
    result[key] = u.encrypt.encrypt(value, privkey);
  });

  u.config.set(args.config, result);

  console.log(`${chalk.green(`✔`)} Successfully encrypted credentials.`);
}
