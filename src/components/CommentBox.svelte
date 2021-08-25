<script>
  import viewport from "../../scripts/viewport";
  import {
    getComments,
    CreatedAt,
    writeComment,
    deleteComment,
  } from "../../scripts/firebase";
  import { darkmode } from "../../scripts/store";
  import LoadingIcon from "../icons/loadingIcon.svelte";
  import DeleteIcon from "../icons/deleteIcon.svelte";

  let initiateGetComments = false;

  export let postId;
  export let loggedInUser;

  let mycomment = {
    commenter: loggedInUser?.user?.displayName,
    content: "",
    user_id: loggedInUser?.user?.uid,
    post_id: postId,
  };

  export const postAComment = async () => {
    if (mycomment?.content.trim()) {
      await writeComment(mycomment);
      window.location.reload();
    }
  };

  const hideCommentDeleteConfirm = (e) => {
    e.target.blur();
  };

  const deleteSelectedComment = async (comment) => {
    if (comment?.user_id == loggedInUser?.user?.uid) {
      await deleteComment(comment).catch((err) =>
        console.log(err)
      );
      window.location.reload();
    } else {
      return {error: "User id did not match"}
    }
  };
</script>

{#if loggedInUser?.user}
  <div class="comment_box pb-2">
    <textarea
      bind:value={mycomment.content}
      placeholder="Leave a comment"
      use:viewport
      on:enterViewport={() => (initiateGetComments = true)}
    />
    <button class="button" on:click={() => postAComment()}
      >Post a comment</button
    >
  </div>
{:else}
  <p
    class="need_sign_up"
    use:viewport
    on:enterViewport={() => (initiateGetComments = true)}
  >
    YOU NEED TO SIGN UP TO COMMENT
  </p>
{/if}

<container class="comment_section">
  {#if initiateGetComments}
    {#await getComments(postId)}
      <LoadingIcon className="icon" />
    {:then comments}
      {#if comments?.comments[0]}
        {#each comments?.comments as comment}
          <div class="p-1 my-1 comment_wrapper">
            <div class="grid-center main_comment">
              <div>
                <div style="display: flex;align-items: baseline;">
                  <h3 class="pb-1">{comment?.commenter}</h3>
                  &nbsp;<small style="padding-left: 5px;"
                    >{CreatedAt(comment?.created_at.seconds)}</small
                  >
                </div>
                <pre>{comment?.content}</pre>
              </div>
              {#if comment?.user_id === loggedInUser?.user?.uid}
                <div class="delete_comment_wrapper">
                  <button class="transparent--button delete_comment">
                    <DeleteIcon
                      className="icon"
                      style={"max-width: 30px;" +
                        `${$darkmode ? "fill:white" : "fill:black"}`}
                    />
                  </button>
                  <container class="p-2 grid-center">
                    <p>Are you certain that you want to delete this comment?</p>
                    <div>
                      <button
                        on:click={async () =>
                          await deleteSelectedComment(comment)}>YES</button
                      >
                      <button on:click={(e) => hideCommentDeleteConfirm(e)}
                        >NO</button
                      >
                    </div>
                  </container>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      {/if}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  {/if}
</container>

<style>
  .main_comment {
    grid-template-columns: auto 60px;
    justify-content: space-between;
  }
  .delete_comment:hover {
    background-color: #00000019;
  }
  .delete_comment_wrapper {
    position: relative;
  }
  .delete_comment_wrapper:focus-within container {
    display: block;
  }
  .delete_comment_wrapper container button {
    padding: 15px 20px;
    border: 1px solid lightgray;
    background: #0e0e0e36;
    font-weight: bolder;
    border-radius: 5px;
    cursor: pointer;
  }
  .delete_comment_wrapper container button:hover {
    filter: brightness(0.75);
  }
  .delete_comment_wrapper container div {
    display: flex;
    justify-content: space-evenly;
    margin: 20px 0 0 0;
  }
  .delete_comment_wrapper container {
    position: absolute;
    bottom: 130%;
    right: 0%;
    width: 500px;
    text-align: center;
    border-radius: 5px;
    border-top: 2px solid #c7c7c7;
    border-left: 2px solid #c7c7c7;
    border-right: 2px solid #0000001c;
    border-bottom: 2px solid #0000001c;
    box-shadow: 1px 1px 5px 1px #b1adad73;
    backdrop-filter: blur(28px);
    display: none;
  }
  textarea {
    width: 100%;
    /* min-height: 100px; */
    font-size: 1rem;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px #ddd;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    resize: none;
  }
  .need_sign_up {
    padding: 2rem 10px;
    border: 1px solid #a9a9a952;
    background: #9c9c9c38;
    margin: 0 0 2rem 0;
    border-radius: 10px;
  }
  .button {
    color: white;
  }
  pre {
    word-break: break-word;
    font-family: inherit;
    white-space: break-spaces;
  }
  .comment_wrapper {
    border-radius: 10px;
    background: #00000019;
  }
</style>
