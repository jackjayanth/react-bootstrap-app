import React, { useState } from "react";

const Home = () => {
  // Sample data
  const [posts, setPosts] = useState([
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ]);

  const [newPost, setNewPost] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Handle adding a new post
  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: Date.now(), title: newPost }]);
      setNewPost("");
    }
  };

  // Handle deleting a post
  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Handle editing a post
  const handleEditPost = (id, title) => {
    setEditingPost(id);
    setEditingTitle(title);
  };

  // Handle saving the edited post
  const handleSaveEdit = () => {
    setPosts(
      posts.map((post) =>
        post.id === editingPost ? { ...post, title: editingTitle } : post
      )
    );
    setEditingPost(null);
    setEditingTitle("");
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4">CRUD on Home Page</h1>

      {/* Add New Post */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="New post title"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddPost}>
          Add Post
        </button>
      </div>

      {/* Display Posts */}
      <ul className="list-group">
        {posts.map((post) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editingPost === post.id ? (
              <>
                <input
                  type="text"
                  className="form-control me-2"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button
                  className="btn btn-success me-2"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {post.title}
                <div>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEditPost(post.id, post.title)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
