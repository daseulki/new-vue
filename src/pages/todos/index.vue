<template>

<div>
 <div class="container">
    <div class="d-flex justify-content-between mb-3">
      <h2 class="strong">To-Do List</h2>


      <button class="btn btn-primary"
      @click="goToCreate">Create</button>
    </div>
    <input type="text" class="form-control" 
    v-model="searchText" placeholder="Search"
    @keyup.enter="searchTodo">
    <hr>
    <!-- <TodoSimpleForm @add-todo="addTodo"></TodoSimpleForm> -->
    <div v-if="!filteredTodos.length"> Nothing </div>
    <TodoList :todos="filteredTodos" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo">
    </TodoList>

    <hr>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" @click='getTodo(curPage-1);curPage = curPage-1'>
          <a class="page-link" >Previous</a></li>
       
        <li v-for="page in numOfPages" 
        :key="page" :class="curPage === page? 'active':''"
        @click='getTodo(page); curPage = page'
        class="page-item"><a class="page-link" href="#">{{ page }}</a></li>

        <li class="page-item" @click='getTodo(curPage+1); curPage = curPage+1'>
          <a class="page-link" >Next</a></li>
      </ul>
    </nav>
  </div>
        <Toast 
            v-if="showToast"
            :message="toastMessage"
            :type="toastAlertType"
        />

</div>

 
</template>

<script>
  import {
    ref,
    computed,
    watch
  } from 'vue'
  // import TodoSimpleForm from '@/components/TodoSimpleForm.vue'
  import TodoList from '@/components/TodoList.vue'
  import axios from 'axios'
  import Toast from '@/components/Toast.vue';
  import { useToast } from '@/composables/toast';
  import { useRouter } from 'vue-router'


  export default {
    name: 'App',
    components: {
      // TodoSimpleForm,
      TodoList,
      Toast

    },
    setup() {
      const toggle = ref(false);

      const todos = ref([]);
      const numOfTodos = ref(0);
      const limit = 5;
      const curPage = ref(1);
      const searchText = ref('');

      const router = useRouter()
      let msg = '';

      const numOfPages = computed(()=>{
        return Math.ceil(numOfTodos.value/limit)
      })

      const {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,

      } = useToast() 

      const getTodo = async (page = curPage.value) => {
        //curPage.value = page;
        try {
          console.log(page)
          const res = await axios.get(
            `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
            )
          todos.value = res.data;
          numOfTodos.value = res.headers['x-total-count'];
        } catch (err) {
          console.error(err)
          msg = err
          triggerToast(msg, 'danger');
        }
      }
      getTodo();

      const addTodo = async (todo) => {
        try {
          const res = await axios.post('http://localhost:3000/todos', {
            subject: todo.subject,
            completed: todo.completed,
          })
          todos.value.push(res.data);
          getTodo();
        } catch (err) {
          console.error(err)
          msg = err
          triggerToast(msg, 'danger');
        }

      }
      const deleteTodo = async (index) => {
        const id = todos.value[index].id;
        try {
          await axios.delete('http://localhost:3000/todos/' + id)

          getTodo(1);

        } catch (err) {
          console.error(err)
          msg = err
          triggerToast(msg, 'danger');
        }

      }
      const onToggle = () => {
        toggle.value = !toggle.value;
      };

      const toggleTodo = async (index, checked) => {
        const id = todos.value[index].id;
        try {
          await axios.patch('http://localhost:3000/todos/' + id, {
            //completed: !todos.value[index].completed
            completed: checked
          })
          //todos.value[index].completed = !todos.value[index].completed
          todos.value[index].completed = checked

        } catch (err) {
          console.error(err)
          triggerToast(err, 'danger');
        }
      }

      const goToCreate = () => {
        router.push({name:'TodoCreate'})
      }

      let timeout= null;
      const searchTodo = () => {
         getTodo(1);
      }


      watch(searchText, () => {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
          getTodo(1);
        }, 1000)
      })

  
      const filteredTodos = computed(() => {
        if (searchText.value) {
          return todos.value.filter(todo => {
            return todo.subject.includes(searchText.value)
          });
        }
        return todos.value;
      })

      
      // const showToast = ref(false);
      // const toastMessage = ref('');
      // const toastAlertType = ref('');


      // const toastTimeout = ref(null);
      // const triggerToast = (message, type = 'success') => {
      //     showToast.value = true;
      //     toastAlertType.value=type;
      //     toastMessage.value=message;

      //     toastTimeout.value = setTimeout(() => {

      //       toastMessage.value='';
      //       showToast.value= false;
      //       toastAlertType.value='';
            
      //     }, 3000)
      //   };


      return {
        searchTodo,
        todos,
        getTodo,
        addTodo,
        deleteTodo,
        toggleTodo,
        onToggle,
        toggle,
        searchText,
        filteredTodos,
        numOfPages,
        curPage,
        Toast,
        showToast,
        toastMessage,
        toastAlertType,
        goToCreate,

      }
    },
  }
</script>

<style>
nav a{
  cursor:pointer;
}
</style>