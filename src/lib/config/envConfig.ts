import { EnglishAds } from "$lib/ads/EnglishAds/Ads";
import { HindiAds } from "$lib/ads/HindiAds/Ads";
import { BusinessAds } from "$lib/ads/BusinessAds/Ads";
import { STYLE_PROPERTIES_BUISINESS, STYLE_PROPERTIES_ENGLISH, STYLE_PROPERTIES_HINDI } from "$lib/components/common/StoryCard/Constants";
import { BanglaAds } from "$lib/ads/BanglaAds/Ads";
import { KannadaAds } from "$lib/ads/KannadaAds/Ads";

const DEV_ROBOTS_BASE = "https://storage.googleapis.com/vision-prod/dev_robots/"
const PROD_ROBOTS_BASE = "https://storage.googleapis.com/vision-prod/Robots/"

export const domain: any = {
    production: {
        rbusiness: {
            domains: ["republicbiz.com", "www.republicbiz.com"],
            gaCode: 'G-6ESR9JGV4V',
            gaCodeMgid: 'G-PB2YHGW1N1',
            gtmAmpCode: '',
            gtmCode: '',
            googleSiteVerification: "rUxaZ3X_F1MFatpbYgrm5bd8svlmFUn_9G8fwYnOj6U",
            allDomainList: [
                { name: "Republic Business", url: "https://www.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.republicbharat.com/" },
                { name: "Republic World", url: "https://www.republicworld.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://republicgujarati.in/" },
                // { name: "R.Punjabi", url: "http://republicpunjabi.in/" },
            ],
            streamId: "8160742016",
            robotsFilePath: PROD_ROBOTS_BASE + "rbizRobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: true
        },
        rbharat: {
            domains: ["republicbharat.com", "www.republicbharat.com"],
            gaCode: 'G-4GJJHDE09T',
            gaCodeMgid: 'G-NREG8ELFBK',
            googleSiteVerification: "1K5tJJ6XnXS4E3-ZHblaGLprGQIx31j4wf8ZCkY9mU0",
            gtmAmpCode: 'GTM-WLF4L9SV',
            gtmCode: 'GTM-K9NZRZ3',
            allDomainList: [
                { name: "R.Bharat", url: "https://www.republicbharat.com/" },
                { name: "Republic Business", url: "https://www.republicbiz.com/" },
                { name: "Republic World", url: "https://www.republicworld.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://republicpunjabi.in/" },
            ],
            streamId: "4636482080",
            robotsFilePath: PROD_ROBOTS_BASE + "rbharatRobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: true
        },
        rworld: {
            domains: ["republicworld.com", "www.republicworld.com"],
            gaCode: 'G-5R3HXP63GC',
            gaCodeMgid: 'G-HQ8K1YZ0WW',
            googleSiteVerification: "cU_o7P6kj1ep1tjsazcIG4QcPL5NCBOdZObrhg8xUAU",
            gtmAmpCode: 'GTM-N82Q5LW',
            gtmCode: 'GTM-PMXGKJX',
            allDomainList: [
                { name: "Republic World", url: "https://www.republicworld.com/" },
                { name: "Republic Business", url: "https://www.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.republicbharat.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://republicpunjabi.in/" },
            ],
            streamId: "3454631109",
            robotsFilePath: PROD_ROBOTS_BASE + "rworldRobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: true
        },
        rbangla: {
            domains: ["republicbangla.co.in", "www.republicbangla.co.in", "bangla.republicworld.com", "www.bangla.republicworld.com"],
            gaCode: 'G-X3B7P6S4DF',
            gaCodeMgid: 'G-5RNDRNHCPH',
            googleSiteVerification: "rUxaZ3X_F1MFatpbYgrm5bd8svlmFUn_9G8fwYnOj6U",
            gtmAmpCode: '',
            gtmCode: '',
            allDomainList: [
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "Republic Business", url: "https://www.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.republicbharat.com/" },
                { name: "Republic World", url: "https://www.republicworld.com/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://republicpunjabi.in/" },
            ],
            streamId: "2361058963",
            robotsFilePath: PROD_ROBOTS_BASE + "rbanglarobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: true
        },
        rkannada: {
            domains: ["republickannada.co.in", "www.republickannada.co.in", "www.kannada.republicworld.com",
                "kannada.republicworld.com"],
            gaCode: 'G-HJFCNRMLLS',
            gaCodeMgid: 'G-SM9E3QBY9Z',
            googleSiteVerification: "rUxaZ3X_F1MFatpbYgrm5bd8svlmFUn_9G8fwYnOj6U",
            gtmAmpCode: '',
            gtmCode: '',
            allDomainList: [
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                { name: "Republic Business", url: "https://www.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.republicbharat.com/" },
                { name: "Republic World", url: "https://www.republicworld.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                // { name: "R.Gujarati", url: "http://republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://republicpunjabi.in/" },
            ],
            streamId: '6216870086',
            robotsFilePath: PROD_ROBOTS_BASE + "rkannadarobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: true
        },
        rmarathi: {
            domains: ["republicmarathi.in", "www.republicmarathi.in"],
            gaCode: 'G-89R4QCXCC7',
            gaCodeMgid: 'G-K9DL7ME0T6',
            googleSiteVerification: "rUxaZ3X_F1MFatpbYgrm5bd8svlmFUn_9G8fwYnOj6U",
            gtmAmpCode: '',
            gtmCode: '',
            allDomainList: [
                { name: "R.Marathi", url: "http://republicmarathi.in/" },
                { name: "Republic Business", url: "https://www.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.republicbharat.com/" },
                { name: "Republic World", url: "https://www.republicworld.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://republicgujarati.in/" },
                // { name: "R.Punjabi", url: "http://republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rmarathirobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: true
        },
        rgujarati: {
            domains: ["republicgujarati.in", "www.republicgujarati.in"],
            gaCode: 'G-N4XZ64W4SY',
            gaCodeMgid: 'G-BGHP8RD1EQ',
            googleSiteVerification: "rUxaZ3X_F1MFatpbYgrm5bd8svlmFUn_9G8fwYnOj6U",
            gtmAmpCode: '',
            gtmCode: '',
            allDomainList: [
                { name: "R.Gujarati", url: "http://republicgujarati.in/" },
                { name: "Republic Business", url: "https://www.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.republicbharat.com/" },
                { name: "Republic World", url: "https://www.republicworld.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Marathi", url: "http://republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://republicpunjabi.in/" },
            ],
            robotsFilePath: PROD_ROBOTS_BASE + "rgujaratirobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: true
        },
        rpunjabi: {
            domains: ["republicpunjabi.in", "www.republicpunjabi.in"],
            gaCode: 'G-1ZGRCLKZED',
            gaCodeMgid: 'G-2MWNSM8S71',
            googleSiteVerification: "rUxaZ3X_F1MFatpbYgrm5bd8svlmFUn_9G8fwYnOj6U",
            gtmAmpCode: '',
            gtmCode: '',
            allDomainList: [
                { name: "Republic Business", url: "https://www.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.republicbharat.com/" },
                { name: "Republic World", url: "https://www.republicworld.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://republicpunjabi.in/" },
            ],
            robotsFilePath: PROD_ROBOTS_BASE + "rgujaratirobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: true
        },
    },
    preproduction: {
        rbusiness: {
            domains: ["prelive.republicbiz.com"],
            gaCode: 'G-6ESR9JGV4V',
            gaCodeMgid: 'G-PB2YHGW1N1',
            googleSiteVerification: "qtewCBkG8GqkHi0dH2GwPRMIiFcuSszjj2Gd_0D04KQ",
            gtmAmpCode: '',
            gtmCode: 'G-28SNDZB8HM',
            allDomainList: [
                { name: "Republic Business", url: "https://prelive.republicbiz.com/" },
                { name: "Republic World", url: "https://prelive.republicworld.com/" },
                { name: "R.Bharat", url: "https://prelive.republicbharat.com/" },
                { name: "R.Bangla", url: "https://prelive.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://prelive.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://gujarati.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://marathi.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://punjabi.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rbizRobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rbharat: {
            domains: ["prelive.republicbharat.com"],
            gaCode: 'G-4GJJHDE09T',
            gaCodeMgid: 'G-NREG8ELFBK',
            googleSiteVerification: "-Ag6wZE_m1pOB1w0x2h8wT9eMBKcWOTKaXMk_kzocro",
            gtmAmpCode: 'GTM-M3LR6G95',
            gtmCode: 'G-PJ48XPXMV0',
            allDomainList: [
                { name: "R.Bharat", url: "https://prelive.republicbharat.com/" },
                { name: "Republic World", url: "https://prelive.republicworld.com/" },
                { name: "Republic Business", url: "https://prelive.republicbiz.com/" },             
                { name: "R.Bangla", url: "https://prelive.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://prelive.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://gujarati.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://marathi.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://punjabi.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rbharatRobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rworld: {
            domains: ["prelive.republicworld.com", "www.prelive.republicworld.com"],
            gaCode: 'G-5R3HXP63GC',
            gaCodeMgid: 'G-HQ8K1YZ0WW',
            googleSiteVerification: "CJ-MImgnT4Xc32LD2nfMc9skfZL9Ab8IO51P_WrG11I",
            gtmAmpCode: 'GTM-M3LR6G95',
            gtmCode: 'G-MV7C1GS6PE',
            allDomainList: [
                { name: "Republic World", url: "https://prelive.republicworld.com/" },
                { name: "Republic Business", url: "https://prelive.republicbiz.com/" },
                { name: "R.Bharat", url: "https://prelive.republicbharat.com/" },
                { name: "R.Bangla", url: "https://prelive.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://prelive.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://gujarati.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://marathi.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://punjabi.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rworldRobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rbangla: {
            domains: ["prelive.republicbangla.co.in", "www.prelive.republicbangla.co.in"],
            gaCode: 'G-X3B7P6S4DF',
            gaCodeMgid: 'G-5RNDRNHCPH',
            googleSiteVerification: "m59agpsxdpoxc0anjgABYR5gCFjKz9hArrZL0Ub4RqI",
            gtmAmpCode: 'GTM-M3LR6G95',
            gtmCode: 'G-YC2LMP3ZJW',
            allDomainList: [
                { name: "R.Bangla", url: "https:/prelive.republicbangla.co.in/" },
                { name: "Republic World", url: "https://prelive.republicworld.com/" },
                { name: "Republic Business", url: "https://prelive.republicbiz.com/" },
                { name: "R.Bharat", url: "https://prelive.republicbharat.com/" },
                { name: "R.Kannada", url: "https://prelive.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://gujarati.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://marathi.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://punjabi.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rbanglarobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rkannada: {
            domains: ["prelive.republickannada.co.in", "www.prelive.republickannada.co.in"],
            gaCode: 'G-HJFCNRMLLS',
            gaCodeMgid: 'G-SM9E3QBY9Z',
            googleSiteVerification: "AqzedsB47wwEb4V-VX6L4t7gy3csJaI2I6eURTIyePg",
            gtmAmpCode: '',
            gtmCode: 'G-03ERDJWQPX',
            allDomainList: [
                { name: "R.Kannada", url: "https://prelive.republickannada.co.in/" },
                { name: "Republic World", url: "https://prelive.republicworld.com/" },
                { name: "Republic Business", url: "https://prelive.republicbiz.com/" },
                { name: "R.Bharat", url: "https://prelive.republicbharat.com/" },
                { name: "R.Bangla", url: "https://prelive.republicbangla.co.in/" },
                // { name: "R.Gujarati", url: "http://gujarati.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://marathi.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://punjabi.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rkannadarobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rmarathi: {
            domains: ["marathi.republicmarathi.in", "www.marathi.republicmarathi.in"],
            gaCode: 'G-BD7XJDZ859',
            googleSiteVerification: "cU_o7P6kj1ep1tjsazcIG4QcPL5NCBOdZObrhg8xUAU",
            gtmAmpCode: '',
            gtmCode: 'G-MBTLDN1L6N',
            allDomainList: [
                { name: "R.Marathi", url: "http://marathi.republicmarathi.in/" },
                { name: "Republic World", url: "https://www.english.republicworld.com/" },
                { name: "Republic Business", url: "https://www.biz.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.hindi.republicbharat.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://gujarati.republicgujarati.in/" },
                // { name: "R.Punjabi", url: "http://punjabi.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rmarathirobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rgujarati: {
            domains: ["gujarati.republicgujarati.in", "www.gujarati.republicgujarati.in"],
            gaCode: 'G-D2DPHXDCJH',
            googleSiteVerification: "cU_o7P6kj1ep1tjsazcIG4QcPL5NCBOdZObrhg8xUAU",
            gtmAmpCode: '',
            gtmCode: 'G-5TK74HMR5P',
            allDomainList: [
                { name: "R.Gujarati", url: "http://gujarati.republicgujarati.in/" },
                { name: "Republic World", url: "https://www.english.republicworld.com/" },
                { name: "Republic Business", url: "https://www.biz.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.hindi.republicbharat.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Marathi", url: "http://marathi.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://punjabi.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rgujaratirobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rpunjabi: {
            domains: ["punjabi.republicpunjabi.in", "www.punjabi.republicpunjabi.in"],
            gaCode: 'G-SX9RK5ZRFX',
            googleSiteVerification: "cU_o7P6kj1ep1tjsazcIG4QcPL5NCBOdZObrhg8xUAU",
            gtmAmpCode: '',
            gtmCode: 'G-7EZL36TL0W',
            allDomainList: [
                { name: "Republic World", url: "https://www.english.republicworld.com/" },
                { name: "Republic Business", url: "https://www.biz.republicbiz.com/" },
                { name: "R.Bharat", url: "https://www.hindi.republicbharat.com/" },
                { name: "R.Bangla", url: "https://www.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://www.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://gujarati.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://marathi.republicmarathi.in/" },
                { name: "R.Punjabi", url: "http://punjabi.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rgujaratirobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
    },
    development: {
        rbusiness: {
            domains: ["dev.republicbiz.com", "www.dev.republicbiz.com", "dev.republicbiz"],
            gaCode: 'G-83NT5BK1HM',
            googleSiteVerification: "yuV4bVIQn4iBniJlKm-GgUU2EH5vUcJBRHgO-wDOpGQ",
            gtmAmpCode: '',
            gtmCode: 'G-28SNDZB8HM',
            allDomainList: [
                { name: "Republic Business", url: "https://dev.republicbiz.com/" },
                { name: "R.Bharat", url: "https://dev.republicbharat.com/" },
                { name: "Republic World", url: "https://dev.republicworld.com/" },
                { name: "R.Bangla", url: "https://dev.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://dev.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://dev.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://dev.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://dev.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rbizRobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rbharat: {
            domains: ["svelte-hindi.republicworld.com", "www.svelte-hindi.republicworld.com", "dev.republicbharat", "www.dev.republicbharat.com", "dev.republicbharat.com"],
            gaCode: 'G-D387M1X5LY',
            googleSiteVerification: "1SzjlPZtN1f8xGcHnp5xOq3IvlewE-f9jl-dMfbYbC4",
            gtmAmpCode: 'GTM-M3LR6G95',
            gtmCode: 'G-PJ48XPXMV0',
            allDomainList: [
                { name: "R.Bharat", url: "https://dev.republicbharat.com/" },
                { name: "Republic Business", url: "https://dev.republicbiz.com/" },
                { name: "Republic World", url: "https://dev.republicworld.com/" },
                { name: "R.Bangla", url: "https://dev.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://dev.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://dev.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://dev.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://dev.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rbharatRobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rworld: {
            domains: ["svelte.republicworld.com", "www.svelte.republicworld.com", "dev.republicworld.com", "www.dev.republicworld.com", "adtest.republicworld.com", "adtest-en.republicworld.com"],
            gaCode: 'G-32DGS87PWR',
            googleSiteVerification: "vUfcrELMJMADuFL01FgTZ7DKbPfpXqiNe63_2ZG_vs0",
            gtmAmpCode: 'GTM-M3LR6G95',
            gtmCode: 'G-MV7C1GS6PE',
            allDomainList: [
                { name: "Republic World", url: "https://dev.republicworld.com/" },
                { name: "Republic Business", url: "https://dev.republicbiz.com/" },
                { name: "R.Bharat", url: "https://dev.republicbharat.com/" },
                { name: "R.Bangla", url: "https://dev.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://dev.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://dev.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://dev.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://dev.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rworldRobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rbangla: {
            domains: ["dev.republicbangla.co.in", "www.dev.republicbangla.co.in", "bangla.republicworld.com", "www.bangla.republicworld.com"],
            gaCode: 'G-95LD3DJQZ4',
            googleSiteVerification: "-fMek3Wu8TcjvuEmEr5pv5NeRM2a_Qs0hEAyLdv79-Q",
            gtmAmpCode: 'GTM-M3LR6G95',
            gtmCode: 'G-YC2LMP3ZJW',
            allDomainList: [
                { name: "R.Bangla", url: "https://dev.republicbangla.co.in/" },
                { name: "Republic Business", url: "https://dev.republicbiz.com/" },
                { name: "R.Bharat", url: "https://dev.republicbharat.com/" },
                { name: "Republic World", url: "https://dev.republicworld.com/" },
                { name: "R.Kannada", url: "https://dev.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://dev.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://dev.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://dev.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rbanglarobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rkannada: {
            domains: ["dev.republickannada.co.in", "www.dev.republickannada.co.in", "kannada.republicworld.com", "www.kannada.republicworld.com"],
            gaCode: 'G-KFHQ90EZZZ',
            googleSiteVerification: "VMsX25W3GwvQWABK3TgEZTsGZI5KtiKR7j_GIx39Dt0",
            gtmAmpCode: '',
            gtmCode: 'G-03ERDJWQPX',
            allDomainList: [
                { name: "R.Kannada", url: "https://dev.republickannada.co.in/" },
                { name: "Republic Business", url: "https://dev.republicbiz.com/" },
                { name: "R.Bharat", url: "https://dev.republicbharat.com/" },
                { name: "Republic World", url: "https://dev.republicworld.com/" },
                { name: "R.Bangla", url: "https://dev.republicbangla.co.in/" },
                // { name: "R.Gujarati", url: "http://dev.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://dev.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://dev.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rkannadarobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rmarathi: {
            domains: ["dev.republicmarathi.in", "www.dev.republicmarathi.in"],
            gaCode: 'G-RXW41L9B5F',
            googleSiteVerification: "dev_cU_o7P6kj1ep1tjsazcIG4QcPL5NCBOdZObrhg8xUAU",
            gtmAmpCode: '',
            gtmCode: 'G-MBTLDN1L6N',
            allDomainList: [
                { name: "R.Marathi", url: "http://dev.republicmarathi.in/" },
                { name: "Republic Business", url: "https://dev.republicbiz.com/" },
                { name: "R.Bharat", url: "https://dev.republicbharat.com/" },
                { name: "Republic World", url: "https://dev.republicworld.com/" },
                { name: "R.Bangla", url: "https://dev.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://dev.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://dev.republicgujarati.in/" },
                // { name: "R.Punjabi", url: "http://dev.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rmarathirobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rgujarati: {
            domains: ["dev.republicgujarati.in", "www.dev.republicgujarati.in"],
            gaCode: 'G-C2KZ9RLLLB',
            googleSiteVerification: "dev_cU_o7P6kj1ep1tjsazcIG4QcPL5NCBOdZObrhg8xUAU",
            gtmAmpCode: '',
            gtmCode: 'G-5TK74HMR5P',
            allDomainList: [
                { name: "R.Gujarati", url: "http://dev.republicgujarati.in/" },
                { name: "Republic Business", url: "https://dev.republicbiz.com/" },
                { name: "R.Bharat", url: "https://dev.republicbharat.com/" },
                { name: "Republic World", url: "https://dev.republicworld.com/" },
                { name: "R.Bangla", url: "https://dev.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://dev.republickannada.co.in/" },
                // { name: "R.Marathi", url: "http://dev.republicmarathi.in/" },
                // { name: "R.Punjabi", url: "http://dev.republicpunjabi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rgujaratirobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
        rpunjabi: {
            domains: ["dev.republicpunjabi.in", "www.dev.republicpunjabi.in"],
            gaCode: 'G-10X0E2L7H5',
            googleSiteVerification: "dev_cU_o7P6kj1ep1tjsazcIG4QcPL5NCBOdZObrhg8xUAU",
            gtmAmpCode: '',
            gtmCode: 'G-7EZL36TL0W',
            allDomainList: [
                { name: "R.Punjabi", url: "http://dev.republicpunjabi.in/" },
                { name: "Republic Business", url: "https://dev.republicbiz.com/" },
                { name: "R.Bharat", url: "https://dev.republicbharat.com/" },
                { name: "Republic World", url: "https://dev.republicworld.com/" },
                { name: "R.Bangla", url: "https://dev.republicbangla.co.in/" },
                { name: "R.Kannada", url: "https://dev.republickannada.co.in/" },
                // { name: "R.Gujarati", url: "http://dev.republicgujarati.in/" },
                // { name: "R.Marathi", url: "http://dev.republicmarathi.in/" },
            ],
            robotsFilePath: DEV_ROBOTS_BASE + "rpunjabirobots.txt",
            bingMsID: "127C64218333E9EC24FE29E7FB7C7816",
            robotsfollowMeta: false
        },
    }
}

export const configDetails = (domain_name: string) => {
    let envConfig: any
    Object.keys(domain).forEach((environment) => {
        if (domain[environment].rworld.domains.includes(domain_name)) {
            envConfig = {
                name: "English",
                language: "E",
                lang: "en",
                prefix: "prefix",
                domainName: domain_name,
                status: true,
                processComplete: true,
                siteName: 'Republic World',
                siteLogo: 'https://img.republicworld.com/logo/english/republic-logo2.svg',
                siteIcon: 'Republic World',
                notificationIcon: 'https://img.republicworld.com/icons/icons/R-Digital.svg',
                logoHeight: '43px',
                logoWidth: '304px',
                globalCSS: "story.css",
                adsFile: EnglishAds,
                vdoaiId: 'v-republicworld-v8',
                OutOfPageSlotWeb: '/222812108/Interstitial_Adunit/Republic_English_Desktop_Interstitial',
                OutOfPageSlotMWeb: '/222812108/Interstitial_Adunit/Republic_English_Mweb_Interstitial',
                WebStoriesAd: '/222812108/Republic_Webstories/Republic_webstories_english',
                bgColor: '#F5F5F5',
                navigationBgColor: '#F5F5F5',
                textColor: '#00000',
                footerBgColor: "#FFF0F0",
                footerTextColor: "#00000",
                navBarTextColor: 'navBarText',
                navBarBgColor: '#F5F5F5',
                facebookPageId: 'facebook id',
                facebookAccessToken: 'facebook',
                gaCode: domain[environment].rworld.gaCode,
                gaCodeMgid: domain[environment].rworld.gaCodeMgid,
                gtmAmpCode: domain[environment].rworld.gtmAmpCode,
                gtmCode: domain[environment].rworld.gtmCode,
                streamId: domain[environment].rworld.streamId,
                domains: domain[environment].rworld.domains,
                bingMsID: domain[environment].rworld.bingMsID,
                mgWidgetId: '1617455',
                ampMgTag: `<amp-embed width="600" height="600" layout="responsive" type="mgid" data-publisher="republicworld.com" data-widget="1617460" data-container="M958314ScriptRootC1617460" data-block-on-consent="_till_responded"></amp-embed>`,
                googleSiteVerification: domain[environment].rworld.googleSiteVerification,
                googleNewsLink: 'https://news.google.com/publications/CAAqBwgKMMGSkQswztSlAw?hl=en-IN&gl=IN&ceid=IN%3Aen',
                robotsFilePath: domain[environment].rworld.robotsFilePath,
                sidebar: {
                    bgColor: '#D10014', primaryColor: "#000000",
                    secondaryColor: "#D10014",
                },
                allDomainList: domain[environment].rworld.allDomainList,
                productionUrl: 'https://www.republicworld.com',
                fontFiles: [
                    `https://${domain_name}/notosans-regular-webfont.woff2`,
                    `https://${domain_name}/notosans-regular-webfont.woff`
                ],
                sveltekitStyle: `
                    @font-face {
                        font-display: swap;
                        font-family: 'Noto Sans';
                        font-weight: 400;
                        src: url('https://${domain_name}/notosans-regular-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/notosans-regular-webfont.woff') format('woff');
                    }
    
                     @font-face {
                        font-display: swap;
                        font-family: 'Noto Sans';
                        font-weight: 500;
                        src: url('https://${domain_name}/notosans-medium-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/notosans-medium-webfont.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Noto Sans';
                        font-weight: 600;
                        src: url('https://${domain_name}/notosans-semibold-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/notosans-semibold-webfont.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Noto Sans';
                        font-weight: 700;
                        src: url('https://${domain_name}/notosans-bold-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/notosans-bold-webfont.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Noto Sans';
                        font-weight: 900;
                        src: url('https://${domain_name}/notosans-black-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/notosans-black-webfont.woff') format('woff');
                    }
                    @font-face {
                        font-family: 'Noto Serif';
                        src: url('https://${domain_name}/NotoSerif-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/NotoSerif-Medium.woff') format('woff');
                        font-weight: 500;
                        font-style: normal;
                        font-display: swap;
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Mulish';
                        font-style: normal;
                        font-weight: 400;
                        src: url('https://${domain_name}/mulish-regular-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/mulish-regular-webfont.woff') format('woff');
                    }
                    `,
                primaryFont: "'Noto Sans',sans-serif , -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;",
                secondaryFont: "'Mulish, sans-serif'",
                tertiaryFont: "'Noto Serif',sans-serif",
                styleProperties: STYLE_PROPERTIES_ENGLISH,
                adsBeyond: 'https://rtbcdn.andbeyond.media/prod-global-311927.js',
                robotsfollowMeta: domain[environment].rworld.robotsfollowMeta,
                facebookVerification: '',
                twitterUrl: 'https://x.com/republic',
                facebookUrl: 'https://www.facebook.com/RepublicWorld',
                linkdenUrl: 'https://www.linkedin.com/company/republic-world',
                instaUrl: 'https://www.instagram.com/republicworld/',
                youtubeUrl: 'https://youtube.com/@RepublicWorld',
                fb_admins: '100022662586814',
                fb_app_id: '1844715279113959',
                fb_pages: '1159346367512575'
            };
        }
        else if (domain[environment].rbharat.domains.includes(domain_name)) {
            envConfig = {
                name: "hindi",
                language: "H",
                lang: "hi",
                prefix: "prefix",
                domainName: domain_name,
                status: true,
                processComplete: true,
                siteName: 'Republic Bharat',
                siteLogo: 'https://img.republicworld.com/logo/hindi/republic-logo-bharat.svg',
                siteIcon: 'Republic Bharat',
                notificationIcon: 'https://img.republicworld.com/icons/icons/R-Digital.svg',
                logoHeight: '62px',
                logoWidth: '254px',
                globalCSS: "hindi-global.css",
                adsFile: HindiAds,
                vdoaiId: 'v-republicworld-v9',
                OutOfPageSlotWeb: '/222812108/Interstitial_Adunit/Republic_Hindi_Desktop_Interstitial',
                OutOfPageSlotMWeb: '/222812108/Interstitial_Adunit/Republic_Hindi_Mweb_Interstitial',
                WebStoriesAd: '/222812108/Republic_Webstories/Republic_webstories_Hindi',
                bgColor: '#F5F5F5',
                navigationBgColor: '#F5F5F5',
                textColor: '#000000',
                footerBgColor: "#FFF0F0",
                footerTextColor: "#00000",
                navBarTextColor: 'navBarText',
                navBarBgColor: '#F5F5F5',
                facebookPageId: 'facebook id',
                facebookAccessToken: 'facebook',
                gaCode: domain[environment].rbharat.gaCode,
                gaCodeMgid: domain[environment].rbharat.gaCodeMgid,
                gtmAmpCode: domain[environment].rbharat.gtmAmpCode,
                gtmCode: domain[environment].rbharat.gtmCode,
                streamId: domain[environment].rbharat.streamId,
                domains: domain[environment].rbharat.domains,
                mgWidgetId: '1617463',
                bingMsID: domain[environment].rbharat.bingMsID,
                ampMgTag: `<amp-embed width="600" height="600" layout="responsive" type="mgid" data-publisher="republicbharat.com" data-widget="1617464" data-container="M958315ScriptRootC1617464" data-block-on-consent="_till_responded"></amp-embed>`,
                googleSiteVerification: domain[environment].rbharat.googleSiteVerification,
                googleNewsLink: 'https://news.google.com/publications/CAAqBwgKMJ2nnAswsbG0Aw?hl=en-IN&gl=IN&ceid=IN%3Aen',
                robotsFilePath: domain[environment].rbharat.robotsFilePath,
                robotsfollowMeta: domain[environment].rbharat.robotsfollowMeta,
                sidebar: {
                    bgColor: '#D10014', primaryColor: "#000000",
                    secondaryColor: "#D10014",
                },
                allDomainList: domain[environment].rbharat.allDomainList,
                productionUrl: 'https://www.republicbharat.com',
                fontFiles: [
                    `https://${domain_name}/subset-AnekDevanagari-Regular.woff2`,
                    `https://${domain_name}/subset-AnekDevanagari-Regular.woff`
                ],
                sveltekitStyle: `
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 400;
                        src: url('https://${domain_name}/subset-AnekDevanagari-Regular.woff2') format('woff2'),
                            url('https://${domain_name}/subset-AnekDevanagari-Regular.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-AnekDevanagari-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-AnekDevanagari-Medium.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 600;
                        src: url('https://${domain_name}/subset-AnekDevanagari-SemiBold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-AnekDevanagari-SemiBold.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 700;
                        src: url('https://${domain_name}/subset-AnekDevanagari-Bold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-AnekDevanagari-Bold.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 800;
                        src: url('https://${domain_name}/subset-AnekDevanagari-ExtraBold.woff2') format('woff2'),
                        url('https://${domain_name}/subset-AnekDevanagari-ExtraBold.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Mukta';
                        font-style: normal;
                        font-weight: 400;
                        src: url('https://${domain_name}/subset-Mukta-Regular.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Mukta-Regular.woff') format('woff');
                    }
                    `,
                primaryFont: "Anek Devanagari",
                secondaryFont: 'Mukta',
                tertiaryFont: 'Anek Devanagari',
                styleProperties: STYLE_PROPERTIES_HINDI,
                adsBeyond: 'https://rtbcdn.andbeyond.media/prod-global-3085440.js',
                facebookVerification: 'j4krzoxc1rgvuhnvcp394n25t705gt',
                twitterUrl: 'https://x.com/Republic_Bharat',
                facebookUrl: 'https://www.facebook.com/RepublicBharatHindi',
                linkdenUrl: 'https://www.linkedin.com/company/republic-bharat',
                instaUrl: 'https://www.facebook.com/RepublicBharatHindi',
                youtubeUrl: 'https://youtube.com/@RepublicTVBharat',
                fb_admins: '100022662586814',
                fb_app_id: '2414631332262532',
                fb_pages: '1437145013080740'
            };
        }
        else if (domain[environment].rbusiness.domains.includes(domain_name)) {
            envConfig = {
                name: "Republic Business",
                language: "RB",
                lang: "en",
                prefix: "prefix",
                domainName: domain_name,
                status: true,
                processComplete: true,
                siteName: 'Republic Business',
                siteLogo: 'https://img.republicworld.com/icons/icons/businessLogo.svg',
                siteIcon: 'Republic Business',
                notificationIcon: 'https://img.republicworld.com/icons/icons/rbusiness-logo.svg',
                logoHeight: '56px',
                logoWidth: '430px',
                globalCSS: "story.css",
                adsFile: BusinessAds,
                vdoaiId: 'v-republicbiz',
                OutOfPageSlotWeb: '/222812108/Interstitial_Adunit/Republic_Business_Desktop_Interstitial',
                OutOfPageSlotMWeb: '/222812108/Interstitial_Adunit/Republic_Business_Mweb_Interstitial',
                WebStoriesAd: '/222812108/Republic_Webstories/Republic_webstories_business',
                bgColor: '#FFF0E2',
                textColor: '#000000',
                footerBgColor: "#FFE8D2",
                footerTextColor: "#00000",
                navBarTextColor: '#000000',
                navBarBgColor: '#FFE8D2',
                facebookPageId: 'facebook id',
                facebookAccessToken: 'facebook',
                ampMgTag: `<amp-embed width="600" height="600" layout="responsive" type="mgid" data-publisher="republicworld.com" data-widget="1617460" data-container="M958314ScriptRootC1617460" data-block-on-consent="_till_responded"></amp-embed>`,
                gaCode: domain[environment].rbusiness.gaCode,
                gaCodeMgid: domain[environment].rbusiness.gaCodeMgid,
                gtmAmpCode: domain[environment].rbusiness.gtmAmpCode,
                gtmCode: domain[environment].rbusiness.gtmCode,
                streamId: domain[environment].rbusiness.streamId,
                bingMsID: domain[environment].rbusiness.bingMsID,
                domains: domain[environment].rbusiness.domains,
                mgWidgetId: '1621801',
                googleSiteVerification: domain[environment].rbusiness.googleSiteVerification,
                googleNewsLink: 'https://news.google.com/publications/CAAqBwgKMMGSkQswztSlAw?hl=en-IN&gl=IN&ceid=IN%3Aen',
                robotsFilePath: domain[environment].rbusiness.robotsFilePath,
                robotsfollowMeta: domain[environment].rbusiness.robotsfollowMeta,
                sidebar: {
                    bgColor: "#E5D9E9", primaryColor: "#000000",
                    secondaryColor: "#D10014",
                },
                allDomainList: domain[environment].rbusiness.allDomainList,
                productionUrl: 'https://www.republicbiz.com',
                fontFiles: [
                    `https://${domain_name}/subset-Inter-Regular.woff`,
                    `https://${domain_name}/subset-Inter-Regular.woff`
                ],
                sveltekitStyle: `
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 400;
                        src: url('https://${domain_name}/subset-Inter-Regular.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Regular.woff') format('woff');
                    }
    
                     @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-Inter-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Medium.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 600;
                        src: url('https://${domain_name}/subset-Inter-SemiBold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-SemiBold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 700;
                        src: url('https://${domain_name}/subset-Inter-Bold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Bold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 900;
                        src: url('https://${domain_name}/subset-Inter-Black.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Black.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Libre Franklin';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-LibreFranklin-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-LibreFranklin-Medium.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Mulish';
                        font-style: normal;
                        font-weight: 400;
                        src: url('https://${domain_name}/mulish-regular-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/mulish-regular-webfont.woff') format('woff');
                    }
                    `,
                primaryFont: 'Inter',
                secondaryFont: 'Mulish',
                tertiaryFont: 'Libre Franklin',
                styleProperties: STYLE_PROPERTIES_BUISINESS,
                adsBeyond: 'https://rtbcdn.andbeyond.media/prod-global-311927.js',
                facebookVerification: 'kllatt3ieu2u2e8bnidd0yh94i50ie',
                twitterUrl: 'https://x.com/RepublicBiz',
                facebookUrl: 'https://www.facebook.com/RepublicBusinesss',
                linkdenUrl: 'https://www.linkedin.com/company/republic-business/',
                instaUrl: 'https://www.facebook.com/RepublicBharatHindi',
                youtubeUrl: 'https://www.youtube.com/@RepublicBusiness',
                fb_admins: '100022662586814',
                fb_app_id: '940202724391331',
                fb_pages: '812982372214167'
            };
        }
        else if (domain[environment].rbangla.domains.includes(domain_name)) {
            envConfig = {
                name: "Republic Bangla",
                language: "B",
                lang: "en",
                prefix: "prefix",
                domainName: domain_name,
                status: true,
                processComplete: true,
                siteName: 'Republic Bangla',
                siteLogo: 'https://img.republicworld.com/logo/bangla/republic-logo-bangla.svg',
                siteIcon: 'Republic Bangla',
                notificationIcon: 'https://img.republicworld.com/icons/icons/republic-logo-bangla.svg',
                logoHeight: '',
                logoWidth: '230px',
                globalCSS: "story.css",
                adsFile: BanglaAds,
                vdoaiId: 'v-republicbiz',
                OutOfPageSlotWeb: '/222812108/Interstitial_Adunit/Republic_Bangala_Desktop_Interstitial',
                OutOfPageSlotMWeb: '/222812108/Interstitial_Adunit/Republic_Bangala_Mweb_Interstitial',
                WebStoriesAd: '/222812108/Republic_Webstories/Republic_webstories_english',
                bgColor: '#FFFFFF',
                textColor: '#000000',
                footerBgColor: "#FFE8D2",
                footerTextColor: "#00000",
                navBarTextColor: '#000000',
                navBarBgColor: '#FFFFFF',
                facebookPageId: 'facebook id',
                facebookAccessToken: 'facebook',
                gaCode: domain[environment].rbangla.gaCode,
                gaCodeMgid: domain[environment].rbangla.gaCodeMgid,
                gtmAmpCode: domain[environment].rbangla.gtmAmpCode,
                gtmCode: domain[environment].rbangla.gtmCode,
                streamId: domain[environment].rbangla.streamId,
                bingMsID: domain[environment].rbangla.bingMsID,
                domains: domain[environment].rbangla.domains,
                mgWidgetId: '1617473',
                ampMgTag: `<amp-embed width="600" height="600" layout="responsive" type="mgid" data-publisher="bangla.republicworld.com" data-widget="1617474" data-container="M958318ScriptRootC1617474" data-block-on-consent="_till_responded"></amp-embed>`,
                googleSiteVerification: domain[environment].rbangla.googleSiteVerification,
                googleNewsLink: 'https://news.google.com/publications/CAAqBwgKMMGSkQswztSlAw?hl=en-IN&gl=IN&ceid=IN%3Aen',
                robotsFilePath: domain[environment].rbangla.robotsFilePath,
                sidebar: {
                    bgColor: "#E5D9E9", primaryColor: "#000000",
                    secondaryColor: "#D10014",
                },
                allDomainList: domain[environment].rbangla.allDomainList,
                productionUrl: 'https://www.republicbangla.co.in',
                fontFiles: [
                    `https://${domain_name}/subset-Inter-Regular.woff2`,
                    `https://${domain_name}/subset-Inter-Regular.woff`
                ],
                sveltekitStyle: `
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 400;
                        src: url('https://${domain_name}/subset-Inter-Regular.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Regular.woff') format('woff');
                    }
    
                     @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-Inter-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Medium.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 600;
                        src: url('https://${domain_name}/subset-Inter-SemiBold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-SemiBold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 700;
                        src: url('https://${domain_name}/subset-Inter-Bold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Bold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 900;
                        src: url('https://${domain_name}/subset-Inter-Black.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Black.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Libre Franklin';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-LibreFranklin-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-LibreFranklin-Medium.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Mulish';
                        font-style: normal;
                        font-weight: 400;
                        src: url('https://${domain_name}/mulish-regular-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/mulish-regular-webfont.woff') format('woff');
                    }
                    `,
                primaryFont: 'Inter',
                secondaryFont: 'Mulish',
                tertiaryFont: 'Libre Franklin',
                styleProperties: STYLE_PROPERTIES_BUISINESS,
                adsBeyond: 'https://rtbcdn.andbeyond.media/prod-global-311927.js',
                robotsfollowMeta: domain[environment].rbangla.robotsfollowMeta,
                facebookVerification: '4449minujdj8qkjcevmlecu7rjvgbw',
                twitterUrl: 'https://x.com/BanglaRepublic/',
                facebookUrl: 'https://www.facebook.com/RepublicBangla/',
                linkdenUrl: 'https://www.linkedin.com/company/republic-bangla-co-in/',
                youtubeUrl: 'https://youtube.com/@republicbangla',
                fb_admins: '100022662586814',
                fb_app_id: '1844715279113959',
                fb_pages: '101001348643817'
            };
        }
        else if (domain[environment].rkannada.domains.includes(domain_name)) {
            envConfig = {
                name: "Republic Kannada",
                language: "KA",
                lang: "en",
                prefix: "prefix",
                domainName: domain_name,
                status: true,
                processComplete: true,
                siteName: 'Republic Kannada',
                siteLogo: 'https://img.republicworld.com/logo/kannada/R.Kannada-logo.svg',
                siteIcon: 'Republic Kannada',
                notificationIcon: 'https://img.republicworld.com/icons/icons/RKannada_logo.svg',
                logoHeight: '',
                logoWidth: '230px',
                globalCSS: "kannada-global.css",
                adsFile: KannadaAds,
                vdoaiId: 'v-republicbiz',
                OutOfPageSlotWeb: '/222812108/Interstitial_Adunit/Republic_kannada_Desktop_Interstitial',
                OutOfPageSlotMWeb: '/222812108/Interstitial_Adunit/Republic_kannada_Mweb_Interstitial',
                WebStoriesAd: '/222812108/Republic_Webstories/Republic_webstories_english',
                bgColor: '#F5F5F5',
                textColor: '#000000',
                footerBgColor: "#FFF0F0",
                footerTextColor: "#00000",
                navBarTextColor: '#000000',
                navBarBgColor: '#FFE8D2',
                facebookPageId: 'facebook id',
                facebookAccessToken: 'facebook',
                gaCode: domain[environment].rkannada.gaCode,
                gaCodeMgid: domain[environment].rkannada.gaCodeMgid,
                gtmAmpCode: domain[environment].rkannada.gtmAmpCode,
                gtmCode: domain[environment].rkannada.gtmCode,
                streamId: domain[environment].rkannada.streamId,
                bingMsID: domain[environment].rkannada.bingMsID,
                domains: domain[environment].rkannada.domains,
                mgWidgetId: '1617468',
                ampMgTag: `<amp-embed width="600" height="600" layout="responsive" type="mgid" data-publisher="kannada.republicworld.com" data-widget="1617469" data-container="M958317ScriptRootC1617469" data-block-on-consent="_till_responded"></amp-embed>`,
                googleSiteVerification: domain[environment].rkannada.googleSiteVerification,
                googleNewsLink: 'https://news.google.com/publications/CAAqBwgKMMGSkQswztSlAw?hl=en-IN&gl=IN&ceid=IN%3Aen',
                robotsFilePath: domain[environment].rkannada.robotsFilePath,
                sidebar: {
                    bgColor: "#E5D9E9", primaryColor: "#000000",
                    secondaryColor: "#D10014",
                },
                allDomainList: domain[environment].rkannada.allDomainList,
                productionUrl: 'https://www.republickannada.co.in',
                fontFiles: [
                    `https://${domain_name}/subset-Inter-Regular.woff2`,
                    `https://${domain_name}/subset-Inter-Regular.woff`
                ],
                sveltekitStyle: `
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 400;
                        src: url('https://${domain_name}/subset-Inter-Regular.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Regular.woff') format('woff');
                    }
    
                     @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-Inter-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Medium.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 600;
                        src: url('https://${domain_name}/subset-Inter-SemiBold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-SemiBold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 700;
                        src: url('https://${domain_name}/subset-Inter-Bold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Bold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 900;
                        src: url('https://${domain_name}/subset-Inter-Black.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Black.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Libre Franklin';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-LibreFranklin-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-LibreFranklin-Medium.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Mulish';
                        font-style: normal;
                        font-weight: 400;
                        src: url('https://${domain_name}/mulish-regular-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/mulish-regular-webfont.woff') format('woff');
                    }
                    `,
                primaryFont: 'Inter',
                secondaryFont: 'Mulish',
                tertiaryFont: 'Libre Franklin',
                styleProperties: STYLE_PROPERTIES_BUISINESS,
                adsBeyond: 'https://rtbcdn.andbeyond.media/prod-global-311927.js',
                robotsfollowMeta: domain[environment].rkannada.robotsfollowMeta,
                facebookVerification: 'lv0ixsgp44efy4ag37uwmny26v989u',
                fb_admins: '',
                fb_app_id: '',
                fb_pages: ''
            };
        }
        else if (domain[environment].rmarathi.domains.includes(domain_name)) {
            envConfig = {
                name: "Republic Marathi",
                language: "MH",
                lang: "en",
                prefix: "prefix",
                domainName: domain_name,
                status: true,
                processComplete: true,
                siteName: 'Republic World',
                siteLogo: 'https://img.republicworld.com/logo/marathi/R.MARATHI1.svg',
                siteIcon: 'Republic World',
                notificationIcon: 'https://img.republicworld.com/icons/icons/R-Digital.svg',
                logoHeight: '',
                logoWidth: '200px',
                globalCSS: "hindi-global.css",
                adsFile: EnglishAds,
                vdoaiId: 'v-republicworld-v8',
                OutOfPageSlotWeb: '/222812108/Interstitial_Adunit/Republic_English_Desktop_Interstitial',
                OutOfPageSlotMWeb: '/222812108/Interstitial_Adunit/Republic_English_Mweb_Interstitial',
                WebStoriesAd: '/222812108/Republic_Webstories/Republic_webstories_english',
                bgColor: '#F5F5F5',
                navigationBgColor: '#F5F5F5',
                textColor: '#00000',
                footerBgColor: "#FFF0F0",
                footerTextColor: "#00000",
                navBarTextColor: 'navBarText',
                navBarBgColor: '#F5F5F5',
                facebookPageId: 'facebook id',
                facebookAccessToken: 'facebook',
                gaCode: domain[environment].rmarathi.gaCode,
                gaCodeMgid: domain[environment].rmarathi.gaCodeMgid,
                gtmAmpCode: domain[environment].rmarathi.gtmAmpCode,
                gtmCode: domain[environment].rmarathi.gtmCode,
                bingMsID: domain[environment].rmarathi.bingMsID,
                mgWidgetId: '1617455',
                ampMgTag: `<amp-embed width="600" height="600" layout="responsive" type="mgid" data-publisher="republicworld.com" data-widget="1617460" data-container="M958314ScriptRootC1617460" data-block-on-consent="_till_responded"></amp-embed>`,
                googleSiteVerification: domain[environment].rworld.googleSiteVerification,
                googleNewsLink: 'https://news.google.com/publications/CAAqBwgKMMGSkQswztSlAw?hl=en-IN&gl=IN&ceid=IN%3Aen',
                robotsFilePath: domain[environment].rmarathi.robotsFilePath,
                robotsfollowMeta: domain[environment].rmarathi.robotsfollowMeta,
                sidebar: {
                    bgColor: '#D10014', primaryColor: "#000000",
                    secondaryColor: "#D10014",
                },
                allDomainList: domain[environment].rmarathi.allDomainList,
                productionUrl: 'https://www.republicmarathi.in',
                fontFiles: [
                    `https://${domain_name}/subset-AnekDevanagari-Regular.woff2`,
                    `https://${domain_name}/subset-AnekDevanagari-Regular.woff`
                ],
                sveltekitStyle: `
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 400;
                        src: url('https://${domain_name}/subset-AnekDevanagari-Regular.woff2') format('woff2'),
                            url('https://${domain_name}/subset-AnekDevanagari-Regular.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-AnekDevanagari-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-AnekDevanagari-Medium.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 600;
                        src: url('https://${domain_name}/subset-AnekDevanagari-SemiBold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-AnekDevanagari-SemiBold.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 700;
                        src: url('https://${domain_name}/subset-AnekDevanagari-Bold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-AnekDevanagari-Bold.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Anek Devanagari';
                        font-weight: 800;
                        src: url('https://${domain_name}/subset-AnekDevanagari-ExtraBold.woff2') format('woff2'),
                        url('https://${domain_name}/subset-AnekDevanagari-ExtraBold.woff') format('woff');
                    }
                    
                    @font-face {
                        font-display: swap;
                        font-family: 'Mukta';
                        font-style: normal;
                        font-weight: 400;
                        src: url('https://${domain_name}/subset-Mukta-Regular.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Mukta-Regular.woff') format('woff');
                    }
                    `,
                primaryFont: "Anek Devanagari",
                secondaryFont: 'Mukta',
                tertiaryFont: 'Anek Devanagari',
                styleProperties: STYLE_PROPERTIES_HINDI,
                adsBeyond: 'https://rtbcdn.andbeyond.media/prod-global-311927.js',
                facebookVerification: '',
                fb_admins: '',
                fb_app_id: '',
                fb_pages: ''
            };
        }
        else if (domain[environment].rgujarati.domains.includes(domain_name)) {
            envConfig = {
                name: "Republic Gujarati",
                language: "GJ",
                lang: "en",
                prefix: "prefix",
                domainName: domain_name,
                status: true,
                processComplete: true,
                siteName: 'Republic Bangla',
                siteLogo: 'https://img.republicworld.com/logo/gujrati/Gujrati.svg',
                siteIcon: 'Republic Bangla',
                notificationIcon: 'https://img.republicworld.com/icons/icons/rbusiness-logo.svg',
                logoHeight: '',
                logoWidth: '200px',
                globalCSS: "story.css",
                adsFile: BusinessAds,
                vdoaiId: 'v-republicbiz',
                OutOfPageSlotWeb: '/222812108/Interstitial_Adunit/Republic_English_Desktop_Interstitial',
                OutOfPageSlotMWeb: '/222812108/Interstitial_Adunit/Republic_English_Mweb_Interstitial',
                WebStoriesAd: '/222812108/Republic_Webstories/Republic_webstories_english',
                bgColor: '#F5F5F5',
                navigationBgColor: '#F5F5F5',
                textColor: '#00000',
                footerBgColor: "#FFF0F0",
                footerTextColor: "#00000",
                navBarTextColor: 'navBarText',
                navBarBgColor: '#F5F5F5',
                facebookPageId: 'facebook id',
                facebookAccessToken: 'facebook',
                gaCode: domain[environment].rgujarati.gaCode,
                gaCodeMgid: domain[environment].rgujarati.gaCodeMgid,
                gtmAmpCode: domain[environment].rgujarati.gtmAmpCode,
                gtmCode: domain[environment].rgujarati.gtmCode,
                bingMsID: domain[environment].rgujarati.bingMsID,
                mgWidgetId: '1617455',
                ampMgTag: `<amp-embed width="600" height="600" layout="responsive" type="mgid" data-publisher="republicworld.com" data-widget="1617460" data-container="M958314ScriptRootC1617460" data-block-on-consent="_till_responded"></amp-embed>`,
                googleSiteVerification: domain[environment].rgujarati.googleSiteVerification,
                googleNewsLink: 'https://news.google.com/publications/CAAqBwgKMMGSkQswztSlAw?hl=en-IN&gl=IN&ceid=IN%3Aen',
                robotsFilePath: domain[environment].rgujarati.robotsFilePath,
                robotsfollowMeta: domain[environment].rgujarati.robotsfollowMeta,
                sidebar: {
                    bgColor: "#E5D9E9", primaryColor: "#000000",
                    secondaryColor: "#D10014",
                },
                allDomainList: domain[environment].rgujarati.allDomainList,
                productionUrl: 'https://www.gujarati.republicgujarati.in',
                fontFiles: [
                    `https://${domain_name}/subset-Inter-Regular.woff2`,
                    `https://${domain_name}/subset-Inter-Regular.woff`
                ],
                sveltekitStyle: `
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 400;
                        src: url('https://${domain_name}/subset-Inter-Regular.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Regular.woff') format('woff');
                    }
    
                     @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-Inter-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Medium.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 600;
                        src: url('https://${domain_name}/subset-Inter-SemiBold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-SemiBold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 700;
                        src: url('https://${domain_name}/subset-Inter-Bold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Bold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 900;
                        src: url('https://${domain_name}/subset-Inter-Black.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Black.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Libre Franklin';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-LibreFranklin-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-LibreFranklin-Medium.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Mulish';
                        font-style: normal;
                        font-weight: 400;
                        src: url('https://${domain_name}/mulish-regular-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/mulish-regular-webfont.woff') format('woff');
                    }
                    `,
                primaryFont: 'Inter',
                secondaryFont: 'Mulish, sans-serif',
                tertiaryFont: 'Libre Franklin,serif',
                styleProperties: STYLE_PROPERTIES_BUISINESS,
                adsBeyond: 'https://rtbcdn.andbeyond.media/prod-global-311927.js',
                facebookVerification: ''
            };;
        }
        else if (domain[environment].rpunjabi.domains.includes(domain_name)) {
            envConfig = {
                name: "Republic Punjabi",
                language: "PB",
                lang: "en",
                prefix: "prefix",
                domainName: domain_name,
                status: true,
                processComplete: true,
                siteName: 'Republic Punjabi',
                siteLogo: 'https://img.republicworld.com/icons/icons/businessLogo.svg',
                siteIcon: 'Republic Bangla',
                notificationIcon: 'https://img.republicworld.com/icons/icons/rbusiness-logo.svg',
                logoHeight: '56px',
                logoWidth: '430px',
                globalCSS: "story.css",
                adsFile: BusinessAds,
                vdoaiId: 'v-republicbiz',
                OutOfPageSlotWeb: '/222812108/Interstitial_Adunit/Republic_English_Desktop_Interstitial',
                OutOfPageSlotMWeb: '/222812108/Interstitial_Adunit/Republic_English_Mweb_Interstitial',
                WebStoriesAd: '/222812108/Republic_Webstories/Republic_webstories_english',
                bgColor: '#FFF0E2',
                textColor: '#000000',
                footerBgColor: "#FFE8D2",
                footerTextColor: "#00000",
                navBarTextColor: '#000000',
                navBarBgColor: '#FFE8D2',
                facebookPageId: 'facebook id',
                facebookAccessToken: 'facebook',
                gaCode: domain[environment].rpunjabi.gaCode,
                gaCodeMgid: domain[environment].rpunjabi.gaCodeMgid,
                gtmAmpCode: domain[environment].rpunjabi.gtmAmpCode,
                gtmCode: domain[environment].rpunjabi.gtmCode,
                bingMsID: domain[environment].rpunjabi.bingMsID,
                mgWidgetId: '1617455',
                ampMgTag: `<amp-embed width="600" height="600" layout="responsive" type="mgid" data-publisher="republicworld.com" data-widget="1617460" data-container="M958314ScriptRootC1617460" data-block-on-consent="_till_responded"></amp-embed>`,
                googleSiteVerification: domain[environment].rpunjabi.googleSiteVerification,
                googleNewsLink: 'https://news.google.com/publications/CAAqBwgKMMGSkQswztSlAw?hl=en-IN&gl=IN&ceid=IN%3Aen',
                robotsFilePath: domain[environment].rpunjabi.robotsFilePath,
                robotsfollowMeta: domain[environment].rpunjabi.robotsfollowMeta,
                sidebar: {
                    bgColor: "#E5D9E9", primaryColor: "#000000",
                    secondaryColor: "#D10014",
                },
                allDomainList: domain[environment].rpunjabi.allDomainList,
                fontFiles: [
                    `https://${domain_name}/subset-Inter-Regular.woff2`,
                    `https://${domain_name}/subset-Inter-Regular.woff`
                ],
                sveltekitStyle: `
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 400;
                        src: url('https://${domain_name}/subset-Inter-Regular.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Regular.woff') format('woff');
                    }
    
                     @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-Inter-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Medium.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 600;
                        src: url('https://${domain_name}/subset-Inter-SemiBold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-SemiBold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 700;
                        src: url('https://${domain_name}/subset-Inter-Bold.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Bold.woff') format('woff');
                    }
    
                    @font-face {
                        font-display: swap;
                        font-family: 'Inter';
                        font-weight: 900;
                        src: url('https://${domain_name}/subset-Inter-Black.woff2') format('woff2'),
                            url('https://${domain_name}/subset-Inter-Black.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Libre Franklin';
                        font-weight: 500;
                        src: url('https://${domain_name}/subset-LibreFranklin-Medium.woff2') format('woff2'),
                            url('https://${domain_name}/subset-LibreFranklin-Medium.woff') format('woff');
                    }
                    @font-face {
                        font-display: swap;
                        font-family: 'Mulish';
                        font-style: normal;
                        font-weight: 400;
                        src: url('https://${domain_name}/mulish-regular-webfont.woff2') format('woff2'),
                            url('https://${domain_name}/mulish-regular-webfont.woff') format('woff');
                    }
                    `,
                primaryFont: 'Inter',
                secondaryFont: 'Mulish, sans-serif',
                tertiaryFont: 'Libre Franklin,serif',
                styleProperties: STYLE_PROPERTIES_BUISINESS,
                adsBeyond: 'https://rtbcdn.andbeyond.media/prod-global-311927.js',
                facebookVerification: ''
            };
        } else {
            if (envConfig === undefined) {
                envConfig = {
                    name: "English",
                    language: "E",
                    lang: "en",
                    prefix: "prefix",
                    domainName: "svelte republic world",
                    status: true,
                    processComplete: true,
                    siteName: 'Republic World',
                    siteLogo: 'https://img.republicworld.com/logo/english/republic-logo2.svg',
                    siteIcon: 'Republic World',
                    notificationIcon: 'https://img.republicworld.com/icons/icons/R-Digital.svg',
                    logoHeight: '43px',
                    logoWidth: '304px',
                    globalCSS: "story.css",
                    adsFile: EnglishAds,
                    vdoaiId: 'v-republicworld-v8',
                    OutOfPageSlotWeb: '/222812108/Interstitial_Adunit/Republic_English_Desktop_Interstitial',
                    OutOfPageSlotMWeb: '/222812108/Interstitial_Adunit/Republic_English_Mweb_Interstitial',
                    WebStoriesAd: '/222812108/Republic_Webstories/Republic_webstories_english',
                    bgColor: '#F5F5F5',
                    textColor: '#00000',
                    footerBgColor: "#FFF0F0",
                    footerTextColor: "#00000",
                    navBarTextColor: 'navBarText',
                    navBarBgColor: '#F5F5F5',
                    facebookPageId: 'facebook id',
                    facebookAccessToken: 'facebook',
                    gaCode: domain.development.rworld.gaCode,
                    gaCodeMgid: domain.development.rworld.gaCodeMgid,
                    gtmAmpCode: domain.development.rworld.gtmAmpCode,
                    gtmCode: domain.development.rworld.gtmCode,
                    bingMsID: domain.development.rworld.bingMsID,
                    mgWidgetId: '1617455',
                    ampMgTag: `<amp-embed width="600" height="600" layout="responsive" type="mgid" data-publisher="republicworld.com" data-widget="1617460" data-container="M958314ScriptRootC1617460" data-block-on-consent="_till_responded"></amp-embed>`,
                    googleSiteVerification: domain.development.rworld.googleSiteVerification,
                    googleNewsLink: 'https://news.google.com/publications/CAAqBwgKMMGSkQswztSlAw?hl=en-IN&gl=IN&ceid=IN%3Aen',
                    robotsFilePath: domain.development.rworld.robotsFilePath,
                    robotsfollowMeta: false,
                    sidebar: {
                        bgColor: '#D10014', primaryColor: "#000000",
                        secondaryColor: "black",
                    },
                    allDomainList: domain.development.rworld.allDomainList,
                    productionUrl: 'https://www.republicworld.com',
                    fontFiles: [
                        `https://${domain_name}/notosans-regular-webfont.woff2`,
                        `https://${domain_name}/notosans-regular-webfont.woff`
                    ],
                    sveltekitStyle: `
                                @font-face {
                                    font-display: swap;
                                    font-family: 'Noto Sans';
                                    font-weight: 400;
                                    src: url('https://${domain_name}/notosans-regular-webfont.woff2') format('woff2'),
                                        url('https://${domain_name}/notosans-regular-webfont.woff') format('woff');
                                }
                
                                @font-face {
                                    font-display: swap;
                                    font-family: 'Noto Sans';
                                    font-weight: 500;
                                    src: url('https://${domain_name}/notosans-medium-webfont.woff2') format('woff2'),
                                        url('https://${domain_name}/notosans-medium-webfont.woff') format('woff');
                                }
                                
                                @font-face {
                                    font-display: swap;
                                    font-family: 'Noto Sans';
                                    font-weight: 600;
                                    src: url('https://${domain_name}/notosans-semibold-webfont.woff2') format('woff2'),
                                        url('https://${domain_name}/notosans-semibold-webfont.woff') format('woff');
                                }
                                
                                @font-face {
                                    font-display: swap;
                                    font-family: 'Noto Sans';
                                    font-weight: 700;
                                    src: url('https://${domain_name}/notosans-bold-webfont.woff2') format('woff2'),
                                        url('https://${domain_name}/notosans-bold-webfont.woff') format('woff');
                                }
                                
                                @font-face {
                                    font-display: swap;
                                    font-family: 'Noto Sans';
                                    font-weight: 900;
                                    src: url('https://${domain_name}/notosans-black-webfont.woff2') format('woff2'),
                                        url('https://${domain_name}/notosans-black-webfont.woff') format('woff');
                                }
                                @font-face {
                                    font-family: 'Noto Serif';
                                    src: url('https://${domain_name}/NotoSerif-Medium.woff2') format('woff2'),
                                        url('https://${domain_name}/NotoSerif-Medium.woff') format('woff');
                                    font-weight: 500;
                                    font-style: normal;
                                    font-display: swap;
                                }
                
                                @font-face {
                                    font-display: swap;
                                    font-family: 'Mulish';
                                    font-style: normal;
                                    font-weight: 400;
                                    src: url('https://${domain_name}/mulish-regular-webfont.woff2') format('woff2'),
                                        url('https://${domain_name}/mulish-regular-webfont.woff') format('woff');
                                }
                    `,
                    primaryFont: "'Noto Sans',sans-serif , -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;",
                    secondaryFont: "'Mulish, sans-serif', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;",
                    tertiaryFont: "'Noto Serif,sans-serif', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;",
                    styleProperties: STYLE_PROPERTIES_ENGLISH,
                    adsBeyond: 'https://rtbcdn.andbeyond.media/prod-global-311927.js',
                    facebookVerification: '',
                    twitterUrl: 'https://x.com/republic',
                    facebookUrl: 'https://www.facebook.com/RepublicWorld',
                    linkdenUrl: 'https://www.linkedin.com/company/republic-world',
                    instaUrl: 'https://www.instagram.com/republicworld/',
                    youtubeUrl: 'https://youtube.com/@RepublicWorld',
                    fb_admins: '100022662586814',
                    fb_app_id: '1844715279113959',
                    fb_pages: '1159346367512575'
                };
            }
        }
    })
    return envConfig;
}
