<template>
  <b-modal :active.sync="isActive"
           :can-cancel="false"
           :width="500"
           @close=""
           class="custom-modal">
    <div class="column is-centered">
      <div class="modal-card">
        <div class="image">
          <img src="@/assets/images/success.png" alt="Success!"/>
        </div>

        <br><p style="text-align: center" class="congratulations"> Congratulations</p>
        <p style="text-align: center" class="text"> Your KYC data has been submitted successfully</p><br>
        <section>
          <div class="button">
            <b-button @click="returnNewApplication" type="submit" class="submit-button">OK</b-button>
          </div>
        </section>
      </div>
    </div>
  </b-modal>
</template>

<script>

export default {
  name: "CongratulationsModal",

  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    /*closeModal() {
      this.$emit("close");
    },*/

    returnNewApplication() {
      console.log('Congratulations');
      this.$router.push("/");
      window.location.reload();
    },

  }
};
</script>

<style scoped>
.custom-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-card {
  padding: 30px;
  height: 390px;
  width: 390px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image{
  width: 180px;
  height: 180px;
}

.column {
  align-items: center;
  width: 410px;
  height: 410px;
  background-color: transparent;
  border-radius: 5px;
  justify-content: space-between;
}

.congratulations {
  font-size: xx-large;
  font-weight: bolder;
  color: #f54d4d;
}

.submit-button {
  background-color: #f54d4d;
  color: white;

  //margin-top: 20px;
}

.button {
  background-color: #F54D4D;
  border-color: hsl(0, 0%, 100%);
  border-width: 1px;
  color: hsl(0, 0%, 21%);
}


</style>
