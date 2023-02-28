import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Layout from "@/Layouts/ServiceLayout";
import { CategoryItem } from "./components/CategoryItem";
import { getAPIClient } from "@/services/axios";
import { api } from "@/services/api";
interface Props {
  existingCategories: Category[];
}

interface Category {
  name: string;
  id: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  name: string;
  id: string;
}

const Categories: NextPageWithLayout<Props> = ({ existingCategories }) => {
  const [categories, setCategories] = useState<Category[]>(existingCategories);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    {} as Category
  );

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubName, setNewSubName] = useState("");

  function handleSelectCategory(id: string) {
    const category = categories.find((category) => category.id === id);

    if (category) {
      setSubcategories([...category.subcategories]);
      setSelectedCategory(category);
    }
  }

  async function updateCategory(category: Category) {
    const response = await api.patch("/categories/update", {
      name: category.name,
      id: category.id,
      subcategories: category.subcategories,
    });
    return response;
  }

  function handleChangeCategoryName(newName: string, id: string) {
    const newCategories = categories;
    const category = newCategories.find((category) => category.id === id);

    if (!category) return;
    category!.name = newName;
    updateCategory(category);
    setCategories([...newCategories]);
  }

  function handleChangeSubcategoryName(newName: string, id: string) {
    const newSubcategories = selectedCategory.subcategories;
    const subCategory = newSubcategories.find((sub) => sub.id === id);

    subCategory!.name = newName;
    updateCategory(selectedCategory);
    setSubcategories([...newSubcategories]);
  }

  async function handleAddCategory() {
    const categoryResponse = await api.post("/categories/create", {
      name: newCategoryName,
      subcategories: [],
    });

    const newCategory: Category = {
      name: newCategoryName,
      id: categoryResponse.data.id,
      subcategories: [],
    };
    setNewCategoryName("");
    setCategories([newCategory, ...categories]);
  }

  async function handleDeleteCategory(id: string): Promise<void> {
    const newCategoriesList = categories.filter(
      (category) => category.id !== id
    );

    await api.delete(`/categories/delete/${id}`);
    setCategories(newCategoriesList);
  }

  async function handleDeleteSubcategory(id: string): Promise<void> {
    const newSubcategoryList = subcategories.filter((sub) => sub.id !== id);
    await api.delete(`/subcategories/delete/${id}`);
    setSubcategories(newSubcategoryList);
  }

  async function handleAddSubcategory() {
    const subcategoryResponse = await api.post("/subcategories/create", {
      name: newSubName,
      category_id: selectedCategory.id,
    });

    const newSubcategory: Subcategory = {
      name: newSubName,
      id: subcategoryResponse.data.id,
    };

    setNewSubName("");
    setSubcategories([newSubcategory, ...subcategories]);
  }

  return (
    <div className="flex flex-col gap-2 p-4 flex-1">
      <h2 className="font-bold text-base-dark text-3xl">Editar categorias</h2>
      <div className="flex flex-1 gap-2">
        <div className="text-base-dark rounded-lg p-2 bg-background-light flex-1 flex flex-col gap-2 items-center">
          <h2 className="font-bold text-xl">Categorias</h2>
          <div className="w-full flex gap-2">
            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              type="text"
              className="px-1 py-0.5 flex-1 rounded-sm text-base "
              placeholder="Nova categoria"
            />
            <button
              className="bg-light-blue px-2 py-1 text-white font-bold rounded-sm"
              onClick={() => handleAddCategory()}
            >
              Adicionar
            </button>
          </div>
          <div className="rounded-md bg-background-white p-1 flex flex-col gap-1 flex-1 w-full">
            <ul className="list-none">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  onChangeName={handleChangeCategoryName}
                  selectThisCategory={() => handleSelectCategory(category.id)}
                  onDelete={handleDeleteCategory}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="text-base-dark rounded-lg p-2 bg-background-light flex-1 flex flex-col gap-2 items-center">
          <h2 className="font-bold text-xl">
            Subcategorias {selectedCategory.name}
          </h2>
          <div className="w-full flex gap-2">
            <input
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
              type="text"
              className="px-1 py-0.5 flex-1 rounded-sm text-base "
              placeholder="Nova subcategoria"
            />
            <button
              className="bg-light-blue px-2 py-1 text-white font-bold rounded-sm"
              onClick={() => handleAddSubcategory()}
            >
              Adicionar
            </button>
          </div>
          <div className="rounded-md bg-background-white p-1 flex flex-col gap-1 flex-1 w-full">
            <ul className="list-none">
              {subcategories.map((subcategory, index) => (
                <CategoryItem
                  key={index}
                  id={subcategory.id}
                  name={subcategory.name}
                  onChangeName={handleChangeSubcategoryName}
                  selectThisCategory={() => {}}
                  onDelete={handleDeleteSubcategory}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="py-4 flex justify-center">
        <button
          className="bg-light-blue px-2 py-1 text-white font-bold rounded-sm"
          onClick={() => console.log(categories)}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

Categories.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Categories;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["@it.point-token"]: token, ["@it.point-user"]: userAsJson } =
    parseCookies(ctx);

  const user = JSON.parse(userAsJson);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/userArea",
        permanent: false,
      },
    };
  }

  const api = getAPIClient(ctx);
  const categoriesResponse = await api.get("/categories");

  return {
    props: {
      existingCategories: categoriesResponse.data,
    },
  };
};
