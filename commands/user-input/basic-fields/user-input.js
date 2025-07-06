import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("user-input")
  .setDescription("Takes a user input and returns a link to it.")
  .addUserOption((option) =>
    option.setName("user").setDescription("The user to link")
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getUser("user") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
