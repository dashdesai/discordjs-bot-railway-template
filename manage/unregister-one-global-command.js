import "dotenv/config";
import { REST, Routes } from "discord.js";

const { APPLICATION_ID, DISCORD_TOKEN } = process.env;

const rest = new REST().setToken(DISCORD_TOKEN);

const commandSnowflake = process.argv[2];

if (!commandSnowflake) {
  console.error("❌ Please specify a command snowflake as an argument");
  process.exit(1);
}

try {
  console.log(`Deleting global command '${commandSnowflake}'...`);
  await rest.delete(
    Routes.applicationCommand(APPLICATION_ID, commandSnowflake)
  );
  console.log(`✅ Command '${commandSnowflake}' deleted successfully`);
  const global = await rest.get(Routes.applicationCommands(APPLICATION_ID));
  console.log("Global commands:", global);
} catch (error) {
  console.error(error);
}
