import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50/30 to-white">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This is the key change - replaces {children} */}
      </main>
      <Footer />
    </div>
  );
}