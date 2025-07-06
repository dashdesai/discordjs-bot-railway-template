import {
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("permission-multiple")
  .setDescription(
    "Only accessible to users with all of the manage permissions."
  )
  .addStringOption((option) =>
    option.setName("string").setDescription("The input to echo back")
  )
  .setDefaultMemberPermissions(
    PermissionFlagsBits.ManageChannels |
      PermissionFlagsBits.ManageEvents |
      PermissionFlagsBits.ManageGuild |
      PermissionFlagsBits.ManageGuildExpressions |
      PermissionFlagsBits.ManageMessages |
      PermissionFlagsBits.ManageNicknames |
      PermissionFlagsBits.ManageRoles |
      PermissionFlagsBits.ManageThreads |
      PermissionFlagsBits.ManageWebhooks
  );

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getString("string") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
