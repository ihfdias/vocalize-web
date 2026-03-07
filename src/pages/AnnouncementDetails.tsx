import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// Definindo a interface com os tipos dos dados que vêm da API
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

export default function AnnouncementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificando a credencial no localStorage para liberar poderes de Admin
  const userRole = localStorage.getItem('@Vocalize:role');

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await api.get(`/announcements/${id}`);
        setAnnouncement(response.data);
      } catch (error) {
        console.error('Error fetching announcement:', error);
        alert('Comunicado não encontrado!');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este comunicado? Esta ação não pode ser desfeita.');
    
    if (confirmDelete) {
      try {
        await api.delete(`/announcements/${id}`);
        navigate('/');
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Erro ao excluir o comunicado.');
      }
    }
  };

  // Tela de loading adaptada para modo claro/escuro
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-xl text-slate-500 dark:text-slate-400">
        Carregando...
      </div>
    );
  }

  if (!announcement) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans py-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Botão de voltar com ícone animado e suporte a dark mode */}
        <button 
          onClick={() => navigate('/')}
          className="group mb-8 inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Voltar para o Mural
        </button>

        {/* Container principal de leitura */}
        <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-slate-100 dark:border-slate-700">
            
            {/* Bloco do Autor (Avatar + Nome + Data) */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                {announcement.authorId.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">
                  {announcement.authorId.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Publicado em {new Date(announcement.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            
            {/* Botões do Admin (Com design soft para não roubar a atenção da leitura) */}
            {userRole === 'admin' && (
              <div className="flex space-x-3 shrink-0">
                <button 
                  onClick={() => navigate(`/edit-announcement/${id}`)}
                  className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Editar
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-5 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                >
                  Excluir
                </button>
              </div>
            )}
          </div>
          
          {/* Título e Texto Principal */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight transition-colors">
            {announcement.title}
          </h1>

          <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed transition-colors">
            {announcement.content}
          </div>
        </div>

      </div>
    </div>
  );
}