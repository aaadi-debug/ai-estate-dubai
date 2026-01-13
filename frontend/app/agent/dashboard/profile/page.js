// frontend/app/dashboard/profile/page.js
'use client';

import { useEffect, useState } from 'react';
import { User, Mail, Phone, FileText, Building, Globe, Save, Pencil, Camera } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    bio: '',
    agencyName: '',
    reraNumber: '',
    profilePhoto: '/default-avatar.png', // fallback
  });

  useEffect(() => {
    const agentId = localStorage.getItem('agentId');
    if (!agentId) {
      window.location.href = '/login';
      return;
    }

    fetchProfile(agentId);
  }, []);

  const fetchProfile = async (agentId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/profile/${agentId}`
      );
      if (res.ok) {
        const data = await res.json();
        setProfile({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          whatsappNumber: data.whatsappNumber || '',
          bio: data.bio || '',
          agencyName: data.agencyName || '',
          reraNumber: data.reraNumber || '',
          profilePhoto: data.profilePhoto || '/default-avatar.png',
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const agentId = localStorage.getItem('agentId');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/profile/${agentId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated.agent);
        setIsEditing(false);
        localStorage.setItem('agentName', updated.agent.name);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border">
        {/* Header */}
        <div className="p-8 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-500 mt-1">Manage your personal and professional information</p>
          </div>

          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isEditing
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-secondary hover:bg-secondary/90 text-primary'
            } disabled:opacity-60`}
          >
            {saving ? (
              'Saving...'
            ) : isEditing ? (
              <>
                <Save size={18} /> Save Changes
              </>
            ) : (
              <>
                <Pencil size={18} /> Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left - Photo */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative group">
                <img
                  src={profile.profilePhoto}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-md"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                      <Camera size={18} /> Change Photo
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm text-gray-500">Recommended: 400×400px</p>
            </div>

            {/* Right - Fields */}
            <div className="md:col-span-2 space-y-7">
              {/* Name */}
              <div className="flex gap-4 items-start">
                <User size={24} className="text-gray-500 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                    />
                  ) : (
                    <p className="text-lg font-medium">{profile.name || '—'}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <Mail size={24} className="text-gray-500 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <p className="text-lg text-gray-600">{profile.email}</p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 items-start">
                  <Phone size={24} className="text-gray-500 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                      />
                    ) : (
                      <p className="text-lg">{profile.phone || '—'}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone size={24} className="text-gray-500 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                    {isEditing ? (
                      <input
                        name="whatsappNumber"
                        value={profile.whatsappNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                      />
                    ) : (
                      <p className="text-lg">{profile.whatsappNumber || '—'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="flex gap-4 items-start">
                <FileText size={24} className="text-gray-500 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-none"
                      placeholder="Tell something about yourself..."
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {profile.bio || 'No bio added yet.'}
                    </p>
                  )}
                </div>
              </div>

              {/* Agency & RERA */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 items-start">
                  <Building size={24} className="text-gray-500 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                    {isEditing ? (
                      <input
                        name="agencyName"
                        value={profile.agencyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                      />
                    ) : (
                      <p className="text-lg">{profile.agencyName || '—'}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Globe size={24} className="text-gray-500 mt-1" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">RERA Number</label>
                    {isEditing ? (
                      <input
                        name="reraNumber"
                        value={profile.reraNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                      />
                    ) : (
                      <p className="text-lg">{profile.reraNumber || '—'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}