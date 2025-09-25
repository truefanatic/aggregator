import { readConfig, setUser } from "../config.js";
import { createUser, getUser, truncateTable, getUsers } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const username = args[0];
  const dbUser = await getUser(username);
  if (!dbUser || dbUser.name !== username) {
    throw new Error("User doesn't exists.");
  }

  setUser(username);
  console.log(`User "${username}" switched.`);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const username = args[0];
  const dbUser = await getUser(username);
  if (dbUser && dbUser.name === username) {
    throw new Error("User already exists.");
  }
  const newUser = await createUser(username);
  setUser(username);
  console.log(`User "${username}" registered.`);
  console.log(await getUser(username));
}

export async function handlerReset(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName}`);
  }
  await truncateTable();
}

export async function handlerUsers(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName}`);
  }
  const users = await getUsers();
  users.forEach(user => (user.name === readConfig().currentUserName) ? console.log(` * ${user.name} (current)`) : console.log(` * ${user.name}`));
}