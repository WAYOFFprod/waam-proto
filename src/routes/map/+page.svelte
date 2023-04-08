<script lang="ts">
  // @ts-nocheck

  import Map from "$lib/assets/components/Map.svelte";
  import Card from "$lib/assets/components/Card.svelte";
  import markers from "$lib/data/points.json";
  import Overlay from "lib//assets/components/Overlay.svelte";

  let selectedMarker = null;

  const selectMarker = (event: any) => {
    selectedMarker = markers[event.detail.id];
  };

  const close = () => {
    selectedMarker = null;
  };
</script>

<div class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden">
  <Overlay />
  <Map {markers} on:selectMarker={selectMarker} />
  {#if selectedMarker}
    <Card marker={selectedMarker} on:close={close} />
  {/if}
</div>
