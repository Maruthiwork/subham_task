<script lang="ts">
    import { EnvironmentConfig } from "$lib/components/utils/environmentConfig";
    import SEO from "$lib/components/SEO/index.svelte";

    export let isAmp = false;
    export let language;
    export let envDetails;
    export let canonicalUrl = "";
    export let siteNavigation:any[] = [];

    let homeText = "";

    if (envDetails?.language === "H") {
        homeText = "Hindi News";
    } else {
        homeText = "News";
    }

    const breadcrumbs = [
        {
            name: "Home",
            slug: "/",
        },
        {
            name: "About Us",
            slug: "/about-us",
        },
    ];

    let aboutDetails = {
        completeSlug: "about-us",
        name: "About Us",
        slug: "world-news",
    };

</script>

<SEO
    {isAmp}
    {canonicalUrl}
    {breadcrumbs}
    slug={"/about-us"}
    pathname={"/about-us"}
    site_details={envDetails}
    title={"About Us Page - Your Source for Truthful Journalism, Leading the News Revolution | Republic World"}
    metadescription={"Discover the journey behind Republic World, a venture by SARG Global Digital Private Ltd. We deliver breaking news, in-depth research, deep reportage and exclusive news researches in Indian journalism."}
    keywords={`About Us, Republic World, SARG Global Digital Private Ltd, Breaking news, News Healdines, Analysis Report, Deep Reportage, In-Depth Research, India's Premier News Channel, Indian Journalism`}
    pageType={"Category"}
    category={aboutDetails}
    {siteNavigation}
