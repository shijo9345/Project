import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFormData(userData);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {

    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-details">
        {!isEditing ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <button onClick={handleEditClick} className="edit-button">Edit</button>
          </>
        ) : (
          <div className="edit-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              Gender:
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
