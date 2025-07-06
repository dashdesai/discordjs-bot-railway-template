import { setTimeout as wait } from "node:timers/promises";
import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("delete-response")
  .setDescription(
    "Replies with timestamp and then deletes the message after a short wait."
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `The server time is ${new Date().toString()}.\nThis message will be deleted in 2 seconds.`,
    flags: MessageFlags.Ephemeral,
  });
  await wait(2000);
  await interaction.deleteReply();
}
