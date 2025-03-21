
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Dashboard from './pages/Dashboard';
import DriverDashboard from './pages/DriverDashboard';
import OrderDashboard from './pages/OrderDashboard';
import DispatchDashboard from './pages/DispatchDashboard';
import DriverPortal from './pages/DriverPortal';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrderDashboard />} />
          <Route path="/drivers" element={<DriverDashboard />} />
          <Route path="/dispatch" element={<DispatchDashboard />} />
          <Route path="/driver-portal" element={<DriverPortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
