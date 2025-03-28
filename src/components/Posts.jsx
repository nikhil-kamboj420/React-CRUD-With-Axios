// Import necessary dependencies from React and custom API
import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/PostApi";
import { Form } from "./Form";
import { BottomBtn } from "./bottomBtn";

// Define the Posts component
export const Posts = () => {
  // Initialize state variables for data and update data API
  const [data, setData] = useState([]);
  const [updateDataApi, setupdateDataApi] = useState({});

  // Fetch post data from the API
  const getPostData = async () => {
    try {
      const res = await getPosts();
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch post data when the component mounts
  useEffect(() => {
    getPostData();
  }, []);

  // Handle updating a post
  const handleUpdatePost = (item) => setupdateDataApi(item);

  // Handle deleting a post
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const filteredData = data.filter((post) => post.id !== id);
        setData(filteredData);
      }
    } catch (error) {
      console.log("Failed to delete the post:", res.status);
    }
  };

  // Return the JSX for the component
  return (
    <>
      {/* Render the Form component */}
      <Form
        data={data}
        setData={setData}
        updateDataApi={updateDataApi}
        setupdateDataApi={setupdateDataApi}
      />
      {/* Render an ordered list of posts */}
      <ol className="bg-[#171f29] lg:grid grid  lg:grid-cols-3 gap-12 place-content-center items-center">
        {data.map((item) => {
          const { id, title, body } = item;
          return (
            <li key={id} className="li-shadow flex flex-col gap-4">
              {/* Render the post ID */}
              <p>{id}</p>
              {/* Render the post title */}
              <p className="text-[1rem]">Title: {title}</p>
              {/* Render the post body */}
              <p className="text-[1rem] text-wrap max-w-4xl overflow-x-hidden min-h-24">
                Body: {body}
              </p>
              {/* Render buttons for editing and deleting the post */}
              <div>
                <button
                  className="btn bg-[#34e2ab]"
                  onClick={() => handleUpdatePost(item)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-[#e84c3c]"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      {/* Render the BottomBtn component */}
      <BottomBtn />
    </>
  );
};
