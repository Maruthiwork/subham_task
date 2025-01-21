<script lang="ts">
    import RFrame from "$lib/assets/images/R-frame.svg";
    import Email from "$lib/assets/images/email.svg";
    import Location from "$lib/assets/images/location.svg";
    import SEO from "$lib/components/SEO/index.svelte";

    //props
    export let envDetails: any = {};
    export let siteNavigation: any = [];
    export let isAmp: boolean = false;

    let homeText: string = "";

    if (envDetails?.language === "H") {
        homeText = "Hindi News";
    } else {
        homeText = "News";
    }

    let sales = [
        {
            Position: "National Sales",
            Name: "Amit Tayde",
            Email: "amit.tayde@republicworld.com",
        },
        {
            Position: "North Sales",
            Name: "Saurav Maheshwari",
            Email: "saurav.maheshwari@republicworld.com",
        },
        {
            Position: "East Sales",
            Name: "Ayan Mahata",
            Email: "ayan.mahata@republicworld.com",
        },
        {
            Position: "South Sales",
            Name: "Bhabani Das",
            Email: "bhabani.das@republicworld.com",
        },
        {
            Position: "Digital Partnership and Distribution",
            Name: "Shashikant Khandait",
            Email: "shashikant.khandait@republicworld.com",
        },
    ];

    let contactDetails = {
        completeSlug: "contact-us",
        name: "Contact Us",
        slug: "contact-us",
    };


</script>

<SEO
    {isAmp}
    title={`Contact Us Page - Republic World's Address, Contact Details, Email Address, Fax Number`}
    metadescription={"Get in touch with Republic World for advertising opportunities, legal inquiries through our inquiry form, email address, official phone number, legal contact details, mailing address & fax number."}
    keywords={`Republic World Contact Us, Republic World Email Address, Republic World Address, Republic World Fax, Republic World Mailing address, Advertising Contact Number, Legal Contact Details`}
    lang={envDetails?.language}
    site_details={envDetails}
    pathname={"/contact-us"}
    pageType={"Category"}
    category={contactDetails}
    {siteNavigation}
