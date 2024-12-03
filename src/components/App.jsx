import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Routes from "../routes/Routes";
import { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => (
  <Router>
    <Navigation />
    <Routes />
    <Toaster />
  </Router>
);

export default App;
