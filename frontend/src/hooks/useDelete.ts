import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContact } from "../api/contactApi";
import toast from "react-hot-toast";

export const useDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      toast.success("Contact supprimé");
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
    onError() {
      toast.success("Erreur lors de la suppréssion");
    },
  });
};
