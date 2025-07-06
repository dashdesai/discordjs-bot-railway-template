import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("string-length-check")
  .setDescription("Checks the length of a string input.")
  .addStringOption((option) =>
    option
      .setName("string")
      .setDescription("The input to echo back")
      .setMinLength(5)
      .setMaxLength(20)
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getString("string") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
