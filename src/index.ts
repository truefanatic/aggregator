import {
  type CommandsRegistry,
  registerCommand,
  runCommand 
} from "./commands.js";
import { handlerLogin } from "./users.js";

function main() {
  if (process.argv.length < 3) {
    console.log("usage: cli <command> [args...]");
    process.exit(1);
  }
  const cmdName = process.argv[2];
  const args = process.argv.slice(3);
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  try{
    runCommand(registry, cmdName, ...args);
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error running command ${cmdName}: ${e.message}`);
    } else {
      console.error(`Unknown error running command ${cmdName}: ${e}`);
    }
    process.exit(1);
  }
}

main();
