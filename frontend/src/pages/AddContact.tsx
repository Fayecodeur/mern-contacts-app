import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { contactSchema } from "../validations/contactSchema ";
import { useCreateContact } from "../hooks/useCreateContact";
import { useNavigate } from "react-router-dom";
type formData = z.infer<typeof contactSchema>;

export default function AddContact() {
  const { mutate: createContact, isPending } = useCreateContact();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<formData>({ resolver: zodResolver(contactSchema) });
  const onSubmit = (data: formData) => {
    createContact(data, {
      onSuccess: () => {
        reset();
        navigate("/");
      },
    });
  };
  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3">Ajouter un contact</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-3 shadow-sm">
        {/* Nom */}
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Nom"
          {...register("name")}
        />
        <small className="text-danger"> {errors.name?.message} </small>

        {/* Email */}
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <small className="text-danger"> {errors.email?.message} </small>

        {/* Téléphone */}
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Téléphone"
          {...register("phone")}
        />
        <small className="text-danger"> {errors.phone?.message} </small>

        <button disabled={isPending} className="btn btn-primary w-100">
          {isPending ? "Création..." : "Créer"}
        </button>
      </form>
    </div>
  );
}
