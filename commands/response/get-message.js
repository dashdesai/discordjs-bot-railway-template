import { SlashCommandBuilder } from "discord.js";
import { getMessageURL } from "../../lib/urls.js";

export const data = new SlashCommandBuilder()
  .setName("get-message")
  .setDescription("Gets access to Message object after sending response.");

export async function execute(interaction) {
  const response = await interaction.reply({
    content: `The server time is ${new Date().toString()}`,
    withResponse: true,
  });
  // console.log("Response:", response);
  await interaction.followUp(
    `Message Link: ${getMessageURL(
      response.resource.message.channelId,
      response.resource.message.id
    )}`
  );
}
