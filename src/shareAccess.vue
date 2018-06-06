<template>
  <v-ons-page>
    <custom-toolbar>Smart Doors</custom-toolbar>
          <v-ons-list>

<v-ons-list-header>Setup Server</v-ons-list-header>
    <v-ons-list-item>
      <div class="center">
        <v-ons-input placeholder="Please enter server IP" float
          v-model="serverIP"
        >
        </v-ons-input>
      </div>
    </v-ons-list-item>
    <v-on-list-item>
      <div style="padding: 10px;">
      <v-ons-button modifier="large cta" @click="saveServerIP">Update</v-ons-button>
      </div>
    </v-on-list-item>

        <v-ons-list-header>Setup Bridge</v-ons-list-header>
    <v-ons-list-item>
      <div class="center">
        <v-ons-input placeholder="Please enter bridge IP" float
          v-model="bridgeIP"
        >
        </v-ons-input>
      </div>
    </v-ons-list-item>
    <v-on-list-item>
      <div style="padding: 10px;">
      <v-ons-button modifier="large cta" @click="sendBridgeIP">Send Bridge IP</v-ons-button>
      </div>
    </v-on-list-item>
     
  </v-ons-list>
<div style="text-align: center;padding:10px;">
      <v-ons-button modifier="large cta" style="margin: 6px 0;" @click="unlockDoor">Unlock Door</v-ons-button>
      <v-ons-button modifier="large cta" style="margin: 6px 0;" @click="openCamera">Share Access</v-ons-button>
      <v-ons-button modifier="large cta" style="margin: 6px 0;" @click="getBluetoothInfo">Get Bluetooth Info</v-ons-button>
      {{adapterInfo}}
      <img src="imgSrc" v-if="imgSrc" style="width:100%; max-height:300px;">
      {{imgSrc}}
    </div>
  </v-ons-page>
</template>

<script>
import customToolbar from "./CustomToolbar";
import axios from "axios";

export default {
  data() {
    return {
      imgSrc: "demo",
      bridgeIP: "",
      serverIP: "",
      adapterInfo: {}
    };
  },
  mounted() {
    var localBridgeIP = localStorage.getItem("bridgeIP");
    var localServerIP = localStorage.getItem("serverIP");
    this.bridgeIP = localBridgeIP ? localBridgeIP : "0.0.0.0";
    this.serverIP = localServerIP ? localServerIP : "0.0.0.0";
  },
  methods: {
    openCamera: function() {
      // Camera options: https://docs.monaca.io/en/reference/cordova_6.5/camera/#camera-cameraoptions-object
      var cameraOptions = {
        quality: 70,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        targetItemWidth: 900,
        correctOrientation: true
      };

      navigator.camera.getItemPicture(
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
    getBluetoothInfo: function() {
      networking.bluetooth.getAdapterState(
        function(adapterInfo) {
          // The adapterInfo object has the following properties:
          // address: String --> The address of the adapter, in the format 'XX:XX:XX:XX:XX:XX'.
          // name: String --> The human-readable name of the adapter.
          // enabled: Boolean --> Indicates whether or not the adapter is enabled.
          // discovering: Boolean --> Indicates whether or not the adapter is currently discovering.
          // discoverable: Boolean --> Indicates whether or not the adapter is currently discoverable.
          console.log(
            "Adapter " + adapterInfo.address + ": " + adapterInfo.name
          );
          this.adapterInfo = adapterInfo;
        },
        function(errorMessage) {
          console.error(errorMessage);
        }
      );
    },
    sendBridgeIP: function() {
      localStorage.setItem("bridgeIP", this.bridgeIP);
      var url = `http://${this.serverIP}/Nukilock/setItemNukilockBridgeUrl`;
      console.log(url);
      axios
        .post(url, {
          params: this.bridgeIP
        })
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveServerIP: function() {
      localStorage.setItem("serverIP", this.serverIP);
      console.log(this.serverIP);
    },
    unlockDoor: function() {
      var url = `http://${this.serverIP}/Nukilock/unlockNukilock`;
      axios
        .post(url)
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
