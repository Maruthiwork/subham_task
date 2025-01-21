<script>
    export let className = "";
</script>

<div class={`desktop:p-3 border-gray-300 mb-8 h-max desktop:border ${className}`}>
    <slot></slot>
</div>
