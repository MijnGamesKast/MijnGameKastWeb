<script lang="ts">
  let { data, children } = $props();
</script>

<div id="CollectionWrapper">
	<div class="collections card">
		<h2>Mijn collecties</h2>
		<a class="customButton" href={`/profiel/collecties/nieuw`}>Nieuwe collectie maken</a>
		{#if data.collecties.length === 0}
			<p>Je hebt nog geen collecties</p>
		{:else}
			{#each data.collecties as collectie}
				<a href="/profiel/collecties/{collectie.id}" class="collection">
					<span class="collectieNaam">{collectie.name}</span> <span class="collectieEigenaar">{#if collectie.isPublic === true}Openbaar{:else}Privé{/if}</span>
				</a>
			{/each}
		{/if}
	</div>


	<div class="collectionGames card">
		{@render children()}
	</div>
</div>


<!--<script lang="ts">-->
<!--	import type { PageData } from '../../../../.svelte-kit/types/src/routes';-->

<!--	let { data }: { data: PageData } = $props();-->
<!--</script>-->

<!--<h1>Mijn collecties</h1>-->

<!--{#if data.message}-->
<!--	<p style="color: red; font-weight: bold;">{data.message}</p>-->
<!--{/if}-->

<!--{#if data.collecties.length === 0}-->
<!--	<p>Je hebt nog geen collecties.</p>-->
<!--{:else}-->
<!--	<ul style="list-style: none; padding: 0;">-->
<!--		{#each data.collecties as collectie}-->
<!--			<li style="margin-bottom: 1rem; border: 1px solid #ccc; padding: 1rem;">-->
<!--				<a-->
<!--					style="text-decoration: none; color: inherit; display: block;"-->
<!--				>-->
<!--					<h2>{collectie.name}</h2>-->
<!--					<p>{collectie.description}</p>-->
<!--					<p>-->
<!--						Aangemaakt op:-->
<!--						{new Date(collectie.createdAt).toLocaleDateString('nl-NL')}-->
<!--					</p>-->
<!--					<p>-->
<!--						Zichtbaarheid:-->
<!--						{collectie.isPublic ? 'Openbaar' : 'Privé'}-->
<!--					</p>-->
<!--				</a>-->
<!--			</li>-->
<!--		{/each}-->
<!--	</ul>-->
<!--{/if}-->