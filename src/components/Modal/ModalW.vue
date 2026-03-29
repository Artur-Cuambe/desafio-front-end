<template>
  <button
    v-if="showButton"
    type="button"
    @click="openModal"
    class=""
    :class="labelClass"
  >
    <Icon v-if="btnIcon" :icon="btnIcon" size="20" />
    <span v-else>{{ label }}</span>
  </button>

  <TransitionRoot :show="isOpen" as="template">
    <Dialog
      as="div"
      @close="closeModal"
      class="relative z-[999]"
      v-if="disableBackdrop === false"
    >
      <TransitionChild
        :enter="noFade ? '' : 'duration-300 ease-out'"
        :enter-from="noFade ? '' : 'opacity-0'"
        :enter-to="noFade ? '' : 'opacity-100'"
        :leave="noFade ? '' : 'duration-300 ease-in'"
        :leave-from="noFade ? '' : 'opacity-100'"
        :leave-to="noFade ? '' : 'opacity-0'"
      >
        <div
          class="fixed inset-0 bg-slate-900/10 backdrop-filter backdrop-blur-sm"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex items-end justify-end min-h-full p-6 text-center">
          <TransitionChild
            as="template"
            :enter="noFade ? '' : 'duration-300 ease-out'"
            :enter-from="noFade ? '' : 'opacity-0 translate-x-full'"
            :enter-to="noFade ? '' : 'opacity-100 translate-x-0'"
            :leave="noFade ? '' : 'duration-200 ease-in'"
            :leave-from="noFade ? '' : 'opacity-100 translate-x-0'"
            :leave-to="noFade ? '' : 'opacity-0 translate-x-full'"
          >
            <DialogPanel
              class="w-full max-h-[calc(100vh-20px)] md:max-h-[calc(100vh-120px)] overflow-hidden text-left align-middle transition-all transform bg-white rounded-md shadow-xl dark:bg-slate-800"
              :class="[sizeClass, heightClass]"
            >
              <slot name="body" :close="closeModal">
                <div
                  class="relative flex items-start justify-between px-5 py-2 overflow-hidden text-gray-800 bg-white dark:text-white"
                  :class="themeClass"
                >
                  <slot name="title">
                    <h2
                      v-if="title"
                      class="mt-4 ml-2 text-xl font-medium leading-6 tracking-wider capitalize"
                      :class="titleClass"
                    >
                      {{ title }}
                    </h2>
                  </slot>
                  <button
                    @click="closeModal"
                    class="text-[22px] mt-1 dark:text-white"
                  >
                    <Icon icon="heroicons-outline:x" />
                  </button>
                </div>
                <div
                  class="px-6 py-8"
                  :class="scrollContent ? 'overflow-y-auto max-h-[400px]' : ''"
                >
                  <slot />
                </div>
                <div
                  class="flex justify-end px-4 py-3 space-x-3 border-t border-slate-100 dark:border-slate-700"
                  v-if="$slots.footer"
                >
                  <slot name="footer"></slot>
                </div>
              </slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
    <Dialog as="div" class="relative z-[99999]" v-else>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex justify-center min-h-full p-6 text-center"
          :class="centered ? 'items-center' : 'items-start '"
        >
          <TransitionChild
            as="template"
            :enter="noFade ? '' : 'duration-300  ease-out'"
            :enter-from="noFade ? '' : 'opacity-0 scale-95'"
            :enter-to="noFade ? '' : 'opacity-100 scale-100'"
            :leave="noFade ? '' : 'duration-200 ease-in'"
            :leave-from="noFade ? '' : 'opacity-100 scale-100'"
            :leave-to="noFade ? '' : 'opacity-0 scale-95'"
          >
            <DialogPanel
              class="w-full overflow-hidden text-left align-middle transition-all transform bg-white rounded-md shadow-xl dark:bg-slate-800"
              :class="sizeClass"
            >
              <div
                class="relative flex justify-between px-5 py-4 overflow-hidden text-white"
                :class="themeClass"
              >
                <h2
                  v-if="title"
                  class="text-base font-medium leading-6 tracking-wider text-white capitalize"
                >
                  {{ title }}
                </h2>
                <button @click="closeModal" class="text-[22px]">
                  <Icon icon="heroicons-outline:x" />
                </button>
              </div>
              <div
                class="px-6 py-8"
                :class="scrollContent ? 'overflow-y-auto max-h-[400px]' : ''"
              >
                <slot />
              </div>
              <div
                class="flex justify-end px-4 py-3 space-x-3 border-t border-slate-100 dark:border-slate-700"
                v-if="$slots.footer"
              >
                <slot name="footer"></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import Icon from "@/components/Icon";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { defineComponent, ref, watch, defineEmits } from "vue";
export default defineComponent({
  components: {
    Icon,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
  },

  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
    labelClass: {
      type: String,
      default: "btn-primary",
    },
    centered: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Basic Modal",
    },
    titleClass: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Basic Modal",
    },
    disableBackdrop: {
      type: Boolean,
      default: false,
    },
    noFade: {
      type: Boolean,
      default: false,
    },
    themeClass: {
      type: String,
      default:
        "bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700",
    },
    sizeClass: {
      type: String,
      default: "max-w-xl",
    },
    heightClass: {
      type: String,
      default: "min-h-[calc(100vh-120px)]",
    },
    btnIcon: {
      type: String,
    },
    scrollContent: {
      type: Boolean,
      default: false,
    },
    activeModal: {
      type: Boolean,
      default: false,
    },
    // activeModal: Boolean
  },

  emits: ["open", "close"],

  data() {
    return {
      isOpen: this.activeModal,
    };
  },
  methods: {
    openModal() {
      this.isOpen = !this.isOpen;
      this.$emit("open");
    },
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },
  },
  watch: {
    activeModal(newValue) {
      this.isOpen = newValue;
    },
  },
});
</script>
