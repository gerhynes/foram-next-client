import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import slugify from "slugify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";

function CategoryEditForm({
  category,
  setCategoryName,
  isCategoryEditFormOpen,
  closeCategoryEditForm
}) {
  // Access global user object
  const { user, setUser } = useContext(UserContext);

  const [newCategoryName, setNewCategoryName] = useState(category.name);

  const updatedCategory = {
    ...category,
    name: newCategoryName,
    slug: slugify(newCategoryName, { lower: true, remove: /[*+~.()'"!:@?]/g }),
    updated_at: new Date().toISOString()
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add headers
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}`,
        updatedCategory,
        config
      )
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.message);
          toast.error("An error occurred. Please try again shortly");
          return;
        }
        setCategoryName(newCategoryName);
        closeCategoryEditForm();
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again shortly");
      });
  };

  return (
    <div
      className={`sticky bottom-0 left-0 px-4 py-4 bg-white w-full border-t-8 border-t-indigo-900 ${
        isCategoryEditFormOpen ? "" : "hidden"
      }`}
    >
      <div className="py-2 text-center">
        <span className="text-lg font-semibold text-indigo-900">
          Edit Category Name
        </span>
      </div>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            name="categoryName"
            id="categoryName"
            type="text"
            className="border-2 border-slate-200 px-2 py-2 w-full"
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-4">
          <button className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition">
            Save
          </button>
          <button
            className="text-slate-400 font-semibold hover:text-red-500"
            onClick={closeCategoryEditForm}
          >
            cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default CategoryEditForm;
