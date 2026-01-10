'use client';
import { useState } from 'react';
import { Lock, Bell, Mail, Save } from 'lucide-react';

export default function Settings() {
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [notifications, setNotifications] = useState({ email: true, sms: false }); // Example

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSavePassword = async () => {
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert('Passwords do not match');
      return;
    }
    try {
      const agentId = localStorage.getItem('agentId');
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password/${agentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current: passwordForm.current, new: passwordForm.newPass }),
      });
      if (res.ok) {
        alert('Password updated!');
        setPasswordForm({ current: '', newPass: '', confirm: '' });
      } else {
        alert('Failed to update password');
      }
    } catch (err) {
      console.error('Password update failed:', err);
    }
  };

  const handleSaveNotifications = async () => {
    // Similar fetch to update prefs
    alert('Notifications updated!');
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="space-y-8">
        <div className="p-4 border rounded-lg">
          <h2 className="text-2xl flex items-center gap-2 mb-4"><Lock size={24} /> Security</h2>
          <div className="space-y-2">
            <input name="current" type="password" placeholder="Current Password" value={passwordForm.current} onChange={handlePasswordChange} className="border p-2 w-full" />
            <input name="newPass" type="password" placeholder="New Password" value={passwordForm.newPass} onChange={handlePasswordChange} className="border p-2 w-full" />
            <input name="confirm" type="password" placeholder="Confirm New Password" value={passwordForm.confirm} onChange={handlePasswordChange} className="border p-2 w-full" />
            <button onClick={handleSavePassword} className="bg-secondary text-primary py-2 px-4 rounded flex items-center gap-2">
              <Save size={20} /> Save Password
            </button>
          </div>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-2xl flex items-center gap-2 mb-4"><Bell size={24} /> Notifications</h2>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.email} onChange={() => setNotifications({ ...notifications, email: !notifications.email })} />
            Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.sms} onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })} />
            SMS Alerts
          </label>
          <button onClick={handleSaveNotifications} className="mt-4 bg-secondary text-primary py-2 px-4 rounded flex items-center gap-2">
            <Save size={20} /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}