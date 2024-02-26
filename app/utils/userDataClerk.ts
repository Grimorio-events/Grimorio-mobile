import api from "./api";

const getUserByClerkId = async (userId: string, token: string) => {
  return api.get(`/users/clerk/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getUserByClerkId };
