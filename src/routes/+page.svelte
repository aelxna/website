<script>
	export let data;
</script>

<h1 class="pagetitle">Welcome!</h1>
<img id="uc" src="/images/under-construction.gif" alt="Under construction"/>

<h2 id="most-recent">latest post</h2>
{#if data.post === undefined}
	<div>No posts available.</div>
{:else}
	<div class="post">
		<h3 id="latest-posttitle">
			<a href={data.post.path} class="post-title">{data.post.meta.title}</a>
		</h3>
		<div class="metadata">Published {data.post.meta.date} · {data.section}</div>
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

		a {
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}
	}
</style>
