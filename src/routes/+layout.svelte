<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import path from 'path';

	let { data, children } = $props();

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
	<link rel="icon" href={favicon} />
	<title>{section} · aelena.net</title>
</svelte:head>

<main class={section}>
	<div class="window-container">
		<div class="window">
			<header>
				<nav>
					{#if section === 'home'}
						<div class="sitename">
							<img src="/images/logo.svg" class="logo" />
							aelena.net
						</div>
					{:else}
						<a href="/" class="sitename">
							<img src="/images/logo.svg" class="logo" />
							aelena.net
						</a>
					{/if}
				</nav>
				<nav>
					{#if section === 'blog'}
						<strong>blog</strong>
					{:else}
						<a href="/blog" id="blog-nav">blog</a>
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
	<footer>
		<div class="footer-content">
			<div class="buttons">
				<img src="/images/no-right-turn.gif" />
				<img src="/images/M2_Demo_Now.jpg" />
				<img src="/images/gamecube.png" />
				<img src="/images/flag-lesbian.png" />
			</div>
			<div class="commit">
				<a href="https://github.com/aelxna/website">{data.commit}</a>
			</div>
		</div>
	</footer>
</main>

<style>
	@import '/static/global.css';

	:root {
		--footer-height: calc(31px + 1rem);
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
		padding-bottom: calc(var(--footer-height) + 0.5rem);
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

		padding: 0.8rem;

		margin-left: auto;
		margin-right: auto;

		max-width: 900px;

		background-color: var(--text-white);
		color: var(--text-black);
	}

	header {
		background: linear-gradient(90deg, var(--page-primary), var(--page-light));
		padding: 0.5rem 0.8rem;

		font-size: 1.5rem;
		font-family: var(--nhg);
		color: white;

		display: flex;
		justify-content: space-between;
		align-items: center;

		.sitename {
			display: flex;
			align-items: center;
		}

		.logo {
			height: 1.5rem;
			padding-right: 0.5rem;
			display: block;
			filter: brightness(0) saturate(100%) invert(100%) sepia(63%) saturate(2439%)
				hue-rotate(180deg) brightness(111%) contrast(105%);
		}

		a {
			color: white;
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}

		nav * {
			text-shadow:
				0 0 0.5rem var(--page-primary),
				0 0 1rem var(--page-primary),
				0 0 1rem var(--page-primary);
		}

		#blog-nav:hover {
			text-shadow:
				0 0 0.5rem var(--blog-primary),
				0 0 0.5rem var(--blog-primary),
				0 0 1rem var(--blog-primary),
				0 0 1rem var(--blog-primary);
		}
		#projects-nav:hover {
			text-shadow:
				0 0 0.5rem var(--projects-primary),
				0 0 0.5rem var(--projects-primary),
				0 0 1rem var(--projects-primary),
				0 0 1rem var(--projects-primary);
		}
		#gallery-nav:hover {
			text-shadow:
				0 0 0.5rem var(--gallery-primary),
				0 0 0.5rem var(--gallery-primary),
				0 0 1rem var(--gallery-primary),
				0 0 1rem var(--gallery-primary);
		}
		#about-nav:hover {
			text-shadow:
				0 0 0.5rem var(--about-primary),
				0 0 0.5rem var(--about-primary),
				0 0 1rem var(--about-primary),
				0 0 1rem var(--about-primary);
		}
	}

	.content {
		padding: 0.8rem;
		font-family: var(--ss4);

		a {
			color: var(--page-primary) !important;
		}
	}

	footer {
		position: absolute;
		bottom: 0;
		min-width: 100%;
		height: var(--footer-height);
		margin: 0;
		border-top: 1pt solid var(--page-dark);
		box-shadow:
			inset 1pt 1pt 0pt 0pt white,
			inset -1pt -1pt 0pt 0pt var(--gray-50),
			inset -3pt -3pt 0pt 0pt var(--gray-75),
			inset 3pt 3pt 0pt 0pt var(--gray-75),
			inset 4pt 4pt 0pt 0pt var(--gray-50),
			inset -4pt -4pt 0pt 0pt white;
		background-color: var(--gray-75);

		.footer-content {
			margin: 4pt calc(4pt + 0.5rem);
			align-items: center;
			display: flex;
			justify-content: space-between;

			.buttons {
				margin-top: 2pt;
				margin-bottom: 2pt;
				align-items: center;

				img {
					image-rendering: crisp-edges;
					image-rendering: pixelated;
				}
			}

			.commit {
				margin-top: 2pt;
				margin-bottom: 6pt;

				a {
					color: var(--text-black);
					text-decoration: none;
					font-family: var(--mono);
				}

				a:hover {
					text-decoration: underline;
				}

				a:visited {
					color: var(--text-black);
				}
			}
		}
	}
</style>
