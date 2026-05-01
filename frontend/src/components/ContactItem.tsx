import { useDelete } from "../hooks/useDelete";
import type { Contact } from "../types/contact";
type PropItems = {
  contact: Contact;
};
export default function ContactItem({ contact }: PropItems) {
  const { _id, name, email, phone } = contact;
  const { mutate: handleDelete, isPending } = useDelete();
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn btn-warning btn-sm me-2">Edit</button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(_id)}
          disabled={isPending}
        >
          {isPending ? "Suppression..." : "Supprimer"}
        </button>
      </td>
    </tr>
  );
}
