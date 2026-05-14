<script lang="ts">
	import { page } from '$app/state';
	import posts from '$lib/assets/posts.json';
	import { tokyoNightDark } from 'svelte-highlight/styles';

	let { children } = $props();

	const path = page.url.pathname.split('/');
	const filename = path[path.length - 1];

	const post = posts.filter((x) => x.route === filename)[0];
</script>

<svelte:head>
	{@html tokyoNightDark}
</svelte:head>

<nav class="path">
	<a href="/blog">blog</a> ▶ {filename}
</nav>

<article>
	<h1>{post.title}</h1>
	<div class="metadata">Published {post.date}</div>

	{@render children()}
</article>

<style>
	@import '/static/global.css';

	nav.path {
		font-style: italic;
		font-family: var(--nhg);
		color: var(--gray-50);
	}

	h1 {
		margin-top: 1rem !important;
	}

	.metadata {
		font-style: italic;
		font-family: var(--nhg);
		color: var(--gray-50);
	}
</style>
