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

export const deleteContact = async (id: string): Promise<void> => {
  await api.delete(`/contacts/${id}`);
};

export const createContact = async (data: Omit<Contact, "_id">) => {
  const response = await api.post("/contacts", data);
  return response.data.data;
};
