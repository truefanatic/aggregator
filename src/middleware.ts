import { readConfig } from "./config";
import { getUser, getUserById } from "./lib/db/queries/users";
import type { UserCommandHandler, CommandHandler } from "./commands/commands.ts";

export function middlewareLoggedIn(
  handler: UserCommandHandler
): CommandHandler {
  return async (cmdName: string, ...args: string[]): Promise<void> => {
    const config = readConfig();
    const userName = config.currentUserName;
    if (!userName) {
      throw new Error(`User ${config.currentUserName} not found`);
    }
    const user = await getUser(userName);
    if (!user) {
      throw new Error(`User ${userName} not found`);
    }

    await handler(cmdName, user, ...args);
  };
}