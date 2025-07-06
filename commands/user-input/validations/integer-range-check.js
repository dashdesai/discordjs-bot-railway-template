import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("integer-range-check")
  .setDescription("Checks if an integer is within a specific range.")
  .addIntegerOption((option) =>
    option
      .setName("integer")
      .setDescription("The input to check")
      .setMinValue(1)
      .setMaxValue(100)
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getInteger("integer") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
