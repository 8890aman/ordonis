import { Routes, Route, useLocation } from 'react-router-dom'
import AdminDashboard from './components/dashboards/AdminDashboard'
import MembersDashboard from './components/dashboards/MembersDashboard'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<AdminDashboard/>} />
          <Route path="/Admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/Members-dashboard" element={<MembersDashboard/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
