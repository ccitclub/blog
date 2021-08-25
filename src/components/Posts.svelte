<script>
  import { getAllSortedPosts } from "../../scripts/firebase";
  import { onDestroy, onMount } from "svelte";
  import PostsGrid from "./PostsGrid.svelte";
  import { sortBy } from "../../scripts/store";

  export let loggedInUser;

  let Posts;
  let lastPost;

  onMount(async() => {
    const data = await getAllSortedPosts(false, true, $sortBy);
    Posts = data?.posts;
    lastPost = data?.lastPost;
  });

  onDestroy(() => {
    Posts = [];
    lastPost = null;
  });

  $: onSeeMore = async () => {
    await getAllSortedPosts(true, true, $sortBy).then((data) => {
      Posts.push(...data.posts);
      Posts = Posts;
      lastPost = data.lastPost;
    });
  };
</script>

<PostsGrid {loggedInUser} {lastPost} {Posts} on:seeMore={async() => await onSeeMore()} />
