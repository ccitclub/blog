<script>
  import { signIn } from "../../scripts/firebase";
  import FilterBy from "./FilterBy.svelte";
  import SignedInAvatar from "./SignedInAvatar.svelte";

  export let loggedInUser;
</script>

<section class="head">
  <div class="flex">
    <FilterBy />
  </div>
    <SignedInAvatar {loggedInUser} />
</section>

<style>
  .head {
    padding: 5px 5px 15px 0px;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
    border-bottom: 1px solid #bbbbbb52;
    max-width: 1500px;
    margin: 0 auto;
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1vw;
  }
</style>
