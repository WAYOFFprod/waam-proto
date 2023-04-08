<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let markers: any = [];

  const dispatch = createEventDispatcher();

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
      const iconBase = "/markers/";
      const icons: Record<string, { icon: string }> = {
        point: {
          icon: iconBase + "point.svg",
        },
      };
      //@ts-ignore
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      map = new Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 46.397861557376075, lng: 6.926938859088941 },
        zoom: 14,
        disableDefaultUI: true,
        styles: styles["default"],
      });
      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        const m = new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          icon: icons["point"].icon,
          map: map,
        });
        m.set("dataId", i);
        m.addListener("click", () => {
          dispatch("selectMarker", { id: i });
        });
      }
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
