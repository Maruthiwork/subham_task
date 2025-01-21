<script lang="ts">
    import { fetchCityList } from "../../../../routes/api/fetchData";
    import { weatherDataByLatLong } from "../../../../routes/api/fetchData";

    export let weatherInfo;
    export let language;

    let aqi = weatherInfo?.["aqi"];
    let inputValue = weatherInfo?.name;
    let weatherData = weatherInfo;
    let selectedCityInfo: any = {};
    let isSelectedCity = false;
    let isDropdownOpen = false; // Track dropdown state
    let filteredOptions: any = [];

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const handleInputChange = (event: any) => {
        inputValue = event.target.value;
        isSelectedCity = false;
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            filterOptions(inputValue);
        }, 300); // Adjust the debounce time as needed
    };

    const filterOptions = (inputValue: string) => {
        filteredOptions = weatherData?.cityList?.filter((option: any) =>
            option?.city_name?.toLowerCase().includes(inputValue.toLowerCase()),
        );
    };

    const handleSelectOption = (selectedOption: string) => {
        inputValue = selectedOption;
        isSelectedCity = true;
        selectedCityInfo =
            filteredOptions.find(
                (option: any) => option.city_name === selectedOption,
            ) || {};
        filteredOptions = [];
        isDropdownOpen = false;
    };

    const getAqiLabel = () => {
        if (aqi <= 50) return "Good";
        if (aqi <= 100) return "Moderate";
        if (aqi <= 150) return "Unhealthy for Sensitive Groups";
        if (aqi <= 200) return "Unhealthy";
        if (aqi <= 300) return "Very Unhealthy";
        return "Hazardous";
    };

    const callCityApi = async (city: string) => {
        const cityList = await fetchCityList(language, city);
        weatherData.cityList = cityList?.data;
        filterOptions(inputValue);
    };

    const fetchWeatherDataByLatLong = async () => {
        if (selectedCityInfo?.lat && selectedCityInfo?.lon) {
            const weather = await weatherDataByLatLong(
                language,
                selectedCityInfo?.lat,
                selectedCityInfo?.lon,
            );
            weatherData = weather?.data.data;
        }
    };

    $: {
        callCityApi(inputValue);
        if (isSelectedCity) {
            fetchWeatherDataByLatLong();
        }
    }
</script>

