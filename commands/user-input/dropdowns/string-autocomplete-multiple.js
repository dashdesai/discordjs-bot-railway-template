import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("string-autocomplete-multiple")
  .setDescription(
    "Provides multiple searchable choice of string input and replies with it."
  )
  .addStringOption((option) =>
    option
      .setName("string")
      .setDescription("The input to echo back")
      .setAutocomplete(true)
  )
  .addStringOption((option) =>
    option
      .setName("version")
      .setDescription("Version to search in")
      .setAutocomplete(true)
  );

export async function autocomplete(interaction) {
  const focusedOption = interaction.options.getFocused(true);
  let choices;
  if (focusedOption.name === "string") {
    choices = [
      "Popular Topics: Threads",
      "Sharding: Getting started",
      "Library: Voice Connections",
      "Interactions: Replying to slash commands",
      "Popular Topics: Embed preview",
    ];
  }

  if (focusedOption.name === "version") {
    choices = ["v9", "v11", "v12", "v13", "v14"];
  }
  const filtered = choices.filter((choice) =>
    choice.toLowerCase().startsWith(focusedOption.value.toLowerCase())
  );
  await interaction.respond(
    filtered.map((choice) => ({ name: choice, value: choice }))
  );
}

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> String:${
      interaction.options.getString("string") ?? "Nothing!!!"
    }\n> Version: ${interaction.options.getString("version") ?? "Nothing!!!"}`,
    flags: MessageFlags.Ephemeral,
  });
}
