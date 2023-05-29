<script lang="ts">
  import { createEventDispatcher } from "svelte";
  // import anime from "animejs";
  import Plus from "lib//icons/Plus.svelte";
  import User from "lib//icons/User.svelte";
  import Play from "lib//icons/Play.svelte";

  const dispatch = createEventDispatcher();

  const openUser = () => {};

  const openProfile = () => {};

  const play = () => {
    dispatch("moveUser");
  };
</script>

<div class="absolute bottom-0 left-0 bg-gray-400/50 rounded-tr-xl flex z-10">
  <button on:click={openUser} class="p-4"><Plus /></button>
  <button on:click={openProfile} class="p-4"><User /></button>
  <button on:click={play} class="p-4"><Play /></button>
</div>

<style>
</style>
