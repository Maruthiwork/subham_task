export interface ImageAspectRatioInterface {
    key: string;
    value: number;
    display: string;
    defaultImage?: string;
}

export interface ImageDimensionsInterface {
    Desktop: {
      bannerImage: {
        width: string;
      };
      smallThumbnail: {
        width: string;
        height: string;
      };
      mediumThumbnail: {
        width: string;
        height: string;
      };
      largeThumbnail: {
        width: string;
        height: string;
      };
      verticalThumbnail: {
        width: string;
        height: string;
      };
      squareImages: {
        width: string;
        height: string;
      };
    };
    Mobile: {
      bannerImage: {
        width: string;
      };
      smallThumbnail: {
        width: string;
        height: string;
      };
      mediumThumbnail: {
        width: string;
        height: string;
      };
      largeThumbnail: {
        width: string;
        height: string;
      };
      verticalQuickThumbnail: {
        width: string;
        height: string;
      };
      squareImages: {
        width: string;
        height: string;
      };
    };
}

export interface ImageVersions {
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
  
export interface ImagesData {
    versions: {
      "16_9": ImageVersions;
      "1_1": ImageVersions;
      "4_3": ImageVersions;
      "9_16": ImageVersions;
      "3_4": ImageVersions;
      file: ImageVersions;
    };
  }
  
export interface Images {
    images: ImagesData;
  }
  