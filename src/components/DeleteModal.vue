<template>
    <div>
        <Modal @close = 'onClose'>
            <template v-slot:title>
                한번 더 기회를 드립니다..
            </template>
            <template v-slot:body>
                <p>정말로 삭제할거야??</p>
            </template>
            <template v-slot:footer>
                <button type="button" class="btn btn-primary"
                    @click = "deleteTodo">지워버려!</button>
                    <button type="button" class="btn btn-secondary" 
                     @click ="onClose">아니..</button>
            
            </template>
        </Modal>
    </div>
</template>
<script>
import Modal from "@/components/MyModal.vue"
export default {
    components: {
        Modal
    },
    emits:['close-modal'],
    setup(props, {emit}) {

        const deleteTodo = () => {
            emit('delete');
        }
        const onClose = () => {
            emit('close');
        }

        return {
            onClose,
            deleteTodo
        }
    },
}
</script>