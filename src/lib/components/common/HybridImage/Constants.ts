import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
import type { ImageAspectRatioInterface } from "./Types";
import placeholder_16_9 from "$lib/assets/no-img/16-9-placeholder.jpg";
import placeholder_3_4 from "$lib/assets/no-img/3-4-placeholder.jpg";
import placeholder_1_1 from "$lib/assets/no-img/1-1-placeholder.jpg";
import placeholder_9_16 from "$lib/assets/no-img/9-16-placeholder.jpg";
import placeholder_4_3 from "$lib/assets/no-img/3-4-placeholder.jpg";



export const IMAGE_ASPECT_RATIO: Record<string, ImageAspectRatioInterface> = {
    '16_9': {
        key: '16_9',
        value: 16 / 9,
        display: '16:9',
        defaultImage: placeholder_16_9
    },
    '1_1': {
        key: '1_1',
        value: 1 / 1,
        display: '1:1',
        defaultImage: placeholder_1_1
    },
    '4_3': {
        key: '4_3',
        value: 4 / 3,
        display: '4:3',
        defaultImage: placeholder_4_3
    },
    '3_4': {
        key: '3_4',
        value: 3 / 4,
        display: '3:4',
        defaultImage: placeholder_3_4
    },
    '9_16': {
        key: '9_16',
        value: 9 / 16,
        display: '9:16',
        defaultImage: placeholder_9_16
    }
};

export const imageDimensionProperty = {
    desktop: {
        aspectVideo: {
            lgImage: {
                width: '650',
                height: '350'
            },
            baseImage: {
                width: '480',
                height: '270'
            },
            smImage: {
                width: '236',
                height: '132'
            },
            mdImage: {
                width: '264',
                height: '148'
            },
            xsImage: {
                width: '240',
                height: '140'
            }
        },
        aspectSquare: {
            baseImage: {
                width: '240',
                height: '240'
            },
            lgImage: {
                width: '330',
                height: '330'
            }
        },
        aspectVerticalVideo: {
            baseImage: {
                width: '190',
                height: '300'
            },
            xsImage: {
                width: '190',
                height: '255'

            }
        },
        aspect4_3: {
            lgImage: {
                width: '882',
                height: '661.5'
            },
            baseImage: {
                width: '451.5',
                height: '337.5',
            },
            xsImage: {
                width: '192',
                height: '144',
            },
        }
    },
    mobile: {
        aspectVideo: {
            lgImage: {
                width: '517.5',
                height: '300'
            },
            baseImage: {
                width: '517.5',
                height: '300'
            },
            smImage: {
                width: '354',
                height: '198'
            },
            mdImage: {
                width: '396',
                height: '222'
            },
            xsImage: {
                width: '199.5',
                height: '120'
            }
        },
        aspectSquare: {
            baseImage: {
                width: '360',
                height: '360'
            },
            lgImage: {
                width: '450',
                height: '450'
            }
        },
        aspectVerticalVideo: {
            baseImage: {
                width: '255',
                height: '405'
            },
            xsImage: {
                width: '255',
                height: '337.5'
            }
        },
        aspect4_3: {
            baseImage: {
                width: '451.5',
                height: '337.5'
            },
            xsImage: {
                width: '192',
                height: '144'
            },
            lgImage: {
                width: '492',
                height: '369'
            }
        }
    }
}

export const ImageDimensions: any = {
    desktop: {
        bannerImage: {
            width: '800',
            height: '450'
        },
        ampBannerImage: {
            width: '1280',
            height: '720'
        },
        smallThumbnail: {
            width: '144',
            height: '81',
        },
        mediumThumbnail: {
            width: '398', //TODO Need to validate with Abhishek
            height: '224'
        },
        largeThumbnail: {
            width: '370',
            height: '208'
        },
        verticalThumbnail: {
            width: '189',
            height: '300',
        },
        smallVerticalThumbnail: {
            width: '189',
            height: '255',
        },
        squareImages: {
            height: '350',
            width: '350'
        }
    },
    mobile: {
        bannerImage: {
            width: '400',
            height: '225'
        },
        smallThumbnail: {
            width: '220',
            height: '130'
        },
        mediumThumbnail: {
            width: '398',
            height: '224'
        },
        largeThumbnail: {
            width: '398',
            height: '224'
        },
        verticalThumbnail: {
            width: '189',
            height: '300',
        },
        verticalQuickThumbnail: {
            width: '189',
            height: '336'
        },
        smallVerticalThumbnail: {
            width: '189',
            height: '255',
        },
        squareImages: {
            width: '375',
            height: '375'
        }
    }
}

