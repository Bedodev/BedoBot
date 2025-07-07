const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`server`)
		.setDescription(`Provides server information.`),
	async execute(interaction) {
		await interaction.reply(`${interaction.guild.name} has ${interaction.guild.memberCount} members.`);
	},
};