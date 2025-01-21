export interface NewsStory {
    descriptionContent: any;
    _id: string;
    lang: string;
    news_type: string;
    category_id: string;
    subcategory_id: string;
    l3_category_id: string | null;
    l4_category_id: string | null;
    story_type: string;
    word_count: number;
    extra_added_tags: any[]
    categoryData?: any[];
    interlinks_story: any[]; // You may want to define a specific interface for this array
    tags: string[]; // You may want to define a specific interface for tags
    short_description: string;
    description: string;
    opinion_quote: string | null;
    gallery_pictures: any[]; // You may want to define a specific interface for gallery pictures
    status: string;
    content_type: string;
    author: string;
    edited: any; // You may want to define a specific interface for edited data
    reported: any; // You may want to define a specific interface for reported data
    completeSlug: string;
    allow_comment: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    views: number;
    disclaimer: any[]; // You may want to define a specific interface for disclaimer data
    expiry: string | null;
    externalURL: string;
    hashtag: string;
    isExternal: boolean;
    keywords: string;
    long_heading: string;
    meta_description: string;
    meta_keyword: string;
    meta_title: string;
    mid_heading: string;
    prefix: string | null;
    slug: string;
    small_heading: string;
    sticker: string | null;
    summary: string;
    updatedBy: string;
    images: Record<string, any>; // You may want to define a specific interface for images
    video: {
      id: string;
      image: string;
      name: string;
      duration: string;
      source_url: string | null;
    };
    publish_at: string;
    live_blog_texts: any[]; // You may want to define a specific interface for live blog texts
    authorDetail: {
      _id: string;
      email: string;
      image: {
        title: string;
        alt: string;
        caption: string;
        source: string;
        fileName: string;
        filePath: string;
        versions: Record<string, any>; // You may want to define a specific interface for image versions
      };
      slug: string;
      name: string;
    };
    stickerData: Record<string, any>; // You may want to define a specific interface for sticker data
    prefixData: Record<string, any>; // You may want to define a specific interface for prefix data
    categoryDetail: {
      _id: string;
      name: string;
      frontend_name: string;
      color_code: string;
      font_color: string;
      slug: string;
      completeSlug: string;
    };
    subCategoryDetail: {
      _id: string;
      name: string;
      parentId: string;
      level: number;
      frontend_name: string;
      color_code: string;
      font_color: string;
      slug: string;
      completeSlug: string;
      publish: boolean;
      meta_title: string;
      meta_description: string;
      meta_keywords: string;
    };
    l3categoryData: any | null; // You may want to define a specific interface for l3 category data
    l4categoryData: any | null; // You may want to define a specific interface for l4 category data
    tagsData: any[]; // You may want to define a specific interface for tags data
    story_comment: any[]; // You may want to define a specific interface for story comment data
    editedByData: Record<string, any>; // You may want to define a specific interface for edited by data
    reportedByData: Record<string, any>; // You may want to define a specific interface for reported by data
    nextCompleteSlug: string;
    previousCompleteSlug: string;
}

export interface StoryDetails {
  story:NewsStory[];
  scroll_stories:[]
}  

export type SocialPlatformType = {
  [key: string]: {
    name: string;
    type: string;
    label: string;
    APP_ID: string;
    url: string;
    logo: string;
    height: string;
    width: string;
  }[];
};