import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Swal from 'sweetalert2';


export default function NewAnnouncement() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content || content === '<p><br></p>') {
      await Swal.fire({
        icon: 'warning',
        title: 'Conteúdo obrigatório',
        text: 'O conteúdo do comunicado não pode estar vazio.',
        confirmButtonColor: '#4f46e5',
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      await api.post('/announcements', { title, content });
      await Swal.fire({
        icon: 'success',
        title: 'Comunicado publicado',
        text: 'O comunicado foi criado com sucesso.',
        confirmButtonColor: '#4f46e5',
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar comunicado:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Falha ao publicar',
        text: 'Erro ao criar o comunicado. Tente novamente.',
        confirmButtonColor: '#4f46e5',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans py-12 px-6 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        
        <div className="mb-10 pb-6 border-b border-slate-100 dark:border-slate-700 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Criar Novo Comunicado</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Redija e publique uma nova mensagem para a equipe.</p>
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
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
              placeholder="Ex: Atualização nos ramais do setor..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Conteúdo
            </label>            
            <div className="bg-white text-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent}
                className="h-64 mb-12" 
                placeholder=""
              />
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-6 mt-8 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl transition-all duration-300 ${
                isSubmitting 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Comunicado'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
