import { SignedIn, SignedOut } from "@clerk/clerk-react";
import "./App.css";
import Nav from "./client/components/Nav/Nav";
import ResizableApp from "./client/components/ResizableApp/ResizableApp";
import { StockProvider } from "./client/context/StockContext";
import WelcomePage from "./client/components/WelcomePage/WelcomePage";

function App() {
  return (
    <div className="App">
      <SignedOut>
        <WelcomePage />
      </SignedOut>
      <SignedIn>
        <StockProvider>
          <Nav />
          <ResizableApp />
        </StockProvider>
      </SignedIn>
    </div>
  );
}

export default App;
