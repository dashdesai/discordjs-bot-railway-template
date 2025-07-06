import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("string-dropdown")
  .setDescription("Provides a choice of string input and replies with it.")
  .addStringOption((option) =>
    option
      .setName("string")
      .setDescription("The input to echo back")
      .addChoices(
        { name: "Option 1", value: "option1" },
        { name: "Option 2", value: "option2" },
        { name: "Option 3", value: "option3" }
      )
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getString("string") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
