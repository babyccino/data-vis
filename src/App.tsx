import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="flex min-h-screen flex-col gap-2">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
