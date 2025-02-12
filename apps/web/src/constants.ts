export enum SITE_MAP {
    HOME = '/',
    LOGIN = '/login',
    DASHBOARD = '/dashboard',
    STORIES = '/dashboard/stories',
    SHOP = '/dashboard/shop',
    CREATE = '/dashboard/create',
    UPGRADE = '/dashboard/upgrade',
    PRIVACY_POLICY = '/info/privacy-policy',
    TERMS_OF_SERVICE = '/info/terms-of-service',
}

export const ITEM_ID_MAP = new Map<string, number>([
    ['Story.Length.Mini', 23],
    ['Story.Length.Short', 24],
])

export enum EnvironmentEnum {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
}
