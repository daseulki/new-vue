export default  {
    namespaced: true,
    state : {
        toasts: [],
        // showToast : false,
        // message : '',
        // alertType : '',
        // timeout : null,
    },
    mutations : { //state 는 mutations로만 변경 가능 
        // UPDATE_TOAST_MESSAGE (state, payload){
        //     state.message = payload;
        // },
        // UPDATE_TOAST_ALERT_TYPE (state, payload){
        //     state.alertType = payload;
        // },
        // UPDATE_TOAST_STATUS (state, payload){
        //     state.showToast = payload;
        // },
        ADD_TOAST (state, payload) {
            state.toasts.push(payload)
        },
        REMOVE_TOAST (state) {
            state.toasts.shift()

        },

    },
    actions : { //함수 
        triggerToast ( { commit }, payload) {
            console.log(payload)
            
            // commit('UPDATE_TOAST_MESSAGE', message)
            // commit('UPDATE_TOAST_ALERT_TYPE', type)
            // commit('UPDATE_TOAST_STATUS', true)
            commit('ADD_TOAST',{
                message: payload.message+ ' (*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ',
                type: payload.type
            })


            setTimeout(() => {
                // commit('UPDATE_TOAST_MESSAGE', '')
                // commit('UPDATE_TOAST_STATUS', false)
                // commit('UPDATE_TOAST_ALERT_TYPE', '')
                commit('REMOVE_TOAST')

            }, 10000)

            // alertType.value = type;
            // message.value = message;
            // showToast.value = true;
            // timeout.value = setTimeout(() => {
            //     message.value = '';
            //     showToast.value = false;
            //     alertType.value = '';
            // }, 3000)
        }
    },
    getters : { //vuex에서 사용하는 computed.. 같은거.. 
        messageSmile(state){
            return state.message + ' (*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ'
        }
    },
}