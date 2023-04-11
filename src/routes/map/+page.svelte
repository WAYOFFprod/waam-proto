<script lang="ts">
  // @ts-nocheck

  import Map from "$lib/assets/components/Map.svelte";
  import Card from "$lib/assets/components/Card.svelte";
  import points from "$lib/data/points.json";
  import Overlay from "lib//assets/components/Overlay.svelte";

  let selectedMarker = null;
  let selectedMarkerId = -1;
  let status = {
    buttonActive: false,
  };
  let onGoTo;
  let onMoveUser;

  const selectMarker = (event: any) => {
    selectedMarker = points[event.detail.id];
    selectedMarkerId = event.detail.id;
  };

  const navigateTo = () => {
    onGoTo(selectedMarkerId);
    close();
  };

  const close = () => {
    selectedMarker = null;
    selectedMarkerId = -1;
  };

  const moveUser = () => {
    onMoveUser();
  };

  const displayActions = (event: any) => {
    status = { buttonActive: event.detail.isActive };
  };
</script>

<div class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden">
  <Overlay on:moveUser={moveUser} />
  <Map
    {points}
    on:selectMarker={selectMarker}
    on:displayActions={displayActions}
    bind:goTo={onGoTo}
    bind:moveUser={onMoveUser}
  />
  {#if selectedMarker}
    <Card
      marker={selectedMarker}
      on:close={close}
      on:selectMarker={navigateTo}
      displayStatus={status}
    />
  {/if}
</div>
