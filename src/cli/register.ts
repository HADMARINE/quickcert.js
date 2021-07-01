import fs from "fs";
import chalk from "chalk";
import u from "./util";

export default function register(args: Record<string, any>) {
  const config = u.config.get(args.config);
  const privkey = u.keyResolver(args.key, args.keyfile);
  const loc = args.dir;

  try {
    const file = fs.readFileSync(loc).toString();
    config[loc] = u.encrypt.encrypt(file, privkey);
  } catch (e) {
    throw e;
  }

  u.appendPreciseStringOnFileIfExists(".gitignore", loc);

  u.config.set(args.config, config);

  console.log(`${chalk.green(`✔`)} Successfully added credentials.`);
}
