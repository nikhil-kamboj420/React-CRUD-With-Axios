import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/PostApi";
import { Form } from "./Form";
import { BottomBtn } from "./bottomBtn";

export const Posts = () => {
  const [data, setData] = useState([]);
  const getPostData = async () => {
    try {
      const res = await getPosts();
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const filteredData = data.filter((post) => {
          return post.id !== id;
        });
        setData(filteredData);
      }
    } catch (error) {
      console.log("Failed to delete the post:", res.status);
    }
  };

  return (
    <>
      <Form data={data} setData={setData} />
      <ol className="bg-[#171f29] lg:grid grid  lg:grid-cols-3 gap-12 place-content-center items-center">
        {data.map((item) => {
          const { id, title, body } = item;
          return (
            <li key={id} className="li-shadow flex flex-col gap-4">
              <p>{id}</p>
              <p className="text-[1rem]">Title: {title}</p>
              <p className="text-[1rem]">Body: {body}</p>
              <div>
                <button className="btn bg-[#34e2ab]">Edit</button>
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
      <BottomBtn />
    </>
  );
};
