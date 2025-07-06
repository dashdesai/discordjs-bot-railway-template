import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("channel-input")
  .setDescription("Takes a channel input and returns a link to it.")
  .addChannelOption((option) =>
    option.setName("channel").setDescription("The channel to link")
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getChannel("channel") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
