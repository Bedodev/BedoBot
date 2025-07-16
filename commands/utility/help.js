const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of available commands and their descriptions.'),
    async execute(interaction) {
        const commands = interaction.client.commands.map(cmd => {
            return `**/${cmd.data.name}**: ${cmd.data.description}`;
        }).join('\n');

        try {
            return interaction.reply({
                content: `Here are the available commands:\n${commands}`,
                flags: MessageFlags.Ephemeral
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'There was an error trying to fetch the commands.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};