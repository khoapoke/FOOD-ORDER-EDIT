import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(user);
    setUserData(parsedUser);
    setEditedName(parsedUser.name || '');
    setPreviewImage(parsedUser.profileImage || null);
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const updatedUserData = {
      ...userData,
      name: editedName,
      profileImage: previewImage
    };
    
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(userData.name || '');
    setPreviewImage(userData.profileImage || null);
    setIsEditing(false);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        {!isEditing ? (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-button" onClick={handleSaveProfile}>
              Save Changes
            </button>
            <button className="cancel-button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-image-section">
          <div className="profile-image-container">
            {previewImage ? (
              <img src={previewImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-image-placeholder">
                {userData.name ? userData.name[0].toUpperCase() : userData.email[0].toUpperCase()}
              </div>
            )}
            {isEditing && (
              <div className="image-upload">
                <label htmlFor="image-upload" className="upload-button">
                  Change Photo
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="profile-info">
          <div className="info-group">
            <label>Email:</label>
            <span>{userData.email}</span>
          </div>
          <div className="info-group">
            <label>Role:</label>
            <span>{userData.role}</span>
          </div>
          <div className="info-group">
            <label>Name:</label>
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Enter your name"
                className="name-input"
              />
            ) : (
              <span>{userData.name || 'Not set'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 