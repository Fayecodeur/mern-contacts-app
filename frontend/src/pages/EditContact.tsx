import { useForm } from "react-hook-form";
import { contactSchema } from "../validations/contactSchema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useContact } from "../hooks/useContact";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateContact } from "../hooks/useUpdateContact";

type FormData = z.infer<typeof contactSchema>;

export default function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: contact, isLoading } = useContact(id!);
  const { mutate: updateContact, isPending } = useUpdateContact();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: FormData) => {
    updateContact(
      { id: id!, data },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  useEffect(() => {
    if (contact) {
      reset({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
    }
  }, [contact, reset]);

  if (isLoading)
    return <p className="text-center mt-4">Chargement du contact...</p>;

  return (
    <section className="container py-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3">Modifier un contact</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-3 shadow-sm">
        <input
          className="form-control mb-2"
          placeholder="Nom"
          {...register("name")}
        />
        <small className="text-danger">{errors.name?.message}</small>

        <input
          className="form-control mb-2"
          placeholder="Email"
          {...register("email")}
        />
        <small className="text-danger">{errors.email?.message}</small>

        <input
          className="form-control mb-3"
          placeholder="Téléphone"
          {...register("phone")}
        />
        <small className="text-danger">{errors.phone?.message}</small>

        <button disabled={isPending} className="btn btn-primary w-100">
          {isPending ? "Modification..." : "Modifier"}
        </button>
      </form>
    </section>
  );
}
