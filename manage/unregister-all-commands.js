import "dotenv/config";
import { REST, Routes } from "discord.js";

const { APPLICATION_ID, GUILD_ID, DISCORD_TOKEN } = process.env;

const rest = new REST().setToken(DISCORD_TOKEN);

try {
  // Clear global commands
  console.log("Clearing global commands...");
  await rest.put(Routes.applicationCommands(APPLICATION_ID), { body: [] });

  // Clear guild commands
  console.log("Clearing guild commands...");
  await rest.put(Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID), {
    body: [],
  });
} catch (error) {
  console.error(error);
}
