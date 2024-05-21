import React from 'react';
import CONSTANTS, { Option } from "@/config/constants";
import { createContext, useContext, useEffect, useState } from "react";

import { getBlogCategories } from "@/api/blog";

type BlogContextType = {
  categories?: readonly Option[]
}

const BlogContext = createContext<BlogContextType>({
  categories: []
});

interface IBlogProviderProps {
  children: React.ReactNode
}

export const BlogProvider = ({children}: IBlogProviderProps) => {
  const [categories, setCategories] = useState<readonly Option[]>([]);

  useEffect(() => {
    getBlogCategories()
      .then((res) => {
        if (res.code === CONSTANTS.SUCCESS) {
          console.log(res.data);
          setCategories(
            res.data!.map((val) => ({ value: val.id, label: val.title }))
          );
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <BlogContext.Provider value={{categories}}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlogContext = () => useContext(BlogContext);