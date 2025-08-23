import api from "./axios";

const getUserCollection = async (username: string, subject_Id: number) => {
  const res = await api.get(`/v0/users/${username}/collections/${subject_Id}`, {
    cache: true,
    ttl: 1000 * 60 * 60 * 24,
  } as any);
  return res;
};

// 刷新接口，使用短时间缓存（5分钟）
const refreshUserCollection = async (username: string, subject_Id: number) => {
  const res = await api.get(`/v0/users/${username}/collections/${subject_Id}`, {
    cache: true,
    ttl: 1000 * 60 * 5, // 5分钟缓存
  } as any);
  return res;
};

export { getUserCollection, refreshUserCollection };
