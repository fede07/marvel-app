import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import DetailPage from "./pages/DetailPage"
import HomePage from "./pages/HomePage"

function App() {
  return (
   <Router>
     <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/character/:id" element={<DetailPage />} />
     </Routes>
   </Router>
  )
}

export default App;
