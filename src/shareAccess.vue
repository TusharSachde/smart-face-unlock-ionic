<template>
  <v-ons-page>
    <custom-toolbar>Smart Doors</custom-toolbar>
    <p style="text-align: center">
      <img src="imgSrc" v-if="imgSrc">
      <v-ons-button modifier="large" style="margin: 6px 0">Unlock Door</v-ons-button>
      <v-ons-button modifier="large" style="margin: 6px 0">Share Access</v-ons-button>
    </p>
  </v-ons-page>
</template>

<script>
import customToolbar from "./CustomToolbar";
export default {
  data() {
    return {
      imgSrc: ""
    };
  },
  methods: {
    openCamera: function() {
      // Camera options: https://docs.monaca.io/en/reference/cordova_6.5/camera/#camera-cameraoptions-object
      var cameraOptions = {
        quality: 70,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 900,
        correctOrientation: true
      };

      navigator.camera.getPicture(
        function(imageData) {
          console.log(imageData);
          this.imgSrc = imageData;
        },
        function(err) {
          console.log(err);
        },
        cameraOptions
      );
    },
    sendImage: function() {
      axios
        .get(`http://jsonplaceholder.typicode.com/posts`)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  components: { customToolbar }
};
</script>
