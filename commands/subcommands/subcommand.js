import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("subcommand")
  .setDescription("Takes a string input and replies with it.")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("string")
      .setDescription("The input to echo back")
      .addStringOption((option) =>
        option.setName("input").setDescription("The string input")
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("integer")
      .setDescription("The input to echo back")
      .addIntegerOption((option) =>
        option.setName("input").setDescription("The integer input")
      )
  );

export async function execute(interaction) {
  const sub = interaction.options.getSubcommand();

  let value;
  if (sub === "string") {
    value = interaction.options.getString("input") ?? "Nothing!!!";
  } else if (sub === "integer") {
    value = interaction.options.getInteger("input") ?? "Nothing!!!";
  }

  await interaction.reply({
    content: `You provided:\n> ${value}`,
    flags: MessageFlags.Ephemeral,
  });
}
