<template>
  <div>
    <DialogModal @close="emit('close')">
    <template #title>Confirm Delete</template>
    <template #body>
      <p class="text-slate-300" v-html="$t(text)"> </p>
      <p> 
        <span class="block mt-2 text-orange-400 text-sm">
          {{$t(warning)}}
        </span>
      </p>
    </template>
    <template #footer>
      <div class="flex gap-3 justify-end w-full">
        <!-- <pre>{{item}}</pre> -->
        <button @click="emit('close')" class="px-4 py-2 bg-slate-700 text-white rounded-md">
          Cancel
        </button>
        <button @click="emit('deleteItem',item.id)" class="px-4 py-2 bg-red-500 text-white rounded-md flex items-center gap-1"
          :disabled="disabled">
          <Icon v-if="disabled" icon="heroicons-outline:refresh" class="animate-spin" />
          <span>Delete</span>
        </button>
      </div>
    </template>
  </DialogModal>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import DialogModal from './dialog-modal-component.vue';
import Icon from '@/components/Icon/index.vue';


const {name,disabled} = defineProps({
  show: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: " Are you sure you want to delete the subcategory ...?"
  },
  warning: {
    type: String,
    default: "This will also delete all associated data and cannot be undone!"
  },
  item: {
    type: Object,
  
  }
});

const emit = defineEmits(['close','deleteItem']);

</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Enhanced backdrop styling */
@supports (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(1.5px);
  }
}

@supports not (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    @apply bg-slate-900/80 dark:bg-slate-900/80;
  }
}
</style>