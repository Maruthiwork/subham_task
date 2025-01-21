<script lang="ts">
    //@ts-nocheck
    let selectedPhase = 0;
    export let keyDates;

    const handleClick = (index) => {
        selectedPhase = index;
    };
</script>


<div class="keyDateContainer">
    <h2 class="keyDateHeader">Election Key Dates 2024</h2>
    <div class="phaseWrapper">
        <span class="phaseText">Phase</span>
        {#each keyDates?.phases as _, index}
            <span
                on:click={() => handleClick(index)}
                class="pointer {index === selectedPhase ? 'phaseNum active' : 'phaseNum'}">
                {index + 1}
            </span>
        {/each}
    </div>
    <div class="dateWrapper">
        <div class="dateText">Starting Date: {keyDates?.phases?.[selectedPhase]?.Date} 2024</div>
    </div>
    <div class="keyWrapper">
        <div class="keycontent">
            <div class="keyheading">Constituencies</div>
            <div class="keynum">{keyDates?.phases?.[selectedPhase]?.Constituencies}</div>
        </div>
        <div class="keycontent">
            <div class="keyheading">States</div>
            <div class="keynum">{keyDates?.phases?.[selectedPhase]?.['States/UTs']}</div>
        </div>
    </div>
    <div class="dateWrapper">
        <div class="dateText">Counting Date: 4th June 2024</div>
    </div>
</div>

<style>
    
.keyDateContainer {
    padding: 12px;
    background: #1B4C7A;
    border-radius: 4px;
}

.pointer {
    cursor: pointer;
}

.keyDateHeader {
    color: #FFF;
    font-size: 28px;
    font-weight: 900;
    line-height: 120%;
    letter-spacing: -1.12px;
    margin-bottom: 16px;
    text-align: center;
}

.phaseText {
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
}

.phaseNum {
    border-radius: 100px;
    border: 1px solid #FFF;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 120%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.active {
    border: 1px solid #F2DE27;
    background: #F2DE27;
    color: #1B4C7A;

}

.phaseWrapper {
    display: flex;
    gap: 20px;
    overflow: auto;
    margin-bottom: 24px;
}

.dateWrapper {
    padding: 10px 13px;
    text-align: center;
    border-top: 1px solid #FFF;
    border-bottom: 1px solid #FFF;
}

.dateText {
    color: #F2DE27;
    font-size: 17px;
    font-weight: 700;
    line-height: 120%;
    /* 20.4px */
}

.keyWrapper {
    padding-top: 20px;
    padding-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr)
}

.keycontent {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-top: 12px;
    padding-bottom: 12px;
    align-items: center;
    justify-content: center;
}

.keycontent:first-child {
    border-right: 1px solid #FFF;
}

.keyheading {
    color: #FFF;
    font-size: 17px;
    font-weight: 700;
    line-height: 120%;
    /* 20.4px */
}

.keynum {
    color: #F2DE27;
    font-size: 52px;
    font-weight: 700;
    line-height: 120%;
    /* 62.4px */
}


</style>