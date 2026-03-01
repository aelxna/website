<script lang=ts>
  export let filename;
  export let title;
  export let description;
</script>

<nav class="path">
  <a href="/">blog</a> ▶ {filename}
</nav>

<article>
  <h1>{title}</h1>
  <p "description">{description}</p>

  <slot></slot>

</article>