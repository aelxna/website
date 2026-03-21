<script lang="ts">
	export let data;
	const { title, date, content } = data;

	import { page } from '$app/state';

	const path = page.url.pathname.split('/');
	const filename = path[path.length - 1];
</script>

<nav class="path">
	<a href="/blog">blog</a> ▶ {filename}.md
</nav>

<article>
	<h1>{title}</h1>
	<div class="metadata">Published {date}</div>

	<svelte:component this={content} />
</article>

<style>
	@import '/static/global.css';

	nav.path {
		font-family: var(--mono);

		a {
			color: var(--blog-primary);
		}
	}

	h1 {
		margin-top: 1rem !important;
	}

	.metadata {
		font-style: italic;
		font-family: 'Neue Haas Grotesk Text Pro', Helvetica, system-ui, sans-serif;
		color: var(--gray-50);
	}
</style>
