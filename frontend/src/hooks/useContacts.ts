import { useQuery } from "@tanstack/react-query";
import type { Contact } from "../types/contact";
import { getContacts } from "../api/contactApi";

export const useContacts = () => {
  return useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });
};
