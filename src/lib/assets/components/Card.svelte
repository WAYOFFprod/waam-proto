<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import anime from "animejs";
  import Path from "$lib/icons/Path.svelte";
  import Back from "$lib/icons/Back.svelte";

  let card: HTMLElement;
  let scrollView: HTMLElement;
  let content: HTMLElement;
  let shadowTop: HTMLElement;
  let shadowBottom: HTMLElement;
  let wrapper: HTMLElement;
  let image: HTMLElement;

  export let displayStatus: any = {};

  export let marker: any = {};

  let isOpen = false;

  const dispatch = createEventDispatcher();

  const scroll = (e: any) => {
    // update shadow bottom and top based on scroll
    const contentScrollHeight = content.scrollHeight - scrollView.offsetHeight;
    var currentScroll = scrollView.scrollTop / contentScrollHeight;
    shadowTop.style.opacity = currentScroll.toString();
    shadowBottom.style.opacity = (1 - currentScroll).toString();
  };

  onMount(async () => {
    let height = -100;
    scrollView.style.setProperty("--containerheight", height + "px");
    anime({
      targets: "#card",
      translateY: height,
      duration: 100,
      easing: "easeOutExpo",
    });
    // setup image
    image.style.backgroundImage = "url('/images/" + marker.image + "')";
    image.style.opacity = "0";
    anime({
      targets: "#image",
      opacity: 1,
      duration: 300,
      easing: "linear",
    });
  });

  const toggle = () => {
    isOpen = !isOpen;
    const height = window.innerHeight;
    let newHeight = isOpen ? -height + 60 : -100;
    let containerHeight = height - 190;
    scrollView.style.setProperty("--containerheight", containerHeight + "px");
    anime({
      targets: "#card",
      translateY: newHeight,
      duration: 400,
      easing: "linear",
    });

    // initialize scroll gradients
    if (content.scrollHeight > containerHeight) {
      shadowTop.style.opacity = "0";
      shadowBottom.style.opacity = "1";
    } else {
      shadowTop.style.opacity = "0";
      shadowBottom.style.opacity = "0";
    }
  };

  const back = () => {
    dispatch("close");
  };
  const drag = (e: any) => {
    console.log(e);
  };

  const select = () => {
    dispatch("selectMarker");
  };

  const getStyle = () => {
    let val = "";

    switch (marker.type) {
      case "art":
        val = "bg-art text-text-art";
        break;
      case "monument":
        val = "bg-monument text-text-monument";
        break;
      case "temporelle":
        val = "bg-time text-text-time";
        break;
      case "nature":
        val = "bg-nature text-text-nature";
        break;
    }
    return val;
  };
</script>

<!-- {#if marker.image != null} -->
<div
  id="image"
  bind:this={image}
  class="absolute bg-cover bg-center top-0 bottom-0 left-0 right-0"
>
  <button class="rounded-full bg-white/50 m-1 p-4" on:click={back}>
    <Back />
  </button>
</div>
<!-- {/if} -->
<!-- <img alt="alt" src={image} /> -->
<div
  on:wheel={scroll}
  bind:this={card}
  id="card"
  class="absolute transition-all min-h-screen rounded-t-3xl z-20 {getStyle()}"
>
  <div
    on:drag={drag}
    on:dragstart={drag}
    on:click={toggle}
    on:keydown={toggle}
    class="pt-4 pb-6"
  >
    <div class="bg-black/10 grow h-1 rounded-full mx-10 cursor-pointer" />
  </div>
  <h2 class="flex px-8">
    <span class="grow inline-block align-middle">
      {marker.title}
    </span>
    <button
      on:click={select}
      class="rounded-full bg-pink-500 p-4 aspect-square"
    >
      <Path />
    </button>
  </h2>
  <div bind:this={wrapper} class="relative rounded-2xl overflow-hidden mx-4">
    <div
      bind:this={shadowTop}
      class="absolute h-6 left-0 w-full top-0 bg-gradient-to-t from-white/0 to-black/30"
    />
    <div
      bind:this={shadowBottom}
      class="absolute h-6 left-0 w-full bottom-0 bg-gradient-to-t from-black/30 to-white/0"
    />
    <div id="scroll-view" bind:this={scrollView} class="overflow-scroll px-4">
      <div bind:this={content} class="">
        {#each marker.description as { value }}
          <p class="">
            {value}
          </p>
        {/each}
        {#if marker.cta && displayStatus.buttonActive}
          <button
            class="rounded-full stroke-2 stroke-blue-500 px-4 py-2 w-full mb-4"
            >{marker.cta}</button
          >
        {/if}
        <div class="flex w-full gap-2 mb-4">
          <button class="rounded-full stroke-2 stroke-green-500 px-4 py-2 grow"
            >Commenter</button
          >
          <button class="rounded-full stroke-2 stroke-red-500 px-4 py-2 grow"
            >Dénoncer</button
          >
        </div>
        <h3>Commentaires</h3>
        <div class="flex flex-col gap-4 pt-4">
          {#each marker.comments as { contents }}
            <div class="">
              {#each contents as { type, value }}
                {#if type == "text"}
                  <p class="p-0 m-0">{@html value}</p>
                {:else if type == "image"}
                  <img alt="alt text" src="/images/{value}" />
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* #content {
    height: var(--containerheight);
  } */
  #card {
    transform: translateY(var(--paddingheight));
  }
  #scroll-view {
    height: var(--containerheight);
  }
  .italic {
    font-style: italic;
  }
</style>
