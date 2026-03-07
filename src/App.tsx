import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewAnnouncement from './pages/NewAnnouncement';
import AnnouncementDetails from './pages/AnnouncementDetails';
import EditAnnouncement from './pages/EditAnnouncement'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />        
        <Route path="/new-announcement" element={<NewAnnouncement />} />
        <Route path="/announcement/:id" element={<AnnouncementDetails />} /> 
        <Route path="/edit-announcement/:id" element={<EditAnnouncement />} /> 
      </Routes>
    </BrowserRouter>
  );
}