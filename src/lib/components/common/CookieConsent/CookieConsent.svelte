<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { CookiesConsent } from "@metamorfosilab/cookies-consent";
    import { getCookie, isEuropeanTimezone, setCookie } from "$lib/components/utils/utils";


    let cookiesConsent: any = null;
    let showConsent: boolean = false;



    onMount(async () => {
        // Check if 'cookie_consent' cookie is present

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Guess the user's timezone
        const isEU = isEuropeanTimezone(timezone);
        showConsent = !getCookie("consentcookies_status");   

        if (showConsent && isEU) {
            cookiesConsent = new CookiesConsent({
                expirationDays: 30, // 30 days
                buttons: ["accept", "settings"],
                content: {
                    title: "This website is using Cookies!",
                    btnAccept: "Accept",
                    message: `
              <p>
                This site uses cookies (or similar) to measure traffic to this website. By using this site, you agree with our use of cookies.
              </p>
            `,
                    settingsFooter: `
              <p>
              
                Except for essential cookies, all cookies will expire after the expiry periods as set out in the Cookie Notice.
              </p>
            `,
                },
                cookies: [
                    {
                        name: "essential_cookie",
                        title: "Essential Cookies",
                        checked: true,
                        disabled: true,
                        description: `
                                <p>
                                    These cookies are necessary for the website to function properly. They enable core functionalities such as security, network management, and accessibility. You can set your browser to block or alert you about these cookies, but some parts of the site may not work as a result.
                                </p>  `,
                    },
                    {
                        name: "performance_cookie",
                        title: "Performance Cookies",
                        description: `
                                <p>
                                    These cookies are necessary for the website to function properly. They enable core functionalities such as security, network management, and accessibility. You can set your browser to block or alert you about these cookies, but some parts of the site may not work as a result.
                                </p>  `,
                    },
                    {
                        name: "functionality_cookie",
                        title: "Functionality Cookies",
                        description: `
                                <p>
                                    These cookies allow the website to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personalized features. The information these cookies collect may be anonymized, and they cannot track your browsing activity on other websites.
                                </p>  `,
                    },
                    {
                        name: "analytics",
                        title: "Targeting/Advertising Cookies",
                        description:
                            "<p>These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and to help measure the effectiveness of advertising campaigns.</p>",
                        cookies: [
                            {
                                name: "cs_ucfr",
                                code: "1",
                                manageFunction: manageComscoreCookies,
                            },
                        ],
                    },
                ],
            });

            cookiesConsent.show();
        } 
    });

    onDestroy(() => {
        if (cookiesConsent) {
            cookiesConsent.destroy();
        }
    });

    function manageComscoreCookies(accept: any) {
        if (accept) {
            console.log("Google manageComscoreCookies enabled", accept);
            // Initialize Google Tag Manager or any other related service
        } else {
            // Disable Google Tag Manager or related services
        }
    }

    function manuallyApproveConsent() {
        const date = new Date();
        date.setMonth(date.getMonth() + 6);
        setCookie("consentcookies_status", "true", date);
        setCookie("cs_ucfr", "1", date);
    }
</script>

<style>
    /* You can add custom styles for your consent modal here if needed */
</style>
