import axios from "axios";

export const queryFn = async ({ queryKey }: any) => {
  const response = await axios.get(queryKey);
  return response.data;
};
