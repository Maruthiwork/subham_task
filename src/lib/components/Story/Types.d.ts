export interface DeepFocusContent {
  id: string;
  header: string;
  text: string;
  updatedAt: string; // Assuming this is a date string
}

export interface DeepFocusMediaItem {
  id: string;
  title: string;
  image: string;
}

export interface DeepFocus {
  content: DeepFocusContent[];
  media_items: DeepFocusMediaItem[];
}


export interface NewsStory {
    descriptionContent: any[]; // You may want to define a specific interface for description content
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
    deep_focus: DeepFocus;
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

export interface AdSlotUsage {
    adSlotIndex: number;
    usageCount: number;
  }
export interface StoryDetails {
  story:NewsStory[];
  scroll_stories:[]
} 

export interface RightSidebarWidget {
  selectedCategories: {
    l1: string | null;
    l2: string | null;
    l3: string | null;
    l4: string | null;
  };
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
  tags: string[];
  pinStories: any[]; // Update the type accordingly based on the actual data structure
  pinDebate: any[]; // Update the type accordingly based on the actual data structure
  maxStories: number;
  anchor: any[]; // Update the type accordingly based on the actual data structure
  pinPlaylist: any[]; // Update the type accordingly based on the actual data structure
  categoryPin: any[]; // Update the type accordingly based on the actual data structure
  groupPin: any[]; // Update the type accordingly based on the actual data structure
  _id: string;
  createdAt: string;
  updatedAt: string;
  lang: string;
  moreUrl: string;
  id: string;
}

export interface RightSidebarData {
  recommended: {
    widget: RightSidebarWidget;
    story: RightSidebarStory[];
  };
  trendingquick: {
    widget: RightSidebarWidget;
    story: RightSidebarStory[];
  };
  topfive: {
    widget: RightSidebarWidget;
    story: RightSidebarStory[];
  };
}
  
export interface Breadcrumb {
  name: string;
  slug: string;
}