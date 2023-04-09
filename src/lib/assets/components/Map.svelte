<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { MarkerClusterer } from "@googlemaps/markerclusterer";
  import Api from "../utils/api";

  export let points: any = [];

  let polyline: undefined | google.maps.Polyline;

  const api = Api.getInstance();

  const startCoords = { lat: 46.398397265692246, lng: 6.926791974586442 };

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
  let userMarker: google.maps.Marker | null = null;
  let map: google.maps.Map | null = null;
  onMount(() => {
    async function initMap(): Promise<void> {
      const iconBase = "/markers/";
      const icons: Record<string, { icon: string }> = {
        point: {
          icon: iconBase + "point.svg",
        },
        user: {
          icon: iconBase + "user.svg",
        },
        nature: {
          icon: iconBase + "globe.svg",
        },
        building: {
          icon: iconBase + "library.svg",
        },
        art: {
          icon: iconBase + "art.svg",
        },
      };
      //@ts-ignore
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      map = new Map(document.getElementById("map") as HTMLElement, {
        center: startCoords,
        zoom: 14,
        disableDefaultUI: true,
        styles: styles["default"],
      });

      // add points
      let markers = [];
      for (let i = 0; i < points.length; i++) {
        const marker = points[i];
        const m = new google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          icon: icons[marker.type].icon,
          // map: map,
        });
        m.set("dataId", i);
        m.addListener("click", () => {
          dispatch("selectMarker", { id: i });
        });
        markers.push(m);
      }

      // add user location marker
      userMarker = new google.maps.Marker({
        position: startCoords,
        icon: icons["user"].icon,
        map: map,
      });

      new MarkerClusterer({ markers, map });
    }

    initMap();
  });

  // TODO: trigger when location selected
  export const goTo = async (id: number) => {
    const { encoding } = (await google.maps.importLibrary(
      "geometry"
    )) as google.maps.GeometryLibrary;
    const start = userMarker ? userMarker.getPosition()?.toJSON() : startCoords;
    const marker = points[id];
    const end = { lat: marker.lat, lng: marker.lng };
    api.post(start, end).then((response) => {
      const path = encoding.decodePath(
        response.routes[0].polyline.encodedPolyline
      );
      if (polyline == undefined) {
        polyline = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
        polyline.setMap(map);
      } else {
        polyline.setPath(path);
      }
    });
  };

  export const moveUser = () => {
    if (polyline != undefined) {
      let path = polyline.getPath();
      path.removeAt(0);
      polyline.setPath(path);
      userMarker?.setPosition(path.getAt(0));
    }
  };
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
