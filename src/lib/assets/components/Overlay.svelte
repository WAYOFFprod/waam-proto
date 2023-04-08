<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import anime from "animejs";
  import Plus from "lib//icons/Plus.svelte";
  import User from "lib//icons/User.svelte";

  const openUser = () => {};

  const openProfile = () => {};
</script>

<div class="absolute bottom-0 left-0 bg-gray-400/50 rounded-tr-xl flex z-10">
  <button on:click={openUser} class="p-2"><Plus /></button>
  <button on:click={openProfile} class="p-2"><User /></button>
</div>

<style>
</style>
