import { BLIZZARD_API_AUCTIONS_ENDPOINT, DEFAULT_LOCALE, DEFAULT_NAMESPACE, DEFAULT_REALM_ID, DEFAULT_REGION } from '../constants'

export const shouldRespond = (message: string): boolean => {
    if (message.toLowerCase().match(/!price|!prices/)) {
        return true
    }

    return false
}

export const getQueryEndpoint = (queryType: 'auctions' | 'realm', options?: any) => {
    switch (queryType) {
        case 'auctions':
            return BLIZZARD_API_AUCTIONS_ENDPOINT
                .replace('{REALM_ID}', options?.realmId ?? DEFAULT_REALM_ID)
                .replace('{NAMESPACE}', options?.realmId ?? DEFAULT_NAMESPACE)
                .replace('{LOCALE}', options?.locale ?? DEFAULT_LOCALE)
                .replace('{REGION}', options?.region ?? DEFAULT_REGION)
        case 'realm':
        default:
            throw new Error("This operation is not yet supported")
    }
}
