export const BOT_ATTENTION_SYMBOL = '!'
export const BOT_ATTENTION_TOKEN = 'YOUR_BOT_NAME'

export const BOT_ATTENTION = BOT_ATTENTION_SYMBOL.concat(BOT_ATTENTION_TOKEN)

export const DEFAULT_REALM_ID = '57'
export const DEFAULT_NAMESPACE = 'dynamic-us'
export const DEFAULT_LOCALE = 'en_US'
export const DEFAULT_REGION = 'us'

export const BLIZZARD_API_QUERY_TIMEOUT = 30000 // 30s
export const BLIZZARD_API_AUCTION_FETCH_INTERVAL = 1000 * 60 * 60 // 1 hour

export const BLIZZARD_API_AUCTIONS_ENDPOINT = '/data/wow/connected-realm/{REALM_ID}/auctions?namespace={NAMESPACE}&locale={LOCALE}&region={REGION}'

export const BLIZZARD_WATCHED_FISH_ITEMS: Record<number, string> = {
	173032: 'Lost Sole',
	173033: 'Iridescent Amberjack',
	173034: 'Silvergill Pike',
	173035: 'Pocked Bonefish',
	173036: 'Spinefin Piranha',
	173037: 'Elsyian Thade',
}

export const BLIZZARD_WATCHED_TAILORING_ITEMS: Record<number, string> = {
	173202: 'Shrouded Cloth',
	173204: 'Lightless Silk',
}

export const BLIZZARD_WATCHED_ENCHANTING_ITEMS: Record<number, string> = {
	172230: 'Soul Dust',
	172231: 'Sacred Shard',
	172232: 'Eternal Crystal',
}

export const BLIZZARD_WATCHED_MINING_ITEMS: Record<number, string> = {
	171828: 'Laestrite Ore',
	171833: 'Elethium Ore',
	171829: 'Solenium Ore',
	171830: 'Oxxein Ore',
	171831: 'Phaedrum Ore',
	171832: 'Sinvyr Ore',
}

export const BLIZZARD_WATCHED_HERBALISM_ITEMS: Record<number, string> = {
	168586: 'Rising Glory',
	168589: 'Marrowroot',
	170554: `Vigil's Torch`,
	168583: 'Widowbloom',
	169701: 'Death Blossom',
	171315: 'Nightshade',
}

export const BLIZZARD_WATCHED_SKINNING_ITEMS: Record<number, string> = {
	172089: 'Desolate Leather',
	172094: 'Callous Hide',
	172092: 'Pallid Bone',
	172096: 'Heavy Desolate Leather',
	172097: 'Heavy Callous Hide',
}

export const BLIZZARD_WATCHED_JEWELCRAFTING_ITEMS: Record<number, string> = {
	173109: 'Angerseye',
	173108: 'Oriblase',
	173110: 'Umbryl'
}

export const BLIZZARD_WATCHED_ITEM_ID_MAP: Record<number, string> = {
	// Fishing
	...BLIZZARD_WATCHED_FISH_ITEMS,

	// Tailoring,
	...BLIZZARD_WATCHED_TAILORING_ITEMS,

	// Enchanting
	...BLIZZARD_WATCHED_ENCHANTING_ITEMS,

	// Mining
	...BLIZZARD_WATCHED_MINING_ITEMS,

	// Herbalism
	...BLIZZARD_WATCHED_HERBALISM_ITEMS,

	// Skinning
	...BLIZZARD_WATCHED_SKINNING_ITEMS,

	// Jewelcrafting
	...BLIZZARD_WATCHED_JEWELCRAFTING_ITEMS
}
