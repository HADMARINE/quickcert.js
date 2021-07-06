import chalk from "chalk";
import u from "./util";

export default async function _delete(args: Record<string, any>) {
    await u.checkConfig(args);

    const config = u.config.get(args.config);
    const privkey = u.keyResolver(args.key, args.keyfile);
    const result: Record<string, any> = {};

    let deletedFlag = false;

    Object.entries(config).forEach(([key, value]) => {
        if (args.filePath === key) {
            deletedFlag = true;
            return;
        }
        result[key] = u.encrypt.encrypt(value, privkey);
    });

    if (!deletedFlag) {
        console.log(`${chalk.red(`✘`)} Couldn't find ${args.filePath} from config.`);

        return;
    }

    u.config.set(args.config, result);

    console.log(`${chalk.green(`✔`)} Successfully removed ${args.filePath} from config.`);
}
