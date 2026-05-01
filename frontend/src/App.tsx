import { Routes, Route } from "react-router-dom";
import ContactsList from "./pages/ContactsList";
import AddContact from "./pages/AddContact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ContactsList />} />
        <Route path="/create" element={<AddContact />} />
      </Routes>
    </>
  );
}

export default App;
