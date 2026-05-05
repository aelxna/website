<script>
	import posts from '$lib/assets/posts.json';

	let project_posts = posts.filter(x => x.type === "projects");
</script>

<h1 class="pagetitle">projects</h1>

{#if project_posts.length === 0}
	<p>No posts available.</p>
{:else}
	<ul>
		{#each project_posts as p}
			<li class="post">
				<h2>
					<a href={`/projects/post/${p.route}`} class="post-title">{p.title}</a>
				</h2>
				<div class="metadata">Published {p.date}</div>
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

	ul {
		list-style: none;
		padding-left: 0;
	}
</style>
