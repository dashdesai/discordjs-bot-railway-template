import {
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("permission-admin")
  .setDescription("Only accessible to users with admin permissions.")
  .addStringOption((option) =>
    option.setName("string").setDescription("The input to echo back")
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getString("string") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
