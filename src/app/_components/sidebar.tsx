"use client";

import { api } from "@/trpc/react";
import Link from "next/link";
import { useEffect } from "react";

const Sidebar = () => {
  const { mutate: getCategories, data: categories } =
    api.category.getCategories.useMutation({});

  useEffect(() => {
    getCategories({});
  }, [getCategories]);

  return (
    <>
      {/* Side drawer menu */}
      <div
        className="left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto ">
          <nav>
            <div className="px-10 pb-2">
              <h1 className="text-lg font-bold">Categories</h1>

              <ul className="flex flex-col pb-2 text-gray-200">
                {categories?.map(({ id, name }, index) => {
                  return (
                    <div key={index}>
                      <li>
                        <Link href={`/category/${id}`}>{name}</Link>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
