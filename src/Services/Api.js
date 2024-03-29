import apisauce from "apisauce";
import { ApiConfig } from "./Config";

const Api = apisauce.create({
  // baseURL: ApiConfig.baseURL,
  baseURL: ApiConfig.blogsBaseURL,
  headers: { Accept: "application/json; charset=UTF-8" }
});

export default {
  posts: {
    getAll: () => Api.get("/posts"),
    get: id => Api.get(`/posts/${id}`),
    getUserPosts: id => Api.get(`/users/${id}/posts`),
    create: item => Api.post("/posts", item),
    update: data => Api.put(`/posts/${data.id}`, data),
    delete: id => Api.delete(`/posts/${id}`)
  },
  comments: {
    get: id => Api.get(`/comments/${id}`),
    getPostComments: id => Api.get(`/posts/${id}/comments`),
    create: item => Api.post(`/posts/${item.postId}/comments`, item),
    update: data => Api.put(`comments/${data.id}`, data),
    delete: id => Api.delete(`comments/${id}`)
  },
  users: {
    getAll: () => Api.get("/users"),
    get: id => Api.get(`/users/${id}`),
    create: item => Api.post("/users", item)
  },
  blogs: {
    get: data => Api.get("/blogs", data),
  }
};
