import Footer from "../components/Footer/Footer";
import Heading from "../components/Heading/Heading";
import "./Layout.scss";

const MainLayout = ({ children }) => {
  return (
    <div className="main-section">
      <Heading>Discover</Heading>
      <div className="main-container"> {children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
