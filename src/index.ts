import {
  type CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands.js";
import {
  handlerLogin,
  handlerRegister,
  handlerReset,
  handlerUsers,
} from "./commands/users.js";
import { handlerAgg } from "./commands/aggregate";
import { handlerAddFeed, handlerFeeds } from "./commands/feeds";
import { handlerFollow, handlerUnfollow, handlerFollowing } from "./commands/feed-follows";
import { middlewareLoggedIn } from "./middleware";

async function main() {
  if (process.argv.length < 3) {
    console.log("usage: cli <command> [args...]; help - for help");
    process.exit(1);
  }
  const cmdName = process.argv[2];
  const args = process.argv.slice(3);
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "help", handlerPrintHelp);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "feeds", handlerFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));

  async function handlerPrintHelp(cmdName: string, ...args: string[]) {
    if (args.length !== 0) {
      throw new Error(`usage: ${cmdName}`);
    }
    console.log("Commands: ");
    for (const key of Object.keys(registry)) {
      console.log(` - ${key}`);
    }
  }

  try {
    await runCommand(registry, cmdName, ...args);
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error running command ${cmdName}: ${e.message}`);
    } else {
      console.error(`Unknown error running command ${cmdName}: ${e}`);
    }
    process.exit(1);
  }
  process.exit(0);
}

await main();
