declare module 'swiper/esm/svelte/swiper-slide.svelte' {
    const SwiperSlide: any;
    export default SwiperSlide;
}
declare module 'swiper/esm/svelte/swiper.svelte' {
    const Swiper: any;
    export default Swiper;
}
declare module 'swiper/core' {
    import SwiperCore from 'swiper/core';
    export { Navigation, Pagination, Scrollbar, A11y } from 'swiper/core';
    export default SwiperCore;
}

// swiper.d.ts

declare module 'swiper/svelte' {
    import { SvelteComponentTyped } from 'svelte';

    interface SwiperProps {
        modules?: any[];
        spaceBetween?: number;
        slidesPerView?: number | 'auto';
        navigation?: any;
        pagination?: {
            clickable?: any;
        };
        scrollbar?: {
            draggable?: boolean;
        };
        onSlideChange?: () => void;
        onSwiper?: (e: CustomEvent<any>) => void;
    }

    class Swiper extends SvelteComponentTyped<SwiperProps> { }

    class SwiperSlide extends SvelteComponentTyped<any> { }

    export { Swiper, SwiperSlide };
}
declare module 'svelte-carousel';
