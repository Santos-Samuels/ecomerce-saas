"use client";

import axios from "axios";
import { store } from "@/store/store";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    // Assume backend is always on port 3003 locally or uses same domain in prod
    // If hostname includes "localhost", we map port 3000 -> 3003
    if (hostname.includes("localhost")) {
      return `${protocol}//${hostname}:3003`;
    }
  }
  return baseURL;
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicApi = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
