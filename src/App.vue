<template>
  <div>
    <Navbar/>
    <div style="margin-top: 100px">
        <router-view>
        </router-view>
    </div>
      <Toast/>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue"
  import Toast from "@/components/Toast.vue"
  import { useToast } from "@/composables/toast"

  export default {
    components:{
      Toast,
      Navbar
    },
    setup(){
      const {
        triggerToast,
      } = useToast();

        return{
          triggerToast,
        }
    }
  }
</script>

