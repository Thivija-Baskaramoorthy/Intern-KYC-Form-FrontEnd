<template>
  <div class="upload-component" :class="{'camera-open': isCameraOpen}">
    <form>
      <div class = "column is-desktop is-mobile">
      <b-field :label="imageLabel">
        <div class="component-content" >
          <div id="image-container"
               @dragover.prevent
               @drop.prevent="handleDrop"
               v-if="!isCameraOpen && !showCropper">
            <div class="column is-centered">
              <br>
              <img v-if="img"
                   :src="croppedImagePreview"
                   alt="Uploaded Image"
                   id="preview-image">
              <div  v-if="!isCameraOpen && !croppedImagePreview">
                <img v-if="StoredImage ===  ''"
                    src="@/assets/images/image_upload.png"
                    alt="Blank Image"
                    class="uploaded-image">
                <img v-else
                     id="stored-image"
                    :src="'data:image/png;base64,'+StoredImage"
                    alt="Blank Image"
                    class="uploaded-image">
              </div>

              <p v-if="uploadMessage && !isCameraOpen && !croppedImagePreview && !StoredImage"
                 style="text-align: center">{{ uploadMessage }}</p>
              <p v-if="uploadMessage && !isCameraOpen && !croppedImagePreview && !StoredImage"
                 style="text-align: center">{{ uploadMessage1 }}</p><br>
              <div class="camera-button"
                   v-if="!isCameraOpen && !croppedImagePreview && !StoredImage">
                <button type="button"
                        @click="toggleCamera">
                  <span >Capture</span>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="camera-box">
            <video v-show="!isPhotoTaken" ref="camera" class="camera" autoplay></video>
            <canvas v-show="isPhotoTaken && !showCropper "
                    id="photoTaken"
                    ref="canvas"
                    class="camera"
                    :width="cameraWidth"
                    :height="cameraHeight"></canvas>
            <div class="camera-shoot">
              <button
                  v-show="!isPhotoTaken && !showCropper"
                  type="button"
                  class="button"
                  @click="takePhoto">
                <i class="material-symbols-outlined">&#xe412;</i>
              </button>
              <div v-show="showCropper" class="cropper">
                <cropper ref="cropper"
                         :src="img"
                         :canvas="{
		                            minHeight: 0,
		                            minWidth: 0,
		                            maxHeight: 337.5,
		                            maxWidth: 450,
	                              }"
                         :stencil-props="{ aspectRatio: 10/12 }"
                         :debounce="false"
                         @change="getCoordinates">

                </cropper>
                <div class="cropper-buttons">
                  <button
                      type="button"
                      class="retake-button"
                      @click="retakePhoto">
                    <i class="material-symbols-outlined">&#xe15a;</i>
                  </button>
                  <button
                      type="button"
                      class="done-button"
                      @click="saveCroppedImage">
                    <i class="material-symbols-outlined">&#xe3be;</i>
                  </button>
                </div>
            </div>
              <img v-if="croppedImagePreview"
                   :src="croppedImagePreview"
                   alt="Cropped Image Preview"
                   class="cropped-image-preview">
            </div>
          </div>
        </div>
      </b-field>
      </div>
    </form>
  </div>
</template>



<script>
import { Cropper, Preview } from "vue-advanced-cropper";
import { useCustomerDataStore } from "@/store/kycStore";

