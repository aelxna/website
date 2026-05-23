<script>
	let { section } = $props();
</script>

<header>
	<nav>
		{#if section === 'home'}
			<div class="sitename">
				<img src="/images/logo.svg" class="logo" alt="website logo" />
				aelena.net
			</div>
		{:else}
			<a href="/" class="sitename">
				<img src="/images/logo.svg" class="logo" alt="website logo" />
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

<style>
	header {
		background: linear-gradient(90deg, var(--page-primary), var(--page-light));
		padding: 0.5rem 0.75rem;

		font-size: 1.25rem;
		font-family: var(--header);
		color: var(--text-white);

		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		min-height: 1.5rem;


		.sitename {
			display: flex;
			align-items: center;
			font-weight: bold;
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
				0 0 0.5rem var(--page-primary),
				0 0 0.25rem var(--page-primary);
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
</style>