import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CreateOrder from "./components/CreateOrder";
import "./styles/app.scss";
import Header from "./components/Header";
import Aside from "./components/Aside";
function App() {
  return (
    <div className="app-container">
      <Aside />
      <div className="main-container">
        <Header />

        <main className="content">
          <CreateOrder />
        </main>
      </div>
      <ToastContainer
        position="bottom-right"
        limit={5}
        autoClose={2000}
        closeOnClick
      />
    </div>
  );
}

export default App;
