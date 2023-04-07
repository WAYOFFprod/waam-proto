<script lang="ts">
  import { Loader } from "@googlemaps/js-api-loader";
  import { onMount } from "svelte";

  let map = null;

  const loader = new Loader({
    apiKey: "AIzaSyDg2AQd84jhZs0H7qtQkn-wqrqGij3GDhk",
  });

  const styles: Record<string, google.maps.MapTypeStyle[]> = {
    default: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  onMount(() => {
    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      map = new Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 46.397861557376075, lng: 6.926938859088941 },
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: "roadmap",
        styles: styles["default"],
      });
    });
  });
</script>

<div id="map" class="w-screen h-screen" />
