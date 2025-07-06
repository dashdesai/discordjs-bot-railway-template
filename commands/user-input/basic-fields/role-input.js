import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("role-input")
  .setDescription("Takes a role input and returns a link to it.")
  .addRoleOption((option) =>
    option.setName("role").setDescription("The role to link")
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getRole("role") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
