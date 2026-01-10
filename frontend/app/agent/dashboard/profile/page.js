'use client';
import { useEffect, useState } from 'react';
import { Pencil, Save, User, Mail, Phone, Globe, Building, FileText } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    agency: '',
    reraNumber: '',
    profilePhoto: '', // URL or base64
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data from backend
    const fetchProfile = async () => {
      try {
        const agentId = localStorage.getItem('agentId');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/profile/${agentId}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const agentId = localStorage.getItem('agentId');
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/profile/${agentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setIsEditing(false);
        alert('Profile updated!');
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Update failed');
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="flex gap-6">
        <div className="w-1/3">
          <img
            src={profile.profilePhoto || '/placeholder-avatar.jpg'}
            alt="Profile Photo"
            className="w-full rounded-full"
          />
          {isEditing && (
            <input
              type="file"
              onChange={(e) => {/* Handle photo upload */}}
              className="mt-4"
            />
          )}
        </div>
        <div className="w-2/3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User size={20} />
              {isEditing ? (
                <input name="name" value={profile.name} onChange={handleInputChange} className="border p-2 w-full" />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <p>{profile.email}</p> {/* Email usually not editable */}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={20} />
              {isEditing ? (
                <input name="phone" value={profile.phone} onChange={handleInputChange} className="border p-2 w-full" />
              ) : (
                <p>{profile.phone}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <FileText size={20} />
              {isEditing ? (
                <textarea name="bio" value={profile.bio} onChange={handleInputChange} className="border p-2 w-full" />
              ) : (
                <p>{profile.bio}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Building size={20} />
              {isEditing ? (
                <input name="agency" value={profile.agency} onChange={handleInputChange} className="border p-2 w-full" />
              ) : (
                <p>{profile.agency}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Globe size={20} />
              {isEditing ? (
                <input name="reraNumber" value={profile.reraNumber} onChange={handleInputChange} className="border p-2 w-full" />
              ) : (
                <p>{profile.reraNumber}</p>
              )}
            </div>
          </div>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="mt-6 bg-secondary text-primary py-2 px-4 rounded flex items-center gap-2"
          >
            {isEditing ? <Save size={20} /> : <Pencil size={20} />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}