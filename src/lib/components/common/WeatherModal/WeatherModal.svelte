<script>
    import Weather from "../Weather/Weather.svelte";

export let open;
export let handleClose;
export let weatherInfo;
export let language ='E';

</script>

<div class="weatherModal {open ? 'open' : ''}" >
    <div class="weatherModalbg">
        <div class="weatherModalWrapper">
            <div class="closeModal" on:click={handleClose}>
               
                    <a class="iconLink">
                        <i class="closeIcon"/>
                    </a>
               </div>
            <Weather weatherInfo={weatherInfo} language={language}/>
        </div>
    </div>
</div>

<style>
.weatherModal {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    overflow: auto;
}

.weatherModal.open {
    opacity: 1;
    visibility: visible;
    z-index: 999;
}

.weatherModalWrapper {
    position: relative;
    padding-top: 1%;
}

:focus-visible {
    outline: -webkit-focus-ring-color auto 0px;
}

.weatherModalbg {
    box-shadow: 2.6450018882751465px -5.290003776550293px 26.45001792907715px 0px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    background: var(--white);
    padding: 16px 16px 10px;
    max-width: 90%;
    margin: 30px auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.closeModal {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 25px;
}
.iconLink {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: #000;
    cursor: pointer;
    display: flex;
    align-items: center;
}
@media screen and (max-width: 991px) {
    .closeIcon {
        margin-right: 0;
        width: 36px;
        height: 36px;
        background-size: 20px auto;
    }
}
.closeIcon {
    background: url("$lib/assets/images/close-icon.svg") no-repeat 50%;
    background-size: contain;
    width: 22px;
    height: 22px;
}
</style>