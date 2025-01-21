<script lang="ts">
    //@ts-nocheck
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import showerIcon from '$lib/assets/images/showericon.png';

    let container;
    const total = 30; 
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Random number generator
    const random = (min, max) => min + Math.random() * (max - min);

    // Generate floating dots
    const startShower = () => {
        // Clear any existing petals in the container
        container.innerHTML = '';

        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';

            // Position and appearance
            gsap.set(dot, {
                x: random(0, windowWidth),
                y: random(-200, -150),
                z: random(-200, 200)
            });

            container.appendChild(dot);
            animateDot(dot);
        }
    };

    // Animation function
    const animateDot = (dot) => {
        const duration = random(6, 15); 

        gsap.to(dot, {
            y: windowHeight + 100,
            duration: duration,
            ease: "none",
            onComplete: () => {
                // Remove the petal from the DOM once animation is complete
                dot.remove();
            }
        });

        gsap.to(dot, {
            x: "+=100",
            rotationZ: random(0, 180),
            duration: random(4, 8),
            ease: "sine.inOut",
            yoyo: true
        });

        gsap.to(dot, {
            rotationX: random(0, 360),
            rotationY: random(0, 360),
            duration: random(2, 8),
            ease: "sine.inOut",
            yoyo: true
        });
    };

    onMount(() => {
        startShower();
    });
</script>

<style>
    #container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0; 
        pointer-events: none; 
    }

    #content {
        position: relative;
        z-index: 1; 
        text-align: center;
        padding: 20px;
    }

    #startButton {
        padding: 10px;
        font-size: 18px;
        font-weight: bold;
        background-color: #ff69b4;
        color: white;
        border: none;
        border-radius: 100%;
        cursor: pointer;
        z-index: 10;
        position: fixed;
        bottom: 14%;
        right: 10%;
    }

    #startButton:hover {
        background-color: #555;
    }

    .dot {
        width: 35px;
        height: 35px;
        position: absolute;
        background: url('https://image.ibb.co/kyUHab/rose.png');
        background-size: cover;
    }
</style>

<div id="container" bind:this={container}></div>

<div id="content">
    <button id="startButton" on:click={startShower}>
        <img src={showerIcon} alt="shower-icon" width="70px" height="70px" style="padding: 10px;" />
    </button>
</div>
