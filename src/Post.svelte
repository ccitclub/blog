<script>
  import { redirect } from "page";
  import {
    getPost,
    getUser,
    CreatedAt,
    upvotePost,
    downvotePost,
    deletePost,
  } from "../scripts/firebase";
  // import * as linkify from "linkifyjs";
  import linkifyStr from "linkifyjs/string";
  import xss from "xss";
  import { darkmode, notification } from "../scripts/store";
  import { onMount } from "svelte";
  import CommentBox from "./components/CommentBox.svelte";
  import LoadingIcon from "./icons/loadingIcon.svelte";
  import CrossIcon from "./icons/crossIcon.svelte";
  import LikeIcon from "./icons/likeIcon.svelte";
  import CommentIcon from "./icons/commentIcon.svelte";
  import SignedInAvatar from "./components/SignedInAvatar.svelte";
  import PostForm from "./components/PostForm.svelte";
  import Settings from "./icons/settings.svelte";
  import Metas from "./components/Metas.svelte";

  export let loggedInUser;
  export let params;
  let update = false;

  let Post;
  let confirmDelete = false;

  $: getUserFromId = async (user_id) => {
    const userData = await getUser(user_id);
    return { ...userData };
  };

  onMount(async () => {
    Post = await getPost(params.id);
    document.title = Post?.title || "Not Found";
  });

  const reactPost = async (post_id, vote) => {
    if (loggedInUser?.user) {
      const { uid } = loggedInUser?.user;
      if (vote.includes(uid)) {
        await downvotePost(post_id, uid).catch((err) =>
          console.log(err.message)
        );
        Post = await getPost(params.id);
      } else {
        await upvotePost(post_id, uid).catch((err) => console.log(err.message));
        Post = await getPost(params.id);
      }
    } else {
      notification.set("You are not signed in..");
    }
  };

  const onDeletePost = async (post_id) => {
    const data = await deletePost(post_id);
    if (data?.message) {
      notification.set(data?.message);
      redirect("/");
    } else if (data?.error) {
      notification.set(data?.error);
    }
  };

  const linkExtract = (txt) => {
    const xss_option = {
      whiteList: {
        a: ["href", "title", "target"],
      },
    };
    const option = { defaultProtocol: "https" };
    return linkifyStr(xss(txt, xss_option), option);
  };
</script>

<Metas
  title={Post?.title}
  description={Post?.description.slice(0, 120) + "..."}
  ogTitle={Post?.title}
  ogImage={Post?.URL}
/>

