import Navigation from "./components/Navigation/Navigation";
import Routes from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => (
  <>
    <Navigation />
    <Routes />
    <Toaster />
  </>
);

export default App;
