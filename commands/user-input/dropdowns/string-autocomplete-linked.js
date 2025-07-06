import { MessageFlags, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("string-autocomplete-linked")
  .setDescription(
    "Provides linked items based on chosen type and replies with it."
  )
  .addStringOption((option) =>
    option
      .setName("type")
      .setDescription("Choose a type to get items from")
      .setRequired(true)
      .addChoices(
        { name: "Trees", value: "trees" },
        { name: "Animals", value: "animals" },
        { name: "Mountains", value: "mountains" }
      )
  )
  .addStringOption((option) =>
    option
      .setName("item")
      .setDescription("List of items within your choice")
      .setAutocomplete(true)
  );

// IMPORTANT:
// Discord does not clean up autocomplete options if the type is changed after selecting it.
// This means if a user selects "Trees" and then changes to "Animals",
// the autocomplete will still show tree options until the user types something new.
// To avoid this, it is important to validate the relationship in the execute function.
export async function autocomplete(interaction) {
  const focusedOption = interaction.options.getFocused(true);

  if (focusedOption.name !== "item") return;

  // Always pull the current value of "type" field
  const type = interaction.options.getString("type");

  if (!type) {
    await interaction.respond([
      { name: "Please select a type first", value: "none" },
    ]);
    return;
  }

  const value = focusedOption.value.toLowerCase();
  let choices = [];

  if (type === "trees") {
    choices = ["Oak", "Maple", "Pine", "Birch", "Cedar"];
  } else if (type === "animals") {
    choices = ["Elephant", "Lion", "Zebra", "Eagle", "Panda"];
  } else if (type === "mountains") {
    choices = ["Everest", "Kilimanjaro", "Denali", "Fuji", "Elbrus"];
  }

  const filtered = choices.filter((choice) =>
    choice.toLowerCase().startsWith(value)
  );

  await interaction.respond(
    filtered.map((choice) => ({ name: choice, value: choice }))
  );
}

export async function execute(interaction) {
  await interaction.reply({
    content: `You provided:\n> Type: ${
      interaction.options.getString("type") ?? "Nothing!!!"
    }\n> Item: ${interaction.options.getString("item") ?? "Nothing!!!"}`,
    flags: MessageFlags.Ephemeral,
  });
}
