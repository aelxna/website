<script>
	import posts from '$lib/assets/posts.json';
	import Footer from '$lib/components/Footer.svelte';

	const latest = posts.length === 0 ? undefined : posts.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime())[0]
</script>

<h1 class="pagetitle">welcome!</h1>

<p>
hi!!!!!! i'm elena, a computer scientist from minnesota. this is my website for blog posts, project showcases, and even an image gallery! i'll post about interesting projects i've worked on as well as some random stuff i feel like writing about. hope you enjoy! ^_^
</p>

<h2 id="most-recent">latest post</h2>
{#if latest === undefined}
	<p>No posts available.</p>
{:else}
	<div class="post" style="margin-bottom:1rem;">
		<h3 id="latest-posttitle">
			<a href={`/${latest.type}/post/${latest.route}`} class="post-title">{latest.title}</a>
		</h3>
		<div class="metadata">Published {latest.date} · {latest.type === "blog" ? "blog" : "project"}</div>
	</div>
{/if}
<div class='dotted-gradient'><br></div>
<Footer />

<style>
	div.metadata {
		font-style: italic;
		color: var(--gray-50);
	}
	
	h3#latest-posttitle {
		font-size: 1.5em;
	}
</style>
