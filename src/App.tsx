import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import emailjs from '@emailjs/browser';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';

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
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 text-sm font-bold border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white rounded transition-colors"
          >
            {t('btn_theme')}
          </button>
        </div>
      </header>

      <main className="w-full relative bg-[#0a0a0a]">
        
        {/* ==========================================
            SESSÃO 1: A NARRATIVA (HERO + SOBRE MIM)
            ========================================== */}
        <div className="relative w-full">
          <div className="sticky top-0 w-full h-screen z-10 overflow-hidden">
            <HeroSection 
              name={t('hero_title')} 
              role={t('hero_subtitle')} 
              tagline="C# · .NET 8 · React · TypeScript" 
            />
          </div>

          <div className="relative z-20 bg-void">
            <AboutSection 
              name={t('hero_title')}
              role={t('hero_subtitle')}
              paragraphs={[t('about_text')]} 
            />
          </div>
        </div>

        <div className="relative z-20 bg-void overflow-hidden border-t border-white/5">
          
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          
          <div className="container mx-auto px-6 relative z-10">
            <section id="projects" className="py-20">
              <h3 className="text-4xl font-extrabold text-white mb-12 flex items-center gap-4">
                {i18n.language === 'pt' ? 'Projetos' : 'Projects'}
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
                    className="relative overflow-hidden bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-primary-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 group backdrop-blur-md"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex justify-between items-start mb-4">
                      <h4 className="text-2xl font-bold text-gray-100 group-hover:text-primary-400 transition-colors">
                        {projeto.titulo}
                      </h4>
                      <div className="flex gap-3">
                        {projeto.github_url && (
                          <a href={projeto.github_url} target="_blank" rel="noreferrer" className="font-mono text-sm text-gray-500 hover:text-primary-400 transition-colors">
                            [GITHUB]
                          </a>
                        )}
                      </div>
                    </div>

                    <h5 className="relative z-10 text-primary-500 font-medium mb-4">
                      {i18n.language === 'pt' ? projeto.subtitulo_pt : projeto.subtitulo_en}
                    </h5>
                    <p className="relative z-10 text-gray-400 mb-8 leading-relaxed text-justify">
                      {i18n.language === 'pt' ? projeto.descricao_pt : projeto.descricao_en}
                    </p>

                    <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                      {projeto.tecnologias?.map((tech: string) => (
                        <span key={tech} className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-mono bg-white/[0.05] border border-white/10 text-gray-300 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="py-20">
              <h3 className="text-4xl font-extrabold text-white mb-12 flex items-center gap-4">
                {t('tech_title')}
                <div className="h-1 w-24 bg-primary-600 rounded-full" />
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {['C#', '.NET 8', 'React', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Python', 'Firebase', 'Tailwind CSS'].map(tech => (
                  <motion.div 
                    key={tech} 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-6 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl text-gray-300 font-mono text-sm hover:border-primary-500 hover:text-primary-400 transition-all cursor-default shadow-sm"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="contact" className="py-20 mb-10 flex flex-col md:flex-row gap-16 items-start">
              <div className="w-full md:w-1/2">
                <h3 className="text-4xl font-extrabold text-white mb-6">
                  {t('contact_title')}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 text-justify">
                  {i18n.language === 'pt' 
                    ? 'Atualmente buscando novas oportunidades e desafios em vagas Full Stack. Sinta-se à vontade para me mandar uma mensagem!'
                    : 'Currently looking for new opportunities and challenges in Full Stack positions. Feel free to send me a message!'}
                </p>
                <div className="text-gray-300 flex flex-col gap-3 font-mono text-sm">
                  <p>📍 Rio Grande do Sul, BR</p>
                  <p>{i18n.language === 'pt' ? '🎓 Ciência da Computação' : '🎓 Computer Science'}</p>
                </div>
              </div>

              <div className="w-full md:w-1/2 bg-white/[0.02] backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6 relative z-10">
                  <input 
                    type="text" 
                    name="user_name" 
                    required
                    placeholder={i18n.language === 'pt' ? 'Seu Nome' : 'Your Name'} 
                    className="bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-gray-100 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-sans" 
                  />
                  <input 
                    type="email" 
                    name="user_email" 
                    required
                    placeholder={i18n.language === 'pt' ? 'Seu E-mail' : 'Your Email'} 
                    className="bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-gray-100 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-sans" 
                  />
                  <textarea 
                    rows={5} 
                    name="message"
                    required
                    placeholder={i18n.language === 'pt' ? 'Sua Mensagem' : 'Your Message'} 
                    className="bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-gray-100 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none font-sans" 
                  />
                  <button 
                    type="submit" 
                    className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] mt-2"
                  >
                    {i18n.language === 'pt' ? 'Enviar Mensagem' : 'Send Message'}
                  </button>
                </form>
              </div>
            </section>
          </div>

          <footer className="relative z-10 border-t border-white/10 bg-black/40 py-8 backdrop-blur-md mt-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm font-mono tracking-tight">
              © {new Date().getFullYear()} Murilo Filheiro de Paula. {i18n.language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
              </p>
              <div className="flex gap-6 font-mono text-sm uppercase tracking-widest">
                <a href="https://github.com/Depaula18" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary-400 transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/murilo-filheiro-de-paula-139748244/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary-400 transition-colors">LinkedIn</a>
                <a href="https://www.instagram.com/murifdepaula/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary-400 transition-colors">Instagram</a>
              </div>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;