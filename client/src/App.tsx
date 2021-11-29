import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LandingPage from "./page/LandingPage";
import UserInfo from "./page/UserInfo";
import ArticlePage from "./page/ArticlePage";
import ArticlesPlan from "./page/ArticlesPlan";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoggedInRoute from "./routes/LoggedInRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoggedInRoute />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        {/* <Route path="/user" element={<ProtectedRoute />}>
          <Route path="/user" element={<UserInfo />} />
        </Route> */}
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<ArticlePage />} />
        </Route>
        <Route path="/article-plans" element={<ProtectedRoute />}>
          <Route path="/article-plans" element={<ArticlesPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
