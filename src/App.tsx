import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const { t, i18n } = useTranslation();

  const [projetos, setProjetos] = useState<any[]>([]);

  const [theme, setTheme] = useState('blue');

  const toggleTheme = () => {
    if (theme === 'blue') setTheme('red');
    else if (theme === 'red') setTheme('purple');
    else setTheme('blue');
  };

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const q = query(collection(db, "projetos"), orderBy("ordem"));
        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjetos(lista);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    fetchProjetos();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (form.current) {
      emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,   
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  
        form.current, 
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY    
      )
      .then(() => {
          alert(i18n.language === 'pt' ? 'Mensagem enviada com sucesso! 🚀' : 'Message sent successfully! 🚀');
          form.current?.reset(); 
      }, (error) => {
          console.error(error.text);
          alert(i18n.language === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error sending message. Try again.');
      });
    }
  };

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-gray-100 font-sans transition-colors duration-500 theme-${theme}`}>
      
      {/* NAVBAR MINIMALISTA */}
      <header className="flex justify-between items-center p-6 border-b border-gray-800">
        <div className="text-xl font-bold tracking-wider text-primary-500">
          depaula<span className="text-gray-100">.dev</span>
        </div>
        
        <nav className="hidden md:flex gap-8 font-medium text-gray-400">
          <a href="#about" className="hover:text-primary-400 transition-colors">{t('nav_about')}</a>
          <a href="#projects" className="hover:text-primary-400 transition-colors">{t('nav_projects')}</a>
          <a href="#contact" className="hover:text-primary-400 transition-colors">{t('nav_contact')}</a>
        </nav>

        <div className="flex gap-4">
          <button 
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-bold bg-gray-800 hover:bg-gray-700 rounded transition-colors"
          >
            {i18n.language === 'pt' ? 'EN' : 'PT'}
          </button>
          {/* Botão de Tema */}
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 text-sm font-bold border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white rounded transition-colors"
          >
            {t('btn_theme')}
          </button>
        </div>
      </header>

      {/* SESSÃO HERO & SOBRE MIM */}
      <main className="container mx-auto px-6 py-20">
        <section id="about" className="flex flex-col md:flex-row items-stretch gap-16">
          
{/* ENQUADRAMENTO DE FOTO */}
<div className="w-full md:w-1/2 flex justify-center relative items-center py-10">
            
            {/* --- ANÉIS ORBITAIS ANIMADOS --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square flex items-center justify-center pointer-events-none z-0">
              
              {/* Anel Tracejado */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-full max-w-[480px] aspect-square border border-primary-500/40 rounded-full border-dashed"
              />
              
              {/* Anel Sólido Externo  */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute w-[115%] max-w-[550px] aspect-square border border-primary-500/10 rounded-full"
              />
            </div>

            {/* O "Frame" do Enquadramento */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 w-full max-w-[450px] h-full min-h-[500px] rounded-3xl overflow-hidden bg-[#111111]/80 backdrop-blur-sm border border-gray-800 shadow-xl"
            >
              
              {/* Efeito de brilho INTERNO */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-600 rounded-full blur-[120px] pointer-events-none"
              />

              {/* A Foto */}
              <motion.img
                src="/perfil.jpeg"
                alt="Murilo De Paula"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-10 right-0 h-[110%] w-auto object-contain z-10 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
              />

              {/* Gradiente de Fusão */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#111111] to-transparent z-20" />

            </motion.div>
          </div>

          {/* TEXTO SOBRE MIM */}
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-extrabold mb-2 text-white">
              {t('hero_title')}
            </h1>
            <h2 className="text-2xl text-primary-500 mb-8 font-medium">
              {t('hero_subtitle')}
            </h2>
            
            <p className="text-lg text-gray-400 leading-relaxed whitespace-pre-line">
              {t('about_text')}
            </p>
          </div>
          
        </section>

        {/* --- NOVA SESSÃO: PROJETOS --- */}
        <section id="projects" className="py-20 mt-10">
          <h3 className="text-4xl font-extrabold text-white mb-12 flex items-center gap-4">
            {t('nav_projects')}
            <div className="h-1 flex-1 bg-gray-800 rounded-full" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projetos.map((projeto) => (
              <motion.div 
                key={projeto.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[#111111] border border-gray-800 rounded-2xl p-8 hover:border-primary-500/50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold text-gray-100 group-hover:text-primary-400 transition-colors">
                    {projeto.titulo}
                  </h4>
                  <div className="flex gap-3">
                    {projeto.github_url && (
                      <a href={projeto.github_url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                        [GitHub]
                      </a>
                    )}
                  </div>
                </div>

                <h5 className="text-primary-500 font-medium mb-4">
                  {i18n.language === 'pt' ? projeto.subtitulo_pt : projeto.subtitulo_en}
                </h5>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {i18n.language === 'pt' ? projeto.descricao_pt : projeto.descricao_en}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {projeto.tecnologias?.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        {/* --- NOVA SEÇÃO: TECNOLOGIAS --- */}
        <section className="py-20">
          <h3 className="text-4xl font-extrabold text-white mb-12 flex items-center gap-4">
            {t('tech_title')}
            <div className="h-1 w-24 bg-primary-600 rounded-full" />
          </h3>
          
          {/* Grid de Tecnologias */}
          <div className="flex flex-wrap gap-4">
            {['C#', '.NET 8', 'React', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Python', 'Firebase', 'Tailwind CSS'].map(tech => (
              <motion.div 
                key={tech} 
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-6 py-3 bg-[#111111]/80 backdrop-blur-sm border border-gray-800 rounded-lg text-gray-300 font-medium hover:border-primary-500 hover:text-primary-400 transition-colors cursor-default shadow-sm"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- NOVA SEÇÃO: CONTATO --- */}
        <section id="contact" className="py-20 mb-20 flex flex-col md:flex-row gap-16 items-start">
          
          <div className="w-full md:w-1/2">
            <h3 className="text-4xl font-extrabold text-white mb-6">
              {t('contact_title')}
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {i18n.language === 'pt' 
                ? 'Atualmente buscando novas oportunidades e desafios em vagas Full Stack. Sinta-se à vontade para me mandar uma mensagem!'
                : 'Currently looking for new opportunities and challenges in Full Stack positions. Feel free to send me a message!'}
            </p>
            <div className="text-gray-300 flex flex-col gap-2">
              <p>📍 Rio Grande do Sul, BR</p>
              <p>🎓 Ciência da Computação</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-[#111111] p-8 rounded-3xl border border-gray-800 shadow-xl">
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
              <input 
                type="text" 
                name="user_name" 
                required
                placeholder={i18n.language === 'pt' ? 'Seu Nome' : 'Your Name'} 
                className="bg-black/50 border border-gray-800 rounded-xl px-5 py-4 text-gray-100 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all" 
              />
              <input 
                type="email" 
                name="user_email" 
                required
                placeholder={i18n.language === 'pt' ? 'Seu E-mail' : 'Your Email'} 
                className="bg-black/50 border border-gray-800 rounded-xl px-5 py-4 text-gray-100 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all" 
              />
              <textarea 
                rows={5} 
                name="message"
                required
                placeholder={i18n.language === 'pt' ? 'Sua Mensagem' : 'Your Message'} 
                className="bg-black/50 border border-gray-800 rounded-xl px-5 py-4 text-gray-100 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none" 
              />
              <button 
                type="submit" 
                className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] mt-2"
              >
                {i18n.language === 'pt' ? 'Enviar Mensagem' : 'Send Message'}
              </button>
            </form>
          </div>

        </section>
      </main>

    </div>
  );
}

export default App;