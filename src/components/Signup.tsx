import React, { useState } from 'react';
import { UserPlus, User, Lock, Eye, EyeOff, Car as IdCard } from 'lucide-react';
import { User as UserType } from '../App';
// import axios from 'axios';

interface SignupProps {
  existingUsers: UserType[];
  onSignup: (user: UserType) => void;
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ existingUsers, onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmployeeId = (id: string) => {
    const regex = /^[0-9]{4}$/;
    return regex.test(id);
  };

  const validatePassword = (password: string) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(password) && password.length >= 4;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: { [key: string]: string } = {};

    if (!formData.employeeId) {
      newErrors.employeeId = 'Employee ID is required';
    } else if (!validateEmployeeId(formData.employeeId)) {
      newErrors.employeeId = 'Employee ID must be exactly 4 letters';
    } else if (existingUsers.some(u => u.employeeId === formData.employeeId.toUpperCase())) {
      newErrors.employeeId = 'Employee ID already exists';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (existingUsers.some(u => u.username === formData.username)) {
      newErrors.username = 'Username already exists';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be alphanumeric and at least 4 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Create new user
    const newUser: UserType = {
      employeeId: formData.employeeId.toUpperCase(),
      username: formData.username,
      password: formData.password,
      status: true,
      role: 'USER'

    };

    // try{
    // const response = await axios.post('http://localhost:8080/signup', newUser)

    // if (response && response.status === 201 || response.status === 200) {
    //   console.log('User created successfully:', response.data);
    //   onSignup(newUser);
    // } else {
    //   console.error('Failed to create user');
    //   setIsLoading(false);
    // }
    // }
    // catch (error) {
    //   console.error('Error during user creation:', error);
    //   setIsLoading(false);
    //   return;
    // }
    // finally{
    //     setIsLoading(false);
    // }

    onSignup(newUser);
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
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400">Sign up for admin access</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee ID */}
            <div className="relative">
              <label htmlFor="employeeId" className="block text-sm font-medium text-slate-300 mb-2">
                Employee ID <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  maxLength={4}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.employeeId ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  placeholder="4 letters only"
                />
              </div>
              {errors.employeeId && (
                <p className="mt-2 text-sm text-red-400">{errors.employeeId}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">Must be exactly 4 letters</p>
            </div>

            {/* Username */}
            <div className="relative">
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Username <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  placeholder="Enter username"
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-400">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-12 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  placeholder="Alphanumeric password"
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
              <p className="mt-1 text-xs text-slate-500">Must be alphanumeric (letters and numbers only)</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;