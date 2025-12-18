import { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const register = async () => {
    await api.post("/register", {
      username,
      password,
    });
    alert("Registered!");
  };

  const createPost = async () => {
    await api.post("/posts", {
      title,
      content,
      user_id: 1,
    });
    loadPosts();
  };

  const loadPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>

      <h2>Create Post</h2>
      <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="content" onChange={(e) => setContent(e.target.value)} />
      <button onClick={createPost}>Post</button>

      <h2>Posts</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> — {p.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
