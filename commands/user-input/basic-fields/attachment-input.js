import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("attachment-input")
  .setDescription("Takes an attachment input and replies with it.")
  .addAttachmentOption((option) =>
    option.setName("attachment").setDescription("The attachment to echo back")
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n>>> ${
      interaction.options.getAttachment("attachment").name ?? "Nothing!!!"
    }\n${interaction.options.getAttachment("attachment").contentType || ""}\n${
      interaction.options.getAttachment("attachment").url
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
