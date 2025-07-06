import "dotenv/config";
import { REST, Routes } from "discord.js";

const { APPLICATION_ID, GUILD_ID, DISCORD_TOKEN } = process.env;

const rest = new REST().setToken(DISCORD_TOKEN);

try {
  // Log the current global and guild commands
  console.log("Fetching existing commands...");
  const global = await rest.get(Routes.applicationCommands(APPLICATION_ID));
  console.log("Global commands:", global);

  // Fetch guild commands
  console.log(`Fetching commands for guild ${GUILD_ID}...`);
  const guild = await rest.get(
    Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID)
  );
  console.log("Guild commands:", guild);
} catch (error) {
  console.error(error);
}
