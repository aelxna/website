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

<main class={section}>
<div class="window-container">
	<div class="window">
		<header>
			<div style="align-items:center;display:flex">
				<img src="images/logo.svg" class="logo">
				aelena.net
			</div>
			<nav>
				{#if section === 'blog'}
					<strong>blog</strong>
				{:else}
					<a href="/" id="blog-nav">blog</a>
				{/if}

				{#if section === 'projects'}
					<strong>projects</strong>
				{:else}
					<a href="/projects" id="projects-nav">projects</a>
				{/if}

				{#if section === 'gallery'}
					<strong>gallery</strong>
				{:else}
					<a href="/gallery" id="gallery-nav">gallery</a>
				{/if}

				{#if section === 'about'}
					<strong>about</strong>
				{:else}
					<a href="/about" id="about-nav">about</a>
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
	@import '/static/global.css';

	:root {
		--footer-height: 2.5rem;
	}

	.blog {
		--page-primary: var(--blog-primary);
		--page-light: var(--blog-light);
		--page-dark: var(--blog-dark);
	}
	.projects {
		--page-primary: var(--projects-primary);
		--page-light: var(--projects-light);
		--page-dark: var(--projects-dark);
	}
	.gallery {
		--page-primary: var(--gallery-primary);
		--page-light: var(--gallery-light);
		--page-dark: var(--gallery-dark);
	}
	.about {
		--page-primary: var(--about-primary);
		--page-light: var(--about-light);
		--page-dark: var(--about-dark);
	}

	.logo {
		height: 1.5rem;
		padding-right: 0.5rem;
		display: block;
		filter: brightness(0) saturate(100%) invert(100%) sepia(63%) saturate(2439%) hue-rotate(180deg) brightness(111%) contrast(105%);
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
			inset -6pt -6pt 0pt 0pt var(--page-primary),
			inset -6pt 6pt 0pt 0pt var(--page-primary),
			inset 6pt -6pt 0pt 0pt var(--page-primary),
			inset 6pt 6pt 0pt 0pt var(--page-primary);

		padding: 0.8rem;

		margin-left: auto;
		margin-right: auto;

		border: 1pt solid var(--page-dark);
		border-radius: 4px;
		max-width: 900px;
	}

	header {
		background: linear-gradient(90deg, var(--page-primary), var(--page-light));
		padding: 0.5rem 0.8rem;

		font-size: 1.5rem;
		color: white;

		display: flex;
		justify-content: space-between;

		a {
			color: white;
			text-decoration: none;
		}
		
		a:hover {
			text-decoration: underline;
		}

		nav * {
			filter: drop-shadow(0 0 0.5rem var(--page-primary));
		}

		#blog-nav:hover {
			filter: drop-shadow(0 0 0.5rem var(--blog-primary));
		}
		#projects-nav:hover {
			filter: drop-shadow(0 0 0.5rem var(--projects-primary));
		}
		#gallery-nav:hover {
			filter: drop-shadow(0 0 0.5rem var(--gallery-primary));
		}
		#about-nav:hover {
			filter: drop-shadow(0 0 0.5rem var(--about-primary));
		}
	}

	.content {
		padding: 0.8rem;
	}

	footer {
		position: absolute;
		bottom: 0;
		min-width: 100%;
		height: var(--footer-height);
		background-color:#5b5b5b;
		margin: 0;
	}
</style>
