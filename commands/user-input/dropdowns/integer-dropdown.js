import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("integer-dropdown")
  .setDescription("Provides a choice of integer input and replies with it.")
  .addIntegerOption((option) =>
    option
      .setName("integer")
      .setDescription("The input to echo back")
      .addChoices(
        { name: "Option 1", value: 1 },
        { name: "Option 2", value: 2 },
        { name: "Option 3", value: 3 }
      )
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getInteger("integer") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
