import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("number-input")
  .setDescription("Takes a number input and replies with it.")
  .addNumberOption((option) =>
    option.setName("number").setDescription("The input to echo back")
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getNumber("number") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
