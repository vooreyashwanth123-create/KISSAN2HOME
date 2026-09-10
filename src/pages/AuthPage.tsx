import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Sprout, ShieldCheck, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  initialRole?: UserRole;
  onSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialRole = 'FARMER', onSuccess }) => {
  const { login, signup } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<UserRole>(initialRole);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signup({
        name: name || 'New Kissan User',
        email: email || `user_${Date.now()}@kissan2home.com`,
        phone: phone || '+91 98765 43210',
        role,
        location: location || 'Pune, Maharashtra'
      });
    } else {
      login(email || 'ramesh.patel@kissan.in', role);
    }
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 border border-gray-100">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-agri-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-agri-600/30">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {isSignUp ? 'Create KISSAN2HOME Account' : 'Login to KISSAN2HOME'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Select your account role to proceed to your dedicated portal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Role selector */}
          <div>
            <label className="block font-extrabold text-slate-700 mb-1">Select Role</label>
            <div className="grid grid-cols-2 gap-2">
              {(['FARMER', 'CUSTOMER', 'DELIVERY', 'ADMIN'] as UserRole[]).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`p-2.5 rounded-xl font-bold text-xs border transition-all ${
                    role === r
                      ? 'bg-agri-700 text-white border-agri-700 shadow-sm'
                      : 'bg-gray-50 text-slate-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {r === 'FARMER' ? '🌾 Farmer' : r === 'CUSTOMER' ? '🛒 Buyer' : r === 'DELIVERY' ? '🚚 Delivery' : '⚡ Admin'}
                </button>
              ))}
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ramesh Patel"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-medium"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email / Mobile Number</label>
            <input
              type="text"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ramesh.patel@kissan.in"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-medium"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Location / District</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Nashik, Maharashtra"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-medium"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-agri-700 hover:bg-agri-800 text-white font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-agri-700/30 transition-all"
          >
            {isSignUp ? 'Create Account & Login' : 'Enter Dashboard'} <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-agri-700 font-bold hover:underline"
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
