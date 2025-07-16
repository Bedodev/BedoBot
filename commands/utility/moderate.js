const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderate')
        .setDescription('Moderate users in the server.')
        .addSubcommand(subcommand =>
            subcommand.setName('ban')
                .setDescription('Ban a user from the server.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to ban')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('Reason for banning the user')))
        .addSubcommand(subcommand =>
            subcommand.setName('kick')
                .setDescription('Kick a user from the server.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to kick')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('Reason for kicking the user'))),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({
                content: 'The specified user is not a member of this server.',
                ephemeral: true
            });
        }

        // Check permissions based on subcommand
        if (subcommand === 'ban' && !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({
                content: 'You do not have permission to ban members.',
                ephemeral: true
            });
        }

        if (subcommand === 'kick' && !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({
                content: 'You do not have permission to kick members.',
                ephemeral: true
            });
        }

        try {
            if (subcommand === 'ban') {
                if (!member.bannable) {
                    return interaction.reply({
                        content: 'I cannot ban this user. Check my role permissions.',
                        ephemeral: true
                    });
                }
                await member.ban({ reason });
                return interaction.reply({
                    content: `Successfully banned **${user.tag}**. Reason: ${reason}`,
                    ephemeral: true
                });
            } else if (subcommand === 'kick') {
                if (!member.kickable) {
                    return interaction.reply({
                        content: 'I cannot kick this user. Check my role permissions.',
                        ephemeral: true
                    });
                }
                await member.kick(reason);
                return interaction.reply({
                    content: `Successfully kicked **${user.tag}**. Reason: ${reason}`,
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'There was an error trying to moderate the user.',
                ephemeral: true
            });
        }
    }
};
