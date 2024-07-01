import { useEffect, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { useSetRecoilState } from "recoil";
import { arrState } from "../store/data";

const Item = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const setArr = useSetRecoilState(arrState);
  const ref = useClickOutside(() => setClick(false));

  const addItem = (items, itemId, newName) => {
    return items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          content: [
            ...item.content,
            {
              id: Math.floor(Math.random() * 10000000),
              name: newName,
              isFolder: type === "folder",
              content: [],
            },
          ],
        };
      } else if (item.isFolder) {
        return {
          ...item,
          content: addItem(item.content, itemId, newName),
        };
      }
      return item;
    });
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" && name !== "") {
        console.log("name", name);
        setArr((arr) => {
          const updatedArr = addItem([...arr], item.id, name);
          setName("");
          setClick(false);
          setOpen(true);
          return updatedArr;
        });
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [name]);

  const handleAddButton = (e) => {
    setClick((click) => !click);
    e.stopPropagation();
  };

  const handleForm = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      {item.isFolder ? (
        <div ref={ref} className="w-44">
          <div
            key={item.id}
            className="flex flex-row bg-indigo-200 w-44 mb-2 justify-between"
            onClick={() => setOpen((open) => !open)}
          >
            <div>{item.name}</div>
            <button
              className="bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={(e) => {
                setType("file");
                handleAddButton(e);
              }}
            >
              + File
            </button>
            <button
              className="bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
              onClick={(e) => {
                setType("folder");
                handleAddButton(e);
              }}
            >
              + Folder
            </button>
          </div>{" "}
          {click && (
            <input
              className="border rounded w-44 mb-2 focus:outline-none font-sans px-2"
              onChange={handleForm}
              value={name}
            ></input>
          )}
          {open && (
            <div className="px-2">
              {item.content.map((item) => (
                <Item item={item}></Item>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div key={item.id} className="bg-indigo-200 w-44 mb-2">
          {item.name}
        </div>
      )}
    </>
  );
};
export default Item;
