import "dotenv/config";
import { REST, Routes } from "discord.js";

const { APPLICATION_ID, GUILD_ID, DISCORD_TOKEN } = process.env;

const rest = new REST().setToken(DISCORD_TOKEN);

const commandSnowflake = process.argv[2];

if (!commandSnowflake) {
  console.error("❌ Please specify a command snowflake as an argument");
  process.exit(1);
}

try {
  console.log(`Deleting guild command '${commandSnowflake}'...`);
  await rest.delete(
    Routes.applicationGuildCommand(APPLICATION_ID, GUILD_ID, commandSnowflake)
  );
  console.log(`✅ Command '${commandSnowflake}' deleted successfully`);
  const guild = await rest.get(
    Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID)
  );
  console.log("Guild commands:", guild);
} catch (error) {
  console.error(error);
}
