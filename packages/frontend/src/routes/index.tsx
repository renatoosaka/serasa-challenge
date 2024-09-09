import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Default } from "../layouts/default";
import { Home } from "../pages/home";
import { ProducersHome } from "../pages/producers";
import { ProducersShow } from "../pages/producers/show";
import { ProducersNew } from "../pages/producers/new";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Default />}>
          <Route path="/" element={<Home />} />
          <Route path="/producers" element={<ProducersHome />} />
          <Route path="/producers/new" element={<ProducersNew />} />
          <Route path="/producers/:id" element={<ProducersShow />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
