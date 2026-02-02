import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Header />

            {/* Main content */}
            <main className="flex-grow-1">
                <Outlet /> {/* React Router outlet */}
            </main>

            <Footer />
        </div>
    );
}
