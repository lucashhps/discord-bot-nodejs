
// Reads .env file and creates new process.env values (e.g.: process.env.DISCORD_TOKEN)
// Due to .env variables being secret, it won't be on the git
require('dotenv').config()
const qr = require('qrcode')

// Require the necessary discord.js classes
const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js')
const { text } = require('express')
const token = process.env.DISCORD_TOKEN

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    
    const { commandName } = interaction

    if (commandName === 'ping') {
        await interaction.reply('Pong!')
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\n
        Total members: ${interaction.guild.memberCount}\n
        Created at: ${interaction.guild.createdAt.toLocaleDateString('pt-BR')}`)
    } else if (commandName === 'user') {
        const username = await interaction.user.username
        await interaction.reply(`${username}'s Tag: ${interaction.user.tag}\t${username}'s Id: ${interaction.user.id}`)
    } else if (commandName === 'helpmechuu') {
        await interaction.reply('replies with full command list - WIP')
    } else if (commandName === 'qrgenerate') {
        const textInput = interaction.options.getString('input')
        qr.toDataURL(textInput, async (err, src) => { // wip
            if (err) console.error("Error occured");

            // Create a new buffer from the uri generated from the qrcode module (src variable)
            const buf1 = new Buffer.from(src.split(",")[1], 'base64')

            // Builds a attachment with the AttachmentBuilder from discord.js and the buffer created before 
            const attachment = new AttachmentBuilder(buf1).setName('qrcode.png')

            // sends the qrcode image to the channel where the command was called
            await interaction.channel.send({ files: [attachment], });

        })
    }
})

// Login to Discord with your client's token
client.login(token)