import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("integer-input")
  .setDescription("Takes an integer input and replies with it.")
  .addIntegerOption((option) =>
    option.setName("integer").setDescription("The input to echo back")
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getInteger("integer") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
