const { SlashCommandBuilder, MessageFlags } = require(`discord.js`);

const limitLower = 1;
const limitUpper = 100;

// TODO: Add permision checks for manage messages

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`clear`)
        .setDescription(`Clears a number of messages.`)
        .addNumberOption(option =>
            option
                .setName(`number`)
                .setDescription(`Number of messages to clear`)
                .setRequired(true)),
    async execute(interaction) {
        const number = interaction.options.getNumber(`number`);

        if (number < limitLower || number > limitUpper) {
            return interaction.reply({
                content: `Please provide a number between ${limitLower} and ${limitUpper}.`,
                flags: MessageFlags.Ephemeral
            });
        }

        try {
            const messages = await interaction.channel.bulkDelete(number, true);
            return interaction.reply({
                content: `Successfully deleted ${messages.size} messages.`,
                flags: MessageFlags.Ephemeral
            });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'There was an error trying to clear messages.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};