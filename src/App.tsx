import { RecoilRoot } from "recoil";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <RecoilRoot>
      <Sidebar />
    </RecoilRoot>
  );
};
export default App;
