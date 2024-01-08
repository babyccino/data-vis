import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="flex h-screen flex-col gap-2 overflow-scroll">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
