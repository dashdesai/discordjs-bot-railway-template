import "dotenv/config";

export function getMessageURL(channelId, messageId) {
  return `https://discord.com/channels/${process.env.GUILD_ID}/${channelId}/${messageId}`;
}
