import React, { createContext, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    "Technology",
    "Programming",
    "Web Development",
    "JavaScript",
    "React",
    "Other",
  ]);

  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <BlogContext.Provider
      value={{
        categories,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
