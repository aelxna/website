<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import path from 'path';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	let section = $state('blog');

	const updateSection = (path: string | null) => {
		if (path?.includes('projects')) {
			section = 'projects';
		} else if (path?.includes('gallery')) {
			section = 'gallery';
		} else if (path?.includes('about')) {
			section = 'about';
		} else if (path?.includes('blog')) {
			section = 'blog';
		} else {
			section = 'home';
		}
	};

	onMount(() => updateSection(page.url.pathname));
	afterNavigate(() => updateSection(page.url.pathname));
</script>

<svelte:head>
  <link rel="icon" href="/images/favicon-black.svg">
  <link rel="icon" href="/images/favicon-black.svg" media="(prefers-color-scheme: light)">
  <link rel="icon" href="/images/favicon-white.svg" media="(prefers-color-scheme: dark)">
	<title>{section} · aelena.net</title>
</svelte:head>

<main class={section}>
	<div class="window-container">
		<div class="window">
			<Navbar {section} />
			<div class="content">
				{@render children()}
			</div>
			<div class='dotted-gradient'><br></div>
			<Footer />
		</div>
	</div>
</main>

<style>
	@import '/static/global.css';

	:root {
		--footer-height: 31px;
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

	main {
		min-height: 100vh;
		position: relative;
		padding: 0;
		margin: 0;
		background: linear-gradient(180deg, var(--text-white), var(--page-light));
	}

	.window-container {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.window {
		position: relative;
		border: 1pt solid var(--page-dark);
		border-radius: 4px;
		box-shadow:
			inset 1pt 1pt 0pt 0pt white,
			inset -1pt -1pt 0pt 0pt var(--gray-50),
			inset -3pt -3pt 0pt 0pt var(--gray-85),
			inset 3pt 3pt 0pt 0pt var(--gray-85),
			inset 4pt 4pt 0pt 0pt var(--gray-50),
			inset -4pt -4pt 0pt 0pt white,
			inset -6pt -6pt 0pt 0pt var(--page-primary),
			inset -6pt 6pt 0pt 0pt var(--page-primary),
			inset 6pt -6pt 0pt 0pt var(--page-primary),
			inset 6pt 6pt 0pt 0pt var(--page-primary);

		padding: 0.75rem;

		margin-left: auto;
		margin-right: auto;

		max-width: 900px;

		background-color: var(--text-white);
		color: var(--text-black);

	}

	.content {
		padding: 0.75rem;
		padding-bottom: 0;
		font-family: var(--sans);
	}

	.dotted-gradient {
  	background-image: linear-gradient(to right, var(--page-light) 25%, rgba(255, 255, 255, 0) 0%);
  	background-position: top;
  	background-size: 8px 2px;
  	background-repeat: repeat-x;
		height: 0.5rem;
	}

</style>
