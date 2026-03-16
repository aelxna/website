<script>
	export let data;
</script>

<h1 class="pagetitle">Blog Posts</h1>

{#if data.posts.length === 0}
	No posts available.
{:else}
	<ul>
		{#each data.posts as p}
			<li class="post">
				<h2>
					<a href={p.path} class="post-title">{p.meta.title}</a>
				</h2>
				<div class="metadata">Published {p.meta.date}</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	h1.pagetitle {
		text-align: center;
	}

	div.metadata {
		font-family: var(--nhg);
		font-style: italic;
		color: var(--gray-50);
	}
</style>
