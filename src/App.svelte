<script>
  import router from "page";
  import { onMount, afterUpdate } from "svelte";
  import Nav from "./components/Nav.svelte";
  import AllPosts from "./AllPosts.svelte";
  import Post from "./Post.svelte";
  import DarkMode from "./components/darkMode.svelte";
  import { currentUser } from "../scripts/firebase";
  import { darkmode } from "../scripts/store";
  import Blogs from "./Blogs.svelte";
  import Modal from "./components/Modal.svelte";

  let loggedInUser;
  onMount(async () => {
    loggedInUser = $currentUser;
  });

  afterUpdate(() => {
    loggedInUser = $currentUser;
  });

  let page;
  router("/", () => (page = AllPosts));

  let params;
  router(
    "/post/:id",
    (context, next) => {
      params = context.params;
      next();
    },
    () => (page = Post)
  );

  router(
    "/b/:id",
    (context, next) => {
      params = context.params;
      next();
    },
    () => (page = Blogs)
  );
  router.start();
</script>

<main style={$darkmode ? "background: #232323; color: white" : ""}>
  <Nav />
  <header class="pt-80px text-center"><h1 class="py-1">BLOGS</h1></header>
  <svelte:component this={page} {loggedInUser} {params} />
  <p class="copyright text-center">© Developed by CCITC</p>
  <DarkMode />
  <Modal />
</main>

<style>
  main {
    min-height: 100vh;
  }
  header h1 {
    background-color: var(--ccitc-background);
    color: var(--light-text);
    margin-bottom: 10px;
  }
  main {
    background-color: white;
  }
  .copyright {
    padding: 10px 0;
    color: white;
    background-color: black;
  }
</style>
