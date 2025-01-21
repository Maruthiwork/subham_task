export interface RepublicShow {
    show: string;
    slug: string;
    completeSlug: string;
}

export interface Story {
    small_heading: string;
    mid_heading: string;
    long_heading: string;
    story_type: string;
    prefix: string | null;
    slug: string;
    sticker: string | null;
    completeSlug: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface SmallStoryData {
    name: string;
    slug: string;
    type: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface Navigation {
    name: string;
    description: string;
    frontend_name: string;
    menu_name: string;
    position: number;
    slug: string;
    completeSlug: string;
}

