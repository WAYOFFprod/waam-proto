<script lang="ts">
  import { goto } from "$app/navigation";
  import anime from "animejs";
  import { onMount } from "svelte";

  let step = 0;

  let icon: any;
  const animateOut = () => {
    let logoValue = 0;
    anime({
      targets: "#logo",
      scaleX: logoValue,
      scaleY: logoValue,
      opacity: logoValue,
      duration: 400,
      easing: "easeOutExpo",
      complete: function (anim: Animation) {
        step = 1;
        animateIn();
      },
    });
  };
  const animateIn = () => {
    console.log("got here");
    anime({
      targets: "#notice",
      scale: [0, 1],
      easing: "easeOutExpo",
      duration: 400,
    });
  };

  const loadMap = () => {
    var tl = anime.timeline({
      easing: "easeOutExpo",
      duration: 1500,
      complete: function (anim: Animation) {
        console.log("tl complete");
        // load next page
        goto("/map");
      },
    });
    tl.add({
      targets: "#notice",
      opacity: 0,
      easing: "easeOutExpo",
      duration: 400,
    }).add(
      {
        targets: "#background-image",
        opacity: 0,
        easing: "easeOutExpo",
      },
      0
    );
  };

  onMount(() => {
    anime({
      targets: "#loading-page",
      opacity: 1,
      duration: 1000,
    });
    anime({
      targets: "#background-image",
      translateX: -20,
      duration: 10000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });
  });
</script>

<div id="loading-page" class="relative overflow-hidden">
  <div
    id="background-image"
    class="absolute top-0 right-0 bottom-0 left-0 bg-fit"
  />
  <div class="relative min-h-screen flex flex-col justify-center items-center">
    <button
      bind:this={icon}
      id="logo"
      class="rounded-3xl aspect-square w-60 overflow-hidden drop-shadow-3xl-center {step ==
      0
        ? 'block'
        : 'hidden'}"
      on:click={animateOut}
    >
      <div class="h-full w-full logo-image bg-cover" />
    </button>
    <div
      id="notice"
      class="flex flex-col justify-around p-16 sm:p-8 gap-8 h-96 max-w-md drop-shadow-3xl-center {step ==
      1
        ? 'block'
        : 'hidden'}"
    >
      <div class="p-8 bg-time/50 rounded-3xl text-xl text-white">
        <p class="text-center mb-0">
          Ce prototype vous présente 68 exemples concrets
        </p>
      </div>
      <button
        class="rounded-full bg-time text-white text-2xl px-8 py-4"
        on:click={loadMap}>Ok</button
      >
    </div>
  </div>
</div>

<style>
  #loading-page {
    opacity: 0;
  }
  #background-image {
    background-image: url($lib/assets/images/background.jpg);
    scale: 1.2;
  }
  .logo-image {
    background-image: url($lib/assets/images/logo.jpg);
  }
  #notice {
    transform: scale(0);
  }
</style>