export default {
  setup() {
    const customerData = useCustomerDataStore();
    return {
      customerData,
    };
  },

  name: "UploadImageComponent",
  components: {
    Cropper,
    Preview
  },

  props: {
    imageLabel: {
      type: String,
    },
    uploadMessage: {
      type: String,
    },
    uploadMessage1: {
      type: String,
    },
    onSaveSuccess: {
      type: Function,
      default: () => {},
    },
    StoredImage:{
      type: String,
    }

  },

  data() {
    return {
      showImageBoxContents: true,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      cameraWidth: 450,
      cameraHeight: 337.5,
      img: "",
      showCropper: false,
      showCropButton : false,
      croppedImagePreview: null,
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      image: null,
      showPreviewImage: false,
      imageData: null,

    };
  },

  methods: {
    handleDrop(event) {
      event.preventDefault();
      const img = event.dataTransfer.files[0];
      if (img) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.img = e.target.result;
          this.showPreviewImage = false;
          this.showCropper=true;
        };
        reader.readAsDataURL(img);
      }
      console.log("image dragged to be cropped")
    },

    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();

      }
    },
    createCameraElement() {
      this.isLoading = true;

      const constraints = {
        audio: false,
        video: {
          width: this.cameraWidth,
          height: this.cameraHeight,
        },
      };

      navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            this.isLoading = false;
            this.$refs.camera.srcObject = stream;
          })
          .catch((error) => {
            this.isLoading = false;
            alert("The browser may not support or there are some errors.");
          });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },

    takePhoto() {
      if (!this.isPhotoTaken) {
        const FLASH_TIMEOUT = 50;
        this.isShotPhoto = true;
        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }

      this.isPhotoTaken = true;
      const context = this.$refs.canvas.getContext("2d");
      context.translate(this.cameraWidth, 0);
      context.scale(-1, 1);
      context.drawImage(
          this.$refs.camera,
          0,
          0,
          this.cameraWidth,
          this.cameraHeight
      );

      this.img = this.$refs.canvas.toDataURL("image/jpeg");
      this.showCropper = true
      this.isCameraOpen=false

    },

    cropImage() {
      this.showCropper = true
      this.isCameraOpen=false
      console.log()
    },

    getCoordinates({ coordinates, canvas, }) {
      this.coordinates = coordinates;
      this.image = canvas.toDataURL(); //cropped image
      console.log()
    },

    retakePhoto() {
      this.showCropper = false;
      this.showPreviewImage = false;
      this.img = '';
      this.isPhotoTaken = false;
    },

    saveCroppedImage() {
      // Set the base64 image URL to imageUrl
      this.imageUrl = this.image;

      console.log("image URL long:", this.imageUrl);

      // Split the imageUrl to get the base64 data
      this.imageData = this.imageUrl.split(',')[1];

      console.log("Extracted base64 data:", this.imageData);

      this.$emit('cropped-image', this.imageData);

      this.croppedImagePreview = this.imageUrl;
      this.showPreviewImage = true;
      this.showCropper = false;
    },

    /*extractBase64FromImageURL(imageUrl) {
      // Check if  starts with "data:image/jpeg;base64,"
      const prefix = imageUrl.indexOf(',');
      if ( prefix !== -1) {
        return imageUrl.slice(prefix + 1);
      }
      else {
        return imageUrl;
      }
    }*/

  },

  mounted() {
    /*if (this.StoredImage) {

      this.croppedImagePreview = this.StoredImage;

      this.showPreviewImage = true;
      console.log(this.imageLabel, this.customerData.base64_nic_front_image);
    }*/
  },

};
</script>

<style scoped>

#image-container {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  width: 100%;
  height:50%;
  background-color: #e5e1e1;

}

#preview-image {
  max-width: 100%;
  max-height: 500px;
  margin-bottom: 2px;
}


.camera-open .image-box {
  height: 280px;
  width: 400px;
  padding: 120px;
  align-items: center;
  justify-content: center;
  background-color: #f8f8fa;
  margin: 10px;
  display: none;
}

.camera-open .camera-box {
  width: 90%;
  height: 90vh;
  position: fixed;
  top: 5%;
  left: 5%;
  z-index: 9999;

}

.camera-shoot {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.camera-shoot button {
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.camera-open .camera-box video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploaded-image {
  height: 60px;
  width: 60px;
}

.cropper {
  width: 100%;
  height: 100%;
  background: #ddd;
  z-index: 1;
}

.button{
  background-color: #F54D4D;

}

</style>
