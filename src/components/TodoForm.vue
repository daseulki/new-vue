<template>
    <div class="container">
        <div v-if="loading">
            Loading...
        </div>
        <form v-else
        @submit.prevent="onSave">
            <div class="row mb-2">
                <div class="col-6">
                     <div class="form-group">
                        <label for="" class="mb-1">제목</label>
                        <input v-model="todo.subject" type="text" class="form-control">

                    </div>
                </div>
                <div class="col-6" v-if="editing">
                     <div class="form-group">
                        <label for="" class="mb-1">상태</label>
                            <div>
                                <button class="btn "
                                :class= "todo.completed ? 'btn-success' : 'btn-danger'"
                                @click.prevent="toggleTodoStatus"> 
                                {{ todo.completed ? '완료!' : '아직..'}}
                                
                                </button>
                           
                            </div>
                    </div>
                </div>
                <div class="col-12 my-2" >
                     <div class="form-group">
                        <label for="" class="mb-1">내용</label>
                        <textarea v-model="todo.body" 
                        class="form-control" cols="30" rows="10"></textarea>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled = "todoUpdated || todoEmpty">
                {{ editing ? "저장" : "생성"}}</button>
            <button type="submit" class="btn btn-outline-dark ms-2"
            @click="goTodoListPage">
                취소</button>
        </form>
        <!-- <teleport to="#modal">
        <Toast 
            v-show="showToast"
            :message="toastMessage"
            :type="toastAlertType"
        >
        </Toast>
        </teleport> -->
    </div>
</template>

<script>
import { ref, computed } from '@vue/reactivity';
import { useRoute,useRouter } from 'vue-router'
import axios from '@/axios'
import _ from 'lodash'
// import Toast from "@/components/Toast.vue"
import { useToast }  from "@/composables/toast"

export default {
    components: {
        //Toast,
    },
    props:{
        editing : {
            type: Boolean,
            default : false,
        }
    },
    setup(props){
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject :'',
            completed: false,
            body: '',

        });
        const originalTodo = ref(null);
        const loading = ref(false);

        const {

            triggerToast,
        } = useToast();
            
        const todoId = route.params.id;


        const getTodo = async() => {
            try { 
                loading.value = true
                const res = await axios.get('todos/'+ todoId);

                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };

                loading.value = false;

            } catch (err) {
                console.log(err);
                triggerToast('뭔가 망했단다', 'danger');
                loading.value = false;

            }

        }
        const todoUpdated = computed(() => {
            return _.isEqual(todo.value, originalTodo.value)
        })

        const todoEmpty = computed(() => {
            if (todo.value.subject === ""){
                return true
            } else{
                return false
            }
        })

        const toggleTodoStatus = () => {
            console.log(todo.value.completed)
            todo.value.completed = !todo.value.completed
        }
        const goTodoListPage = () => {
            router.push({
                name:'Todos'
            })
        }


        if(props.editing){
            getTodo();
            
        }

        const onSave = async() =>{
            console.log('버튼눌림')
            try{
                let res;
                const data = {
                    subject : todo.value.subject,
                    completed : todo.value.completed,
                    body: todo.value.body
                }

                if(props.editing){
                    res = await axios.put(`todos/${todoId}`,data)
                    originalTodo.value = {...res.data}
                    triggerToast('잘 저장되었단다','success')
                } else { 
                    res = await axios.post('todos',data)
                    triggerToast('잘 생성되었단다','success')

                }
               if(!props.editing) {
                router.push({
                    name: 'Todos',
                })
               }
                

            } catch(err){
                console.error(err)
                triggerToast('망했어', 'danger')
            }
           
        }
        
        return {
            todo,
            loading,
            toggleTodoStatus,
            goTodoListPage,
            onSave,
            todoUpdated,
            todoEmpty,
            triggerToast,

        }
    }
}
</script>
