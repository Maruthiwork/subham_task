<script lang="ts">
    import { loadMgidScript, useIntersectionObserver } from "../utils/utils";

    export let envDetails: any;

    useIntersectionObserver("ampmigid-container", 0.1, () =>
        loadMgidScript(envDetails?.language)
    );
</script>

<div class="ampmigid-container contentWrapper">{@html envDetails?.ampMgTag}</div>
