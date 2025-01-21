<script>
    export let categoryData;
</script>

<div class="breadcrumb mb-6">
    <ul>
        <li>
            <a href="/"> Home / </a>
        </li>
        <li>
            {categoryData?.frontend_name || categoryData?.name}
        </li>
    </ul>
</div>

<style>
    .breadcrumb ul {
        display: flex;
        gap: 4px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        font-weight: 400;
    }
    @media screen and (max-width: 680px) {
    .breadcrumb ul li {
      font-size: 12px;
    }
  }
</style>
