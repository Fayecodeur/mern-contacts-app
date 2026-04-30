import type { Contact } from "../types/contact";

type PropItems = {
  contact: Contact;
};
export default function ContactItem({ contact }: PropItems) {
  const { name, email, phone } = contact;
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn btn-warning btn-sm me-2">Edit</button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </td>
    </tr>
  );
}
