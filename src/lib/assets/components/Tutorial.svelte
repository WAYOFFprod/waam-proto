<script lang="ts">
  import { stepNumber } from "lib//stores/TutorialStep";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let step = 1;

  const nextStep = () => {
    step++;
    stepNumber.set(step);
    switch (step) {
      case 2:
        break;
      case 3:
        break;
      case 4:
        dispatch("tutorialComplete");
        break;
    }
  };

  $: getStep = () => {
    if (step == 1) return "backdrop-blur-sm";
    return "backdrop-blur-none";
  };
</script>

<div
  id="tutorial"
  class="absolute p-8 bg-cover bg-center top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full {getStep()}"
>
  {#if step == 1}
    <div
      class="flex flex-col justify-around gap-8 h-96 max-w-md drop-shadow-3xl-center w-full"
    >
      <div class="p-8 bg-nature/50 rounded-3xl text-xl text-white">
        <p class="text-center">Imaginez-vous à la Gare de Villeneuve</p>
        <p class="text-center mb-0">6’000 habitants</p>
      </div>
      <button
        class="rounded-full bg-nature text-white text-2xl px-8 py-4"
        on:click={nextStep}>Ok</button
      >
    </div>
  {:else if step == 2}
    <div
      class="flex flex-col justify-between gap-8 h-full max-w-md drop-shadow-3xl-center w-full"
    >
      <div class="p-8 bg-nature/50 rounded-3xl text-xl text-white text-center">
        <span class="block text-md">Rayon de 1km:</span>
        <span class="block text-sm pb-4"> 20 min à pieds</span>
        <span class="block text-md">surface totale:</span>
        <span class="block text-sm pb-4">3.14 km2</span>
        <span class="block text-md">nombre de point:</span>
        <span class="block text-sm">68 exemples concret</span>
      </div>
      <button
        class="rounded-full bg-nature text-white text-2xl px-8 py-4"
        on:click={nextStep}>Ok</button
      >
    </div>
  {:else if step == 3}
    <div
      class="flex flex-col justify-around gap-8 h-96 max-w-md drop-shadow-3xl-center w-full"
    >
      <div
        class="p-8 bg-nature/50 rounded-3xl text-xl text-white flex flex-col gap-8"
      >
        <h2 class="text-white text-2xl text-center">4 catégories</h2>
        <div class="flex flex-row gap-4">
          <div>
            <img alt="alt text" src="/markers/art.png" />
          </div>
          <div class="">
            <span class="block">Art</span>
            <span class="block text-sm">(sculpture, peinture, fontaine,…)</span>
          </div>
        </div>
        <div class="flex flex-row gap-4">
          <div>
            <img alt="alt text" src="/markers/nature.png" />
          </div>
          <div class="">
            <span class="block">Nature</span>
            <span class="block text-sm">(réserve, lieux, jardin,…)</span>
          </div>
        </div>
        <div class="flex flex-row gap-4">
          <div>
            <img alt="alt text" src="/markers/temporelle.png" />
          </div>
          <div class="">
            <span class="block">Temporelle</span>
            <span class="block text-xs">(Visible 48h avant un spectacle)</span>
            <span class="block text-sm">(spectacle, micro-événement,…) </span>
          </div>
        </div>
        <div class="flex flex-row gap-4">
          <div>
            <img alt="alt text" src="/markers/monument.png" />
          </div>
          <div class="">
            <span class="block">Monument</span>
            <span class="block text-sm">(architecture, histoire, temple,…)</span
            >
          </div>
        </div>
      </div>
      <button
        class="rounded-full bg-nature text-white text-2xl px-8 py-4"
        on:click={nextStep}>Ok</button
      >
    </div>
  {/if}
</div>

<style>
</style>