{#if weatherData}
    <div class="fullWeather">
        <div class="flexwrap spaceBetween itemCenter weatherWrap">
            <div class="flexCardCol mb0 weatherCityCard">
                <div class="fullWeatherCard weatherDivider">
                    <p>{weatherData?.todaydate}</p>
                    <input
                        type="text"
                        id="editableSelect"
                        bind:value={inputValue}
                        on:input={handleInputChange}
                        placeholder="Type to filter options"
                        on:focus={() => (isDropdownOpen = true)}
                    />
                    <ul
                        class={isDropdownOpen
                            ? "dropdown-open"
                            : "dropdown-closed"}
                    >
                        {#each filteredOptions as option}
                            <li
                                on:click={() => {
                                    handleSelectOption(option?.city_name);
                                }}
                            >
                                {option?.city_name}
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
            <div class="flexCardCol mb0 weatherTempCard">
                <div class="fullWeatherCard weatherDivider">
                    <ul
                        class="flexwrap itemCenter justifyCenter weatherTempWrap"
                    >
                        <li class="weatherIcon">
                            <img src={weatherData?.image} alt="" />
                        </li>
                        <li class="weatherTemp">{weatherData?.temp}°C</li>
                        <li class="tempText">
                            {weatherData?.weather_descp}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flexCardCol mb0 weatherPollCard justifyEnd">
                <div class="fullWeatherCard">
                    <div class="weatherPoll">
                        <p>
                            AQI: {weatherData?.["aqi"]} | {getAqiLabel()}
                        </p>
                    </div>
                    <ul class="pollutionChart">
                        <li class="good whitePollNum">
                            {#if aqi > 0 && aqi <= 50}{weatherData?.[
                                    "aqi"
                                ]}{/if}
                        </li>
                        <li class="satisfactory whitePollNum">
                            {#if aqi > 50 && aqi <= 100}{weatherData?.[
                                    "aqi"
                                ]}{/if}
                        </li>
                        <li class="moderate blackPollNum">
                            {#if aqi > 100 && aqi <= 150}{weatherData?.[
                                    "aqi"
                                ]}{/if}
                        </li>
                        <li class="poor whitePollNum">
                            {#if aqi > 150 && aqi <= 200}{weatherData?.[
                                    "aqi"
                                ]}{/if}
                        </li>
                        <li class="veryPoor whitePollNum">
                            {#if aqi > 200 && aqi <= 300}{weatherData?.[
                                    "aqi"
                                ]}{/if}
                        </li>
                        <li class="severe whitePollNum">
                            {#if aqi > 300}{weatherData?.["aqi"]}{/if}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
{:else}
    <p>No weather information available.</p>
{/if}

<style>
    .fullWeather {
        border-radius: 100px;
        border: 1px solid rgba(0, 0, 0, 0.16);
        padding: 14px 46px 14px 52px;
        margin: 16px 0;
        position: relative;
        z-index: 2;
    }
    .itemCenter {
        align-items: center;
    }
    .spaceBetween {
        justify-content: space-between;
    }

    .flex,
    .flexwrap {
        display: flex;
    }

    .flexwrap {
        flex-wrap: wrap;
    }

    .weatherDivider:after {
        content: "";
        position: absolute;
        width: 1px;
        height: 63px;
        background: #c2c2c2;
        right: -35px;
        top: 0;
        bottom: 0;
        margin: auto 0;
    }

    .mb0 {
        margin-bottom: 0 !important;
    }
    .weatherCityCard {
        width: 28%;
    }

    .flexCardCol {
        width: auto;
        margin-bottom: 20px;
        position: relative;
    }

    .weatherDivider {
        position: relative;
    }

    .fullWeatherCard p {
        color: #888;
        font-size: var(--font18);
    }

    .css-b62m3t-container {
        position: relative;
        box-sizing: border-box;
    }
    .weatherTempCard {
        width: 32%;
    }

    .weatherDivider {
        position: relative;
    }
    .fullWeatherCard ul.weatherTempWrap {
        gap: 12px;
    }
    .itemCenter {
        align-items: center;
    }
    .justifyCenter {
        justify-content: center;
    }

    .flex,
    .flexwrap {
        display: flex;
    }

    .flexwrap {
        flex-wrap: wrap;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    .fullWeatherCard .weatherIcon {
        width: 40px;
        line-height: 0;
    }
    ol li,
    ul li {
        list-style-type: none;
        text-decoration: none;
    }

    .fullWeatherCard .weatherIcon img {
        width: 100%;
    }

    .fullWeatherCard .weatherTemp {
        font-size: var(--font52);
        font-weight: 600;
    }

    ul li {
        list-style-type: none;
        text-decoration: none;
    }
    .fullWeatherCard .tempText {
        font-size: var(--font18);
        font-weight: 400;
        width: 40%;
    }
    .fullWeatherCard ul.weatherTempWrap {
        gap: 12px;
    }

    .itemCenter {
        align-items: center;
    }

    .justifyCenter {
        justify-content: center;
    }
    .flex,
    .flexwrap {
        display: flex;
    }

    .flexwrap {
        flex-wrap: wrap;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    .weatherDivider {
        position: relative;
    }
    .weatherPollCard {
        width: 30%;
    }

    .flexCardCol {
        width: auto;
        margin-bottom: 20px;
        position: relative;
    }

    .weatherPoll p {
        padding-bottom: 5px;
    }

    .fullWeatherCard p {
        color: #888;
        font-size: var(--font18);
    }
    .pollutionChart {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
    }

    .pollutionChart li:first-child {
        border-radius: 100px 0 0 100px;
    }

    .pollutionChart li:last-child {
        border-radius: 0 100px 100px 0;
    }
    .pollutionChart li {
        padding: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: context-menu;
    }
    .good {
        background-color: #55a84f;
    }

    .poor {
        background-color: #f29c33;
    }

    .satisfactory {
        background-color: #a3c853;
    }

    .moderate {
        background-color: #fff833;
    }

    .veryPoor {
        background-color: #e93f33;
    }

    .severe {
        background-color: #af2d24;
    }

    .fullWeatherCard .tempText {
        font-size: var(--font18);
        font-weight: 400;
        width: 40%;
    }

    .dropdown-open {
        display: block;
    }

    .dropdown-closed {
        display: none;
    }

    .dropdown-open {
        position: absolute;
        z-index: 999;
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        margin-top: 4px;
    }

    .dropdown-open li {
        padding: 8px 16px; /* Adjust padding as needed */
        cursor: pointer;
    }

    .dropdown-open li:hover {
        background-color: #f0f0f0; /* Optional: Highlight on hover */
    }
</style>
