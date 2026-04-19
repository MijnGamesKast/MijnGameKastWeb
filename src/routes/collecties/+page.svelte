<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Mijn collecties</h1>

{#if data.message}
	<p style="color: red; font-weight: bold;">{data.message}</p>
{/if}

{#if data.collecties.length === 0}
	<p>Je hebt nog geen collecties.</p>
{:else}
	<ul style="list-style: none; padding: 0;">
		{#each data.collecties as collectie}
			<li style="margin-bottom: 1rem; border: 1px solid #ccc; padding: 1rem;">
				<a
					href={`/collecties/${collectie.id}`}
					style="text-decoration: none; color: inherit; display: block;"
				>
					<h2>{collectie.name}</h2>
					<p>{collectie.description}</p>
					<p>
						Aangemaakt op:
						{new Date(collectie.createdAt).toLocaleDateString('nl-NL')}
					</p>
					<p>
						Zichtbaarheid:
						{collectie.isPublic ? 'Openbaar' : 'Privé'}
					</p>
				</a>
			</li>
		{/each}
	</ul>
{/if}