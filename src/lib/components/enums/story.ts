export enum ContentType {
    STORY = 'STORY',
    'WEB-STORIES' = 'WEB-STORIES',
    SHORT = 'SHORT',
    QUICK = 'QUICK',
    DEBATE = 'DEBATE',
    PLAYLIST = 'PLAYLIST'
}

export enum DEVICE {
    MOBILE = 'mobile',
    DESKTOP = 'desktop'
}

export enum COMPONENT_TYPE {
    SmallStoryCard = 'SmallStoryCard',
    StoryCard = 'StoryCard',
    GRID_1B1S_6S = 'GRID_1B1S_6S',
    GRID_1B_4S = 'GRID_1B_4S'
}

export enum TEMPLATE_TYPE {
    DEFAULT = 'DEFAULT',
    BIG = 'BIG',
    MEDIUM = 'MEDIUM',
    NO_IMAGE = 'NOIMAGE',
    FLIP = 'FLIP',
    ANCHOR_STORY = 'ANCHOR_STORY',
    ANCHOR_STORY_FLIP ='ANCHOR_STORY_FLIP'
}


export const STORY_TYPE = {
    REGULAR: {
        display: 'Text Story',
        value: 'REGULAR',
    },
    DEEP_FOCUS: {
        display: 'Deep focus Story',
        value: 'DEEP-FOCUS',
    },
    LIVE_BLOG: {
        display: 'Live Blog Story',
        value: 'LIVE-BLOG',
    },
    OPINION: {
        display: 'Opinion Story',
        value: 'OPINION',
    },
    VIDEO: {
        display: 'Video Story',
        value: 'VIDEO',
    },
    GALLERY: {
        display: 'Gallery Story',
        value: 'GALLERY',
    },
    DEBATE: {
        display: 'Debate Story',
        value: 'DEBATE',
    },
    SHOW: {
        display: 'Show Story',
        value: 'SHOW',
    },
    SHORT: {
        display: 'Short Story',
        value: 'SHORT',
    },
    WEB_STORY: {
        display: 'Web Story',
        value: 'WEB-STORIES',
    },
    AGENCY: {
        display: 'Agency Story',
        value: 'AGENCY',
    }
}