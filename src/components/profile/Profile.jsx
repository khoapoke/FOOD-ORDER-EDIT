import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/login');
      return;
    }
    setUserData(JSON.parse(user));
  }, [navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <div className="info-group">
            <label>Email:</label>
            <span>{userData.email}</span>
          </div>
          <div className="info-group">
            <label>Role:</label>
            <span>{userData.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 