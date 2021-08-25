<script>
  import { onDestroy, onMount } from "svelte";
  import { getBlogPosts, getBlogCategoryDetail } from "../scripts/firebase";
  import { darkmode } from "../scripts/store";
  import Heading from "./components/Heading.svelte";
  import Metas from "./components/Metas.svelte";
  import PostForm from "./components/PostForm.svelte";
  import PostsGrid from "./components/PostsGrid.svelte";
  import CrossIcon from "./icons/crossIcon.svelte";
  import LoadingIcon from "./icons/loadingIcon.svelte";

  export let loggedInUser;
  export let params;

  let showForm = false;
  let Posts;
  let lastPost;

  onMount(async () => {
    const data = await getBlogPosts(params?.id);
    Posts = data.posts;
    lastPost = data.lastPost;
  });

  onDestroy(() => {
    Posts = [];
    lastPost = null;
  });

  $: onSeeMore = () => {
    getBlogPosts({ next: true, trim: true }).then((data) => {
      Posts.push(...data.posts);
      Posts = Posts;
      lastPost = data.lastPost;
    });
  };

  $: onShowForm = () => {
    showForm = !showForm;
  };
</script>

<Metas />
{#await getBlogCategoryDetail(params?.id)}
  <div style="margin: 0 auto; display: grid; justify-content: center;">
    <LoadingIcon className="icon" style="background: #b20000" />
  </div>
{:then blogCategory}
  {#if blogCategory?.error?.code == 404}
    <div class="text-center m-0-auto">
      <img
        style="width: 100%;max-width: 600px;"
        src="/assets/img/404.webp"
        alt="Not found"
      />
    </div>
  {:else}
    <Heading {loggedInUser} />
    <div style="max-width: 1500px;margin:0 auto">
      {#if loggedInUser?.user}
        <button
          class="create_post"
          style={`background: ${$darkmode ? "#8a000087" : "#dddddd"}`}
          on:click={onShowForm}
          >Write a post <span style="font-size: 1.5em;">&#x270E;</span>
        </button>
        {#if showForm}
          <div
            class="post_form_wrapper"
            style={`background: ${$darkmode ? "#232323" : "#fff"}`}
          >
            <button
              class="transparent--button cancel"
              on:click={() => (showForm = !showForm)}
            >
              <CrossIcon
                className="icon"
                style={`fill: ${$darkmode ? "#fff" : "#b20000"}`}
              />
            </button>
            <PostForm
              blogId={params?.id}
              on:closeForm={() => (showForm = !showForm)}
            />
          </div>
        {/if}
      {/if}
    </div>
    <div class="blog_head mb-1">
      <h2 class="mt-1 py-1 pb-2 text-center">{blogCategory?.name}</h2>
      <p class="blog_description pb-1 text-center">
        {blogCategory?.description}
      </p>
    </div>
  {/if}
{:catch error}
  <p style="color: red; font-weight: bolder;">{error.message}</p>
{/await}
<PostsGrid {loggedInUser} {lastPost} {Posts} on:seeMore={() => onSeeMore()} />

<style>
  .blog_description {
    margin: 5px auto;
    font-size: clamp(1.1rem, 2vw, 1.8rem);
    max-width: 1200px;
    background: #0000008a;
  }
  .blog_head h2 {
    background: #0000008a;
  }
  .blog_head {
    background: url(/assets/img/programmingbg.webp) center;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
  }
  button.create_post {
    padding: 8px 10px;
    margin: 10px 10px 0 10px;
    font-size: inherit;
    border: 1px solid red;
  }
  .post_form_wrapper {
    position: absolute;
    top: 80px;
    padding-top: 10px;
    left: 0;
    min-height: 100vh;
    min-width: 99vw;
    z-index: 1;
  }
  .cancel {
    margin: 0 10px;
    border-radius: 1pc;
  }
</style>