export const getFullImageUrl = (imagePath: string, imageDimensionObj: { width: any; height: any; } | undefined, quality = 75) => {
    let baseURL = EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL;
   
    if (typeof imagePath !== 'string' || !imagePath.length) return '';

    if (imagePath?.[0] === '/') imagePath = imagePath.slice(1);
    const params = [];

    // Detect if the file is a GIF
    const isGif = imagePath?.endsWith('.gif');

    // Apply different settings if it's a GIF
    if (isGif) {
        quality = 50; // Lower quality for GIFs
        params.push(`q-${quality}`, `f-gif-lossy`, `w-500`, `e-loop-1`);
        if (imageDimensionObj?.width) {
            params[2] = `w-${imageDimensionObj.width}`; // Set width if provided
        }
        if (imageDimensionObj?.height) {
            params.push(`h-${imageDimensionObj.height}`); // Set height if provided
        }
    } else {
        // Standard parameters for non-GIFs
        if (imageDimensionObj?.width) {
            params.push(`w-${imageDimensionObj.width}`);
        }
        if (imageDimensionObj?.height) {
            params.push(`h-${imageDimensionObj.height}`);
        }
        if (quality) {
            params.push(`q-${quality}`);
        }
    }

    const paramsString = params.join(',');

    if (imagePath && Object.keys(imagePath)?.length && imagePath?.includes(baseURL)) {
        let tempUrl = `tr:${paramsString},f-auto${imagePath}`.replace('https://img.republicworld.com', '');
        return `${baseURL}${tempUrl}`;
    } else if (baseURL[baseURL.length - 1] === '/') {
        baseURL = baseURL.substring(0, baseURL.length - 1);
    }

    if (paramsString) {
        return `${baseURL}/tr:${paramsString}${isGif ? '' : ',f-auto'}/${imagePath}`;
    } else {
        return `${baseURL}/${imagePath}`;
    }
};


export const generateAspectRatioImageURL = (imageInfo: any, imageDimensionObj: { width: any; height: any; } | undefined, aspectRatio = IMAGE_ASPECT_RATIO['16_9'].key, quality = 75) => {
    if (imageInfo?.versions !== undefined) {
        if (imageInfo?.versions?.[aspectRatio]?.filePath) {
            return getFullImageUrl(imageInfo?.versions?.[aspectRatio]?.filePath, imageDimensionObj, quality)
        }
    } else if (imageInfo?.promo_small) {
        return getFullImageUrl(imageInfo.promo_small, imageDimensionObj, quality)
    } else if (imageInfo?.filePath) {
        return getFullImageUrl(imageInfo.filePath, imageDimensionObj, quality)
    } else if (imageInfo?.media) {
        return getFullImageUrl(imageInfo?.media, imageDimensionObj, quality)
    } else if (imageInfo) {
        return getFullImageUrl(imageInfo, imageDimensionObj?.width || { width: '75px', height: '75px' }, quality) //Direct URL
    } else {
        if (aspectRatio === IMAGE_ASPECT_RATIO['16_9'].key) {
            return placeholder_16_9
        } else if (aspectRatio === IMAGE_ASPECT_RATIO['3_4'].key) {
            return placeholder_3_4
        } else if (aspectRatio === IMAGE_ASPECT_RATIO['1_1'].key) {
            return placeholder_1_1
        } else {
            return placeholder_16_9
        }
    }
}