// frontend/app/dashboard/settings/page.js
'use client';

import { useState, useEffect } from 'react';
import { Lock, Bell, Mail, Phone, Save, Shield, Eye, EyeOff, MessageSquareText, AlertCircle, X, Trash2 } from 'lucide-react';
import { IoLogoWhatsapp } from "react-icons/io5";
import Link from 'next/link';

export default function SettingsPage() {
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true,
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [savingPassword, setSavingPassword] = useState(false);
  const [savingNotifs, setSavingNotifs] = useState(false);
  const [plan, setPlan] = useState('starter'); // default fallback
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState('');

  // New: For account deletion
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState({
    tooExpensive: false,
    notUseful: false,
    switchingProvider: false,
    other: false,
    otherText: '',
  });
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const agentId = localStorage.getItem('agentId');
    if (!agentId) {
      window.location.href = '/login';
      return;
    }

    // Fetch notifications + plan
    const fetchData = async () => {
      try {
        // Fetch plan from /usage endpoint
        const usageRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/usage/${agentId}`);
        if (!usageRes.ok) throw new Error('Failed to fetch usage');
        const usageData = await usageRes.json();
        setPlan(usageData.plan);

        // Fetch full profile (including notifications)
        const profileRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/profile/${agentId}`);
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();

        // Update notifications if they exist in response
        if (profileData.notifications) {
          setNotifications(profileData.notifications);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
        // Optional: fallback to localStorage plan if fetch fails
        const storedPlan = localStorage.getItem('plan') || 'starter';
        setPlan(storedPlan);
      }
    };

    fetchData();
  }, []);

  const isStarter = plan === 'starter';
  const isProfessional = plan === 'professional';
  const isElite = plan === 'elite';

  const canUseSMS = isProfessional || isElite;
  const canUseWhatsApp = isElite;

  const handlePasswordChange = (e) => {
    setPasswordForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSavePassword = async () => {
    if (passwordForm.new !== passwordForm.confirm) {
      alert("New passwords don't match");
      return;
    }

    if (passwordForm.new.length < 8) {
      alert("New password must be at least 8 characters");
      return;
    }

    setSavingPassword(true);
    const agentId = localStorage.getItem('agentId');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password/${agentId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword: passwordForm.current,
            newPassword: passwordForm.new,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert('Password changed successfully!');
        setPasswordForm({ current: '', new: '', confirm: '' });
      } else {
        alert(data.error || 'Failed to change password');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleNotificationToggle = (type) => {
    if (type === 'sms' && !canUseSMS) {
      setUpgradeMessage('SMS Alerts are available on Professional and Elite plans only.');
      setShowUpgradeModal(true);
      return;
    }
    if (type === 'whatsapp' && !canUseWhatsApp) {
      setUpgradeMessage('WhatsApp Notifications are exclusive to the Elite plan.');
      setShowUpgradeModal(true);
      return;
    }

    // Allowed toggle
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSaveNotifications = async () => {
    setSavingNotifs(true);

    try {
      const agentId = localStorage.getItem('agentId');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/notifications/${agentId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(notifications),
        }
      );

      if (!res.ok) throw new Error('Failed to save');
      alert('Preferences saved!');
    } catch (err) {
      alert('Failed to save preferences');
    } finally {
      setSavingNotifs(false);
    }
  };

  // New: Handle account deletion
  const handleDeleteAccount = async () => {
    setDeleteError('');
    if (!deletePassword) {
      setDeleteError('Please enter your password to confirm.');
      return;
    }

    const selectedReasons = Object.keys(deleteReason).filter(key => deleteReason[key] && key !== 'otherText');
    if (selectedReasons.length === 0 && !deleteReason.otherText) {
      setDeleteError('Please select at least one reason or provide details.');
      return;
    }

    setDeleting(true);
    const agentId = localStorage.getItem('agentId');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents/delete/${agentId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password: deletePassword,
            reason: {
              checkboxes: selectedReasons,
              text: deleteReason.otherText,
            },
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert('Account deletion requested. Check your email for confirmation. You will be logged out.');
        localStorage.clear(); // Clear session
        window.location.href = '/login'; // Redirect to login
      } else {
        setDeleteError(data.error || 'Failed to request deletion');
      }
    } catch (err) {
      setDeleteError('Network error');
    } finally {
      setDeleting(false);
    }
  };

  const handleReasonChange = (key) => {
    setDeleteReason(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderLockedFeature = (featureName, requiredPlan, toggleType) => (
    <div
      className="flex items-center justify-between opacity-60 cursor-not-allowed"
      onClick={() => {
        setUpgradeMessage(`${featureName} is available on ${requiredPlan} plans only.`);
        setShowUpgradeModal(true);
      }}
    >
      <div className="flex items-start gap-3">
        {toggleType === 'sms' ? <Phone size={20} className="mt-1" /> : <IoLogoWhatsapp size={20} className="mt-1" />}
        <div>
          <p className="font-medium">{featureName} Notifications</p>
          <p className="text-sm text-gray-500">
            {toggleType === 'sms'
              ? 'Instant SMS updates for new leads'
              : 'Get instant updates on WhatsApp'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Lock size={18} className="text-amber-600" />
        <span className="text-sm text-amber-700 font-medium">
          {requiredPlan} only
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <div className=" border-b border-gray-300 mb-4 pb-4">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-2 text-primary">Settings & Preferences</h1>
        <p className="text-secondary">
          Enable disable settings and handle preferences
        </p>
      </div>


      <div className="grid md:grid-cols-2 gap-8">
        {/* Security - Change Password */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Lock size={24} className="text-gray-700" />
            Security
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="current"
                  value={passwordForm.current}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none pr-11"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="new"
                  value={passwordForm.new}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none pr-11"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirm"
                  value={passwordForm.confirm}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none pr-11"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSavePassword}
              disabled={savingPassword}
              className="w-full mt-4 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg hover:scale-105 font-medium transition disabled:opacity-60 cursor-pointer"
            >
              {savingPassword ? 'Updating...' : 'Change Password'}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Bell size={24} className="text-gray-700" />
            Notifications
          </h2>

          <div className="space-y-6">
            {/* Email – always available */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-1" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Get updates about new leads and messages</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>

            {/* SMS – Professional & Elite only */}
            {canUseSMS ? (
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Phone size={20} className="mt-1" />
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-gray-500">Receive important updates via SMS</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={() => handleNotificationToggle('sms')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            ) : renderLockedFeature('SMS', 'Professional or Elite', 'sms')}

            {/* WhatsApp – Elite only */}
            {canUseWhatsApp ? (
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <IoLogoWhatsapp size={20} className="mt-1" />
                  <div>
                    <p className="font-medium">WhatsApp Notifications</p>
                    <p className="text-sm text-gray-500">Get instant updates on WhatsApp</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.whatsapp}
                    onChange={() => handleNotificationToggle('whatsapp')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            ) : renderLockedFeature('WhatsApp', 'Elite', 'whatsapp')}

            <button
              onClick={handleSaveNotifications}
              disabled={savingNotifs}
              className="w-full mt-8 bg-secondary hover:bg-secondary/90 text-primary py-3 rounded-lg hover:scale-105 font-medium transition disabled:opacity-60 cursor-pointer"
            >
              {savingNotifs ? 'Saving...' : 'Save Notification Preferences'}
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h3>
        <p className="text-gray-700 mb-6">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition duration-300 cursor-pointer flex items-center gap-2"
        >
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>

      {/* Upgrade Modal for Locked Features */}
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
              <p className="text-gray-700 mb-6">{upgradeMessage}</p>
              <Link
                href="/agent/dashboard/upgrade"
                className="inline-block bg-secondary text-primary px-8 py-3 rounded-xl font-medium hover:scale-105 transition"
                onClick={() => setShowUpgradeModal(false)}
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      )}


      {/* New: Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <Trash2 size={64} className="mx-auto text-red-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Delete Your Account?</h2>
              <p className="text-gray-700">
                This action is irreversible. Your data will be permanently deleted after 30 days.
                Leads, profile, and settings will be lost immediately. Why are you leaving?
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={deleteReason.tooExpensive}
                  onChange={() => handleReasonChange('tooExpensive')}
                  className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-secondary"
                />
                Too expensive
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={deleteReason.notUseful}
                  onChange={() => handleReasonChange('notUseful')}
                  className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-secondary"
                />
                Not useful for my needs
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={deleteReason.switchingProvider}
                  onChange={() => handleReasonChange('switchingProvider')}
                  className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-secondary"
                />
                Switching to another provider
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={deleteReason.other}
                  onChange={() => handleReasonChange('other')}
                  className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-secondary"
                />
                Other
              </label>
              {deleteReason.other && (
                <textarea
                  value={deleteReason.otherText}
                  onChange={(e) => setDeleteReason(prev => ({ ...prev, otherText: e.target.value }))}
                  placeholder="Please provide more details (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                  rows={3}
                />
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
              />
            </div>

            {deleteError && (
              <p className="text-red-600 mb-4 text-center">{deleteError}</p>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:scale-105 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg hover:scale-105 transition disabled:opacity-60 cursor-pointer"
              >
                {deleting ? 'Deleting...' : 'Confirm Deletion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}