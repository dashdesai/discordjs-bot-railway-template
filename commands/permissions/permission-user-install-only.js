import {
  InteractionContextType,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

// IMPORTANT:
// This command can only be used in a private and group DMs.
// It cannot be used in guilds or bot DMs.
// It is only meaningful in user installed bots.
// This therefore rquires the command to be registered globally.
// Public bots can be installed by others on their servers
// so care must be taken to ensure the command is safe to use.
export const data = new SlashCommandBuilder()
  .setName("permission-user-install-only")
  .setDescription("This command can only be used in a private channel.")
  .addStringOption((option) =>
    option.setName("string").setDescription("The input to echo back")
  )
  .setContexts(InteractionContextType.PrivateChannel);

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getString("string") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
