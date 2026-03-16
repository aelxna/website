<script>
	export let data;
</script>

<h1 class="pagetitle">projects</h1>

{#if data.posts.length === 0}
	<p>No posts available.</p>
{:else}
	<ul>
		{#each data.posts as p}
			<li class="post">
				<h2>
					<a href={p.path} class="post-title">{p.meta.title}</a>
				</h2>
				<div class="metadata">{p.meta.date}</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
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
