import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './pages/ProfilePage/Profile';
import ProfileForm from './pages/ProfileForm/ProfileForm';
import ProfileContext from './context/ProfileContext';
import { useState } from 'react';
import { ProfileData } from './types';
import Navigation from './Components/Navigation';
import NotFoundPage from './pages/NotFondPage/NotFoundPage';
import { ToastContainer } from 'react-toastify';

function App() {
  const [profile, setProfile] = useState<ProfileData>({ id: undefined, name: "", email: "", age: "" });
  return (
    <ProfileContext.Provider value={{profile, setProfile}}>
      <Navigation/>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-form" element={<ProfileForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={3000} position="top-right" />
    </ProfileContext.Provider>
  )
}

export default App
