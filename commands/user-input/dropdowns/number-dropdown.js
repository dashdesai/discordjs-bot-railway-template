import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("number-dropdown")
  .setDescription("Provides a choice of number input and replies with it.")
  .addNumberOption((option) =>
    option
      .setName("number")
      .setDescription("The input to echo back")
      .addChoices(
        { name: "Option 1", value: 1.1 },
        { name: "Option 2", value: 2.2 },
        { name: "Option 3", value: 3.3 }
      )
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getNumber("number") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
