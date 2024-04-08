<template>
  <div class="footer">
    <div class="column center-column">
      <router-link to="/">
      <img src="@/assets/images/ekyc_logo.png" alt="Footer Image" />
      </router-link>
    </div>
    <div class="column">
      <p>Contact Us</p>
      <div class="contact">
        <div class="contact-item">
          <i class="material-symbols-outlined"> &#xe61d;</i>
          <p>+94 11 2461461</p>
        </div>
        <div class="contact-item">
          <i class="material-symbols-outlined">&#xe158</i>
          <p>care@paymedia.lk</p>
        </div>
        <div class="contact-item">
          <i class="material-symbols-outlined">&#xe0c8</i>
          <p>PayMedia Limited,<br> 106 Havelock Road,<br> Colombo 5.</p>
        </div>
      </div>
    </div>
    <div class="column">
      <p >Social Media</p>
      <div class="social-media">
        <i class="fab fa-youtube"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-linkedin-in"></i>
      </div>
    </div>
    <div class="separator is-centered">
      <hr>
    </div>
    <div class="copy-rights">
      <p>Copyright © 2023 PayMedia. All Rights Reserved</p>
    </div>
  </div>
</template>

<script>


export default {
  name: "FooterComponent",
  components:{

  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 400px;
  background-color: #F54D4D;
  color: #ffffff;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

}

.separator {
  width: 100%;
  text-align: center;

}

.copy-rights {
  width: 100%;
  text-align: center;
}

.column {
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.center-column {
  align-items: center;

}

.contact h2,
.social-media h2 {
  font-weight: bold;
  font-size: 20px;
}

.contact-item {
  margin-bottom: 10px;
  display: flex;
}

.social-media i {
  margin-bottom: 10px;
  display: flex;
  border-radius: 50%;
}



</style>
