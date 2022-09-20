require('dotenv').config()
const { SlashCommandBuilder, Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')
const clientID = process.env.DISCORD_APPLICATION_ID
const guildID = process.env.GUILD_ID
const token = process.env.DISCORD_TOKEN

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info'),
    // tentei helpmeChuu, mas aparentemente não pode letra maiúscula
    new SlashCommandBuilder().setName('helpmechuu').setDescription('Asks Chuu for help with commands'),
    new SlashCommandBuilder().setName('qrgenerate').setDescription('Generates a QR Code with the text passed ').addStringOption(option =>
		option.setName('input').setDescription('The input that will be turned into a QRCode').setRequired(true)),
]
    .map(command => command.toJSON())

const rest = new REST({ version: '10' }).setToken(token)

// UPDATE/ADD new commands in specific guild
// rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: guildSpecific })
//     .then((data) => console.log(`Sucessfully registered ${data.length} application commands`))
//     .catch(console.error);

// for global
// rest.put(Routes.applicationCommands(clientID), {body: commands})
//     .then((data) => console.log(`Successfully registered ${data.length} application global commands`))
//     .catch(console.error);

// DELETE command in specific guild
// rest.delete(Routes.applicationGuildCommand(clientID, guildID, 'commandId'))
//     .then(() => console.log('Successfully deleted application command'))
//     .catch(console.error);

// DELETE all commands in a certain scope

// for guild-based commands
// rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// for global commands
// rest.put(Routes.applicationCommands(clientID), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);

