<script>
  export let data;
</script>

<h1>
  Projects
</h1>

<ul>
  {#each data.posts as p}
    <li class="post">
      <h2>
        <a href={p.path} class="post-title">{p.meta.title}</a>
      </h2>
      {p.meta.date}
    </li>
  {/each}
</ul>

<img src="/images/under-construction.gif">