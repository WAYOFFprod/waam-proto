<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { MarkerClusterer } from "@googlemaps/markerclusterer";
  import { stepNumber } from "lib//stores/TutorialStep";
  import Api from "../utils/api";

  export let points: any = [];

  let cluster: MarkerClusterer;
  let radius: google.maps.Circle;
  let markers: google.maps.Marker[] = [];
  let userMarker: google.maps.Marker | null = null;
  let map: google.maps.Map | null = null;
  let polyline: undefined | google.maps.Polyline;

  stepNumber.subscribe((value) => {
    if (value == 2) {
      map?.setZoom(14);
    }
    if (value == 4) {
      map?.setZoom(14);
      cluster.addMarkers(markers);
      radius.setMap(null);
    }
  });

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
          icon: iconBase + "nature.png",
        },
        monument: {
          icon: iconBase + "monument.png",
        },
        art: {
          icon: iconBase + "art.png",
        },
        temporelle: {
          icon: iconBase + "temporelle.png",
        },
      };
      //@ts-ignore
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      map = new Map(document.getElementById("map") as HTMLElement, {
        center: startCoords,
        zoom: 18,
        disableDefaultUI: true,
        styles: styles["default"],
      });

      // create cluster before markers
      cluster = new MarkerClusterer({ markers, map });

      // add points
      markers = [];
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
        zIndex: 10,
      });

      radius = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.05,
        map,
        center: startCoords,
        radius: 1000,
      });
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
      const start = path.getAt(1);
      const end = path.getAt(path.getLength() - 1);
      if (start == null || end == null) {
        return;
      }
      path.removeAt(0);
      polyline.setPath(path);
      userMarker?.setPosition(path.getAt(0));
      const dist = getDistanceFromLatLonInKm(start, end);
      dispatch("displayActions", { isActive: dist < 0.2 });
    }
  };

  const getDistanceFromLatLonInKm = (
    start: google.maps.LatLng,
    end: google.maps.LatLng
  ) => {
    if (start == null || end == null) {
      return 1000;
    }
    const lat1 = start.lat();
    const lng1 = start.lng();
    const lat2 = end.lat();
    const lng2 = end.lng();

    var R = 6371; // Radius of the earth in km
    var distLat = deg2rad(lat2 - lat1); // deg2rad below
    var distLng = deg2rad(lng2 - lng1);
    var a =
      Math.sin(distLat / 2) * Math.sin(distLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(distLng / 2) *
        Math.sin(distLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
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