/>
<div class="contentWrapper">
    <div class="breadcrumb mb-6">
        <ul>
            <li class="p-4">
                <a href="/"> {homeText} / </a>
                <span>
                    <a>Contact Us</a>
                </span>
            </li>
        </ul>
    </div>
    <div>
        <div class="mainArticle innerLeftBlock">
            <div class="contactBlock">
                <div class="contactHead">
                    <h2>Contact Us</h2>
                    <p>
                        Republic Media Network operates Republic TV, Republic
                        Bharat, Republic Bangla, Republic Kannada and Republic
                        Digital Publishing Sites & Republic Social Media Sites.
                    </p>
                </div>
                <div class="contactAdListWrap">
                    <div class="articleHead blackArticleHead">
                        <h2 class="flexwrap gap-4">
                            <span class="rlogo flex items-center">
                                {#if isAmp}
                                    <amp-img
                                        src={RFrame}
                                        alt="Republic Logo Frame icon"
                                        width={25}
                                        height={25}
                                    ></amp-img>
                                {:else}
                                    <img
                                        src={RFrame}
                                        alt="Republic Logo Frame icon"
                                    />
                                {/if}
                            </span>
                            Connect
                        </h2>
                    </div>
                    <div class="contactadwrap">
                        <div class="contactinfoCol">
                            <h4>Get in Touch</h4>
                            <ul>
                                <li class="flex gap-1">
                                    <span class="flex items-center">
                                        {#if isAmp}
                                            <amp-img
                                                src={Email}
                                                alt="Email"
                                                width={28}
                                                height={28}
                                                class="mar8"
                                            ></amp-img>
                                        {:else}
                                            <img
                                                src={Email}
                                                alt="Email"
                                                width={28}
                                                height={29}
                                                class="mar8"
                                            />
                                        {/if}
                                    </span>
                                    <a
                                        href="mailto:support.digital@republicworld.com"
                                    >
                                        support.digital@republicworld.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="contactinfoCol">
                            <h4>Legal</h4>
                            <h5>Mohit Dhamne</h5>
                            <ul>
                                <li class="flex gap-1">
                                    <span class="flex items-center">
                                        {#if isAmp}
                                            <amp-img
                                                src={Email}
                                                alt="Email"
                                                width={28}
                                                height={28}
                                                class="mar8"
                                            ></amp-img>
                                        {:else}
                                            <img
                                                src={Email}
                                                alt="Email"
                                                width={28}
                                                height={29}
                                                class="mar8"
                                            />
                                        {/if}
                                    </span>
                                    <a href="mailto:mohit@republicworld.com">
                                        mohit@republicworld.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="articleHead blackArticleHead">
                        <h2 class="flexwrap gap-4">
                            <span class="rlogo flex items-center">
                                {#if isAmp}
                                    <amp-img
                                        src={RFrame}
                                        alt="Republic Logo Frame icon"
                                        width={25}
                                        height={25}
                                    ></amp-img>
                                {:else}
                                    <img
                                        src={RFrame}
                                        alt="Republic Logo Frame icon"
                                    />
                                {/if}
                            </span>
                            Digital Advertising & Partnership
                        </h2>
                    </div>
                    <div class="contactadwrap">
                        {#each sales as s}
                            <div class="contactinfoCol">
                                <h4>{s.Position}</h4>
                                <h5>{s.Name}</h5>
                                <ul>
                                    <li class="flex gap-1">
                                        <span class="flex items-center">
                                            {#if isAmp}
                                                <amp-img
                                                    src={Email}
                                                    alt="Email"
                                                    width={28}
                                                    height={28}
                                                    class="mar8"
                                                ></amp-img>
                                            {:else}
                                                <img
                                                    src={Email}
                                                    alt="Email"
                                                    width={28}
                                                    height={29}
                                                    class="mar8"
                                                />
                                            {/if}
                                        </span>
                                        <a href="mailto:{s.Email}">
                                            {s.Email}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        {/each}
                    </div>
                    <div class="articleHead blackArticleHead">
                        <h2 class="flexwrap gap-4">
                            <span class="rlogo flex items-center">
                                {#if isAmp}
                                    <amp-img
                                        src={RFrame}
                                        alt="Republic Logo Frame icon"
                                        width={25}
                                        height={25}
                                    ></amp-img>
                                {:else}
                                    <img
                                        src={RFrame}
                                        alt="Republic Logo Frame icon"
                                    />
                                {/if}
                            </span>
                            Offices
                        </h2>
                    </div>
                    <div class="contactadwrap">
                        <div class="contactadCol">
                            <div class="contactadBox">
                                <div class="contactadLeft">
                                    <a
                                        href="https://maps.app.goo.gl/seheFuuXEqHC5nce7"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {#if isAmp}
                                            <amp-img
                                                src={Location}
                                                alt="location"
                                                width={38}
                                                height={38}
                                                class="mar8"
                                            ></amp-img>
                                        {:else}
                                            <img
                                                src={Location}
                                                alt="location"
                                                width={38}
                                                height={38}
                                                class="mar8"
                                            />
                                        {/if}
                                    </a>
                                </div>
                                <div class="contactadRight">
                                    <a
                                        href="https://maps.app.goo.gl/seheFuuXEqHC5nce7"
                                        target="_blank"><h4>Noida</h4></a
                                    >
                                    <p>
                                        FC6V+7RF, Sector 158, Noida, Gulavali,
                                        Uttar Pradesh 201310, India.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="contactadCol">
                            <div class="contactadBox">
                                <div class="contactadLeft">
                                    <a
                                        href="https://maps.app.goo.gl/4BymE4AEEefwe5JJ7"
                                        target="_blank"
                                    >
                                        {#if isAmp}
                                            <amp-img
                                                src={Location}
                                                alt="location"
                                                width={38}
                                                height={38}
                                                class="mar8"
                                            ></amp-img>
                                        {:else}
                                            <img
                                                src={Location}
                                                alt="location"
                                                width={38}
                                                height={38}
                                                class="mar8"
                                            />
                                        {/if}
                                    </a>
                                </div>
                                <div class="contactadRight">
                                    <a
                                        href="https://maps.app.goo.gl/4BymE4AEEefwe5JJ7"
                                        target="_blank"><h4>Mumbai</h4></a
                                    >
                                    <p>
                                        Sprint office no 326/327, 3rd Floor,
                                        Centrium at Phoenix Market City, Lal
                                        Bahadur Shahstri Rd, Near Kamani
                                        Junction, Nav Pada, Kurla West, Mumbai -
                                        400 070, India.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="contactadCol">
                            <div class="contactadBox">
                                <div class="contactadLeft">
                                    <a
                                        href="https://maps.app.goo.gl/cTz2pZ9LLxoBRGVS6"
                                        target="_blank"
                                    >
                                        {#if isAmp}
                                            <amp-img
                                                src={Location}
                                                alt="location"
                                                width={38}
                                                height={38}
                                                class="mar8"
                                            ></amp-img>
                                        {:else}
                                            <img
                                                src={Location}
                                                alt="location"
                                                width={38}
                                                height={38}
                                                class="mar8"
                                            />
                                        {/if}
                                    </a>
                                </div>
                                <div class="contactadRight">
                                    <a
                                        href="https://maps.app.goo.gl/cTz2pZ9LLxoBRGVS6"
                                        target="_blank"><h4>Bengaluru</h4></a
                                    >
                                    <p>
                                        13/3 Lal Bagh Main Road, K. S. Garden,
                                        Vinobha Nagar, Sudhama Nagar, Bengaluru,
                                        Karnataka 560027, India.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="contactadCol">
                            <div class="contactadBox">
                                <div class="contactadLeft">
                                    <a
                                        href="https://maps.app.goo.gl/SMp7yhMTV72qSxUs7"
                                        target="_blank"
                                    >
                                        {#if isAmp}
                                            <amp-img
                                                src={Location}
                                                alt="location"
                                                width={38}
                                                height={38}
                                                class="mar8"
                                            ></amp-img>
                                        {:else}
                                            <img
                                                src={Location}
                                                alt="location"
                                                width={38}
                                                height={38}
                                                class="mar8"
                                            />
                                        {/if}
                                    </a>
                                </div>
                                <div class="contactadRight">
                                    <a
                                        href="https://maps.app.goo.gl/SMp7yhMTV72qSxUs7"
                                        target="_blank"><h4>Kolkata</h4></a
                                    >
                                    <p>
                                        DLF 1, Tower C, 1st Floor, Commercial
                                        Block, 8 Major Arterial Road, Block AF,
                                        Newtown Kolkata - 700156, India.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .mar8 {
        margin-right: 0px 8px 0px 0px !important;
        object-fit: contain;
        padding-right: 8px !important;
    }

    .locationImg {
        margin: 0px 8px 0px 0px !important;
    }
    .innerLeftBlock {
        border: 1px solid rgba(0, 0, 0, 0.16);
        padding: 16px 12px;
        margin-bottom: 32px;
    }

    .mb12 {
        margin-bottom: 12px;
    }

    .mb8 {
        margin-bottom: 8px;
    }

    .contactLeft h2 {
        font-size: var(--font35);
        font-weight: 900;
        line-height: 1.3;
        letter-spacing: -0.5px;
        margin-bottom: 16px;
    }

    .contactLeft p {
        font-size: var(--font22);
        line-height: 1.4;
        letter-spacing: 0px;
    }

    .contactDetailsBox h4 {
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: 0px;
        color: var(--darkred);
        text-transform: uppercase;
    }

    .contactDetailsBox h5 {
        font-weight: 600;
        line-height: 1;
        letter-spacing: 0px;
        padding-bottom: 8px;
        font-size: var(--font20);
    }
    .contactDetailsBox h6 {
        font-size: var(--font17);
        font-weight: 700;
        padding-bottom: 10px;
    }
    .contactDetailsBox a {
        line-height: 1.3;
        letter-spacing: 0px;
        color: var(--black);
        font-size: var(--font18);
        font-weight: 400;
        transition: all 0.3s ease;
        padding-bottom: 8px;
        display: block;
    }
    .subContact {
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.16);
        margin-bottom: 12px;
    }
    .subContact:last-child {
        border-bottom: 0;
        margin-bottom: 0;
    }
    .contactDetailsBox a:hover {
        color: var(--darkred);
    }

    .contactDetailsBox p {
        font-size: var(--font17);
        font-weight: 400;
        line-height: 1.4;
        letter-spacing: 0px;
        padding-bottom: 8px;
    }

    .contactDetailsBox {
        margin-bottom: 54px;
    }

    .contactRight {
        padding-left: 20px;
    }

    .contactLeft {
        padding-right: 20px;
    }
    .mapouter {
        position: relative;
        text-align: right;
        width: 100%;
        height: 400px;
    }
    .gmap_canvas {
        overflow: hidden;
        background: none !important;
        width: 100%;
        height: 400px;
    }
    .gmap_iframe {
        height: 400px !important;
    }

    /*----------------------------------- contact Us ---------------------------------------*/
    .contactHead,
    .contactAdListWrap .articleHead {
        margin-bottom: 10px;
    }
    .contactadwrap {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 40px;
        padding-bottom: 24px;
        margin-bottom: 24px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.16);
    }
    .contactadwrap:last-child {
        border-bottom: 0;
    }
    .contactHead p {
        font-size: var(--font22);
        font-weight: 400;
        line-height: 1.4;
        padding-bottom: 15px;
    }
    .contactinfoCol,
    .contactadCol {
        margin-top: 40px;
    }
    .contactadBox {
        display: grid;
        grid-template-columns: 1fr 12fr;
    }
    .contactinfoCol h4,
    .contactadRight h4 {
        color: var(--darkred);
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.96px;
        margin-bottom: 8px;
    }
    .contactinfoCol h5 {
        color: var(--black);
        font-size: var(--font20);
        font-weight: 600;
        line-height: 1;
        margin-bottom: 8px;
    }
    .contactinfoCol ul li {
        display: flex;
        align-items: center;
    }
    .contactinfoCol ul li a,
    .contactadRight p {
        color: var(--black);
        font-size: var(--font18);
        font-weight: 400;
        line-height: 1.4;
    }
    .contactinfoCol ul li a:hover {
        color: var(--darkred);
    }
    .contactinfoCol ul li span img {
        width: 30px;
        margin-right: 8px;
    }
    .contactadLeft img {
        width: 40px;
        margin-right: 8px;
    }

    .contactAdListWrap .articleHead h2 img {
        width: 40px;
    }

    @media screen and (max-width: 1199px) {
        .contactRight {
            padding: 50px 0 0;
        }
    }
    @media screen and (max-width: 1024px) {
        .contactHead h2,
        .contactAdListWrap h2 {
            font-size: var(--font26);
        }
        .contactHead p,
        .contactinfoCol h4,
        .contactadRight h4 {
            font-size: var(--font22);
        }
        .contactinfoCol,
        .contactadCol {
            margin-top: 32px;
        }
        .contactadwrap {
            grid-column-gap: 24px;
        }
        .contactAdListWrap .articleHead h2 img {
            width: 32px;
        }
    }
    @media screen and (max-width: 680px) {
        .contactDetailsBox a {
            font-size: var(--font14);
        }
        .contactDetailsBox h5 {
            font-size: var(--font18);
        }
        .contactadwrap {
            grid-template-columns: repeat(1, 1fr);
        }
        .contactHead h2,
        .contactAdListWrap h2 {
            font-size: var(--font22);
            letter-spacing: -0.88px;
        }
        .contactHead p,
        .contactinfoCol h4,
        .contactadRight h4 {
            font-size: var(--font16);
        }
        .contactinfoCol ul li a,
        .contactadRight p,
        .contactinfoCol h5 {
            font-size: var(--font16);
        }
        .contactAdListWrap .articleHead h2 img {
            width: 28px;
        }
        .contactinfoCol,
        .contactadCol {
            margin-top: 20px;
        }
    }

    .regularPage {
        padding: 0 12px;
    }
    .appPolicies .breadcrumb {
        display: none;
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
