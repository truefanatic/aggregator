import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    "dbUrl": string,
    "currentUserName": string,
};

// Export a setUser function that writes a Config object to the JSON file
//  after setting the current_user_name field.
export function setUser(username: string) {
    // currentUserName = username;
    // Config object to JSON
};

// Export a readConfig function that reads the JSON file found at ~/.gatorconfig.json
//  and returns a Config object. It should read the file from the HOME directory,
//  then decode the JSON string into a new Config object.
export function readConfig () {
    // read ~/.gatorconfig.json
    // decode JSON to Config object
};

// getConfigFilePath(): string ;
// writeConfig(cfg: Config): void
// validateConfig(rawConfig: any): Config - used by readConfig to validate the result of JSON.parse.



