import { BrowserRouter, Routes, Route } from "react-router-dom";
import TesteApi from "../pages/testeApi";
import TestePage from "../pages/testePage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/teste-api"
          element={<TesteApi />}
        />
        <Route
          path="/teste-page"
          element={<TestePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}