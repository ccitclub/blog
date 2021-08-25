<script>
    export let description = "CCITC's official blog site. Sign in with your Google account. Create a blog of your own. Show it to your friends.";
    export let ogTitle = "CCITC -Blog";
    export let ogImage = "https://ccitclub.github.io/database/img/blog-ccitc.jpg";
    export let title = "CCITC -BLog";
    
</script>

<svelte:head>
  <title>{title || ogTitle}</title>
    <meta
      name="description"
      content= {description}
    />
    <meta property="og:title" content={ogTitle} />
    <meta
      property="og:description"
      content={description}
    />
    <meta
      property="og:image"
      content={ogImage}
    />
  </svelte:head>
  