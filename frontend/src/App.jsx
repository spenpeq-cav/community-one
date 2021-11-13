import React, { useContext } from "react";
import "./sass/index.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import Login from "./pages/login";
import TopNavigation from "./components/TopNavigation";
import { UserContext } from "./context/UserContext";

function PrivateRoute({ isAuthed, children, ...rest }) {
  return isAuthed ? children : <Navigate to="/login" />;
}

function App() {
  const {user} = useContext(UserContext)
  return (
    <div className="App">
      <TopNavigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/details"
          element={
            <PrivateRoute isAuthed={user}>
              <Details />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
