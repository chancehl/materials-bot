import BlizzardApiClient from 'blizzapi'
import { Client as DiscordClient } from 'discord.js'

import { fetchLatestAuctionHousePricesOnInterval } from './actions'

// Initialize client
const discordClient = new DiscordClient()

// Initialize Blizzard API client
const region = process.env.BLIZZARD_API_REGION as string
const clientId = process.env.BLIZZARD_API_CLIENT_ID as string
const clientSecret = process.env.BLIZZARD_API_CLIENT_SECRET as string

const blizzardApiClient = new BlizzardApiClient({
    region,
    clientId,
    clientSecret
});

discordClient.login(process.env.DISCORD_BOT_USER_TOKEN)

discordClient.on('ready', () => {
    console.log(`${discordClient?.user?.tag} initialized and ready to go 🤖`)

    fetchLatestAuctionHousePricesOnInterval(discordClient, blizzardApiClient)
})
