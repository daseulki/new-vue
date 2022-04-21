<template>
    <div class="container">
        <h1>Todo Page</h1>
        <TodoForm :editing="true"></TodoForm>
    </div>
</template>
<script>
import TodoForm from "@/components/TodoForm.vue"

export default {
    components: {
        TodoForm,
    },
    setup(){
       
    
    }
}
</script>
