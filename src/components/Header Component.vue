<template>
<div class="header">
  <div class="background is image">
    <img src="@/assets/images/header_bg.png"/>
  </div>
  <div  class="top-header">
    <div class="column is-left">
      <router-link to="/">
      <img src="@/assets/images/header_logo.png"/>
      </router-link>
    </div>

    <div class="column is-right">
      <b-button class="call-button" rounded>
        <div class = "contact">
          <i class="material-symbols-outlined"> &#xe61d;</i>
         <p>+94 11 2461461</p>
        </div>
      </b-button>
    </div>

  </div>


</div>
</template>



<script>
export default {
  name: "Header Component"
}
</script>


<style scoped>
.header {
  width: 100%;
  position: relative;
}

.background{
  position: relative;
}

.top-header{
  position: absolute;
  top: 5px;
  width: 100%;
  height: 100px;
  background-color: transparent;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.column {
  display: flex;
  align-items: center;
}

.is-left {
  justify-content: flex-start;
  margin-left: 30px;
}

.is-right {
  justify-content: flex-end;
  margin-right: 30px;

}

.call-button {
  background-color: #F54D4D;
  border-radius:5%;
  width: 180px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

}

.contact{
  display: flex;
}

</style>
