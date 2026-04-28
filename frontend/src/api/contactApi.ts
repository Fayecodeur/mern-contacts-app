import axios from "axios";
import type { Contact } from "../types/contact";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const getContacts = async (): Promise<Contact[]> => {
  const response = await api.get("/contacts");

  return response.data.data;
};
