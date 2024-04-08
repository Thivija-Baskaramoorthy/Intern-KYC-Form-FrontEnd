<template>
  <b-modal :active.sync="isShowSecondModal"
           :width="400"
           :can-cancel="false"
           class="custom-modal" @close="">
    <div class="popup-modal">

        <div class="header-box" >
          <p style="font-weight: bolder; color: white">ENTER YOUR OTP</p>
<!--          <button class="close-button" @click="">×</button>-->
        </div>

        <div>
          <div class="popup-content">
            <p style="color: black"  >OTP code has been sent to {{ customerData.contact_number }} enter the code below to continue.</p>
            <br>
            <div class="otp-container">
              <input v-for="(value, index) in otpValues"
                     :key="index"
                     type="number"
                     maxlength="1"
                     class="otp-input"
                     :value="value"
                     @input="handleInput(index, $event.target.value)"
                     @keydown.backspace="handleBackspace(index)"
                     ref="otpFields" />

            </div>
            <div class="timer" style="font-weight:bolder">
              {{ formatTime(timerCount) }}
              <br>
            </div>

<!--            <h3 style="color: #F54D4D; font-weight: bolder" @click="resendCode" :disabled="resendDisabled"> Resend Code</h3>-->
            <h3 :class="{ 'disabled': resendDisabled }" style="color: #F54D4D; font-weight: bolder" @click="resendCode"> Resend Code</h3>



            <section>
              <div class="buttons">
                <div class ="column  is-left">
                  <b-button
                      class="back-button"
                      @click="goToPhoneModal">
                    Back
                  </b-button>
                </div>
                <div class ="column is-right">
                  <b-button
                      type="submit"
                      class="submit-button"
                      @click="submitOtp">
                    Verify
                  </b-button></div>
              </div>
            </section>
        </div>
      </div>

    </div>

  </b-modal>

</template>

<script>
import { useCustomerDataStore} from "@/store/kycStore";
import countDownComponent from "@/components/countDownComponent.vue";
import NetworkManager from "@/helpers/classes/apiRequest";


export default {
  setup() {
    const customerData = useCustomerDataStore();
    return { customerData };
  },

  name: "GetOtpModal",

  data(){
    return{
      isShowSecondModal: true,
      otpValues: ['', '', '', '',''],
      isActive:false,
      timerCount: 180, // in seconds

    }
  },

  components:{
    countDownComponent,
  },

  computed: {
    resendDisabled() {
      return this.timerCount > 0;
    }
  },

  methods:{
    /*closeModal(){
      // this.$emit("close");
      console.log('close otp modal')
      this.isShowSecondModal=false
    },*/



    goToPhoneModal(){
      this.$emit("back")
      console.log('click to  navigate to the phone modal')
      // this.isShowSecondModal=false

    },

    handleInput(index, value) {
      if (value.length > 1) {
        return;
      }
      this.otpValues[index] = value;
      if (value.length === 1 && index < this.otpValues.length - 1) {
        this.$refs.otpFields[index + 1].focus();
      }
    },
    handleBackspace(index) {
      if (this.otpValues[index] !== '') {
        this.otpValues[index] = '';
      } else if (index > 0) {
        this.$refs.otpFields[index - 1].focus();
      }
    },
    submitOtp(){
      this.customerData.otp_input = this.otpValues.join('');

      console.log('otp:',this.customerData.otp_input)

      this.isLoading = true;

      const requestBody = {
        otp: this.customerData.otp_input,
        phone_number: this.customerData.contact_number

      };

      NetworkManager.apiRequest("otpAuth/SubmitOTP",requestBody,response=>{
        console.log("Customer Otp Added", response.data);
        if (response.status_code === 200) {
          this.$buefy.notification.open("OTP success!!");
          this.isShowSecondModal = false;
          console.log('success')
        }
        else {
          this.$buefy.notification.open("Invalid OTP");
        }
      })
      /*this.$axios
          .post("https://localhost:7036/api/otpAuth/SubmitOTP", requestBody)
          .then(response => {
            console.log("Customer Otp Added", response.data.status_code);
            if (response.data.status_code === 200) {
              this.$buefy.notification.open("OTP success!!");
              this.isShowSecondModal = false;
              console.log('success')
            }
            else {
              this.$buefy.notification.open("Invalid OTP");
            }
          })*/

          .catch(error => {
            console.error("Error sending OTP", error);
            this.$buefy.notification.open("Error otp!");
            this.isShowSecondModal = true;

          })
          .finally(() => {
            this.isLoading = false
          });
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const displayMinutes = String(minutes).padStart(2, '0');
      const displaySeconds = String(remainingSeconds).padStart(2, '0');
      return `${displayMinutes}:${displaySeconds}`;
    },

    startTimer() {
      // Start a countdown timer
      this.timer = setInterval(() => {
        if (this.timerCount > 0) {
          this.timerCount--;
        } else {
          clearInterval(this.timer);
          // Timer expired, handle accordingly
        }
      }, 1000);
    },

    resendCode(){
      this.isLoading=true;
      const requestBody = {

        phone_number: this.customerData.contact_number,

      };
      this.$axios
          .post("https://localhost:7036/api/otpAuth/RequestOTP",requestBody)
          .then(response => {
            console.log("otp-requested",response.data);
            this.$buefy.notification.open("Otp sent")
            this.timerCount = 60
            this.startTimer()
          })
          .catch(error => {
            console.error("Error re-requesting", error);
            this.$buefy.notification.open("Re-request Error!");
          })
          .finally(()=>{
            this.isLoading=false
          });
      console.log('otp re-requested')
    },
  },

  mounted() {
    this.startTimer()
  }

}
</script>

<style scoped>
.disabled {

  opacity: 0.5; /* Or any other styling to visually indicate it's disabled */
  cursor: not-allowed;
}

.custom-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-modal{
  background-color: white;
  border-radius: 5px;
  height: 400px;
  width: 400px;
  justify-content: space-between;
}

.header-box{
  background-color: #F54D4D;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 50px;
  display: flex;
}
/*
.close-button {
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
}*/

.popup-content {
  padding: 35px;
  justify-content: center;
  text-align: center;

}

.popup-content h2 {
  margin-bottom: 10px;
}

.popup-content input {
  margin-bottom: 10px;
}

.popup-content button:hover {
  background-color: #F54D4D;
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

.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  &.error {
    border: 1px solid red !important;
  }
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.style-1 {
  .otp-input-8-field {
    border-radius: 4px;
    border: 1px solid #f5cd79;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
}


</style>
