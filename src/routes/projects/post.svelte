<script lang=ts>
  export let filename;
  export let title;
  export let description;
</script>

<nav class="path">
  <a href="/projects">projects</a> ▶ {filename}
</nav>

<article>
  <h1>{title}</h1>
  <p class="description">{description}</p>

  <slot></slot>

</article>