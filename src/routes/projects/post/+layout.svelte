<script lang="ts">
	import { page } from '$app/state';
	import posts from '$lib/assets/posts.json';
	import Icon from 'svelte-awesome';
	import github from 'svelte-awesome/icons/github';
	import { tokyoNightDark } from 'svelte-highlight/styles';

	let { children } = $props();

	const path = page.url.pathname.split('/');
	const filename = path[path.length - 1];

	const post = posts.filter(x => x.route === filename)[0];

	let repoLink: string | undefined = $state(undefined);
	if (post.repo !== undefined) {
		repoLink = post.repo?.split("/").slice(3).join("/");
	}

</script>

<svelte:head>
	{@html tokyoNightDark}
</svelte:head>

<div style="display:flex;justify-content: space-between;">
	<nav class="path">
		<a href="/projects">projects</a> ▶ {filename}
	</nav>

	{#if repoLink}
		<a id="repo" href={post.repo}> <span><Icon data={github}/></span> {repoLink}</a>
	{/if}
</div>

<article>
	<h1>{post.title}</h1><nav class="path">
</nav>
	<div class="metadata">
		Published {post.date} 
		{#each post.tags as t}
			{" · "}{t} 
		{/each}
	</div>

	{@render children()}
</article>

<style>
	@import '/static/global.css';

	nav.path {
		font-style: italic;
		color: var(--gray-50);
	}

	#repo {
		font-style: italic;
		color: var(--gray-50);
		text-decoration: none;
		display: inline-block;
		vertical-align: top;
		span {
			vertical-align: middle;
		}
	}

	#repo:hover {
		text-decoration: underline;
	}

	#repo:visited {
		color: var(--gray-50);
	}

	h1 {
		margin-top: 1rem !important;
	}

	.metadata {
		font-style: italic;
		color: var(--gray-50);
	}
</style>
