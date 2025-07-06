import { setTimeout as wait } from "node:timers/promises";
import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("followup-response")
  .setDescription(
    "Replies with timestamp and then sends another message with a new timestamp after a short wait."
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `The server time is ${new Date().toString()}`,
    flags: MessageFlags.Ephemeral,
  });
  await wait(2000);
  await interaction.followUp({
    content: `The server time changed to ${new Date().toString()}`,
    flags: MessageFlags.Ephemeral,
  });
}
