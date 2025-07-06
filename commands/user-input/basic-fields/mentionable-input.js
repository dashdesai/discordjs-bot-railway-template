import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("mentionable-input")
  .setDescription("Takes a mentionable input and returns a link to it.")
  .addMentionableOption((option) =>
    option.setName("mentionable").setDescription("The mentionable to link")
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getMentionable("mentionable") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
