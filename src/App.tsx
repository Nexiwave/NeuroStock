import "./App.css";
import Nav from "./client/components/Nav/Nav";
import ResizableApp from "./client/components/ResizableApp/ResizableApp";
import { StockProvider } from "./client/context/StockContext";

function App() {
  return (
    <div className="App">
      <StockProvider>
        <Nav />
        <ResizableApp />
      </StockProvider>
    </div>
  );
}

export default App;
