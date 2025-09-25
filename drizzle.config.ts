import { readConfig } from "./src/config.ts";
import { defineConfig } from "drizzle-kit";


export default defineConfig({
  schema: "src/lib/db/schema",
  out: "src/lib/db/out",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfig().dbUrl
  },
});