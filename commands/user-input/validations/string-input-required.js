import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("string-input-required")
  .setDescription("Takes a string input and replies with it.")
  .addStringOption((option) =>
    option
      .setName("string")
      .setDescription("The input to echo back")
      .setRequired(true)
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${interaction.options.getString("string")}`,
    flags: MessageFlags.Ephemeral,
  });
}
