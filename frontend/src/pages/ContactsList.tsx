import { useContacts } from "../hooks/useContacts";
// import { Link } from "react-router-dom";
export default function ContactsList() {
  const { data: contacts, isLoading, error } = useContacts();
  if (isLoading) {
    return <p className="text-center mt-4">Chargement...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-4">Erreur serveur</p>;
  }

  return (
    <section className="py-3 container">
      <div className="d-flex gap-3 mb-3">
        <h4>Liste des contacts</h4>
        <button className="btn btn-primary btn-sm">Ajouter</button>
      </div>
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
