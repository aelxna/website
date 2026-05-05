<script>
	import posts from '$lib/assets/posts.json';

	const latest = posts.length === 0 ? undefined : posts.sort((a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime())[0]
</script>

<h1 class="pagetitle">Welcome!</h1>
<img id="uc" src="/images/under-construction.gif" alt="Under construction"/>

<h2 id="most-recent">latest post</h2>
{#if latest === undefined}
	<div>No posts available.</div>
{:else}
	<div class="post">
		<h3 id="latest-posttitle">
			<a href={`/${latest.type}/post/${latest.route}`} class="post-title">{latest.title}</a>
		</h3>
		<div class="metadata">Published {latest.date} · {latest.type === "blog" ? "blog" : "project"}</div>
	</div>
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
	
	h3#latest-posttitle {
		font-size: 1.5em;
	}
</style>
