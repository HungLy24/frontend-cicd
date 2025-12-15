import React from "react";
import ReactDOM from "react-dom/client";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [notes, setNotes] = React.useState([]);
  const [text, setText] = React.useState("");

  const load = async () => {
    const res = await fetch(API + "/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  const add = async () => {
    await fetch(API + "/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    setText("");
    load();
  };

  React.useEffect(() => { load(); }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>React + Node + Mongo</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {notes.map(n => <li key={n._id}>{n.text}</li>)}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
