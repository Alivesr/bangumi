import api from "./axios";
import type {
  SearchSubjectsParamsRequest,
  SearchSubjectsParamsResponse,
} from "@/types/subject/subjectType";
import type { Request, Response } from "@/types/subject/getSubjectTypes";

const searchSubjects = async (params: SearchSubjectsParamsRequest) => {
  // 拆分 body 和 query
  const { limit = 20, offset = 0, ...body } = params;
  const res: SearchSubjectsParamsResponse = await api.post(
    `/v0/search/subjects?limit=${limit}&offset=${offset}`,
    body,
  );
  return res;
};

export const getSubjectDetail = async (params: Request) => {
  const res: Response = await api.get(`/v0/subjects/${params.subject_id}`);
  return res;
};

export default {
  searchSubjects,
  getSubjectDetail,
};
