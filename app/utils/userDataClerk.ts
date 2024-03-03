import api from "./api";

const getUserByClerkId = async (userId: string) => {
  return api.get(`/users/clerk/${userId}`, {});
};

export { getUserByClerkId };
