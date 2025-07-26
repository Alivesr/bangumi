<script setup lang="ts">
import { ref, onMounted } from "vue";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

const props = withDefaults(defineProps<ToastProps>(), {
  type: "info",
  duration: 3000,
});

const emit = defineEmits<{
  close: [];
}>();

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
    setTimeout(() => {
      emit("close");
    }, 300);
  }, props.duration);
});

const getTypeClasses = () => {
  switch (props.type) {
    case "success":
      return "bg-green-500 text-white";
    case "error":
      return "bg-red-500 text-white";
    case "warning":
      return "bg-yellow-500 text-white";
    default:
      return "bg-blue-500 text-white";
  }
};
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg"
      :class="getTypeClasses()"
    >
      {{ message }}
    </div>
  </transition>
</template>
