<script lang="ts">
  import anime from "animejs";

  let icon: any;
  let value = 1;
  const animate = () => {
    value = value == 1 ? 1.5 : 1;
    anime({
      targets: ".loading-text-waam",
      scaleX: value,
      scaleY: value,
    });
  };
</script>

<div id="logo" class="min-h-screen flex flex-col justify-center items-center">
  <button
    bind:this={icon}
    id="loading-icon"
    class="border border-black rounded-xl p-8 flex flex-col items-center justify-center gap-8 w-60 aspect-square group"
    on:click={animate}
  >
    <h1
      class="transition-all duration-500 loading-text-waam text-5xl font-bold text-center group-hover:text-6xl"
    >
      WA
    </h1>
    <h1
      class="transition-all duration-500 loading-text-waam text-5xl font-bold text-center group-hover:text-6xl"
    >
      AM
    </h1>
  </button>
</div>
