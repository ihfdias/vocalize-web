import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  type LoginErrorResponse = {
    message?: string;
  };

  useEffect(() => {
    const token = localStorage.getItem('@Vocalize:token');
    const role = localStorage.getItem('@Vocalize:role');

    if (token && role === 'admin') {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Handle form submission and authentication
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await api.post('/users/login', { email, password });

      // Save credentials to localStorage
      localStorage.setItem('@Vocalize:token', response.data.token);
      localStorage.setItem('@Vocalize:role', response.data.role);

      navigate('/');
    } catch (err) {
      const requestError = err as AxiosError<LoginErrorResponse>;
      setError(requestError.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300 p-6">
      
      {/* Main Login Card */}
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-colors duration-300">

        {/* Logo and Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 mb-4 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 transform rotate-3">
            <span className="text-white font-extrabold text-3xl leading-none">V</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Vocalize</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
            Acesso restrito para administradores
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Error Alert Box */}
          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm text-center font-medium border border-red-100 dark:border-red-500/20">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
              placeholder="admin@vocalize.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 ${
              isSubmitting
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>

        {/* Back to Public Area Section */}
        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 text-center">
          <button
            type="button"
            onClick={async () => {
              await Swal.fire({
                icon: 'info',
                title: 'Área pública',
                text: 'Você será redirecionado para o mural público.',
                confirmButtonColor: '#4f46e5',
              });

              navigate('/');
            }}
            className="group w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-3 px-4 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            {/* Animated SVG Arrow */}
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Voltar para o Mural Público
          </button>
        </div>

      </div>
    </div>
  );
}
