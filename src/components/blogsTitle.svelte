<script>
    import { slide } from 'svelte/transition'
	import { getBlogsTitle } from '../../scripts/firebase';
	import { onMount } from "svelte";

    let BlogsTitle;
    let showBlogsTitle;
    onMount(async() => {
			BlogsTitle = await getBlogsTitle();
		})
    const showCategory = () => {
        if(window.innerWidth<=730)
            showBlogsTitle = !showBlogsTitle;
    }
</script>

<div class="blogs_category">
    <h2 class="text-center p-1" on:click={() => showCategory()}>
        CATEGORY <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.75.75 0 011.06-1.06L8 9.94l3.72-3.72a.75.75 0 011.06 0z"></path></svg>
    </h2><hr class="long-dash"/>
    <ul style={`display:${showBlogsTitle?"block":""}`}>
        {#if BlogsTitle}
            {#each BlogsTitle as title}
                <a class="no_link" href={`/b/${title.id}`}>
                    <li transition:slide="{{delay: 250, duration: 300}}">
                    <button class="__name transparent--button w-100">{title.name}</button>
                </li>
            </a>
            {/each}
        {/if}
    </ul>
</div>

<style>
    ul {
        padding: 5px;
    }
    li{
        list-style: none;
        padding: 8px 6px;
        margin: 2px 0;
        background-color: rgba(197, 197, 197, 0.171);
    }
    li:hover {background-color: rgba(197, 197, 197, 0.4);}
    li button {text-align: justify;}
    .__name {font-weight: 400; font-size: clamp(1rem, 5vw, 1.3rem);}
    @media (max-width: 730px) {
        ul {
            display: none;
        }
    .blogs_category h2 { cursor: pointer; } 
    }
</style>