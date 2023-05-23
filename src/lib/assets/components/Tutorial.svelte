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
      <div class="p-8 bg-time/50 rounded-3xl text-xl text-white">
        <p>Imaginez-vous à la Gare de Villeneuve</p>
        <p>6’000 habitants</p>
      </div>
      <button
        class="rounded-full bg-time text-white text-2xl px-8 py-4"
        on:click={nextStep}>Ok</button
      >
    </div>
  {:else if step == 2}
    <div
      class="flex flex-col justify-between gap-8 h-full max-w-md drop-shadow-3xl-center w-full"
    >
      <div class="p-8 bg-time/50 rounded-3xl text-xl text-white text-center">
        <p>Rayon de 1km:</p>
        <p>> 20 min à pieds</p>
        <p>surface totale:</p>
        <p>3.14 km2</p>
      </div>
      <button
        class="rounded-full bg-time text-white text-2xl px-8 py-4"
        on:click={nextStep}>Ok</button
      >
    </div>
  {:else if step == 3}
    <div
      class="flex flex-col justify-around gap-8 h-96 max-w-md drop-shadow-3xl-center w-full"
    >
      <div
        class="p-8 bg-time/50 rounded-3xl text-xl text-white flex flex-col gap-8"
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
            <span class="block text-xs">(Seulement jour même)</span>
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
        class="rounded-full bg-time text-white text-2xl px-8 py-4"
        on:click={nextStep}>Ok</button
      >
    </div>
  {/if}
</div>

<style>
</style>
