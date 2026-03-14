<script lang=ts>
  export let data;
  const { title, date, content } = data;

  import { page } from '$app/state';

  const path = page.url.pathname.split('/');
  const filename = path[path.length - 1];
</script>

<nav class="path">
  <a href="/projects">projects</a> ▶ {filename}.md
</nav>

<article>
  <h1>{title}</h1>
  <p class="metadata">Published {date}</p>

  <svelte:component this={content} />

</article>

<style>
  .path {
    font: "Berkeley Mono Variable", monospace;
  }
</style>