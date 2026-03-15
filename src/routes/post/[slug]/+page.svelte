<script lang=ts>
  export let data;
  const { title, date, content } = data;

  import { page } from '$app/state';

  const path = page.url.pathname.split('/');
  const filename = path[path.length - 1];
</script>

<nav class="path">
  <a href="/">blog</a> ▶ {filename}.md
</nav>

<article>
  <h1>{title}</h1>
  <div class="metadata">Published {date}</div>

  <svelte:component this={content} />

</article>

<style>
  nav.path {
    font-family: "Berkeley Mono Variable", monospace !important;
  }

  h1 {
    margin-top: 1rem;
  }

  .metadata {
    font-style: italic;
    /* font-family: 'Neue Haas Grotesk Text Pro', Helvetica, system-ui, sans-serif; */
  }
</style>