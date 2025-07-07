const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`leave`)
        .setDescription(`Leaves the voice channel you are currently in.`),
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({ content: `You need to be in a voice channel to use this command!`, ephemeral: true });
        }

        try {
            await voiceChannel.leave();
            await interaction.reply({ content: `Left ${voiceChannel.name}!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `Failed to leave the voice channel.`, ephemeral: true });
        }
    },
};