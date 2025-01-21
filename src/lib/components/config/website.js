import { EnvironmentConfig } from "../utils/environmentConfig";


const facebookPageName = EnvironmentConfig.VITE_PUBLIC_FACEBOOK_PAGE_ENGLISH;
const facebookAuthorPageName = EnvironmentConfig.VITE_PUBLIC_FACEBOOK_AUTHOR_PAGE_ENGLISH;

const website = {
	author: 'RepublicTV',
	ogLanguage: 'en_US',//TODO Need to handle this dynamically 
	siteLanguage: 'en-US',
	siteTitle: '',
	siteShortTitle: '',
	description: 'Republic Media Network',
	siteUrl: import.meta.env.VITE_REPUBLIC_URL,
	backgroundColor: '#1b4079',
	entity: import.meta.env.VITE_ENTITY_ENGLISH,
	themeColor: '#d62828',
	contactEmail: import.meta.env.VITE_PUBLIC_EMAIL_ENGLISH,
	facebookAuthorPage: `https://www.facebook.com/${facebookAuthorPageName}`,
	facebookAuthorPageName,
	facebookPage: `https://www.facebook.com/${facebookPageName}`,
	facebookPageName,
	twitterUsername: import.meta.env.VITE_TWITTER_USER_NAME
};

export { website as default };