import {
    // onUnmounted,
    computed,
} from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
    const store = useStore();

    const toasts = computed(()=>store.state.toastGroup.toasts);

    // const showToast = computed(()=>store.state.toastGroup.showToast);
    // const toastMessage = computed(()=>store.getters['toastGroup/toastMessageSmile']);
    // const toastAlertType = computed(()=>store.state.toastGroup.toastAlertType);
    // const timeout = computed(()=>store.state.timeout);

    const triggerToast = (message, type) => {
        console.log(type)
        // showToast.value = true;
        // toastAlertType.value = type;
        // toastMessage.value = message;

        // timeout.value = setTimeout(() => {

        //     toastMessage.value = '';
        //     showToast.value = false;
        //     toastAlertType.value = '';

        // }, 3000)
        store.dispatch('toastGroup/triggerToast', { message, type })
    };

    // onUnmounted(() => {
    //     clearTimeout(timeout.value)
    // })


    return {
        toasts,
        // showToast,
        // toastMessage,
        // toastAlertType,
        triggerToast,

    }
}