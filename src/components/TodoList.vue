<template>
    <div>
        <List :items="todos">
        <template #default="{ item, index }">
        
            <div class="card-body p-2 d-flex align-items-center" style="cursor: pointer" @click="moveToPage(item.id)">
                <div class="form-check flex-grow-1">
                    <input type="checkbox" class="form-check-input" :checked="item.completed"
                        @click.stop="toggleTodo(index, $event)">
                    <span :class="{todo: item.completed}" class="form-check-label">
                        {{ item.subject }}</span>
                    <!-- :class="{todo: todo.completed}" 
                    :style="todo.completed?todoStyle:{}" -->
                </div>
                <div>
                    <button class="btn btn-danger btn-sm" @click.stop="showDelete(index)">삭제</button>
                </div>
            </div>
            </template>
        </List>
        <teleport to="#modal">
            <Modal v-if="isDelete" @close='closeModal' @delete='deleteTodo'>
            </Modal>
        </teleport>
    </div>
</template>

<script>
    import {
        useRouter
    } from 'vue-router'
    import {
        ref
    } from '@vue/reactivity';
    import Modal from "@/components/DeleteModal.vue"
    import List from "@/components/List.vue"
    import { useToast }  from "@/composables/toast"

    export default {
        props: {
            todos: {
                type: Array,
                required: true,
                completed: false,
            }
        },
        components: {
            Modal,
            List
        },
        emits: ['toggle-todo', 'delete-todo'],
        setup(props, {
            emit
        }) {
            const router = useRouter();
            const isDelete = ref(false);
            const wantDeleteId = ref(null);

            const toggleTodo = (index, e) => {
                emit('toggle-todo', index, e.target.checked)
            }
            const deleteTodo = () => {
                emit('delete-todo', wantDeleteId.value);
                triggerToast('삭제됐단다','danger');
                closeModal()
            }
            const showDelete = (index) => {
                isDelete.value = true;
                wantDeleteId.value = index
            }

            const moveToPage = (todoId) => {
                router.push({
                    name: 'Todo',
                    params: {
                        id: todoId
                    }
                })
            }
            const todoStyle = { //:style
                textDecoration: 'line-through',
                color: 'gray',
            };

            const closeModal = () => {
                isDelete.value = false;
                wantDeleteId.value = null

            };

            const {
                triggerToast,
            } = useToast();

            return {
                toggleTodo,
                deleteTodo,
                moveToPage,
                todoStyle,
                closeModal,
                showDelete,
                isDelete,
                triggerToast,

            }
        },
    }
</script>

<style scoped>
    .todo {
        /* :class */
        text-decoration: line-through;
        color: gray;
    }
</style>