/>
<div class="contentWrapper">
    <div class="regularPage">
        <div class="breadcrumb mb-6">
            <ul>
                <li class="p-4">
                    <a href="/"> {homeText} / </a>
                    <span>
                        <a>About-Us</a>
                    </span>
                </li>
            </ul>
        </div>
        <div class="placeHolder">
            {#if isAmp}
                <amp-img
                    src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                        "logo/english/about-us%20(1).png"}
                    alt=""
                    width={1176}
                    height={654}
                    layout="responsive"
                />
            {:else}
                <img
                    src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                        "logo/english/about-us%20(1).png"}
                    alt=""
                    width={1176}
                    height={654}
                />
            {/if}
        </div>
        {#if language === "RB"}
            <div class="pageContent">
                <h2>
                    <u>Republic Business - Latest, Fastest, Deepest</u>
                </h2>
                <p>Here’s what we are here for</p>

                <p>
                    By taking a giant leap in shaping up a digital framework,
                    led by new-age technology, India’s economy has witnessed a
                    paradigm shift. From surpassing estimates of multilateral
                    bodies such as the International Monetary Fund (IMF), the
                    country is likely to see a healthy GDP growth of over 8 per
                    cent for FY24.
                </p>

                <p>
                    Besides, the IMF as well as various rating agencies have set
                    revised growth estimates for India, indicating a higher
                    consumption fuelling more manufacturing in the country.
                </p>

                <p>
                    In the midst of this unprecedented growth, Republic Media
                    Network’s sixth news brand ‘Republic Business’, launched at
                    the ‘India Economic Summit’ in New Delhi in December 2023,
                    aims to be a medium reflecting the country’s inspiring
                    growth story and the world of business news.
                </p>

                <p>
                    As the new India, spearheaded by lakhs of startups in
                    sunrise sectors, marches ahead to feature among the top
                    three economies by 2030, an unwavering commitment of young
                    business journalists at Republic Business is a pledge to be
                    storytellers who vow to promote sustainability, financial
                    inclusion and delivering news from capital markets and
                    corporate world, as it happens.
                </p>

                <p>
                    India now has over 100 unicorns and the entrepreneurial
                    landscape was never more vibrant than now.
                </p>

                <p>
                    During its G20 Presidency in 2023, India achieved the
                    unthinkable by facilitating a consensus at the United
                    Nations (UN) on the Russia-Ukraine issue.
                </p>

                <p>
                    The country’s bullish stance on ramping up its exports to
                    narrow down the fiscal deficit, benefitted by its friendly
                    bilateral trade ties and trade agreements, has aided in
                    achieving the much-needed inflection point in the supply
                    chain.
                </p>

                <p>
                    The team of talented business journalists at Republic
                    Business, bring to the table the zest of keeping a hawk’s
                    eye on opening up of Foreign Direct Investment (FDI) and key
                    mergers & acquisitions (M&A’s) not just domestically but
                    across the globe.
                </p>

                <p>
                    As businesses get disrupted, and Artificial Intelligence
                    (AI) becomes the buzzword, we at Republic Business will
                    bring you the top news as it happens, in real time. It is
                    the same for the Indian journey with Electric Vehicles. As
                    India is poised to convert 50 per cent of its fleet to EVs
                    by 2030, we follow the transformation up and close.
                </p>

                <p>
                    Republic Business also has on its radar, every fluid
                    development, ranging from the likes of Tesla’s proposed EV
                    manufacturing plans in India to the continuing focus of
                    private stakeholders as well as the government to propel
                    semiconductor chip making in the country.
                </p>

                <p>
                    The core philosophy of Republic Business’ editorial outlook
                    that youth are the key growth drivers of India is bolstered
                    by the country’s youthfulness. As it is said that a media
                    outlet, especially one tracking the world of business and
                    economy, has to be broad-based, it also becomes imperative
                    to bring to you our readers, a daily dose of news, views,
                    and analysis which is merit-based.
                </p>

                <p>
                    Be it the interactive engagement with readers on our social
                    media platforms or a constant reach out to television
                    audiences with the most relevant business and economic news,
                    Republic Business will ensure to deliver in letter and
                    spirit what we feel is a vision and mission, drawn by our
                    firm valour that it is also time in India’s business and
                    economic news to keep the naysayers and cynics at bay.
                </p>

                <p>
                    As a journalistic thumb rule, the team at Republic Business
                    is open to ideas, even from unexpected quarters as we have
                    our eyes and ears glued to the ground. Every now and then we
                    will speak to newsmakers, often creators of a great legacy
                    who have been shaped by some of India’s iconic business
                    houses.
                </p>

                <p>
                    Dear believers of Republic Business, let us together
                    celebrate India's buzzing with achievements in tech,
                    automobile, aviation, and fintech. Let us also reflect on
                    the economic prosperity of Bharat and the unsung heroes, who
                    make India a thriving global economic powerhouse.
                </p>
            </div>
        {:else}
            <div class="pageContent">
                <p>
                    The <b>Republic Media Network</b> is
                    <b>India’s largest news network </b>
                    and one that is a <b>wholly Editor-controlled company </b> .
                    Republic Media Network presently owns and operates India’s
                    most watched broadcast news channels across
                    <b>
                        4 languages and India’s most cutting-edge digital news
                        operation Republic Digital. Arnab Goswami is the
                        Founder, Chairman and Editor-in-Chief of the Republic
                        Media Network.
                    </b>
                </p>
                <p>
                    With its strategic asset acquisition in September 2023,
                    <b>
                        Republic Media Network is among the largest distributed
                        broadcast news Networks in the country. The Network now
                        reaches over 438 million across India in 2023.
                    </b>
                    This staggering reach purely on broadcast television means that
                    Republic Media Network now reaches
                    <b>1 in every 3 Indians just on broadcast television.</b> In
                    addition, Republic Media Network on YouTube alone records
                    <b> 6 billion </b>impressions per month, and a reach of over
                    <b>130 million</b> on Meta, which makes the Network’s pure reach
                    on the digital-social-video medium among the most expansive.
                </p>
                <h2>
                    <u>REPUBLIC MEDIA NETWORK’S JOURNALISTIC VALUES</u>
                </h2>
                <p>
                    Being the
                    <b>
                        largest journalist-run and controlled news media
                        operation in the world,
                    </b>
                    Republic Media Network is founded on strong, unwavering, journalistic
                    principles which guides its news operations across the broadcast
                    and digital mediums.
                </p>
                <p>
                    Since its founding, Republic Media Network brought to its
                    audiences its
                    <b>
                        iconic style that puts the pursuit of the news above
                        everything else.
                    </b>
                    Republic Media Network is <b>accountability driven.</b>
                    Republic Media Network is <b>investigative-focussed.</b>
                    Republic Media Network is <b>citizen-oriented.</b> Republic
                    Media Network has an
                    <b>impact-chasing DNA</b> to every story.
                </p>
                <p>
                    Republic Media Network is a
                    <b>proudly nationalistic news Network from India</b> that
                    adopted the slogan of <b>‘Nation First’</b> at its
                    <b>launch in 2017.</b>
                    Republic’s brand of journalism has recorded history in terms
                    of its acceptance by way of viewership and consumption across
                    the broadcast and digital platforms.
                </p>
                <p>
                    <b>In less than 7 years since launch, R</b>epublic’s total
                    force, driven and led by India’s finest journalists, has now
                    grown to
                    <b>over 2000 professionals</b> across the length and breadth
                    of India, and beyond its borders.
                </p>
                <h2>
                    <u>ABOUT REPUBLIC DIGITAL</u>
                </h2>
                <p>
                    Republic Media Network’s digital vertical <b
                        >Republic Digital</b
                    >
                    brings an unrivalled Nation First, News First, Tech First experience
                    to every digital screen. Republic Digital extends the Network’s
                    foundation of being a
                    <b>‘technology-led news company’</b>
                    wherein the best in tech meets an
                    <b>unmatched content experience.</b>
                </p>
                <p>
                    <b> Republic Digital,</b> rooted in the Network’s
                    journalistic principles, delivers the
                    <b>fastest and highest quality</b>
                    content vis-a-vis <b>text</b> and <b>video</b> with the
                    <b>most cutting-edge technological backend.</b> Ahead of the
                    curve
                    <b>
                        on latest technologies,user preferences, and consumption
                        patterns,
                    </b>
                    Republic Digital delivers the promise of a seamless, enriching
                    and effective content experience across devices.
                </p>
                <p>
                    Republic Digital is a <b>multi-lingual operation</b> that
                    presently is established in English, Hindi, Bangla and
                    Kannada audiences.
                    <b>The swift expansion into the vernacular</b>
                    digital content space has strategically expanded the reach of
                    Republic Digital assets, creating a
                    <b> news powerhouse online </b>
                    with
                    <b>world-beating viewership numbers.</b>
                </p>
                <p>
                    Republic Digital has achieved record viewership figures and
                    an impact that is pound-for-pound higher than legacy Indian
                    and global rivals. Lifetime impressions on YouTube for
                    Republic Digital in English, Hindi and Bangla total an
                    incredible 148 Billion, generating 14.2 Billion views.
                </p>
                <h2>
                    On YouTube alone, Republic Digital’s English operation has
                    recorded over 37 billion impressions and over 2.63 billion
                    views. Republic Digital’s Hindi operation on YouTube has
                    recorded over 99 billion impressions and over 10 billion
                    views. Republic Digital’s Bangla operation on YouTube has
                    recorded over 11.8 billion impressions and over 1.39 billion
                    views.
                </h2>
                <p>
                    Republic Digital’s rapidly growing global audience is
                    unmatched with its global viewership outside India on
                    YouTube breaching the 50% mark through the biggest world
                    events.
                </p>
                <p>
                    Republic Digital has been a storm on social media. Its
                    performance across social media platforms not only steers
                    conversations with India but has taken the Network to become
                    a medium of choice and habit across the global audience.
                </p>
                <p>
                    On Meta platforms, Republic’s estimated audience size is one
                    that soars over the 518 million mark, only on English, Hindi
                    and Bangla languages. Republic has repeatedly breached
                    record engagement rates, with its digital video content
                    driving conversations on Facebook. Instagram has witnessed
                    Republic Digital piloting innovative content formats to
                    cater to evolving interests and requirements of the new-age
                    user.
                </p>
                <p>
                    With 5 million followers and an estimated 100 million
                    impressions per month on Twitter, now X, Republic’s
                    popularity is unmatched. Republic has been the only news
                    operation to have a daily impact on news events vis-a-vis
                    conversation generation. The Network's newsbreaks and
                    hashtags have trended night-after-night consistently
                    steering the conversation on national and international
                    affairs on social media. These trends regularly hit critical
                    mass, going on to become worldwide trends.
                </p>
                <p>
                    Republic Digital caters to content across various
                    categories-- from international politics to hyperlocal
                    content, from Sports to Entertainment, from informed
                    Business content for a global audience to the fastest news
                    updates across the Health, Climate and Technology verticals.
                </p>
                <p>
                    Republic Digital's focus on deep reportage of global events
                    from global locations - the Taliban takeover of Afghanistan,
                    the Ukraine War reportage, the COVID-origin investigation
                    from Wuhan, instability in Pakistan, and India's growing
                    dominance at the most prestigious diplomatic stages- has
                    ensured that Republic Digital has cultivated a large global
                    base and following, even before the launch of its on-air
                    global operation.
                </p>
                <div class="partnersPanel">
                    <p>
                        Digital Streams of Republic Television channels are
                        available on the following distribution platforms.
                    </p>
                    <div class="partnersWrap">
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/AirtelXstream-logo.jpg"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={60}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Amazon-Fire-TV-Stick-logo.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={31}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/BheemTv.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={19}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Cloud-TV.jpg"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={53}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/dailyhunt-logo.webp"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={74}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Distro-Tv.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={30}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/How-to-Watch-YuppTV-Outside-India.jpg"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={60}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Inshorts.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={27}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Jio-TV-logo.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={53}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/jio-tvplus-1280.webp"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={60}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/movies-tv.png"}
                                alt="movies-tv"
                                width={106}
                                height={106}
                            />
                        </div>

                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/pioneer.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={106}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/PlayBoxTv.jpg"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={27}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Sabot.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={35}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/samsung-tv-plus.webp"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={117}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/scope.jpg"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={106}
                            />
                        </div>

                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Sling-TV-logo.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={57}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Switch-TV.jpg"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={106}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/tata-play-binge-logo.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={42}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/tcl-share.webp"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={106}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Transsion-Holdings-logo.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={50}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/vi-logo.png"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={106}
                            />
                        </div>
                        <div class="partnersLogo">
                            <img
                                src={`${EnvironmentConfig.VITE_IMAGE_KIT_BASE_URL}` +
                                    "epg-partner/tcl/Xiaomi-Logo-Featured-1024x608.webp"}
                                alt="AirtelXstream-logo"
                                width={106}
                                height={63}
                            />
                        </div>
                    </div>
                </div>
                &nbsp;
                <h2>
                    <u>ABOUT OUR BROADCAST OPERATIONS</u>
                </h2>
                <p>
                    Republic Media Network presently has 4 broadcast news
                    channels-- Republic TV (in English), Republic Bharat (in
                    Hindi), Republic Bangla (in Bengali) and Republic Kannada
                    (in Kannada). Republic Media Network is among the largest
                    distributed broadcast news Networks in the country, reaching
                    over 438 million across India in 2023. The Network, on
                    broadcast, presently beams to viewers across the USA, UK,
                    the Middle East, the North Africa Region, and Canada.
                </p>
                <p>
                    Republic TV is the English News vertical of the Republic
                    Media Network. Republic TV is a free-to-air news channel. It
                    was the first channel of the Network to launch and did so,
                    amidst much anticipation, on 6 May 2017.Republic TV holds
                    the record of being India’s only broadcast news operation
                    that has attained and maintained the number 1 spot in terms
                    of viewership since its week of launch.
                </p>
                <p>
                    Republic TV’s ratings and uninterrupted run as India’s most
                    watched has breached the 50% viewership mark across the day,
                    and touchdown on an 80% viewership pan India on its flagship
                    super primetime show ‘The Debate with Arnab Goswami’.
                </p>
                <p>
                    Republic Bharat, the Hindi news vertical of the Network, was
                    launched on 2 February 2019. With the slogan ‘Rashtra ke
                    Naam’, the Hindi news channel has broken toppled all the
                    legacy players in the Hindi news market with its unwavering
                    focus on hard news. Republic Bharat’s ratings reached the
                    top of the charts vis-a-vis BARC ratings across India,
                    across the day, as well as across primetime slots.
                </p>
                <p>
                    Republic Bangla is the Bengali news vertical of the Republic
                    Media Network, and was launched on 7 March 2021. Adopting
                    the slogan "Kotha Hobey Chokhe Chokh Rekhe" (কথা হবে চোখে
                    চোখ রেখে) (we will now see eye to eye), Republic Bangla in
                    record time has climbed to the top of the ratings charts,
                    besides becoming a household name across rural and urban
                    Bengal.
                </p>
                <p>
                    Republic Kannada is the Kannada news operation of the
                    Network and will be on-air soon. It is the youngest channel
                    to be added to the rapidly-growing basket of news operations
                    by Republic Media Network. Republic Kannada’s launch slogan
                    ‘ ನೇರ ಮಾತು ಕಣ್ಣಲ್ಲಿ ಕಣ್ಣಿಟ್ಟು’ ('Nera Maathu, Kannalli
                    Kannittu' or ‘Straight-Talk, Eye-to-Eye’) thunders an
                    unequivocal message that it will be the platform of the
                    people, for the people and by the people to look at the
                    powers that be in the eye and do the straight talk.
                </p>
                <p>
                    Republic Kannada’s announcement came on the back of a
                    massive strategic asset acquisition by Republic Media
                    Network in September 2023.
                </p>
                <p>
                    Chairman and Editor-in-Chief Arnab Goswami has declared that
                    the Network will broadcast across Indian languages. The
                    Editor-in-Chief announced at the network’s second Republic
                    Summit that, “Republic Media Network will publish and
                    broadcast in all major Indian language”.
                </p>
                <p>
                    Goswami has also stated the Network’s ambition to launch a
                    global news operation out of India. In an interview in May,
                    2019, the Editor-in-Chief of the Republic Media Network
                    said, “I am getting closer and closer to my global
                    aspiration. I have set up a team that is analysing how we
                    will grow in that space. The big global news company that
                    was missing from India will be launched very soon”.
                </p>
                <h2>
                    <u>ABOUT OUR FOUNDER, CHAIRMAN & EDITOR-IN-CHIEF</u>
                </h2>
                <p>
                    Republic Media Network’s Founder, Chairman and
                    Editor-in-Chief Arnab Ranjan Goswami leads the first
                    independent journalist controlled news company in India of
                    its scale. Goswami’s own vision for a global news network to
                    emerge out of the world’s most vibrant democracy is in
                    motion with the rapid growth at unmatched scale of Republic
                    Media Network.
                </p>
                <p>
                    Goswami has risen through the ranks and spent more than 2
                    decades doing the news in various newsrooms across print and
                    broadcast, before breaking away to launch India’s most
                    successful news business operation with Republic. Goswami’s
                    Republic Media Network presently owns and operates four top
                    broadcast news channels along with a massive
                    multi-linguistic digital operation-- Republic Digital.
                </p>
                <p>
                    As a journalist, Goswami has been India’s most-watched news
                    anchor for over a decade and a half that has touched down on
                    record-viewership of 80% during his primetime show. He is
                    known for his incisive style of questioning, his depth of
                    content on air in his questioning, his dynamic style of
                    on-air debate and his investigative style of reporting.
                    Goswami, aside from his Debate format primetime shows, is
                    known for interviews that have changed both the political
                    landscape in India as well as set global news headlines.
                </p>
                <p>
                    Goswami is also the current President of the governing board
                    of the News Broadcasters Federation (NBF), which is India’s
                    largest association of news channels from every region of
                    India.
                </p>
                <p>
                    Arnab Goswami, upon completion of his schooling in Jabalpur,
                    graduated in Sociology from Hindu College, Delhi University.
                    He went on to get his Masters in Social Anthropology from St
                    Antony’s College, Oxford University in 1994, where he was a
                    Felix Scholar. Arnab Goswami has been a Visiting Fellow at
                    the International Studies Department at Sidney Sussex
                    College, Cambridge University.
                </p>
            </div>
        {/if}
    </div>
</div>

<style>
    .regularPage {
        padding: 0 12px;
    }
    .appPolicies .breadcrumb {
        display: none;
    }
    .pageContent {
        padding-bottom: 10px;
    }
    .pageContent h2 {
        margin-bottom: 16px;
        line-height: 1.1;
        letter-spacing: -0.5px;
        font-weight: 900;
    }

    .pageContent p {
        font-size: var(--font20);
        margin-bottom: 35px;
        line-height: 1.4;
        font-weight: 400;
    }

    .staticlist p {
        margin-bottom: 10px;
    }

    .pageContent li {
        padding-bottom: 10px;
    }
    /*
.placeHolder{
    width: 100%;
    background-color:#D9D9D9;   
}
*/
    .pageContent ol {
        padding-left: 20px;
    }
    .pageContent ul {
        padding-left: 20px;
    }
    .pageContent ul li {
        list-style-type: inherit;
    }
    .pageContent ol li {
        list-style-type: inherit;
        text-decoration: none;
    }
    .pageContent .jobPostion {
        justify-content: center;
        text-align: center;
    }
    .pageContent .jobPostion h2 {
        margin-bottom: 10px;
    }
    .jobPostion h6 {
        size: 22px;
        line-height: 30px;
        margin-bottom: 10px;
        font-weight: 400;
        color: #1f1f1f;
    }
    .jobPostion .textCenter {
        margin-top: 30px;
        margin-bottom: 52px;
    }
    .placeHolder {
        padding-bottom: 25px;
    }
    .placeHolder img {
        width: 100%;
    }

    .counterPanel .articleHead {
        padding: 5px 8px;
        margin-bottom: 16px;
    }
    .counterPanel h2 {
        margin-bottom: 0;
    }
    .counterWrap.gridWrap3 {
        grid-column-gap: 0;
    }
    .counterCol {
        padding: 24px;
        display: flex;
        flex-wrap: wrap;
        justify-content: stretch;
        flex-direction: row;
        border-bottom: 1px solid var(--darkred);
    }
    .counterCol h2 {
        font-weight: 700;
        letter-spacing: -1.12px;
        margin-bottom: 10px;
        width: 100%;
    }
    .counterNumber {
        display: block;
        font-size: 84px;
        font-weight: 600;
        line-height: 1;
        letter-spacing: -3.36px;
        align-self: end;
    }
    .redNum {
        color: #d10014;
    }
    .PurpleNum {
        color: #8300a4;
    }
    .blueNum {
        color: #4160ff;
    }
    .tealNum {
        color: #1b7676;
    }
    .pinkNum {
        color: #f2339b;
    }
    .magentaNum {
        color: #ff5353;
    }
    .darkpinkNum {
        color: #bf0072;
    }
    .darkblueNum {
        color: #0026d1;
    }
    .darkredNum {
        color: #b10203;
    }
    .partnersWrap {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        align-items: center;
    }
    .partnersLogo {
        padding: 10px;
        overflow: hidden;
    }
    .partnersLogo:hover img {
        transform: scale(1.1);
    }
    .partnersLogo img {
        width: 100%;
        transition: all 0.4s ease;
    }
    .counterPanel .note {
        color: var(--black);
        font-size: var(--font14);
        font-weight: 500;
        line-height: 1;
        margin: 16px 0 36px;
    }
    .partnersPanel h2 {
        margin-bottom: 20px;
    }
    @media screen and (max-width: 1024px) {
        .counterWrap.gridWrap3 {
            grid-template-columns: repeat(2, 1fr);
        }
        .pageContent p {
            font-size: var(--font18);
        }
        .pageContent h2 {
            font-size: var(--font24);
        }
        .counterNumber {
            font-size: 64px;
        }
        .partnersWrap {
            grid-template-columns: repeat(6, 1fr);
            grid-row-gap: 12px;
        }
    }
    @media screen and (max-width: 767px) {
        .counterWrap.gridWrap3 {
            grid-template-columns: repeat(1, 1fr);
        }
        .counterCol {
            padding: 24px 0;
        }
    }
    @media screen and (max-width: 680px) {
        .partnersWrap {
            grid-template-columns: repeat(3, 1fr);
        }
        .pageContent p {
            font-size: var(--font16);
        }
        .pageContent h2 {
            font-size: var(--font22);
        }
        .counterNumber {
            font-size: 56px;
        }
        .counterCol h2 {
            font-size: var(--font20);
        }
    }
</style>
