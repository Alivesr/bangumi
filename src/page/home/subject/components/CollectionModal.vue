<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <!-- 遮罩层 -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      @click="closeModal"
    ></div>

    <!-- 弹窗主体 -->
    <div
      class="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 z-10 transform transition-all duration-300"
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-gradient-to-br from-[#00a1d6] to-[#00b4ff] rounded-lg flex items-center justify-center mr-3"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800">修改收藏状态</h3>
          </div>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg p-2 transition-all duration-200"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-5">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              收藏状态
            </label>
            <select
              v-model="formData.type"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a1d6] focus:border-[#00a1d6] transition-all duration-200 bg-white text-gray-800 font-medium"
            >
              <option :value="1">想看</option>
              <option :value="2">看过</option>
              <option :value="3">在看</option>
              <option :value="4">搁置</option>
              <option :value="5">抛弃</option>
            </select>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              我的评分
            </label>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-center mb-3">
                <div class="flex gap-1">
                  <svg
                    v-for="star in 10"
                    :key="star"
                    class="w-6 h-6 cursor-pointer transition-all duration-200 hover:scale-110"
                    :class="[
                      star <= formData.rate
                        ? 'text-[#ff6b6b]'
                        : 'text-gray-300 hover:text-[#ff6b6b]/50',
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    @click="setRating(star)"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
              </div>
              <div class="text-center">
                <span class="text-sm font-medium text-gray-600">
                  {{
                    formData.rate > 0
                      ? `${formData.rate} 分`
                      : "点击星星进行评分"
                  }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00a1d6] to-[#00b4ff] rounded-lg hover:from-[#0090c0] hover:to-[#0099e6] focus:outline-none focus:ring-2 focus:ring-[#00a1d6] transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <svg
                  class="w-4 h-4 mr-2 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                提交中...
              </span>
              <span v-else>保存</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Service } from "@/openapi/services/Service";

const props = defineProps<{
  visible: boolean;
  subjectId: number;
  initialType: number;
  initialRate: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update"): void;
}>();

const formData = ref({
  type: props.initialType,
  rate: props.initialRate,
});

const isSubmitting = ref(false);

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      formData.value = {
        type: props.initialType,
        rate: props.initialRate,
      };
    }
  },
);

const closeModal = () => {
  emit("close");
};

const setRating = (rating: number) => {
  formData.value.rate = rating;
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    await Service.postUserCollection(props.subjectId, {
      type: formData.value.type,
      rate: formData.value.rate,
    });
    emit("update");
    closeModal();
  } catch (err) {
    console.error("修改收藏失败:", err);
    // 可以添加用户友好的错误提示
  } finally {
    isSubmitting.value = false;
  }
};
</script>
