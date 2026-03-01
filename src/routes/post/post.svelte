<script lang=ts>
  export let filename;
  export let title;
  export let date;
  export let time;
</script>

<nav class="path">
  <a href="/">blog</a> ▶ {filename}
</nav>

<article>
  <h1>{title}</h1>
  <p class="metadata">{date} {time}</p>

  <slot></slot>

</article>