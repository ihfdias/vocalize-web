import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function EditAnnouncement() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await api.get(`/announcements/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
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

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content || content === '<p><br></p>') {
      alert('O conteúdo do comunicado não pode estar vazio.');
      return;
    }

    try {
      await api.put(`/announcements/${id}`, { title, content });
      navigate(`/announcement/${id}`);
    } catch (error) {
      console.error('Error updating announcement:', error);
      alert('Erro ao atualizar o comunicado. Verifique o console.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-xl text-slate-500 dark:text-slate-400">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans py-12 px-6 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-colors duration-300">

        <div className="mb-10 pb-6 border-b border-slate-100 dark:border-slate-700 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Editar Comunicado</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Modifique as informações do comunicado abaixo.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Título do Comunicado
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 dark:text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Conteúdo
            </label>
            <div className="bg-white dark:bg-transparent rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="h-64 mb-12"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-6 mt-8 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={() => navigate(`/announcement/${id}`)}
              className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl transition-all duration-300 ${isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-0.5'
                }`}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}