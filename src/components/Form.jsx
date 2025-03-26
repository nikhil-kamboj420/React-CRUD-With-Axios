import { useState } from "react";
import { createPost } from "../api/PostApi";

export const Form = ({ data, setData }) => {
  const [inputData, setInputData] = useState({ title: "", body: "" });
  const [error, setError] = useState(null);
  const [id, setId] = useState(101);

  const handleInputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPost({ ...inputData, id });
      if (response.status === 201) {
        setData([...data, { ...inputData, id }]);
        setInputData({ title: "", body: "" });
        setId(id + 1);
      } else {
        setError("Failed to create the post");
      }
    } catch (error) {
      setError("Failed to create the post: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={inputData.title}
          onChange={handleInputData}
        />
        <input
          type="text"
          name="body"
          value={inputData.body}
          onChange={handleInputData}
        />
        <button className="btn bg-[#34e2ab]" type="submit">
          Add
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};
