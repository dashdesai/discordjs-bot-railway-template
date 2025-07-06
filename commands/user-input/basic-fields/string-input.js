import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("string-input")
  .setDescription("Takes a string input and replies with it.")
  .addStringOption((option) =>
    option.setName("string").setDescription("The input to echo back")
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getString("string") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
