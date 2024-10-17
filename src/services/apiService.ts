import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";


const fetchUserData = async (userId: string, resource: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/${resource}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${resource}:`, error);
    throw error;
  }
};

export const fetchUserList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw error;
    }
  };

export const fetchUserPhotos = (userId: string) =>
  fetchUserData(userId, "photos");

export const fetchUserPosts = (userId: string) =>
  fetchUserData(userId, "posts");

export const fetchUserComments = (userId: string) =>
  fetchUserData(userId, "comments");

export const fetchUserAlbums = (userId: string) =>
  fetchUserData(userId, "albums");

export const fetchUserTodos = (userId: string) =>
  fetchUserData(userId, "todos");
