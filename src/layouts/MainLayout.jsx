import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
