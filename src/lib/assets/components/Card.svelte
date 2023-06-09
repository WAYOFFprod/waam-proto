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
    console.log("something");
    // update shadow bottom and top based on scroll
    const contentScrollHeight = content.scrollHeight - scrollView.offsetHeight;
    var currentScroll = scrollView.scrollTop / contentScrollHeight;
    shadowTop.style.opacity = currentScroll.toString();
    shadowBottom.style.opacity = (1 - currentScroll).toString();
  };

  onMount(async () => {
    card.style.setProperty("--dragHeight", window.innerHeight - 100 + "px");

    const height = window.innerHeight;
    console.log(height);
    scrollView.style.setProperty(
      "--containerheight",
      "calc(" + height + "px - 10.2rem)"
    );

    // setup image
    image.style.backgroundImage = "url('/images/" + marker.image + "')";
    image.style.opacity = "0";
    anime({
      targets: "#image",
      opacity: 1,
      duration: 300,
      easing: "linear",
    });

    // init scroll gradiant
    shadowTop.style.opacity = "0";
    shadowBottom.style.opacity = "1";
  });

  const back = () => {
    dispatch("close");
  };
  const handleDragStart = (e: DragEvent) => {
    console.log("drag start", e);
  };

  const handleDragEnd = (e: DragEvent) => {
    console.log("drag end", e);
  };

  let handle: HTMLElement;
  let touchEvent = "none";
  let touchOffset = {
    x: 0,
    y: 0,
  };

  let topDist = 8;
  const handleTouchStart = (e: TouchEvent) => {
    touchEvent = "start";
    touchOffset = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    };
    topDist = 12;
  };

  const handleTouchMove = (e: TouchEvent) => {
    card.style.setProperty("--dragHeight", e.changedTouches[0].pageY + "px");
    touchEvent = "move";
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchEvent === "move") {
      // check if it is closer to top or bottom and animate to there
      let height = window.innerHeight;
      if (Math.round(e.changedTouches[0].pageY) > height / 2) {
        card.style.setProperty("--dragHeight", "calc(" + height + "px - 6rem)");
      } else {
        card.style.setProperty("--dragHeight", "4rem");
      }
    }
    touchEvent = "end";
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
      case "swiss-tourism":
        val = "bg-tourism text-text-tourism";
        break;
      case "monument":
        val = "bg-monument text-text-monument";
        break;
      case "temporelle":
        val = "bg-time text-text-time";
        break;
      case "pro-natura":
      case "nature":
        val = "bg-nature text-text-nature";
        break;
      case "nature":
        val = "bg-nature text-text-nature";
        break;
    }
    return val;
  };

  const getImage = (author: string) => {
    const imageBase = "/images/";
    let image = "";
    switch (author) {
      case "Lucas":
        image = imageBase + "profile-lucas.jpg";
        break;
      case "Yann":
        image = imageBase + "profile-yann.jpg";
        break;
      case "Sophie":
        image = imageBase + "profile-sophie.jpg";
        break;

      default:
        break;
    }

    return image;
  };

  $: topDistance = "translate-y-[" + topDist + "rem]";
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
  class="top-0 absolute min-h-screen rounded-t-3xl z-20 {getStyle()}"
>
  <div
    on:dragstart={handleDragStart}
    on:dragend={handleDragEnd}
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
    bind:this={handle}
    class="pt-4 pb-6"
  >
    <div class="bg-black/10 grow h-1 rounded-full mx-10 cursor-pointer" />
  </div>
  <h2 class="flex px-8 mb-0">
    <span class="grow inline-block align-middle">
      {marker.title}
    </span>
    <button on:click={select} class="rounded-full p-4 aspect-square">
      <Path />
    </button>
  </h2>
  <div bind:this={wrapper} class="relative overflow-hidden">
    <div
      bind:this={shadowTop}
      class="absolute h-6 left-0 w-full top-0 bg-gradient-to-t from-white/0 to-black/30"
    />
    <div
      bind:this={shadowBottom}
      class="absolute h-6 left-0 w-full bottom-0 bg-gradient-to-t from-black/30 to-white/0"
    />
    <div
      id="scroll-view"
      bind:this={scrollView}
      class="overflow-scroll px-8 pb-4"
    >
      <div bind:this={content} class="">
        {#each marker.description as { value }}
          <p class="">
            {value}
          </p>
        {/each}
        {#if marker.cta && displayStatus.buttonActive}
          <button
            class="rounded-full outline outline-2 outline-blue-500 px-4 py-2 w-full mb-4"
            >{marker.cta}</button
          >
        {/if}
        <div class="flex w-full gap-2 mb-4">
          <button
            class="rounded-full outline outline-2 outline-green-500 px-4 py-2 grow"
            >Commenter</button
          >
          <button
            class="rounded-full outline outline-2 outline-red-500 px-4 py-2 grow"
            >Dénoncer</button
          >
        </div>
        <h3>Commentaires</h3>
        <div class="flex flex-col gap-4 pt-4">
          {#each marker.comments as { meta, contents }}
            <div class="flex">
              {#if meta.author != null}
                <div class="w-1/5 -ml-4 mr-4">
                  <img
                    class="rounded-full aspect-square"
                    alt={meta.author}
                    src={getImage(meta.author)}
                  />
                </div>
              {/if}
              <div class="w-4/5">
                <p class="mb-2 font-bold">{meta.author}</p>
                {#each contents as { type, value }}
                  {#if type == "text"}
                    <p class="p-0 m-0 pb-2">{@html value}</p>
                  {:else if type == "image"}
                    <img alt="alt text" src="/images/{value}" />
                  {:else if type == "donation"}
                    <p
                      class="outline outline-2 outline-red-100 rounded-full px-4 py-2 my-4"
                    >
                      {value}
                    </p>
                  {/if}
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .italic {
    font-style: italic;
  }
  #card {
    --dragHeight: 0px;
    transform: translateY(var(--dragHeight));
  }
  #scroll-view {
    height: var(--containerheight);
  }
</style>
