import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatWidget } from "../chat/ChatWidget";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
      <Footer />
      <ChatWidget />
    </div>
  );
}
