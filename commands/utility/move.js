// Command to move a user/users to a different voice channel
const {SlashCommandBuilder, MessageFlags} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Move a user or users to a different voice channel.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to move')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to move the user to')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const channel = interaction.options.getChannel('channel');

        // Check if the channel is a voice channel
        if (!channel.isVoiceBased()) {
            return interaction.reply({
                content: 'The specified channel is not a voice channel.',
                flags: MessageFlags.Ephemeral
            });
        }

        // Get the member from the user
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply({
                content: 'The specified user is not a member of this server.',
                flags: MessageFlags.Ephemeral
            });
        }

        // Move the member to the specified voice channel
        try {
            await member.voice.setChannel(channel);
            return interaction.reply({
                content: `Successfully moved ${user.username} to ${channel.name}.`,
                flags: MessageFlags.Ephemeral
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'There was an error trying to move the user.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
