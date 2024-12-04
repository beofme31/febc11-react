import Footer from "@components/Footer";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="todoapp">

      <Header />

      <Outlet context={{ hello: 'world' }} />

      <Footer />

    </div>
  );
}

export default Layout;