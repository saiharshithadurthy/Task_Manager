import React, { useState } from 'react';
import { LogIn, User, Lock, Eye, EyeOff } from 'lucide-react';
import { User as UserType } from '../App';
// import credentialsData from '../../credentials.json';

interface LoginProps {
  users: UserType[];
  onLogin: (user: UserType) => void;
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ users, onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: { [key: string]: string } = {};

    if (!formData.employeeId) {
      newErrors.employeeId = 'Employee ID is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user
    const credentialUser = users.find(u =>
      u.employeeId === formData.employeeId.toUpperCase() &&
      u.password === formData.password
    );

    if (credentialUser) {
      // Convert credential user to app user format
      const user: UserType = {
        employeeId: credentialUser.employeeId,
        username: credentialUser.username,
        password: credentialUser.password,
        status: credentialUser.status,
        role: credentialUser.role
      };
      onLogin(user);
    } else {
      setErrors({ general: 'Invalid Employee ID or Password' });
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400">Sign in to your admin account</p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee ID */}
            <div className="relative">
              <label htmlFor="employeeId" className="block text-sm font-medium text-slate-300 mb-2">
                Employee ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.employeeId ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter your Employee ID"
                />
              </div>
              {errors.employeeId && (
                <p className="mt-2 text-sm text-red-400">{errors.employeeId}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-12 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          {/* <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <p className="text-xs text-slate-400 text-center mb-2">Demo Credentials:</p>
            <p className="text-xs text-slate-300 text-center">ID: 6546, Password: Naresh123</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
