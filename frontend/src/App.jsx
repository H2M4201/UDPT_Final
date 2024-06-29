import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import AuthorProfile from "./pages/AuthorProfile";
import PaperDetails from "./pages/PaperDetails";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/author/:authorId" element={<AuthorProfile />} />
          <Route path="/paper/:paperId" element={<PaperDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
