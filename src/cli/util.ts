import fs from "fs";
import _logger from "clear-logger";
import encrypt from "../util/encrypt";
const logger = _logger.customName("QCERT");

function resolveConfig(root: string): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(root).toString());
  } catch (e) {
    throw logger.error(e);
  }
}

function saveConfig(root: string, data: Record<string, any>): void {
  try {
    fs.writeFileSync(root, JSON.stringify(data));
  } catch (e) {
    logger.error(e);
  }
}

function keyResolver(keyValue: any, keyRoot: string): string {
  if (keyValue) {
    return keyValue;
  } else if (keyRoot) {
    try {
      return fs.readFileSync(keyRoot).toString();
    } catch (e) {
      throw e;
    }
  } else {
    throw new Error("No key provided!");
  }
}

export default {
  config: {
    set: saveConfig,
    get: resolveConfig,
  },
  keyResolver,
  encrypt,
};
