<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSubjectDetail } from "@/api/subject";
import { Service } from "@/openapi";
import { SubjectService } from "@/openapi_p";
import type { Response, Kv } from "@/types/subject/getSubjectTypes";
import ViewBox from "./components/viewbox.vue";
import type {
  RelatedCharacter,
  Character,
  v0_subject_relation,
} from "@/openapi";
import type { SubjectReview, SubjectInterestComment } from "@/openapi_p";
import { formatDate } from "@/utils/timeFormat";

const route = useRoute();
const id = Number(route.params.id);

const subject = ref<Response>();
const loading = ref(true);
const error = ref<string | null>(null);
const characters = ref<RelatedCharacter[]>([]);
const charactersDetailMap = ref<Record<number, Character>>({});
const relatedSubjects = ref<v0_subject_relation[]>([]);
const reviews = ref<SubjectReview[]>([]);
const comments = ref<SubjectInterestComment[]>([]);

const navigateList = [
  "概览",
  "章节",
  "角色",
  "制作人员",
  "吐槽",
  "关联",
  "讨论",
  "讨论版",
  "透视",
];

onMounted(async () => {
  getSubject();
  getCharacters();
  getRelatedSubjectsBySubjectId();
  getReviews();
  getSubjectComments();
});

const formatInfoboxValue = (value: Kv[] | string): string => {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        const v = entry?.v ?? "";
        const k = entry?.k?.trim();
        return k ? `${k}: ${v}` : v;
      })
      .filter(Boolean)
      .join("、");
  }
  return value ?? "";
};

const reloadSubject = async () => {
  try {
    loading.value = true;
    error.value = null;
    const res: Response = await getSubjectDetail({ subject_id: id });
    subject.value = res;
  } catch (err) {
    console.error("获取条目详情失败:", err);
    error.value = "获取条目详情失败，请稍后重试";
  } finally {
    loading.value = false;
  }
};
const getSubject = async () => {
  try {
    loading.value = true;
    error.value = null;
    const res: Response = await getSubjectDetail({ subject_id: id });
    subject.value = res;
    console.log(subject.value);
  } catch (err) {
    console.error("获取条目详情失败:", err);
    error.value = "获取条目详情失败，请稍后重试";
  } finally {
    loading.value = false;
  }
};

const getCharacters = async () => {
  try {
    const res = await Service.getRelatedCharactersBySubjectId(id);
    // 获取每个角色的详细信息
    await Promise.all(res.map((character) => getCharacterDetail(character.id)));
    characters.value = res;
  } catch (err) {
    console.error("获取角色信息失败:", err);
  }
};

const getCharacterDetail = async (id: number) => {
  try {
    const res = await Service.getCharacterById(id);
    charactersDetailMap.value[id] = res;
    return res;
  } catch (err) {
    console.error(`获取角色 ${id} 详细信息失败:`, err);
    charactersDetailMap.value[id] = {} as Character;
    throw err; // 重新抛出错误，让调用者可以处理
  }
};

const getRelatedSubjectsBySubjectId = async () => {
  const res = await Service.getRelatedSubjectsBySubjectId(id);

  relatedSubjects.value = res;
};

// 获取角色图片URL，如果不存在则返回默认图片
const getCharacterImageUrl = (images: any) => {
  return images?.small || "/default-character.png";
};

// 获取条目图片URL，如果不存在则返回默认图片
const getSubjectImageUrl = (images: any) => {
  return images?.small || "/default-subject.png";
};

// 获取用户头像URL，如果不存在则返回默认图片
const getUserAvatarUrl = (avatar: any) => {
  return avatar?.small || "/default-character.png";
};

// 获取收藏状态文本
const getCollectionTypeText = (type: number) => {
  switch (type) {
    case 1:
      return "想看";
    case 2:
      return "看过";
    case 3:
      return "在看";
    case 4:
      return "搁置";
    case 5:
      return "抛弃";
    default:
      return "未知";
  }
};

// 获取评论板
const getReviews = async () => {
  try {
    const res = await SubjectService.getSubjectReviews(id, 5, 0);
    reviews.value = res.data || [];
    console.log("Reviews data:", res);
  } catch (err) {
    console.error("获取评论失败:", err);
    reviews.value = [];
  }
};

