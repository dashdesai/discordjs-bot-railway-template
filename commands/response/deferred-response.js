import { setTimeout as wait } from "node:timers/promises";
import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("deferred-response")
  .setDescription(
    "Pauses for a bit and then replies with timestamp as a deferred message."
  );

export async function execute(interaction) {
  await interaction.deferReply({
    flags: MessageFlags.Ephemeral,
  });
  await wait(2000);
  await interaction.editReply(`The server time is ${new Date().toString()}`);
}
