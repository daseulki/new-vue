<template>
  <div>
    <nav 
    class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
       <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }"> SEULPAGE </router-link>

        <ul class="navbar-nav me-auto">
          <li class="nav-item active">
            <router-link class="nav-link"  to="/todos"> Todos </router-link></li>
        </ul>
       </div>
    </nav>
    <div style="margin-top: 100px">
        <router-view>
        </router-view>
    </div>
        
    <Toast            
      v-show="showToast"
      :message="toastMessage"
      :type="toastAlertType"
      >
    </Toast>
  </div>
</template>

<script>
  import Toast from "@/components/Toast.vue"
  import { useToast } from "@/composables/toast"

  export default {
    components:{
      Toast
    },
    setup(){

      const {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,
      } = useToast();

        return{
          showToast,
          toastMessage,
          toastAlertType,
          triggerToast,
        }
    }
  }
</script>
<style scoped>
    .toast-box {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index:9999
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }
    .fade-enter-from,
    .fade-leave-to{
        opacity: 0;
        transform: translateY(-30px);
    }
    .fade-enter-to,
    .fade-leave-from{
        opacity: 1;
        transform: translateY(0px);

    } 
</style>