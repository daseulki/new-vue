<template>
    <transition name="modal">
        <div class="modal_warpper" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <slot name="title">
                            </slot>
                        </h5>
                        <button type="button" class="btn-close" 
                        @click="onClose"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
    emits:['close-modal'],
        setup(props, {emit}) {
            const onClose = () => {
                emit('close');
            }
            return {
                onClose,
                
            }
        },
    }
</script>
<style scoped>
    .modal_warpper {
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>