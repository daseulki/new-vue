<template>
    <form @submit.prevent="onSubmit">
        <div class="d-flex">
            <div class="flex-grow-1 me-2" > <!-- me-1 오른쪽 / ms-1 왼쪽-->
                <input type="text" class="form-control"
                v-model="todo" placeholder="새로운 To-do를 입력하세요">

            </div>
            <div>
                <button class="btn btn-primary" type="submit">
                    추가
                </button>
            </div>
            <div v-show="hasError" style="color:red"> </div>
        </div>
    </form>
</template>
<script>
import { ref } from '@vue/reactivity';

export default {
    emits:['add-todo'],
    setup(props, {emit}) {
        const todo = ref('');
        const hasError = ref(false);
        const onSubmit = () => {
            if(todo.value === ""){
                hasError.value = true;
            } else {
                emit('add-todo',{
                    id:Date.now(),
                    subject: todo.value,
                    completed: false,
                });
                hasError.value = false;
                todo.value = '';
            }
        }
        return {
            todo,
            hasError,
            onSubmit,
        }
    },

}
</script>
