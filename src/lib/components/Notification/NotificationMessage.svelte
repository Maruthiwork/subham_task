<script>
    export let showModal = false;

    export let title = "";
    export let body = "";
    export let url = null;
    // export let autoClose = 3000;
    export let image = null;

    const toggleModal = () => {
        showModal = !showModal;
    };
</script>

<!-- Modal -->
{#if showModal}
    <div
        class="fixed top-0 right-0 bg-gray-600 bg-opacity-50 w-full h-full flex items-start justify-end z-50"
    >
        <div class="bg-white rounded-lg shadow-lg p-6 mt-4 mr-4 w-96">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">{title}</h2>
                <button
                    on:click={toggleModal}
                    class="text-gray-500 hover:text-gray-700">&times;</button
                >
            </div>
            <p class="mb-4">
                {#if image}
                    <div class="modal-image">
                        <img
                            alt="Republic"
                            src={image}
                            decoding="async"
                            loading="lazy"
                        />
                    </div>
                {/if}
                {body}
            </p>
            <button
                on:click={toggleModal}
                class="px-4 py-2 bg-red-500 text-white rounded">Close</button
            >
            {#if url}
                <a
                    href={url}
                    data-sveltekit-reload
                    class="px-4 py-2 bg-green-500 text-white rounded ml-2"
                    >View More</a
                >
            {/if}
        </div>
    </div>
{/if}
