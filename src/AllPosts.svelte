<script>
  import Heading from "./components/Heading.svelte";
  import BlogsTitle from "./components/blogsTitle.svelte";
  import Posts from "./components/Posts.svelte";
import Metas from "./components/Metas.svelte";

export let loggedInUser;

</script>

<Heading {loggedInUser}/>
<section class="blog_container">
    <BlogsTitle />
    <Posts {loggedInUser}/>
</section>

<style>
    .blog_container {
    display: grid;
    justify-content: center;
    align-items: flex-start;
    grid-template-columns: auto auto;
    gap: 1vw;
  }
  @media (max-width: 730px) {
    .blog_container {
      grid-template-columns: auto;
    }
  }
</style>