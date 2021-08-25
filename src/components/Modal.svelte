<script>
  import { beforeUpdate } from "svelte";
  import { slide } from "svelte/transition";
  import CrossIcon from "../icons/crossIcon.svelte";
  import { darkmode, notification } from "../../scripts/store";

  export let duration = 5000;

  beforeUpdate(() => unMountModal());

  const unMountModal = () => {
    if ($notification) {
      setTimeout(() => {
        notification.set(null);
      }, duration);
    }
  };
  const closeModal = () => {
    notification.set(null);
  };
</script>

{#if $notification}
  <div class="modal_wrapper" transition:slide>
    <div
      class="modal"
      style={$darkmode
        ? "background: white;color: black;"
        : "background: #232323;color: white;"}
    >
      <div class="modal_content">
        <div class="container">
          <p>{$notification}</p>
        </div>
        <button class="transparent--button" on:click={() => closeModal()}>
          <CrossIcon
            className="icon"
            style={$darkmode ? "fill: black" : "fill: white"}
          />
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal_content {
    display: flex;
    flex: auto;
  }
  .container {
    flex: auto;
  }
  .modal {
    min-height: 100px;
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    max-width: 500px;
    box-shadow: 1px 2px 5px 2px #9494948f;
  }
  .modal_wrapper {
    z-index: 10;
    width: 100%;
    display: flex;
    flex: auto;
    justify-content: center;
    position: fixed;
    top: 100px;
    left: 0;
  }
</style>
