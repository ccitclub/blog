<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { darkmode, notification } from "../../scripts/store";
  import compressImage from "../../scripts/file";
  import { currentUser, addPost, editPost } from "../../scripts/firebase";
  import LanguageSupport from "../../public/assets/language_support.json";

  export let blogId = null;
  export let mode = "CREATE";
  export let background = null;

  const dispatch = createEventDispatcher();

  const CodingLanguage = LanguageSupport;

  export let post = {
    title: "",
    URL: "",
    description: "",
    codes: "",
    blog_id: blogId,
    user_id: $currentUser?.user?.uid,
  };

  $: handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "CREATE") {
      if (post.title && post.description) {
        const data = await addPost(post);

        if (data?.error) {
          notification.set(data?.error);
          dispatch("closeForm");
        }
        notification.set(data?.message);
        dispatch("closeForm");
      }
    } else if (mode === "UPDATE") {
      const updatedPost = {
        title: post.title,
        URL: post.URL,
        description: post.description,
        codes: post.codes,
        blog_id: post.blog_id || blogId,
        user_id: $currentUser?.user?.uid,
      }
      const updatedData = await editPost(post.id, updatedPost);
      if (updatedData?.error) {
          notification.set(updatedData?.error);
          dispatch("closeForm");
        }
        window.location.reload();
    }
  };

  let file;
  $: onUpload = (e) => {
    if (e.target.files[0].type.includes("gif")) {
      console.log("Sorry gifs are not allowed");
      throw new Error("Sorry gifs are not allowed");
    } else {
      file = e.target.files[0];
      compressImage(e, (data) => (post.URL = data));
    }
  };
</script>

<div
  transition:slide={{ duration: 300 }}
  id="container"
  style={`color: ${
    $darkmode ? "white" : "var(--form-text-color)"
  }; background: ${background}`}
>
  <h1 class="pt-1">
    &bull; {mode === "CREATE" ? "WRITE A" : "EDIT"} BLOG &bull;
  </h1>
  <form method="post" on:submit={handleSubmit}>
    <div class="title">
      <label for="tile" />
      <input
        type="text"
        placeholder="BLOG TITLE"
        name="title"
        bind:value={post.title}
        style={`border-bottom: 2px solid ${
          $darkmode ? "white" : "var(--form-text-color)"
        }`}
        required
      />
    </div>
    <div class="description">
      <label for="description" />
      <textarea
        name="description"
        placeholder="DESCRIPTION"
        bind:value={post.description}
        cols="30"
        rows="5"
        required
      />
    </div>

    <span>Add an image &lt; 10MB (Optional)</span>
    <div class="pt-1 flex_wrapper">
      <div class="upload-btn-wrapper">
        <button class="mb-1 btn">UPLOAD PICTURE</button>
        <input
          type="file"
          name="myfile"
          on:change={onUpload}
          accept="image/*"
        />
      </div>
      {#if file}
        <small
          style="max-width: 200px;overflow-x: hidden; text-overflow: ellipsis;"
          >{file.name}</small
        >
      {/if}
    </div>

    <div class="code_lang">
      <label for="code_lang" />
      <select
        placeholder=" CODING PLATFORM "
        name="code_lang"
        id="code_lang_input"
      >
        <option disabled hidden selected>
          Coding platform (If your blog includes any codes)
        </option>
        {#each CodingLanguage as language}
          <option style={`background: ${$darkmode ? "#232323" : "white"}`}
            >{language}</option
          >
        {/each}
      </select>
    </div>
    <div class="code">
      <label for="code" />
      <textarea
        name="codes"
        placeholder="If your blog includes any codes, please paste them here. (Optional)"
        bind:value={post.codes}
        cols="30"
        rows="5"
      />
    </div>
    <div class="submit">
      <input
        type="submit"
        value={mode === "CREATE" ? "SUBMIT" : "UPDATE"}
        id="form_button"
      />
    </div>
  </form>
  <!-- // End form -->
</div>

<!-- // End #container -->
<style>
  select {
    text-transform: none;
  }
  input,
  select,
  textarea {
    color: #5a5a5a;
    font: inherit;
    margin: 0;
  }
  input {
    line-height: normal;
  }
  textarea {
    overflow: auto;
  }
  #container {
    border: solid 3px;
    max-width: 768px;
    margin: 0px auto;
    position: relative;
    box-shadow: 1px 1px 9px 3px #9c9c9c;
  }
  form {
    padding: 37.5px;
    margin: 50px 0;
  }
  h1 {
    color: inherit;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 7px;
    text-align: center;
  }
  option {
    background: inherit;
  }
  input[type="text"],
  select,
  textarea {
    background: none;
    border: none;
    color: inherit;
    border-bottom: 2px solid;
    font-size: 0.8em;
    font-weight: 400;
    letter-spacing: 1px;
    margin: 0em 0 1.875em 0;
    padding: 0 0 0.875em 0;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  input[type="text"]:focus,
  textarea:focus {
    background: #8888882e;
    padding: 0 0 0.875em 0;
  }
  .code,
  .description {
    float: none;
  }
  select {
    background: url("/assets/img/arrow_down.png") no-repeat right;
    outline: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  select::-ms-expand {
    display: none;
  }

  .code_lang {
    width: 100%;
  }
  textarea {
    line-height: 150%;
    height: 150px;
    resize: none;
    width: 100%;
  }
  ::-webkit-input-placeholder {
    color: inherit;
  }
  :-moz-placeholder {
    color: inherit;
    opacity: 1;
  }
  ::-moz-placeholder {
    color: inherit;
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: inherit;
  }
  #form_button {
    background: none;
    border: solid 2px;
    color: inherit;
    cursor: pointer;
    display: inline-block;
    font-family: "Helvetica", Arial, sans-serif;
    font-size: 0.875em;
    font-weight: bold;
    outline: none;
    padding: 20px 35px;
    text-transform: uppercase;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  #form_button:hover {
    background: var(--form-text-color);
    color: #f2f3eb;
  }
  .flex_wrapper {
    display: flex;
    align-items: center;
    gap: 1vw;
  }
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: grid;
  }
  .btn {
    border: 2px solid;
    color: inherit;
    background-color: inherit;
    padding: 8px 20px;
    font-family: "Helvetica", Arial, sans-serif;
    font-size: 0.875em;
  }
  .upload-btn-wrapper input[type="file"] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  @media screen and (max-width: 768px) {
    #container {
      margin: 20px auto;
      width: 95%;
    }
  }

  @media screen and (max-width: 480px) {
    h1 {
      font-size: 26px;
    }
    #form_button {
      padding: 15px 25px;
    }
  }

  @media screen and (max-width: 420px) {
    h1 {
      font-size: 18px;
    }
    input[type="text"],
    select,
    textarea {
      font-size: 0.875em;
    }
  }
</style>
