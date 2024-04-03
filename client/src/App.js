import {
  BrowserRouter, 
  Routes,
  Route
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import Home from "./pages/Home";
import './App.css';
function App() {
  return (
    <div className="App">
      <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          </Routes>
</BrowserRouter>
</ChakraProvider>
    </div>
  );
}

export default App;
