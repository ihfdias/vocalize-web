import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: {
    name: string;
    email: string;
  };
}

export default function Dashboard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  
  // State for Dark Mode (starts by checking if the user already chose dark mode before)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('@Vocalize:theme') === 'dark';
  });

  const navigate = useNavigate();
  const userRole = localStorage.getItem('@Vocalize:role');

  // Effect to apply the 'dark' class to the HTML tag whenever the state changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('@Vocalize:theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('@Vocalize:theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleAuthAction = () => {
    if (userRole === 'admin') {
      localStorage.removeItem('@Vocalize:token');
      localStorage.removeItem('@Vocalize:role');
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-50 transition-colors duration-300">
      
      {/* Floating Modern Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30 transform rotate-3">
              <span className="text-white font-bold text-2xl leading-none">V</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Vocalize</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Alternar tema"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={handleAuthAction}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md ${
                userRole === 'admin' 
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white hover:-translate-y-0.5' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5'
              }`}
            >
              {userRole === 'admin' ? 'Sair do Painel Admin' : 'Acesso Restrito'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 transition-colors">
              Mural de Comunicados
            </h2>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
              Acompanhe as últimas atualizações, avisos e notícias importantes da nossa equipe em tempo real.
            </p>
          </div>

          {userRole === 'admin' && (
            <button
              className="group relative inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-1 shrink-0"
              onClick={() => navigate('/new-announcement')}
            >
              <span className="mr-2 text-xl">+</span>
              Novo Comunicado
            </button>
          )}
        </div>

        {/* Grid Layout for Announcements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.length === 0 ? (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400 bg-white dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 transition-colors">
              <p className="text-xl font-medium mt-4">O mural está vazio no momento.</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div 
                key={announcement._id} 
                className="flex flex-col bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/announcement/${announcement._id}`)}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {new Date(announcement.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all transform group-hover:translate-x-1">
                    →
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                  {announcement.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-8 flex-grow leading-relaxed transition-colors">
                  {announcement.content}
                </p>
                
                <div className="pt-6 border-t border-slate-100 dark:border-slate-700 mt-auto flex items-center transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {announcement.authorId.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3 flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      {announcement.authorId.name}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Publicado por
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}