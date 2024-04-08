
<template>
  <div class="application-form">
    <div class="header is-centered">
      <p style="font-weight: bold">KYC Form</p>
    </div>
    <div class="message is-mobile is-desktop is-multiline">
      <p style="justify-content: center">Please enter your valid Name & email address to use all of our features</p>
    </div>
    <div class="content">
      <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(goToImageUpload)">
        <div class="columns is-centered is-multiline is-mobile  ">

          <div class ="column is-4 ">
            <b-field label="Title:" expanded>
              <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
              <b-select v-model="customerData.title" placeholder="Mr">
                <option value="mr">Mr</option>
                <option value="mrs">Mrs</option>
                <option value="miss">Miss</option>
              </b-select>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
          </div>
            <div class ="column is-8 ">
            <b-field label="Full Name:" expanded>
              <ValidationProvider name="Full Name"
                                  :rules="{
                                    required:true,
                                    alpha_spaces:true,
                                  }"
                                  v-slot="{ errors }">
                <b-input v-model="customerData.full_name" placeholder="CR Kumarasingha" type="text" />
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            </div>


          <div class ="column is-half ">
            <b-field label="Mobile Number:" expanded>
              <ValidationProvider name="Mobile Number" rules="required" v-slot="{ errors }">
                <b-input v-model="customerData.contact_number" placeholder="Autofill" type="text" />
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
          </div>

            <div class ="column is-half ">
            <b-field label="Email:" expanded>
              <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                <b-input v-model="customerData.email" type="text" placeholder="crkumarasinha47@gmail.com" />
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            </div>


            <div class ="column is-6 ">
            <b-field label="NIC Number:" expanded >
              <ValidationProvider name="NIC Number"
                                  rules="required|nic_val"
                                  immediate
                                  v-slot="{ errors }">
                <b-input v-model="customerData.nic" type="text"/>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            </div>

            <div class ="column is-6 ">
            <b-field label="Nationality:" expanded>
              <ValidationProvider name="Nationality" rules="required" v-slot="{ errors }">
              <b-select v-model="customerData.nationality">
                <option value="sl">Sri Lankan</option>
                <option value="other">Other</option>
              </b-select>
              <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            </div>

          <div class="buttons">
            <b-button class="back-button">Back</b-button>
            <b-button @click="goToImageUpload" type="submit" class="submit-button">Let's Continue</b-button>
          </div>

        </div>
      </form>
      </ValidationObserver>

    </div>
    <div>

      <ModalComponent :is-active="isActive"
                      @updateContactNumber="updateContactNumber"
                      @continue="showSecondModal()" />

      <GetOtpModal v-if="isShowSecondModal"
                   @back="showFirstModal()"/>

    </div>
  </div>
</template>

<script>
import ModalComponent from "@/components/ModalComponent.vue";
import { useCustomerDataStore } from "@/store/kycStore";
import GetOtpModal from "@/components/GetOtpModal.vue";
import { ValidationProvider } from 'vee-validate';


export default {

  setup() {
    const customerData = useCustomerDataStore();
    return { customerData };
  },

  name: "ApplicationComponent",

  components: {
    ModalComponent,
    GetOtpModal,
    ValidationProvider

  },

  data() {
    return {
      isActive: true,
      isShowSecondModal: false,
      // hideBackdrop :true,

    };
  },

  mounted() {
    //  modalActive
    this.isActive = true;

  },

  methods: {
    goToImageUpload() {
      console.log('CustomerData:', this.customerData);
      this.$router.push("/upload-images");

    },

    showSecondModal() {
      this.isShowSecondModal = true;
      this.isActive=false
    },

    showFirstModal(){
      this.isActive=true;
      this.isShowSecondModal=false
    },

    updateContactNumber(contactNumber) {
      console.log("contact number")
      this.customerData.contact_number= contactNumber;
    },


  }

};
</script>

<style scoped>
.application-form {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  //height: 500px;
  position: relative;
  padding: 20px;
  justify-content: space-between;
}

.header {
  font-size: 30px;
  font-style: normal;
  align-content: center;
  align-items: center;
  color: #f54d4d;
  font-weight: bold;
  margin-bottom: 5px;
}

.message {
  font-size: 15px;
  text-align: center;
  width: 400px;
  margin-bottom: 20px;
  background-color: transparent;
}

.buttons {
  margin-top: 20px;
  display: flex;
  align-content: flex-end;
  align-items: flex-end;
  justify-items: right;
  margin-bottom: 5px;
}

.submit-button {
  background-color: #f54d4d;
  color: white;
}

.content {
  width: 50%;
}
</style>
