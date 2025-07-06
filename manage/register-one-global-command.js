// For registering a single command with Discord's API in the global scope,
// which includes the bot scope
import "dotenv/config";
import { REST, Routes } from "discord.js";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { APPLICATION_ID, DISCORD_TOKEN } = process.env;

const commandName = process.argv[2];

if (!commandName) {
  console.error(
    "❌ Please specify a command name (e.g. npm run register-one-command -- my-command)"
  );
  process.exit(1);
}

// Recursively locate the command file
function findCommandFile(dir, targetFile) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      const result = findCommandFile(fullPath, targetFile);
      if (result) return result;
    } else if (entry === `${targetFile}.js`) {
      return fullPath;
    }
  }

  return null;
}

const commandFilePath = findCommandFile(
  path.join(__dirname, "..", "commands"),
  commandName
);

if (!commandFilePath) {
  console.error(`❌ Command file '${commandName}.js' not found in /commands`);
  process.exit(1);
}

const command = await import(`file://${commandFilePath}`);
if (!("data" in command && "execute" in command)) {
  console.error(
    `❌ Command at ${commandFilePath} is missing "data" or "execute"`
  );
  process.exit(1);
}

const rest = new REST().setToken(DISCORD_TOKEN);

try {
  console.log(`Registering command '${commandName}'...`);

  const data = await rest.post(Routes.applicationCommands(APPLICATION_ID), {
    body: command.data.toJSON(),
  });

  console.log(`✅ Successfully registered '${commandName}' command.`);
} catch (error) {
  console.error(error);
}
