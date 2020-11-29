import { Client as DiscordClient, Message } from 'discord.js'

import { shouldRespond } from './utils'

// Initialize client
const bot = new DiscordClient()

bot.login(process.env.TOKEN)

bot.on('ready', () => {
    console.log(`${bot?.user?.tag} initialized and ready to go 🚀`)
})

bot.on('message', (message: Message) => {
    const authorId = message.author.id
    const content = message.content

    console.log({ authorId, content })

    if (shouldRespond(content)) {
        message.reply('That is great.')
    }
})
