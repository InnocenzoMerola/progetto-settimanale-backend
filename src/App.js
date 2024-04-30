import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MyNav from "./components/MyNav";
import Blog from "./components/Blog";
import DetailPage from "./components/DetailPage";

import Create from "./components/Create";

function App() {
  return (
    <BrowserRouter>
      <MyNav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/create" element={<Create />} />
        <Route path="/posts/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
