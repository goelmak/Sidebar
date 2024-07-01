import { useRecoilValue } from "recoil";
import Item from "./Item";
import { arrState } from "../store/data";

const Sidebar = () => {
  const arr = useRecoilValue(arrState);
  return (
    <div className="flex flex-col">
      {arr.map((item) => {
        return <Item item={item}></Item>;
      })}
    </div>
  );
};
export default Sidebar;
