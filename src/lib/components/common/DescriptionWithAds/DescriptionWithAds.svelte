<script>
    // @ts-nocheck

    import {
        loadUnibotScript,
        transformSocialEmbeds,
        useIntersectionObserver,
    } from "$lib/components/utils/utils";
    import { afterUpdate } from "svelte";
    import DisplayAd from "../DisplayAd/DisplayAd.svelte";
    import { lazyLoad } from "../LazyLoading/LazyLoading";
    import { IMAGE_ASPECT_RATIO } from "../HybridImage/Constants";
    import ContentRenderer from "../ContentRenderer.svelte";

    export let description;
    export let envDetails;
    export let device = "desktop";
</script>

<ContentRenderer html={description} {device} {envDetails} />