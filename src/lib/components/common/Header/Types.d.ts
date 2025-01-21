export interface TopNavBar {
    name: string;
    frontend_name: string;
    slug: string;
    completeSlug: string;
}

export interface StoryImageVersion {
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

export interface Story {
    _id: string;
    category_id: string;
    completeSlug: string;
    createdAt: string;
    images: {
        versions: {
            [key: string]: StoryImageVersion;
        };
    };
    lang: string;
    long_heading: string;
    mid_heading: string;
    slug: string;
    small_heading: string;
    updatedAt: string;
    categoryData: {
        _id: string;
        name: string;
        frontend_name: string;
        color_code: string;
        font_color: string;
        slug: string;
        completeSlug: string;
    };
}

export interface BottomNavBarLink {
    _id: string;
    l1: {
        name: string;
        completeSlug: string;
    };
    child: {
        category: TopNavBar[];
        stories: Story[];
    };
}

export interface MEGA_MENU {
    topNavBar: TopNavBar[];
    bottomNavBar: BottomNavBarLink[];
}
