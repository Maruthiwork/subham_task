interface ImageVersion {
    fileName: string;
    aspectRatio: string;
    filePath: string;
    size: number;
    type: string;
    title: string;
    alt: string;
    source: string;
    caption: string;
}

interface Image {
    versions: {
        "16_9": ImageVersion;
        "9_16": ImageVersion;
    };
}

interface CategoryData {
    _id: string;
    name: string;
    frontend_name: string;
    color_code: string;
    font_color: string;
    slug: string;
    completeSlug: string;
}

export interface Story {
    extraData: any;
    stickerData: any;
    prefixData: any;
    video: any;
    _id: string;
    category_id: string;
    completeSlug: string;
    createdAt: string;
    images: any;
    long_heading: string;
    mid_heading: string;
    slug: string;
    small_heading: string;
    story_type: string;
    updatedAt: string;
    video: any;
    categoryData: CategoryData;
    video:any;
    headerBgColor:string;
    headerColor:string;
    inter_link_story_list: any[]
}

interface SelectedCategories {
    l1: null;
    l2: null;
    l3: null;
    l4: null;
}

interface Widget {
    selectedCategories: SelectedCategories;
    name: string;
    position: string;
    widgetType: string;
    title: string;
    subTitle: string;
    template: string;
    contentType: string;
    storyType: string;
    recencyType: string;
    status: boolean;
    tags: any[]; // Change `any[]` to a more specific type if possible
    pinStories: any[]; // Change `any[]` to a more specific type if possible
    pinDebate: any[]; // Change `any[]` to a more specific type if possible
    maxStories: number;
    anchor: any[]; // Change `any[]` to a more specific type if possible
    pinPlaylist: any[]; // Change `any[]` to a more specific type if possible
    categoryPin: any[]; // Change `any[]` to a more specific type if possible
    groupPin: any[]; // Change `any[]` to a more specific type if possible
    _id: string;
    createdAt: string;
    updatedAt: string;
    lang: string;
    moreUrl: string;
    id: string;
}

export interface SidebarResponse {
    topfive: WidgetWithStory;
    trendingquick: WidgetWithStory;
    recommended: WidgetWithStory;
    anchors: WidgetWithStory;
    anchors: WidgetWithStory;
    mostWatched: WidgetWithStory;
    newsroomLatest: WidgetWithStory;
    top5News: WidgetWithStory;
    topShorts: WidgetWithStory;
}

export interface WidgetWithStory {
    widget: Widget;
    story: Story[];
}
