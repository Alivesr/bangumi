import api from "./axios";
import type {
  SearchSubjectsParamsRequest,
  SearchSubjectsParamsResponse,
} from "@/types/subjectType";

const searchSubjects = async (params: SearchSubjectsParamsRequest) => {
  const res: SearchSubjectsParamsResponse = await api.post(
    "/v0/search/subjects",
    params,
  );
  return res;
};

export { searchSubjects };
