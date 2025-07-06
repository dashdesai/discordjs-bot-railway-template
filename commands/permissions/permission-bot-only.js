import {
  InteractionContextType,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

// IMPORTANT:
// The command must be registered globally to work in DMs.
// This can only be done on public bots
// Public bots can be installed by others on their servers
// so care must be taken to ensure the command is safe to use.
// NOTE:
// Strange behaviour observed. Even with just the BotDM context set
// the command was availabe in guild after all commands were registered
// using the bulk register command. This is likely due to the
// put command being used. Also, the app was made private, so not
// sure if this causes it to ignore the BotDM context.
// Further work is needed to understand this better.
export const data = new SlashCommandBuilder()
  .setName("permission-bot-only")
  .setDescription("This command can only be used in a DM.")
  .addStringOption((option) =>
    option.setName("string").setDescription("The input to echo back")
  )
  .setContexts(InteractionContextType.BotDM);

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> ${
      interaction.options.getString("string") ?? "Nothing!!!"
    }`,
    flags: MessageFlags.Ephemeral,
  });
}
