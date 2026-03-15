<script>
  export let data;
</script>

<h1 class="pagetitle">Welcome!</h1>
<img id="uc" src="/images/under-construction.gif">

<h2 id="most-recent">Most recent post</h2>
{#if data.post === undefined}
  <div>No posts available.</div>
{:else}
  <div class="post">
    <h2>
      <a href={data.post.path} class="post-title">{data.post.meta.title}</a>
    </h2>
    <div class="metadata">Published {data.post.meta.date} · {data.section}</div>
  </div>
{/if}

<style>
  h1.pagetitle {
    text-align: center;
  }

  h2#most-recent {
    text-align: center;
  }

  div.metadata {
    font-family: var(--nhg);
    font-style: italic;
    color: var(--gray-50);
  }

  img#uc {
    display: block;
    margin: auto;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
  }
</style>
