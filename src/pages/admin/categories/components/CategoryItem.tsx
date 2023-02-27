import { useState } from "react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";

interface CategoryItem {
  name: string;
  id: string;
  selectThisCategory: () => void;
  onChangeName: (name: string, id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export function CategoryItem({
  name,
  id,
  selectThisCategory,
  onChangeName,
  onDelete,
}: CategoryItem) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);

  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  function handleChangeName() {
    onChangeName(value, id);
    toggleIsEditing();
  }

  return (
    <li>
      <div className="w-full flex justify-between items-center hover:bg-background-light p-1 rounded-sm gap-2">
        {isEditing ? (
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 rounded-sm"
              autoFocus
            />
            <button
              className="px-2 text-white bg-light-blue rounded-md"
              onClick={handleChangeName}
            >
              Editar
            </button>
          </div>
        ) : (
          <div className="flex gap-2 w-full">
            <button
              className="flex-1 text-left"
              onClick={() => selectThisCategory()}
            >
              {name}
            </button>
            <button
              className="hover:bg-background-dark rounded-sm"
              onClick={toggleIsEditing}
            >
              <HiPencil size={24} />
            </button>
            <button
              className="hover:bg-background-dark rounded-sm"
              onClick={() => onDelete(id)}
            >
              <HiOutlineTrash size={24} />
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