<section class="post_wrapper grid-center">
  {#if !Post}
    <LoadingIcon />
  {:else if Post?.id}
    <div
      class="pb-1"
      style="max-width:1500px;display: flex; border-bottom: 1px solid #bbbbbb52;
     justify-content: flex-end; align-items: center; margin: 0 10px; gap: 1vw;"
    >
      <SignedInAvatar {loggedInUser} />

      {#if loggedInUser?.user?.uid === Post?.user_id}
        <div class="option_wrapper">
          <button class="more_option transparent--button">
            <Settings className="icon" />
          </button>
          <ul class="options">
            <li>
              <button
                on:click={() => (update = true)}
                class="transparent--button my-1 w-100">EDIT</button
              >
            </li>
            <li>
              <button
                class="transparent--button my-1 w-100"
                on:click={() => (confirmDelete = true)}>DELETE</button
              >
            </li>
          </ul>
        </div>
      {/if}
    </div>

    {#if Post?.error}
      <error>{Post?.error}</error>
    {/if}
    <div style="margin: 0 auto; max-width: 1100px;">
      <h1 class="title text-center pb-1 border_bottom">
        {Post?.title || ""}
      </h1>
      {#if Post?.URL}
        <figure class="text-center py-2">
          <div
            class="__img_bg"
            style={`background: url("${Post?.URL}");background-size: contain;width: 100%; 
          height: 550px;background-position: center;background-repeat: no-repeat;`}
          />
        </figure>
      {/if}
      <div class="author pb-1">
        {#await getUserFromId(Post?.user_id)}
          <LoadingIcon />
        {:then user}
          <img
            class="avatar"
            src={user?.image}
            on:error={(e) => (e.target.src = "/assets/img/megacat.webp")}
            alt={user.name}
          />
          <div>
            <h3 class="username py-1">{user?.name}</h3>
            <small>{CreatedAt(Post?.created_at?.seconds)}</small>
          </div>
        {/await}
      </div>
      <pre
        class="description py-1 pb-2">
                {@html linkExtract(Post?.description)}
            </pre>
      {#if Post?.codes}
        <div class="code_wrapper">
          <pre
            class={$darkmode
              ? "code code_dark scrollbar_custom"
              : "scrollbar_custom code code_light"}>
                    {Post?.codes}
                </pre>
        </div>
      {/if}
      <div class="my-2 react_section">
        <div>
          <button
            class="transparent--button"
            on:click={async () => await reactPost(Post?.id, Post?.vote)}
            disabled={!loggedInUser?.user}
            ><LikeIcon
              className="icon"
              style={`fill:${
                Post?.vote.includes(loggedInUser?.user?.uid)
                  ? "red"
                  : $darkmode
                  ? "white"
                  : "initial"
              }`}
            /></button
          >
          <span>{Post?.vote.length}</span>
        </div>
        <div>
          <button class="transparent--button"
            ><CommentIcon
              className="icon"
              style={`fill: ${$darkmode ? "white" : "initial"}`}
            /></button
          >
          <span>{Post?.comment_no}</span>
        </div>
      </div>

      <CommentBox postId={Post?.id} {loggedInUser} {params} />
    </div>
    {#if update}
      <div class="update_form">
        <div class="cancel_btn_wrapper">
          <button class="transparent--button" on:click={() => (update = false)}>
            <CrossIcon className="icon" style="fill: white;margin: 0 10px;" />
          </button>
        </div>
        <PostForm
          post={{ ...Post }}
          background={$darkmode ? "#232323" : "white"}
          mode="UPDATE"
        />
      </div>
    {/if}

    {#if confirmDelete}
      <div class="cnfrmtn_wrapper">
        <div
          class="cnfrm_container grid-center"
          style={`background: ${$darkmode ? "black" : "white"};`}
        >
          <h5>Sure you want to deltete this post?</h5>
          <div class="my-1 cnfrm_bttn_wrapper">
            <button class="cnfrm_bttn" on:click={() => onDeletePost(Post?.id)}
              >YES</button
            >
            <button class="cnfrm_bttn" on:click={() => (confirmDelete = false)}
              >No</button
            >
          </div>
        </div>
      </div>
    {/if}
  {:else}
    <h3 class="text-center">No data</h3>
    <img class="my-1" src="/assets/img/404.webp" alt="Not found" />
  {/if}
</section>

<style>
  * {
    --shadow-inset: rgba(255, 255, 255, 0.5);
  }
  .cancel_btn_wrapper {
    display: flex;
    width: 85%;
    justify-content: flex-end;
    margin: 0 auto;
    padding-top: 0.3rem;
  }
  .update_form {
    position: fixed;
    overflow: auto;
    top: 85px;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #0606068f;
  }
  button:hover {
    filter: brightness(0.85);
  }
  button:disabled {
    filter: opacity(0.25);
  }
  .option_wrapper {
    position: relative;
  }
  .option_wrapper:focus-within .options {
    opacity: 1;
    transform: translateX(0px);
    visibility: visible;
  }
  .options {
    visibility: hidden;
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.5s ease;
    position: absolute;
    padding: 5px;
    border-radius: 5px;
    list-style: none;
    right: 0;
    top: 50px;
    z-index: 1;
    background: #a9a9a95c;
    box-shadow: inset 0 0 0 1px var(--shadow-inset);
  }
  .more_option {
    background: bisque;
    border-radius: 2pc;
    display: flex;
    padding: 0px 0;
  }
  error {
    color: red;
    background-color: white;
    padding: 5px;
    border-radius: 10px;
  }
  .border_bottom {
    border: 1px solid #e5e5e5;
    border-left-width: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
  }
  .post_wrapper {
    padding-top: clamp(2.2rem, calc(12px + 3.85vw), 30px);
    margin: 0 5px;
  }
  figure {
    border: 1px solid #e5e5e5;
    background-color: antiquewhite;
  }
  h1.title {
    font-size: clamp(2.2rem, calc(12px + 3.85vw), 3.025rem);
    padding: 1rem 6px;
    line-height: 1.1;
  }
  .author {
    display: flex;
    justify-content: flex-start;
    flex: auto;
    align-items: normal;
    gap: 2vw;
  }
  .author img {
    max-width: 18%;
    border-radius: 3pc;
    margin: 10px 0;
  }
  pre.description {
    word-break: break-word;
    font-family: inherit;
    white-space: break-spaces;
    font-size: clamp(1rem, 5vw, 1.2rem);
  }
  .code {
    word-break: break-word;
    white-space: break-spaces;
    overflow: auto;
    max-height: 600px;
    padding: 5px;
    width: 100%;
  }
  .code_wrapper {
    margin: 0 auto;
    overflow: hidden;
    max-height: 600px;
    width: 98%;
  }
  .code_light {
    background: #f1f3f4;
    color: #37474f;
  }
  .code_dark {
    background-color: #283142;
    color: #eceff1;
  }
  .react_section {
    width: 100%;
    gap: 2vw;
    display: flex;
    flex: auto;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    background: #90919240;
    border-radius: 1pc;
    border: 1px solid #6161615c;
  }
  .react_section div {
    padding: 5px 8px;
    background: #a9a9a95c;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1vw;
    flex: auto;
  }
</style>
