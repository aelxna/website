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
			section = 'about'
		} else {
			section = 'blog'
		}
	}
	
	onMount(() => updateSection(page.route.id));
	afterNavigate(() => updateSection(page.route.id));

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<div>
		aelena.net {page.route.id}
	</div>
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

{@render children()}
