import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <form className="settings-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New password"
          />
        </div>
        <div className="form-group switch-group">
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings; 