const getSubjectComments = async () => {
  const res = await SubjectService.getSubjectComments(id, 2, 20, 0);
  comments.value = res.data || [];
  console.log("Comments data:", res);
};

// 格式化日期
</script>

<template>
  <div class="flex flex-col items-center justify-center box-border pt-5">
    <!-- 加载状态 -->
    <div v-if="loading" class="flex flex-col w-full items-center">
      <!-- 标题骨架屏 -->
      <div class="flex justify-start w-9/12 h-8 leading-8 items-end ml-2 mb-4">
        <div class="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-32 ml-2 mb-1 animate-pulse"></div>
      </div>

      <!-- 导航栏骨架屏 -->
      <div class="flex flex-wrap w-9/12 mb-6">
        <div
          v-for="i in 5"
          :key="i"
          class="h-8 bg-gray-200 rounded w-16 mr-2 animate-pulse"
        ></div>
      </div>

      <!-- 主体骨架屏 -->
      <div class="w-9/12 flex gap-8">
        <!-- 图片骨架屏 -->
        <div class="w-64 flex-shrink-0" style="min-width: 16rem">
          <div class="h-96 rounded-xl bg-gray-200 animate-pulse"></div>

          <!-- 基本信息骨架屏 -->
          <div
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-4"
          >
            <div class="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
            <div class="space-y-3">
              <div
                v-for="i in 4"
                :key="i"
                class="py-2 border-b border-gray-100 last:border-b-0"
              >
                <div
                  class="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"
                ></div>
                <div class="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 简介骨架屏 -->
        <div class="flex-1 min-w-0 space-y-4">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="h-6 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="h-6 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="i in 5"
                :key="i"
                class="h-6 bg-gray-200 rounded-full w-16 animate-pulse"
              ></div>
            </div>
          </div>
        </div>

        <!-- 观看记录骨架屏 -->
        <div
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-64"
        >
          <div class="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-20 w-full"
    >
      <div
        class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6"
      >
        <svg
          class="w-10 h-10 text-red-500"
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
      </div>
      <p class="text-gray-600 text-lg font-medium mb-2">加载失败</p>
      <p class="text-gray-500 text-sm mb-6">{{ error }}</p>
      <button
        @click="reloadSubject"
        class="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
      >
        重新加载
      </button>
    </div>

    <!-- 内容 -->
    <div
      v-else
      class="flex flex-col items-center justify-center box-border w-full"
    >
      <!-- 标题 -->
      <div class="flex justify-start w-9/12 h-8 leading-8 items-end ml-2">
        <span class="text-xl font-extrabold">
          {{ subject?.name_cn }}
        </span>
        <span class="text-sm font-normal text-gray-500 ml-2 mb-0.5">
          {{ subject?.name }}
        </span>
      </div>
      <!-- 导航栏 -->
      <div class="flex flex-wrap w-9/12">
        <div
          v-for="item in navigateList"
          :key="item"
          class="btn btn-ghost text-sm font-normal text-gray-500"
        >
          {{ item }}
        </div>
      </div>
      <!-- 主体 -->
      <div class="w-9/12 flex gap-8 mt-6">
        <!-- 图片 -->
        <div class="w-64 flex-shrink-0" style="min-width: 16rem">
          <div class="h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              :src="subject?.images.medium"
              alt="subject"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <!-- 基本信息（放在图片正下方） -->
          <div
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-4"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-3">基本信息</h3>
            <div class="flex flex-col gap-3">
              <div
                v-for="item in subject?.infobox"
                :key="item.key"
                class="flex flex-col gap-1 py-2 border-b border-gray-100 last:border-b-0"
              >
                <div class="font-medium text-gray-700 text-sm">
                  {{ item.key }}
                </div>
                <div class="text-gray-600 text-sm leading-relaxed">
                  {{ formatInfoboxValue(item.value as any) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 中间和右侧合并区域 -->
        <div class="flex-1 min-w-0 space-y-4">
          <div class="flex gap-4">
            <!-- 简介 -->
            <div
              class="flex-1 bg-white min-w-150 rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 class="text-lg font-semibold text-gray-800 mb-3">简介</h3>
              <div class="text-gray-600 leading-relaxed whitespace-pre-line">
                {{ subject?.summary || "暂无简介" }}
              </div>
            </div>
            <!-- 观看记录 -->
            <div class="w-64 flex-shrink-0">
              <ViewBox />
            </div>
          </div>
          <!-- 标签 -->
          <div
            class="bg-white max-w-150 rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-3">标签</h3>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="tag in subject?.tags || []"
                :key="tag.name"
                class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
              >
                {{ tag.name }}
              </div>
            </div>
          </div>
          <!-- 关联角色 -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-800">关联角色</h3>
              <button
                class="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                全部
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="item in characters.slice(0, 12)"
                :key="item.id"
                class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
              >
                <img
                  :src="getCharacterImageUrl(item.images)"
                  alt=""
                  class="w-16 h-16 object-cover object-top rounded-md flex-shrink-0"
                />
                <div class="flex flex-col ml-3 min-w-0">
                  <div class="font-medium text-gray-800 text-sm truncate">
                    {{ item.name }}
                  </div>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span
                      class="text-xs text-gray-600 bg-gray-100 rounded-[2px] px-1 py-0.5 whitespace-nowrap"
                    >
                      {{ item.relation }}
                    </span>
                    <span class="text-xs text-gray-600 truncate">
                      {{ charactersDetailMap[item.id]?.infobox?.[0]?.value }}
                    </span>
                  </div>

                  <div
                    v-if="item.actors?.[0]?.name"
                    class="text-xs text-blue-600 mt-1 truncate"
                  >
                    {{ item.actors?.[0]?.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 关联条目 -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-800">关联条目</h3>
              <button
                class="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                全部
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="item in relatedSubjects.slice(0, 12)"
                :key="item.id"
                class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
              >
                <img
                  :src="getSubjectImageUrl(item.images)"
                  alt=""
                  class="w-16 h-16 object-cover object-top rounded-md flex-shrink-0"
                />
                <div class="flex flex-col ml-3 min-w-0">
                  <div class="font-medium text-gray-800 text-sm truncate">
                    {{ item.name }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1 truncate">
                    {{ item.name_cn }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1 truncate">
                    {{ item.relation }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 讨论板 -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">评论板</h3>
            <div class="space-y-4">
              <div
                v-for="review in reviews"
                :key="review.id"
                class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-start">
                  <img
                    :src="getUserAvatarUrl(review.user.avatar)"
                    alt=""
                    class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div class="ml-3 flex-1 min-w-0">
                    <div class="flex items-center">
                      <span class="font-medium text-gray-900 text-sm">
                        {{ review.user.nickname }}
                      </span>
                      <span class="text-gray-500 text-xs ml-2">
                        {{ formatDate(review.entry.createdAt) }}
                      </span>
                    </div>
                    <h4 class="font-medium text-gray-800 mt-1 truncate">
                      {{ review.entry.title }}
                    </h4>
                    <p class="text-gray-600 text-sm mt-1 line-clamp-2">
                      {{ review.entry.summary }}
                    </p>
                    <div class="flex items-center mt-2">
                      <span class="text-xs text-gray-500">
                        {{ review.entry.replies }} 条回复
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="reviews.length === 0"
                class="text-center py-8 text-gray-500"
              >
                暂无评论
              </div>
            </div>
          </div>
          <!-- 吐槽箱 -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">吐槽箱</h3>
            <div class="space-y-4">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-start">
                  <img
                    :src="getUserAvatarUrl(comment.user.avatar)"
                    alt=""
                    class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div class="ml-3 flex-1 min-w-0">
                    <div class="flex items-center">
                      <span class="font-medium text-gray-900 text-sm">
                        {{ comment.user.nickname }}
                      </span>
                      <span
                        class="text-xs ml-2 px-1.5 py-0.5 rounded"
                        :class="{
                          'bg-blue-100 text-blue-800': comment.type === 1,
                          'bg-green-100 text-green-800': comment.type === 2,
                          'bg-yellow-100 text-yellow-800': comment.type === 3,
                          'bg-gray-100 text-gray-800': comment.type === 4,
                          'bg-red-100 text-red-800': comment.type === 5,
                        }"
                      >
                        {{ getCollectionTypeText(comment.type) }}
                      </span>
                      <span class="text-gray-500 text-xs ml-2">
                        {{ formatDate(comment.updatedAt) }}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mt-2">
                      {{ comment.comment }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                v-if="comments.length === 0"
                class="text-center py-8 text-gray-500"
              >
                暂无吐槽
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.line-clamp-2 {
  display: -webkit-box;

  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
