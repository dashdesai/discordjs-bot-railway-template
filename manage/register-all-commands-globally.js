import "dotenv/config";
import { REST, Routes } from "discord.js";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { APPLICATION_ID, DISCORD_TOKEN } = process.env;

const commands = [];
const foldersPath = path.join(__dirname, "..", "commands");

/**
 * Recursively finds all .js command files in the given folder
 */
function getAllCommandFiles(dir) {
  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...getAllCommandFiles(fullPath));
    } else if (entry.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
}

const commandFiles = getAllCommandFiles(foldersPath);

for (const filePath of commandFiles) {
  const command = await import(`file://${filePath}`);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

const rest = new REST().setToken(DISCORD_TOKEN);

try {
  // Clear all global commands to avoid leaving renamed commands
  console.log("Clearing all global commands...");
  await rest.put(Routes.applicationCommands(APPLICATION_ID), {
    body: [],
  });

  console.log(
    `Registering ${commands.length} application (/) commands globally.`
  );

  const data = await rest.put(Routes.applicationCommands(APPLICATION_ID), {
    body: commands,
  });

  console.log(
    `Successfully registered ${data.length} application (/) commands globally.`
  );
} catch (error) {
  console.error(error);
}
