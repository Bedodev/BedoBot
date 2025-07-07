const { SlashCommandBuilder, MessageFlags } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`join`)
        .setDescription(`Joins the voice channel you are currently in.`),
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({ content: `You need to be in a voice channel to use this command!`, ephemeral: true });
        }

        try {
            await interaction.guild.members.me.voice.setChannel(voiceChannel);
            await interaction.reply({ content: `Joined ${voiceChannel.name}!`, flags: MessageFlags.Ephemeral });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `Failed to join voice channel.`, flags: MessageFlags.Ephemeral });
        }
    },
};