<script lang="ts">
  import { onMount } from "svelte";

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

  // const markers: Record<Markers>

  let map = null;
  onMount(() => {
    async function initMap(): Promise<void> {
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      map = new Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 46.397861557376075, lng: 6.926938859088941 },
        zoom: 15,
        disableDefaultUI: true,
        styles: styles["default"],
      });
    }

    initMap();
  });
</script>

<svelte:head>
  <script>
    ((g) => {
      var h,
        a,
        k,
        p = "The Google Maps JavaScript API",
        c = "google",
        l = "importLibrary",
        q = "__ib__",
        m = document,
        b = window;
      b = b[c] || (b[c] = {});
      var d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams(),
        u = () =>
          h ||
          (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g)
              e.set(
                k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
                g[k]
              );
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => (h = n(Error(p + " could not load.")));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a);
          }));
      d[l]
        ? console.warn(p + " only loads once. Ignoring:", g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
    })({
      key: "AIzaSyDg2AQd84jhZs0H7qtQkn-wqrqGij3GDhk",
    });
  </script>
</svelte:head>

<div id="map" class="w-screen h-screen" />
