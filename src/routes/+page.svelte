<script>
	import posts from '$lib/assets/posts.json';

	const latest = posts.length === 0 ? undefined : posts.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime())[0]
</script>

<h1 class="pagetitle">welcome!</h1>

<p>
hi!!!!!! i'm elena, a computer scientist from minnesota. this is my website for blog posts, project showcases, and even an image gallery! i'll post about neat computer tricks, interesting projects i've worked on, and more. hope you enjoy! ^_^
</p>

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
	
	h3#latest-posttitle {
		font-size: 1.5em;
	}
</style>
