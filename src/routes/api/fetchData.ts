import { DEVICE } from "$lib/components/enums/story";
import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
import { getLocation } from "./geoLocation";
import { v4 as uuid } from "uuid"; // Import uuid

export async function get({ params }: { params: { apiUrl: string, language?: string } }) {
  const { apiUrl, language } = params;
  try {

    const lang = {
      headers: { lang: language },
    };

    // @ts-ignore
    const response = await fetch(apiUrl, lang, { next: { revalidate: 60 } });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    return {
      data: data?.data,
    };
  } catch (error) {
    // console.log({
    //   error,
    //   apiUrl,
    //   language
    // })
  }
}


export async function post(apiUrl: string, language: string, formData: any) {

  try {

    const lang = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', lang: language },
      body: JSON.stringify(formData)
    };

    // @ts-ignore
    const response = await fetch(apiUrl, lang);

    const data = await response?.json();
    return {
      data: data?.data,
      status: data.status
    };
  } catch (error) {
    return {
      status: 500,
      data: { error: 'Internal Server Error' },
    };
  }
}




//   Show Data
export async function fetchFooterShows(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/shows/get-top-shows?showsSlug=shows`;
  return get({ params: { apiUrl, language } });
}

//Footer List
export async function fetchFooterList(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/footer/list`;
  return get({ params: { apiUrl, language } });
}

//Navigation Data 
export async function fetchNavigationData(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/hamburger?topnav=true`;
  return get({ params: { apiUrl, language } });
}


export async function fetchMegaMenu(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/hamburger/mega-menu`;
  return get({ params: { apiUrl, language } });
}

export async function fetchRightBarData(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/rightsidebar/list`;
  return get({ params: { apiUrl, language } });
}

// Page Type
export async function fetchPageType(language: string, slug: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/page-type/get?slug=${slug}`;
  return get({ params: { apiUrl, language } });
}

// Story api
export async function fetchStory(language: string, slug: string, isPreview: boolean = false) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/story/detail-by-slug?story_slug=${slug}`;
  if (isPreview) {
    apiUrl = apiUrl + `&preview=${isPreview}`;
  }
  return get({ params: { apiUrl, language } });
}

// Video Story Details
export async function fetchVedioStory(language: string, slug: string, preview: boolean = false) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/video/getIndividualVideo?storyCompleteSlug=${slug}`;
  if (preview) {
    apiUrl += `&preview=${preview}`;
  }
  return get({ params: { apiUrl, language } });
}

export async function fetchJwPlayerVideoData(id: string) {
  const apiUrl = `https://content.jwplatform.com/v2/media/${id}`;
  return get({ params: { apiUrl } });
}


export async function fetchLatestStory(language: string, completeSlug: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/category/get-stories-by-category?completeSlug=${completeSlug}`;
  return get({ params: { apiUrl, language } });
}

// Analytics Stories
export async function fetchTrendingStories(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/analytics`;

  return get({ params: { apiUrl, language } });
}


// Category api
export async function fetchCategory(language: string, slug: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/category/list?slug=${slug}`;

  return get({ params: { apiUrl, language } });
}
// WEBSTORY DETAIL
export async function fetchWebStoryDetail(language: string, slug: string, preview: boolean = false) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/webstory/getStory?storyCompleteSlug=${slug}`;
  if (preview) {
    apiUrl += `&preview=${preview}`;
  }
  return get({ params: { apiUrl, language } });
}

// Anchor and Author Detail page
export async function fetchAnchorAndAuthor(language: string, slug: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/anchors-and-authors/get-detail?slug=${slug}`;

  return get({ params: { apiUrl, language } });
}

// Weather Api
export async function fetchWeatherData(device: string) {
  let location: any = await getLocation();

  let language = 'E'
  let { latitude, longitude } = location;
  let deviceId = uuid()
  if (typeof window !== 'undefined') {
    window.localStorage.setItem("deviceId", deviceId);
    if (latitude && longitude && ((device == DEVICE.MOBILE && window.location.pathname.split('/')[1] === 'india' && !window.location.pathname.split('/')[2]) || device == DEVICE.DESKTOP)) {
      const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/weather/info?lat=${latitude}&long=${longitude}`;
      return get({ params: { apiUrl, language } });;
    }
  }
}

export async function weatherDataByLatLong(language: string, latitude: string, longitude: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/weather/info?lat=${latitude}&long=${longitude}`;
  return get({ params: { apiUrl, language } });
}

// Anchor and Author Listing page
export async function fetchAnchorsandAuthors(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/anchors-and-authors/all-list`;

  return get({ params: { apiUrl, language } });
}
// Anchor and Author Listing page
export async function fetchAnchorsList(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/anchors-and-authors/anchor-list`;

  return get({ params: { apiUrl, language } });
}

// Anchor and Author Listing page
export async function fetchAuthorsList(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/author/all-list`;

  return get({ params: { apiUrl, language } });
}

// Individual and Anchor and Author Detail Api
export async function fetchAnchorAndAuthorDetails(language: string, slug: string, story_type: string, pageNo: number, pageSize: number) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/anchors-and-authors/info?slug=${slug}&storytype=${story_type}`;

  if (pageNo && pageSize) {
    apiUrl += `&page=${pageNo}&pageSize=${pageSize}`;
  }

  return get({ params: { apiUrl, language } });
}

// All Poll Page Api
export async function fetchAllPoll(language: string, completeSlug: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/poll/get?completeSlug=${completeSlug}`;

  return get({ params: { apiUrl, language } });
}

