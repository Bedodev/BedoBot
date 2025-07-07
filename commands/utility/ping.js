const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Replies with Pong! and the average bot latency.`),
    async execute(interaction) {
        await interaction.reply(`Pong! Avg Latency: ${Math.round(interaction.client.ws.ping)} ms`);
    },
};