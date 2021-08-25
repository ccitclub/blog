<script>
  import { onDestroy } from "svelte";
  import { darkmode, sortBy } from "../../scripts/store";

  onDestroy(() => $darkmode);

  const selectSortBy = (e) => {
    const title = e.target.title;
    sortBy.set(title);
    localStorage.setItem("sortBy", title);
    window.location.reload();
  };
</script>

<div class="flex_wrapper">
  <span>Sort by:</span>
  <details
    class="custom-select"
    style={`background: ${$darkmode ? "#b22d34" : "#ddd"}`}
  >
    <summary class="radios">
      <input type="radio" name="item" id="default" title={$sortBy} checked />
      {#each ["TIME", "LIKES", "COMMENTS"] as item}
        <input
          type="radio"
          name="item"
          id={item}
          title={item}
          on:click={(e) => selectSortBy(e)}
        />
      {/each}
    </summary>
    <ul class="list" style={`background: ${$darkmode ? "#b22d34" : "#ddd"}`}>
      <li>
        <label for="TIME"> Time</label>
      </li>
      <li>
        <label for="LIKES">Likes</label>
      </li>
      <li>
        <label for="COMMENTS">Comments</label>
      </li>
    </ul>
  </details>
</div>

<style>
  .flex_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  details {
    position: relative;
    width: 180px;
    margin-right: 1rem;
  }
  @media (max-width: 450px) {
    details {
      width: 100px;
    }
  }
  details[open] {
    z-index: 1;
  }

  summary {
    padding: 1rem;
    cursor: pointer;
    border-radius: 5px;
    background: inherit;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  details[open] summary:before {
    content: "";
    display: block;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  summary:after {
    content: "";
    float: right;
    width: 0.5rem;
    height: 0.5rem;
    border-bottom: 1px solid currentColor;
    border-left: 1px solid currentColor;
    border-bottom-left-radius: 2px;
    transform: rotate(45deg) translate(50%, 0%);
    transform-origin: center center;
    transition: transform ease-in-out 100ms;
  }

  summary:focus {
    outline: none;
  }

  details[open] summary:after {
    transform: rotate(-45deg) translate(0%, 0%);
  }

  ul {
    width: 100%;
    background: inherit;
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    padding: 1rem;
    margin: 0;
    box-sizing: border-box;
    border-radius: 5px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 1px 3px 5px 2px #5858585c;
    list-style: none;
  }

  li {
    margin: 0;
    padding: 1rem 0;
    border-bottom: 1px solid #ff00006c;
  }

  li:first-child {
    padding-top: 0;
  }

  li:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  /* FAKE SELECT */

  summary.radios {
    counter-reset: radios;
  }

  input[type="radio"] {
    counter-increment: radios;
    appearance: none;
    display: none;
  }

  input[type="radio"]:checked {
    display: inline;
  }

  input[type="radio"]:after {
    content: attr(title);
    display: inline;
    font-size: 1rem;
  }

  ul.list {
    counter-reset: labels;
  }

  label {
    width: 100%;
    display: block;
    cursor: pointer;
  }
</style>
