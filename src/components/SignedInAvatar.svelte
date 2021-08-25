<script>
  import { signingOut, signIn } from "../../scripts/firebase";
import { darkmode } from "../../scripts/store";

  export let loggedInUser;

  let confirmLogOut = false;

  const onSignInWithGoogle = () => {
    signIn();
  };

  const onSignOut = () => {
    signingOut();
    confirmLogOut = false;
  };
</script>

{#if loggedInUser?.user}
  <div class="current_user">
    <button style="border: none;background: transparent;">
      <img
        class="avatar"
        src={loggedInUser?.user?.photoURL}
        on:error={(e) => (e.target.src = "/assets/img/megacat.webp")}
        alt={loggedInUser?.user?.displayName}
      />
    </button>
    <button class="signing_button" on:click={() => (confirmLogOut = true)}
      >LOG OUT</button
    >
    <!-- <small class="name_on_focus">{loggedInUser?.displayName}</small> -->
  </div>
{:else if loggedInUser?.loaded}
  <button class="signing_button sign_in" on:click={() => onSignInWithGoogle()}
    >SIGN IN WITH GOOGLE</button
  >
{/if}
{#if confirmLogOut}
  <div class="cnfrmtn_wrapper">
    <div class="cnfrm_container grid-center" style={`background: ${$darkmode? "black" :"white"};`}>
      <h5>Sure you want to log out?</h5>
      <div class="my-1 cnfrm_bttn_wrapper">
        <button class="cnfrm_bttn" on:click={() => onSignOut()}>YES</button>
        <button class="cnfrm_bttn" on:click={() => confirmLogOut = false}>No</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .signing_button {
    border: none;
    background: #b22d34;
    color: white;
    cursor: pointer;
    padding: 10px;
    font-size: 0.9em;
  }
  .signing_button:hover {
    filter: brightness(1.5);
  }
  .current_user {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.5s ease-in;
  }
  .current_user .avatar {
    max-width: 60px;
    border: 1px solid red;
    margin: 0 auto;
    border-radius: 2pc;
    padding: 5px;
  }
  @media (max-width: 730px) {
    .current_user .signing_button {
      position: absolute;
      right: 50%;
      top: 0;
      transform: translate(50%, 280%);
      visibility: hidden;
      opacity: 0;
      transition: all 0.5s ease;
    }
    .current_user:focus-within .signing_button {
      transform: all 0.5s ease;
      visibility: visible;
      opacity: 1;
      transform: translate(50%, 180%);
    }
  }
</style>
