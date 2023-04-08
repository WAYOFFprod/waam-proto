class Api {
  apiURl: string
  static instance: Api | undefined;

  constructor() {
    this.apiURl = "https://routes.googleapis.com/directions/v2:computeRoutes";
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Api();
    }

    return this.instance;
  }

  async post(start: any, end: any) {
    const payload = {
      "origin":{
        "location":{
          "latLng":{
            "latitude": start.lat,
            "longitude": start.lng
          }
        }
      },
      "destination":{
        "location":{
          "latLng":{
            "latitude": end.lat,
            "longitude": end.lng
          }
        }
      },
      "travelMode": "WALK",
      "computeAlternativeRoutes": false,
      "languageCode": "en-US",
      "units": "METRIC"
    }
    return fetch(this.apiURl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
        'X-Goog-Api-Key': 'AIzaSyDg2AQd84jhZs0H7qtQkn-wqrqGij3GDhk',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Api; 
// 