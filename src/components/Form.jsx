// Import necessary hooks and API functions from React and PostApi
import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/PostApi";

// Define the Form component, which accepts data, setData, updateDataApi, and setupdateDataApi as props
export const Form = ({ data, setData, updateDataApi, setupdateDataApi }) => {
  // Initialize state variables for input data, error, and id
  const [inputData, setInputData] = useState({ title: "", body: "" });
  const [error, setError] = useState(null);
  const [id, setId] = useState(101);

  // Handle input data changes
  const handleInputData = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // Update post data
  const updatePostData = async () => {
    try {
      const res = await updatePost(updateDataApi.id, inputData);
      if (res.status === 200) {
        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === res.data.id ? res.data : curElem
          )
        );
        setupdateDataApi({});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
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
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  // Check if the updateDataApi object is empty
  const isEmpty = Object.keys(updateDataApi).length === 0;

  // Update input data state when the updateDataApi prop changes
  useEffect(() => {
    if (updateDataApi) {
      setInputData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
    }
  }, [updateDataApi]);

  return (
    <div className="form-container sticky top-0">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add title"
          value={inputData.title}
          onChange={handleInputData}
        />
        <input
          type="text"
          name="body"
          placeholder="Add body"
          value={inputData.body}
          onChange={handleInputData}
        />
        <button
          className="btn bg-[#34e2ab]"
          type="submit"
          value={isEmpty ? "Add" : "Edit"}
        >
          {isEmpty ? "Add" : "Edit"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};
