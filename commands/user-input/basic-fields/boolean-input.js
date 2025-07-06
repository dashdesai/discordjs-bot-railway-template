import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("boolean-input")
  .setDescription("Takes a boolean input and replies with it.")
  .addBooleanOption((option) =>
    option.setName("boolean").setDescription("The input to echo back")
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getBoolean("boolean") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
