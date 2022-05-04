import {createStore} from 'vuex'

export default createStore({
    modules : {
        toastGroup : {
            namespaced: true,
            state : {
                showToast : false,
                toastMessage : '',
                toastAlertType : '',
                timeout : null,
             },
             mutations : { //state 는 mutations로만 변경 가능 
                 UPDATE_TOAST_MESSAGE (state, payload){
                     state.toastMessage = payload;
                 },
                 UPDATE_TOAST_ALERT_TYPE (state, payload){
                     state.toastAlertType = payload;
                 },
                 UPDATE_TOAST_STATUS (state, payload){
                     state.showToast = payload;
                 },
         
         
             },
             actions : { //함수 
                 triggerToast ( { commit }, message, type = 'success') {
                     commit('UPDATE_TOAST_MESSAGE', message)
                     commit('UPDATE_TOAST_ALERT_TYPE', type)
                     commit('UPDATE_TOAST_STATUS', true)
                     setTimeout(() => {
                         commit('UPDATE_TOAST_MESSAGE', '')
                         commit('UPDATE_TOAST_STATUS', false)
                         commit('UPDATE_TOAST_ALERT_TYPE', '')
                     }, 3000)
          
                     // toastAlertType.value = type;
                     // toastMessage.value = message;
                     // showToast.value = true;
                     // timeout.value = setTimeout(() => {
                     //     toastMessage.value = '';
                     //     showToast.value = false;
                     //     toastAlertType.value = '';
                     // }, 3000)
                 }
             },
             getters : { //vuex에서 사용하는 computed.. 같은거.. 
                 toastMessageSmile(state){
                     return state.toastMessage + ' (*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ'
                 }
             },
        }
    }
})