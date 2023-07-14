import { Routes, Route } from "react-router-dom";
import Heading from "./components/Heading/Heading";
import Topbar from "./components/Topbar/Topbar";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import QuestionWithAnswers from "./pages/QuestionWithAnswers/QuestionWithAnswers";

const App = () => {
  return (
    <div className="main-layout">
      <Heading>Share and Discover.</Heading>
      <div className="pages-layout">
        <Topbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/questions" element={<Main />} />
          <Route path="/questions/:id" element={<QuestionWithAnswers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
