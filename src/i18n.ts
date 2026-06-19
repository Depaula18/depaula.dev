import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav_about: "About Me",
      nav_projects: "Projects",
      nav_contact: "Contact",
      hero_title: "Murilo Filheiro de Paula",
      hero_subtitle: "Full Stack Developer",
      about_text: `I am a software developer with 4 years of experience in web development, working as a full stack engineer focused on delivering real business impact through technology.

I have experience with Python, C#, and the .NET ecosystem, building scalable, resilient, and high-performance applications.

Throughout my career, I have been evolving not only technically but also in my ability to understand the product, business context, and strategic priorities.

I believe that code alone does not create value, the key is understanding the right problem. That's why I focus on bridging technology and business, contributing to technical decisions, prioritization, and identifying opportunities to improve operational efficiency and user experience.

I have a collaborative mindset, strong analytical thinking, and a continuous improvement approach, actively contributing to discussions around architecture, product, and system evolution.`,
      tech_title: "Technologies & Tools",
      contact_title: "Get in Touch",
      btn_theme: "Change Theme"
    }
  },
  pt: {
    translation: {
      nav_about: "Sobre Mim",
      nav_projects: "Projetos",
      nav_contact: "Contato",
      hero_title: "Murilo Filheiro de Paula",
      hero_subtitle: "Desenvolvedor Full Stack",
      about_text: `Sou desenvolvedor com 4 anos de experiência em desenvolvimento web, atuando como full stack e focado em gerar impacto real de negócio através da tecnologia.

Tenho experiência com Python, C# e o ecossistema .NET, trabalhando no desenvolvimento de aplicações escaláveis, resilientes e orientadas à performance.

Ao longo da minha trajetória, venho evoluindo não apenas tecnicamente, mas também na capacidade de compreender o produto, o contexto do negócio e suas prioridades estratégicas.

Acredito que código por si só não gera valor, o diferencial está em entender o problema certo. Por isso, atuo conectando tecnologia e negócio, participando de decisões técnicas, priorização de demandas e identificação de oportunidades que aumentem a eficiência operacional e melhorem a experiência do usuário.

Tenho perfil colaborativo, pensamento analítico e foco em melhoria contínua, contribuindo ativamente em discussões de arquitetura, produto e evolução de sistemas.`,
      tech_title: "Tecnologias & Ferramentas",
      contact_title: "Entre em Contato",
      btn_theme: "Mudar Tema"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;