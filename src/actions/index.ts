import BlizzardApiClient from 'blizzapi'
import { Client as DiscordClient } from 'discord.js'

import { getQueryEndpoint } from '../utils'
import { BLIZZARD_API_QUERY_TIMEOUT, BLIZZARD_WATCHED_ITEM_ID_MAP, BLIZZARD_API_AUCTION_FETCH_INTERVAL, BLIZZARD_WATCHED_ENCHANTING_ITEMS, BLIZZARD_WATCHED_MINING_ITEMS, BLIZZARD_WATCHED_HERBALISM_ITEMS, BLIZZARD_WATCHED_JEWELCRAFTING_ITEMS, BLIZZARD_WATCHED_SKINNING_ITEMS, BLIZZARD_WATCHED_FISH_ITEMS } from '../constants'

export const fetchAuctionHousePrices = async (blizzardClient: BlizzardApiClient) => {
	// This is an index of ALL auctions, we need to filter to only the ones we care about
	const { auctions } = await blizzardClient.query(getQueryEndpoint('auctions'), {
		timeout: BLIZZARD_API_QUERY_TIMEOUT, // 30 seconds
	})

	// Filter auctions
	const watchedItemIds = Object.keys(BLIZZARD_WATCHED_ITEM_ID_MAP).map(key => Number.parseInt(key))

	const filteredAuctions = auctions.filter((auction: any) => watchedItemIds.includes(auction.item.id))

	// Loop through auctions and get the lowest priced one (undercut value)
	const lowestAuctionedItemsMap: any = {}

	for (const filteredAuction of filteredAuctions) {
		const itemId = filteredAuction.item.id
		const unitPrice = filteredAuction.unit_price
		const priceInGold = unitPrice / 10000 // 100 copper * 100 silver = price in gold
		const commonName = BLIZZARD_WATCHED_ITEM_ID_MAP[itemId]

		const existingRecord = lowestAuctionedItemsMap[commonName]

		// If we have an existing record in our map, let's see if the price is lower than what is already saved
		if (existingRecord == null || (existingRecord != null && existingRecord > priceInGold)) {
			lowestAuctionedItemsMap[commonName] = priceInGold
		}
	}

	return lowestAuctionedItemsMap
}

export const sendMessageWithLatestPrices = (discordClient: DiscordClient, latestPrices: Record<string, number>) => {
	// Formatted message placeholder
	let formattedMessage = ''

	// Enchanting
	formattedMessage += `\n\n🎣 **Fishing materials** 🎣\n`
	formattedMessage += lookupItemFromMapAndFormatMessage(BLIZZARD_WATCHED_FISH_ITEMS, latestPrices)

	// Enchanting
	formattedMessage += `\n\n🪄 **Enchanting materials** 🪄\n`
	formattedMessage += lookupItemFromMapAndFormatMessage(BLIZZARD_WATCHED_ENCHANTING_ITEMS, latestPrices)

	// Mining
	formattedMessage += `\n\n⛏ **Mining materials** ⛏\n`
	formattedMessage += lookupItemFromMapAndFormatMessage(BLIZZARD_WATCHED_MINING_ITEMS, latestPrices)

	// Herbalism
	formattedMessage += `\n\n🌿 **Herbalism materials** 🌿\n`
	formattedMessage += lookupItemFromMapAndFormatMessage(BLIZZARD_WATCHED_HERBALISM_ITEMS, latestPrices)

	// Skinning
	formattedMessage += `\n\n🔪 **Skinning materials** 🔪\n`
	formattedMessage += lookupItemFromMapAndFormatMessage(BLIZZARD_WATCHED_SKINNING_ITEMS, latestPrices)

	// Jewelcrafting
	formattedMessage += `\n\n💎 **Jewelcrafting materials** 💎\n`
	formattedMessage += lookupItemFromMapAndFormatMessage(BLIZZARD_WATCHED_JEWELCRAFTING_ITEMS, latestPrices)

	// Find channel to send the message in
	const channelId = process.env.DISCORD_CHANNEL_ID as string
	const channel = discordClient.channels.cache.get(channelId)

	// send message
	if (channel) {
		// @ts-ignore: .send(...) definitely exists on this object. I'll need to find the correct type.
		channel.send(formattedMessage)
	}
}

export const lookupItemFromMapAndFormatMessage = (map: Record<number, string>, latest: Record<string, number>) => {
	let formattedMessage = ''

	for (const material of Object.values(map)) {
		let price = latest[material]?.toFixed(2)

		if (price == null) {
			price = 'No price found'
		}

		formattedMessage += `**${material}:** ${price}g\n`
	}

	return formattedMessage
}

export const fetchLatestAuctionHousePrices = async (discordClient: DiscordClient, blizzardClient: BlizzardApiClient) => {
	// Fetch latest
	const latestPrices = await fetchAuctionHousePrices(blizzardClient)

	// Send message to channel
	sendMessageWithLatestPrices(discordClient, latestPrices)
}

export const fetchLatestAuctionHousePricesOnInterval = async (discordClient: DiscordClient, blizzardClient: BlizzardApiClient) => {
	// Fetch latest immediately
	await fetchLatestAuctionHousePrices(discordClient, blizzardClient)

	// Execute the same function on an interval
	setInterval(() => fetchLatestAuctionHousePrices(discordClient, blizzardClient), BLIZZARD_API_AUCTION_FETCH_INTERVAL)
}
