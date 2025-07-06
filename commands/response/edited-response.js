import { setTimeout as wait } from "node:timers/promises";
import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("edited-response")
  .setDescription(
    "Replies with timestamp initially and then changes it with new timestamp after a short wait."
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `The server time is ${new Date().toString()}`,
    flags: MessageFlags.Ephemeral,
  });
  await wait(2000);
  // Note, the flags are not needed here since the reply is already ephemeral
  await interaction.editReply(
    `The server time changed to ${new Date().toString()}`
  );
}
