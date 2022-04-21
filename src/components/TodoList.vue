<template>
    <div>
        <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">

            <div class="card-body p-2 d-flex align-items-center"
            style="cursor: pointer"
            @click="moveToPage(todo.id)">
                <div class="form-check flex-grow-1">
                    <input type="checkbox" 
                    class="form-check-input" 
                    :checked="todo.completed"
                    @click.stop="toggleTodo(index, $event)">
                    <label for="" 
                    :class="{todo: todo.completed}" 
                     class="form-check-label"> 
                    {{ todo.subject }}</label>
                     <!-- :class="{todo: todo.completed}" 
                    :style="todo.completed?todoStyle:{}" -->
                </div>
                <div>
                    <button class="btn btn-danger btn-sm"
                    @click.stop="deleteTodo(index)">Delete</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    props: {
        todos: {
            type: Array,
            required: true,
            completed: false,
        }
    },
    emits:['toggle-todo', 'delete-todo'],
    setup(props, {emit}) {
        const router = useRouter();
        const toggleTodo = (index, e) => {
            emit('toggle-todo', index, e.target.checked)
        }
        const deleteTodo = (index) => {
            emit('delete-todo', index)
        }
        const moveToPage = (todoId) => {
            router.push({
                name: 'Todo',
                params : {
                    id: todoId
                }
            })
        }
        const todoStyle = { //:style
            textDecoration: 'line-through',
            color: 'gray',
        };
        return {
            toggleTodo,
            deleteTodo,
            moveToPage,
            todoStyle,
        }
    },
}
</script>

<style scoped>
    .todo{ /* :class */
        text-decoration: line-through;
        color: gray;
    }
</style>
