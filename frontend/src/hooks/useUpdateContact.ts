import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Contact } from "../types/contact";

import toast from "react-hot-toast";
import { updateContact } from "../api/contactApi";

type updateContactData = {
  id: string;
  data: Omit<Contact, "_id">;
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: updateContactData) => updateContact(id, data),
    onSuccess: () => {
      toast.success("Contact modifié avec succés");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => {
      toast.error("Erreur lors de la mofication");
    },
  });
};
