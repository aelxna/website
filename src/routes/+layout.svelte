<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import path from 'path';

	let { children } = $props();

	let section = $state('blog');

	const updateSection = (path: string | null) => {
		if (path?.includes('projects')) {
			section = 'projects';
		} else if (path?.includes('gallery')) {
			section = 'gallery';
		} else if (path?.includes('about')) {
			section = 'about';
		} else {
			section = 'blog';
		}
	};

	onMount(() => updateSection(page.url.pathname));
	afterNavigate(() => updateSection(page.url.pathname));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
<div class="window-container">
	<div class="window">
		<header>
			<div>aelena.net</div>
			<nav>
				{#if section === 'blog'}
					<strong>blog</strong>
				{:else}
					<a href="/">blog</a>
				{/if}

				{#if section === 'projects'}
					<strong>projects</strong>
				{:else}
					<a href="/projects">projects</a>
				{/if}

				{#if section === 'gallery'}
					<strong>gallery</strong>
				{:else}
					<a href="/gallery">gallery</a>
				{/if}

				{#if section === 'about'}
					<strong>about</strong>
				{:else}
					<a href="/about">about</a>
				{/if}
			</nav>
		</header>
		<div class="content">
			{@render children()}
		</div>
	</div>
</div>
	<footer>meow</footer>
</main>

<style>
	@import '/static/themes/prism-xonokai.css';
	@import '/static/fonts.css';

	:root {
		--footer-height: 2.5rem;
	}

	main {
		min-height: 100vh;
		position: relative;
		padding: 0;
		margin: 0;
	}

	.window-container {
		padding-top: 0.5rem;
		padding-bottom: calc(var(--footer-height) + 0.5rem);
	}

	.window {
		position: relative;
		box-shadow:
			inset 1pt 1pt 0pt 0pt #ffffff,
			inset -1pt -1pt 0pt 0pt #5b5b5b,
			inset -3pt -3pt 0pt 0pt #cccccc,
			inset 3pt 3pt 0pt 0pt #cccccc,
			inset 4pt 4pt 0pt 0pt #5b5b5b,
			inset -4pt -4pt 0pt 0pt #ffffff,
			inset -6pt -6pt 0pt 0pt #8f54d3,
			inset -6pt 6pt 0pt 0pt #8f54d3,
			inset 6pt -6pt 0pt 0pt #8f54d3,
			inset 6pt 6pt 0pt 0pt #8f54d3;

		padding: 0.8rem;

		margin-left: auto;
		margin-right: auto;

		border: 1pt solid black;
		border-radius: 4px;
		max-width: 900px;
	}

	header {
		background-color: #8f54d3;
		padding: 0.5rem 0.8rem;

		font-size: 20px;
		color: white;

		display: flex;
		justify-content: space-between;

		a {
			color: white;
		}
	}

	.content {
		padding: 0.8rem;
	}

	footer {
		position: absolute;
		bottom: 0;
		min-width: 100%;
		height: 2.5rem;
		background-color:#5b5b5b;
		margin: 0;
	}
</style>
