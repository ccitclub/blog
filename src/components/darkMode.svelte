<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { darkmode } from "../../scripts/store";

  onMount(() => {
    console.log($darkmode);
  });

  afterUpdate(() => {
    console.log($darkmode);
  });

  const updateMode = () => {
    darkmode.update((m) => !!!m);
    localStorage.setItem("darkmode", $darkmode)
  };

  onDestroy(() => $darkmode);
</script>

<mode>
  <label id="toggler" class="switch">
    <input
      id="darkmode_toggler"
      type="checkbox"
      on:click={() => updateMode()}
      checked={$darkmode}
    />
    <span class="slider">
      <span class="light_mode">&#9788;</span>
      <span class="dark_mode">☾</span>
    </span>
  </label>
</mode>

<style>
  mode {
    position: fixed;
    top: 91vh;
    left: 3vw;
  }
  .light_mode {
    font-size: calc(var(--mode-button-height) - 3px);
    color: white;
    position: absolute;
    bottom: 2px;
    left: 0;
  }
  .dark_mode {
    font-size: calc(var(--mode-button-height) - 8px);
    color: white;
    position: absolute;
    top: 1px;
    right: 0px;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: var(--mode-button-width);
    height: var(--mode-button-height);
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #616161;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    font-size: 1rem;
    border-radius: 1pc;
    box-shadow: 1px 2px 5px 1px black;
  }
  .slider:after {
    position: absolute;
    content: "";
    height: calc(var(--mode-button-height) - 8px);
    width: calc(var(--mode-button-height) - 8px);
    left: 4px;
    bottom: 4px;
    border-radius: 2pc;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #f32121;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:after {
    -webkit-transform: translateX(30px);
    -ms-transform: translateX(30px);
    transform: translateX(30px);
  }
</style>
