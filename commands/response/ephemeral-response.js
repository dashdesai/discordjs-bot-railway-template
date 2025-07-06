import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ephemeral-response")
  .setDescription("Replies with timestamp as an ephemeral message.");

export async function execute(interaction) {
  await interaction.reply({
    content: `The server time is ${new Date().toString()}`,
    flags: MessageFlags.Ephemeral,
  });
}
