const { SlashCommandBuilder, MessageFlags , Guild} = require(`discord.js`);
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`join`)
        .setDescription(`Joins the voice channel you are currently in.`),
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
            // TODO: Check if the bot is already in a voice channel
            const connection = joinVoiceChannel({
	            channelId: vid,
	            guildId: targetGuild.id,
	            adapterCreator: targetGuild.voiceAdapterCreator,
            });
            await interaction.reply({
                content: `Joined ${voiceChannel.name}!`,
                flags: MessageFlags.Ephemeral
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: `Failed to join voice channel.`,
                flags: MessageFlags.Ephemeral
            });
        }
    },
};