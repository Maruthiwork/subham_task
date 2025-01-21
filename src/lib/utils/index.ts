import placeholder_16_9 from "$lib/assets/no-img/16-9-placeholder.jpg";

export function handleError(event: any) {
  event.target.src = placeholder_16_9;
}


export function makeCanonicalUrl(domain: string, slug: string,storyData?: any) {

  if (storyData?.customCanonicalUrl) {
    return storyData?.customCanonicalUrl;
  }
  if (slug) {
    let cleanSlug = slug?.replace(/\/amp(?=\/|$)/, "");
    const cleanPath = cleanSlug?.split("#")[0].split("?")[0];
    const ensuredSlashPath = cleanPath?.startsWith("/") ? cleanPath : "/" + cleanPath;
    return `${domain?.replace(/\/+$/, "")}${ensuredSlashPath}`;
  }
  return domain?.replace(/\/+$/, "");
}

export function makeAmpUrl(domain: string, slug: string) {
  if (slug == '') {
    return `${domain?.replace(/\/+$/, "")}/amp`;
  }

  if (slug) {
    let cleanSlug = slug.replace(/\/amp(?=\/|$)/, "");
    const cleanPath = cleanSlug.split("#")[0].split("?")[0];
    const ensuredSlashPath = cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath;
    return `${domain.replace(/\/+$/, "")}/amp${ensuredSlashPath}`;
  }
  return domain.replace(/\/+$/, "");
}