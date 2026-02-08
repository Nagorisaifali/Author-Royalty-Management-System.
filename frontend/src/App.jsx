
import { useState } from "react";
import AuthorsList from "./components/AuthorsList";
import AuthorDetails from "./components/AuthorDetails";

export default function App() {
  const [authorId, setAuthorId] = useState(null);

  return (
    <div className="container">
      <h1>📚 Author Royalty Dashboard</h1>

      <div className="grid">
        <AuthorsList setAuthorId={setAuthorId} />
        {authorId && <AuthorDetails authorId={authorId} />}
      </div>
    </div>
  );
}
