import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LevelDetailPage } from "./pages/LevelDetailPage";
import { LevelListPage } from "./pages/LevelListPage";
import { MistakesPage } from "./pages/MistakesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/levels" element={<LevelListPage />} />
      <Route path="/levels/:id" element={<LevelDetailPage />} />
      <Route path="/mistakes" element={<MistakesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