// Fetch Individual Tag and Topics
export async function fetchTagsAndTopics(language: string, slug: string, category: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/tags/tag-detail?slug=${slug}&category=${category}`;

  return get({ params: { apiUrl, language } });
}

// Fetch All Tags and Topics
export const GET_TAGS_AND_TOPICS = (page: number = 1, size: number = 10) => {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/tags?`;

  if (page && size) {
    apiUrl += `&page=${page}&pageSize=${size}`
  }

  return apiUrl
};

export async function fetchAllTagsAndTopics(language: string) {
  const apiUrl = GET_TAGS_AND_TOPICS(1, 10);

  return get({ params: { apiUrl, language } });
}



// Fetch Pre Search List
export async function fetchPreSearchList(language: string, search: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/search/pre-data?search=${search}`;

  return get({ params: { apiUrl, language } });
}

// Fetch Search List
export async function fetchSearchList(language: string, search: string, page: number, pageSize: number, searchType?: string) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/search/es?search=${search}&pageSize=${pageSize}&page=${page}`;

  if (searchType) {
    apiUrl += `&searchType=${searchType}`;
  }
  return get({ params: { apiUrl, language } });
}

// Fetch All Qicks
export async function fetchQuicks(language: string, slug: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/quicks/?quickSlug=${slug}`;
  return get({ params: { apiUrl, language } });
}

export async function fetchTrendingBar(language: string, pageType: string = 'CATEGORY', slug: string = '') {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/trending/list?type=${pageType}`;

  if (slug) {
    apiUrl += `&categoryslug=${slug}`
  }

  return get({ params: { apiUrl, language } });
}

export async function fetchSEOFooter(language: string, pageType: string = 'CATEGORY', slug: string = '') {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/seo-footer`;

  const params = [];

  if (slug) {
    params.push(`slug=${slug}`);
  }

  if (pageType) {
    params.push(`type=${pageType}`);
  }

  if (params.length) {
    apiUrl += `?${params.join('&')}`;
  }

  return get({ params: { apiUrl, language } });
}



export async function fetchRssList(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/rss/page`;
  return get({ params: { apiUrl, language } });
}



export async function fetchSiteList(language: string) {
  const apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/sitemap`;
  return get({ params: { apiUrl, language } });
}


export async function fetchBreakingNewsWidget(language: string) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/breaking/get-list`;
  return get({ params: { apiUrl, language } });
}

export async function fetchShortsStory(language: string, completeSlug: string, preview: boolean = false) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/shorts/getStoryList?completeSlug=${completeSlug}`;
  if (preview) {
    apiUrl += `&preview=${preview}`;
  }
  return get({ params: { apiUrl, language } });
}



export async function fetchBreakingNewsStories(language: string, pageNum: any = 0) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/breaking/all-list?page=${pageNum}`;
  return get({ params: { apiUrl, language } });
}

export async function fetchCityList(language: string, search: string) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/weather?search=${search}`;
  return get({ params: { apiUrl, language } });
}


export async function deviceInfo(language: string, data: any) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/device-info`;
  return post(apiUrl, language, { ...data, deviceId: data?.deviceNotificationId })
}

export async function subscribeToTopic(language: string, data: any) {

  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/notification-topic/subscribe-to-topic`;
  return post(apiUrl, language, { ...data, deviceId: data?.deviceNotificationId, lang: "E", platform: "WEB" })
}


export async function fetchGainersLoosets(language: string, limit: number) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/gainerLoosers?limit=${limit}`
  return get({ params: { apiUrl, language } })
}

export async function fetchMarketIndices(language: string) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/gainerLoosers/market-v2`
  return get({ params: { apiUrl, language } })
}



export async function fetchGeo(language: string) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/v2/user/geo`
}

export async function fetchAllStates(language: string) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/pincode/get-all-states`
  return get({ params: { apiUrl, language } })
}

// Fetch All District
export async function fetchAllDistrict(language: string, district: string) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/pincode/get-all-district?stateName=${district}`
  return get({ params: { apiUrl, language } })
}

// Fetch Post Office By State and District
export async function fetchPostOffices(language: string, district: string, state: string) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/pincode/filter-by-property?districtName=${district}&stateName=${state}`
  return get({ params: { apiUrl, language } })
}

// Fetch Post Office By Name
export async function fetchPostOfficeByName(language: string, postOffice: string, district: string) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/pincode/post-office?officeName=${postOffice}&districtName=${district}`
  return get({ params: { apiUrl, language } })
}

export async function forexExchange(language: any, to_currency: any, from_currency: any) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/forex/currency-rate-v2?to_currency=${to_currency}&from_currency=${from_currency}`
  return get({ params: { apiUrl, language } })
}

export async function fetchPage(language: any, slug: any) {
  let apiUrl = `${EnvironmentConfig.VITE_API_END_POINT}/homepage/get-page?slug=${slug}`
  return get({ params: { apiUrl, language } })
}