"use client";

import { type Category } from "@prisma/client";
import Link from "next/link";

interface SidebarProps {
  categories: Category[];
}

const Sidebar = ({ categories }: SidebarProps) => {
  return (
    <>
      {/* Side drawer menu */}
      <div className="left-0 top-0 z-40 mr-3 h-screen w-72 -translate-x-full border-r-2 transition-transform sm:translate-x-0">
        <div className="h-full overflow-y-auto">
          <nav>
            <div className="px-10 pb-2 pt-2">
              <h1 className="text-lg font-bold">Categories</h1>

              <ul className="flex flex-col pb-2">
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
