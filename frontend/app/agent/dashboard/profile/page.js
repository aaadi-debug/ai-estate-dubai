'use client';

import { useEffect, useState } from 'react';
import { User, Mail, Phone, FileText, Building, Globe, Save, Pencil, Camera, AlertCircle, Loader2, X } from 'lucide-react';
import { IoLogoWhatsapp } from "react-icons/io5";
import Link from 'next/link';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [plan, setPlan] = useState('starter');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    bio: '',
    agencyName: '',
    reraNumber: '',
    profilePhoto: '/default-avatar.png',
  });

  useEffect(() => {
    const agentId = localStorage.getItem('agentId');
    const storedPlan = localStorage.getItem('plan') || 'starter';

    if (!agentId) {
      window.location.href = '/login';
      return;
    }

    setPlan(storedPlan);
    fetchProfile(agentId);
  }, []);

  const fetchProfile = async (agentId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/profile/${agentId}`
      );

      if (!res.ok) throw new Error('Failed to load profile');

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
    } catch (err) {
      console.error(err);
      alert('Failed to load profile');
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

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update');
      }

      const updated = await res.json();
      setProfile(updated.agent || profile);
      setIsEditing(false);
      localStorage.setItem('agentName', updated.agent?.name || profile.name);
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = () => {
    if (plan === 'starter') {
      setShowUpgradeModal(true);
      return;
    }
    alert('Photo upload coming soon! (Cloudinary/S3 integration)');
  };

  const isStarter = plan === 'starter';

  if (loading) {
    return (
      <div className="p-10 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <div className="flex justify-between items-end gap-6  border-b border-gray-300 mb-4 pb-4">
        <div className="">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2 text-primary">My Profile</h1>
          <p className="text-secondary">
            You ca change photo, edit name, add bio, agency name, and do many more things
          </p>
        </div>

        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          disabled={saving}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer ${isEditing
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-secondary hover:bg-secondary/90 text-primary'
            } disabled:opacity-60`}
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving...
            </span>
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

      <div className="p-8 grid md:grid-cols-3 gap-10">
        {/* Left - Photo & Plan Info */}
        <div className="md:col-span-1 flex flex-col items-center space-y-6">
          <div className="relative group">
            <img
              src={
                profile.profilePhoto == '/default-avatar.png' ?
                  'https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80'
                  : profile.profilePhoto
              }
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-lg"
            />
            {isEditing && (
              <button
                onClick={handlePhotoChange}
                className={`absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${isStarter ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
              >
                <div className="bg-white text-gray-800 px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md">
                  <Camera size={18} />
                  Change Photo
                </div>
              </button>
            )}
          </div>

          {/* Plan Badge */}
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Current Plan</div>
            <div className="text-xl font-bold capitalize text-secondary">
              {plan}
              {plan !== 'starter' && <span className="ml-2 text-green-600">Active</span>}
            </div>
            {isStarter && (
              <Link
                href="/pricing"
                className="text-sm text-secondary hover:underline mt-1 block"
              >
                Upgrade for more features
              </Link>
            )}
          </div>
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

          {/* Email (view only) */}
          <div className="flex gap-4 items-start">
            <Mail size={24} className="text-gray-500 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <p className="text-lg text-gray-600">{profile.email || '—'}</p>
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
              <IoLogoWhatsapp size={24} className="text-gray-500 mt-1" />
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

      {/* Upgrade Modal for locked photo upload */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <AlertCircle size={64} className="mx-auto text-amber-600 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Feature Locked</h2>
              <p className="text-gray-700 mb-6">
                Profile photo upload is available on Professional and Elite plans only.
              </p>
              <Link
                href="/pricing"
                className="inline-block bg-secondary text-primary px-8 py-3 rounded-xl font-medium hover:scale-105 transition"
                onClick={() => setShowUpgradeModal(false)}
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}