<template>
  <Transition name="modal-outer">
    <div v-show="modalActive"
      class="absolute flex flex-row justify-end w-full bg-black bg-opacity-30 h-screen top-0 left-0 z-45">
      <Transition name="modal-inner">
        <div v-if="modalActive" class="bg-white justify-self-end self-stretch max-w-screen-md" :class="classPanel">
          <slot />
          <Button customColor="teal" class="mt-2" @click="$emit('close-modal')" v-show="closeButtonVisible">
            Close
          </Button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
  closeButtonVisible: {
    type: Boolean,
    default: true,
  },
  classPanel: {
    type: String,
    default: '',
  }
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>