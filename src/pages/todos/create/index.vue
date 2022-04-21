<template>
    <div class="container">
        <h1>Todo Create</h1>
        <TodoForm ></TodoForm>
    </div>
</template>

<script>
import TodoForm from "@/components/TodoForm.vue"
export default {
    name:'TodoCreate',
    components:{
        TodoForm
    }
}
</script>
<style scoped>

</style>