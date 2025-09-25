import { db } from "..";
import { users } from "../schema/schema";
import { sql, eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
  const [result] = await db
    .select()
    .from(users)
    .where(sql`${users.name} = ${name}`);
  return result;
}

export async function getUserById(id: string) {
  const [result] = await db.select().from(users).where(eq(users.id, id));
  return result;
}

export async function getUsers() {
  const result = await db.select().from(users).orderBy(users.name);
  return result;
}

export async function truncateTable() {
  const tbl = "users";
  const allowedTables = ["users"];
  if (!allowedTables.includes(tbl)) {
    throw new Error(`Invalid table name: ${tbl}`);
  }
  const [result] = await db.execute(
    sql.raw(`TRUNCATE TABLE "${tbl}" CASCADE;`)
  );
  console.log(`Table '${tbl}' truncated successfully.`);
  return result;
}