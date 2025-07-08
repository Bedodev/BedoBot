const { SlashCommandBuilder, MessageFlags } = require(`discord.js`);
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`leave`)
        .setDescription(`Leaves the voice channel you are currently in.`),
    async execute(interaction) {
        const user = interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        const targetGuild = interaction.guild;
        const voiceChannel = member.voice.channel;
        const vid = voiceChannel.id;
        if (!vid) {
            return interaction.reply({
                content: `You need to be in a voice channel to use this command!`,
                flags: MessageFlags.Ephemeral
            });
        }

        try {
            const connection = getVoiceConnection(targetGuild.id);
            if (!connection) {
                return interaction.reply({
                    content: `I am not connected to a voice channel!`,
                    flags: MessageFlags.Ephemeral
                });
            } else if (connection.joinConfig.channelId !== vid) {
                return interaction.reply({
                    content: `You are not in the same voice channel as me!`,
                    flags: MessageFlags.Ephemeral
                });
            } else {
                connection.destroy();
                await interaction.reply({
                    content: `Joined ${voiceChannel.name}!`,
                    flags: MessageFlags.Ephemeral
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: `Failed to leave voice channel.`,
                flags: MessageFlags.Ephemeral
            });
        }
    },
};