import {JSONContent} from "@tiptap/core";


export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  };
}

export interface RegisterResponse {
  user: {
    email: string;
    first_name: string;
    last_name: string;
  }
  message: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  date: string;
  content: string;
  slug: string;
  created_at: string;
  author: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ArticleList {
  url: string;
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  featured: boolean;
  created_at: string;
}

export interface ArticlePayload {
  title: string;
  description: string;
  category: string;
  featured: boolean;
  content: JSONContent;
}