import fs from "fs";
import os from "os";
import path from "path";

type Config = {
  dbUrl: string,
  currentUserName: string
};

export function setUser(username: string) {
  const cfg = readConfig();
  cfg.currentUserName = username;
  writeConfig(cfg);
}

function getConfigFilePath() {
  const configFile = ".gatorconfig.json";
  return path.join(os.homedir(), configFile);
}

function writeConfig(cfg: Config) {
  const FullPathCfg = getConfigFilePath();
  const rawConfig = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };
  const data = JSON.stringify(rawConfig, null, 2);
  fs.writeFileSync(FullPathCfg, data, { encoding: "utf-8" });
}

export function readConfig() {
  const jsonConfig = fs.readFileSync(getConfigFilePath(), {
    encoding: "utf-8",
  });
  const rawConfig = JSON.parse(jsonConfig);
  return validateConfig(rawConfig);
}

function validateConfig(rawConfig: any) {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("db_url is required in config file");
  }
  if (
    !rawConfig.current_user_name ||
    typeof rawConfig.current_user_name !== "string"
  ) {
    throw new Error("current_user_name is required in config file");
  }
  const config: Config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name
  };
  return config;
}
