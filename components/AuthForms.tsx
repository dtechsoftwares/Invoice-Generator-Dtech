
import React, { useState } from 'react';

interface AuthFormsProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthForms: React.FC<AuthFormsProps> = ({ onLogin, onRegister }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLoginView) {
        await onLogin(email, password);
      } else {
        if (!name) throw new Error("Name is required");
        await onRegister(name, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">
            D
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLoginView ? 'Sign in to DTech' : 'Register Admin Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLoginView ? 'Access your invoice dashboard' : 'Create your secure admin credentials'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLoginView && (
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLoginView}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-t-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white ${isLoginView ? 'rounded-t-md' : ''} focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-b-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-70 transition-colors"
            >
              {isLoading ? 'Processing...' : (isLoginView ? 'Sign in' : 'Register')}
            </button>
          </div>
        </form>
        
        <div className="text-center">
            <button 
                type="button"
                onClick={() => {
                    setIsLoginView(!isLoginView);
                    setError(null);
                }}
                className="text-sm text-brand-orange hover:text-orange-700 font-medium"
            >
                {isLoginView ? "Don't have an account? Register" : "Already have an account? Sign in"}
            </button>
        </div>
      </div>
    </div>
  );
};
