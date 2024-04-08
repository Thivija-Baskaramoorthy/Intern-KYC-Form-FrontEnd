<!--
<template>
  <div>
&lt;!&ndash;    <timer-setup v-if="!time" @set-time="setTime"></timer-setup>&ndash;&gt;
    <div v-else>
      <timer :time="prettyTime"></timer>
      <div>
        <button v-if="!isRunning" @click="start">Start</button>
        <button v-if="isRunning" @click="stop">Stop</button>
        <button @click="reset">Reset</button>
      </div>
    </div>
    &lt;!&ndash;    <section>

        {{displayMinutes}}
        {{displaySeconds}}
        </section>&ndash;&gt;
  </div>

</template>


<script>
export default {
  name: "countDownComponent",
  data(){
    return{
      displayMinutes:0,
      displaySeconds:0,
      minutes:0,
      seconds:0,
      isRunning: false,
      time:0,
      timer:null,
    }
  },
  computed: {
    prettyTime () {
      const time = this.time / 60
      const minutes = parseInt(time)
      const seconds = Math.round((time - minutes) * 60)
      return minutes+":"+seconds
    }
  },
  methods: {
    start () {
      this.isRunning = true
      if (!this.timer) {
        this.timer = setInterval( () => {
          if (this.time > 0) {
            this.time&#45;&#45;
          } else {
            clearInterval(this.timer)
            this.reset()
          }
        }, 1000 )
      }
    },
    stop () {
      this.isRunning = false
      clearInterval(this.timer)
      this.timer = null
    },
    reset () {
      this.stop()
      this.time = 0
      this.secondes = 0
      this.minutes = 0
    },
    setTime (payload) {
      this.time = (payload.minutes * 60 + payload.secondes)
    }

  }
}
</script>



<style scoped>

</style>
-->
