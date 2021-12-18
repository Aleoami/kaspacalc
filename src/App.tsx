import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import StoreProvider from "./components/App/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <Home />
    </StoreProvider>
  );
}

export default App;
