import { useState, useEffect } from "react";

export const BottomBtn = () => {
  const [isBottom, setIsBottom] = useState(false);

  const goBottom = () => {
    if (!isBottom) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setIsBottom(true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  return (
    <button
      className={`fixed text-6xl bottom-3.5 right-3.5 text-white ${
        isBottom ? "goTop" : ""
      }`}
      onClick={goBottom}
    >
      {isBottom ? "↑" : "↓"}
    </button>
  );
};
