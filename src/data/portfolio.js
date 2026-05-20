export const portfolioData = {
  pt: {
    root: {
      name: '~',
      type: 'directory',
      children: {
        about: {
          name: 'about.md',
          type: 'file',
          title: 'Oi, eu sou o Gustavo',
          content: 'Prazer! Eu sou o Gustavo, um cara simples que gosta de mexer com muita coisa, ama tecnologia e consegue se interessar por muita coisa diferente. Atualmente sou um Technical Support Engineer na Braze e nas horas vagas estudo o que me dá vontade!',
          learnings: ['Suporte Técnico Especializado', 'Customer Experience (CX)', 'Martech & SaaS B2B', 'Suporte Bilíngue (PT/EN)'],
          tech: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Zendesk']
        },
        experience: {
          name: 'experience',
          type: 'directory',
          children: {
            'braze-support-engineer': {
              name: 'braze-support-engineer.md',
              type: 'file',
              title: 'Technical Support Engineer @ Braze',
              content: 'Responsável por assumir e resolver incidentes complexos de Nível 3, desenhando planos de resposta estratégicos para estabilizar funções críticas da plataforma. Navegação técnica no codebase para realização de data pulls e aplicação de correções de bugs. Arquitetura de melhorias contínuas em fluxos baseados em IA e criação de ferramentas internas de diagnóstico. Atuação direta com Produto fornecendo feedbacks baseados em dados.',
              learnings: ['Resolução de Incidentes Nível 3', 'Automação de Fluxos com IA', 'Navegação em Codebase', 'Ferramentas de Diagnóstico'],
              tech: ['Ruby on Rails', 'Troubleshooting', 'Customer Experience']
            },
            'technical-support-consultant': {
              name: 'technical-support-consultant.md',
              type: 'file',
              title: 'Consultor de Suporte Técnico @ Insider One',
              content: 'Gerencio os processos de suporte para parceiros que utilizam a nossa plataforma. Proporciono experiências de suporte contínuas aos parceiros, tendo Key Accounts dedicadas. Gerencio integrações novas e ajusto as já existentes. Asseguro a comunicação entre os clientes, times de produto e desenvolvimento para alinhamento de demandas.',
              learnings: ['Certificação Técnica CDP', 'Integração Web', 'Gestão de Contas Chave', 'Alinhamento Produto-Desenvolvimento'],
              tech: ['SaaS B2B', 'CDP', 'Integração Web']
            },
            'scrum-master-dev': {
              name: 'fullstack-dev.md',
              type: 'file',
              title: 'Scrum Master & Desenvolvedor Fullstack @ Vínculos',
              content: 'Atuação na plataforma Vínculos, que visa empregar e capacitar pessoas com deficiências sensoriais e motoras.',
              learnings: ['Metodologias Ágeis', 'Scrum', 'Acessibilidade na Tecnologia'],
              tech: ['Fullstack', 'JavaScript', 'React']
            },
            'metro-sp': {
              name: 'metro-sp.md',
              type: 'file',
              title: 'Aprendiz @ Metrô de São Paulo',
              content: 'Experiência inicial no Metrô de São Paulo, desenvolvendo competências profissionais básicas e aprendendo sobre infraestrutura urbana.',
              learnings: ['Desenvolvimento Profissional', 'Infraestrutura Urbana'],
              tech: ['Operações', 'Manutenção']
            }
          }
        },
        education: {
          name: 'education',
          type: 'directory',
          children: {
            'fatec-sp': {
              name: 'fatec-sp.md',
              type: 'file',
              title: 'Bacharelado, Ciência da Computação @ FATEC-SP',
              content: 'Graduação em Ciência da Computação na Faculdade de Tecnologia de São Paulo.',
              learnings: ['Fundamentos de Ciência da Computação', 'Algoritmos', 'Sistemas Operacionais'],
              tech: ['CS', 'Matemática']
            },
            'instituto-proa': {
              name: 'proa.md',
              type: 'file',
              title: 'Engenharia de Software @ Instituto PROA',
              content: 'Curso Profissionalizante focado em desenvolvimento de software e tecnologias modernas.',
              learnings: ['Engenharia de Software', 'Stack Web Moderna', 'Trabalho em Equipe'],
              tech: ['React.js', 'Desenvolvimento']
            }
          }
        },
        projects: {
          name: 'projects',
          type: 'directory',
          children: {
            'second-brain': {
              name: 'second-brain.md',
              type: 'file',
              title: 'Second Brain',
              content: 'Template e framework especializado para construir um sistema de gestão de conhecimento pessoal (PKM) no Obsidian, otimizado para interação com agentes de IA. Organiza a informação em categorias (Second Brain para dados efêmeros e cronológicos, Wiki para conhecimento formal) e suporta ingestão automatizada e síntese de conhecimento.',
              url: 'https://github.com/Gussatt/second-brain',
              learnings: ['Síntese de Conhecimento', 'Automação com IA', 'Design de Sistemas'],
              tech: ['Obsidian', 'Agentes de IA', 'Markdown', 'Bash']
            }
          }
        }
      }
    }
  },
  en: {
    root: {
      name: '~',
      type: 'directory',
      children: {
        about: {
          name: 'about.md',
          type: 'file',
          title: "Hi, I'm Gustavo",
          content: "Nice to meet you! I'm Gustavo, a simple guy who likes to tinker with a lot of things, loves technology, and can get interested in many different topics. I'm currently a Technical Support Engineer at Braze, and in my spare time, I study whatever I feel like!",
          learnings: ['Technical Support Specialist', 'Customer Experience (CX)', 'Martech & B2B SaaS', 'Bilingual Support (PT/EN)'],
          tech: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Zendesk']
        },
        experience: {
          name: 'experience',
          type: 'directory',
          children: {
            'braze-support-engineer': {
              name: 'braze-support-engineer.md',
              type: 'file',
              title: 'Technical Support Engineer @ Braze',
              content: 'Responsible for managing and resolving complex Tier 3 incidents, designing strategic response plans to stabilize critical platform functions. Perform codebase technical navigation for data pulls and bug fixes, reducing technical debt. Architect improvements in AI-driven workflows and create internal diagnostic tools. Partner directly with Product, providing data-driven "front-line" feedback.',
              learnings: ['Tier 3 Incident Resolution', 'AI Workflow Automation', 'Codebase Navigation', 'Internal Tooling'],
              tech: ['Ruby on Rails', 'Troubleshooting', 'Customer Experience']
            },
            'technical-support-consultant': {
              name: 'technical-support-consultant.md',
              type: 'file',
              title: 'Technical Support Consultant @ Insider One',
              content: 'I manage support processes for partners using our platform. Provide continuous support experiences to partners, handling dedicated Key Accounts. Manage new integrations and adjust existing ones. Ensure communication between clients, product teams, and development to align demands.',
              learnings: ['CDP Technical Certification', 'Web Integration', 'Key Account Management', 'Product-Dev Alignment'],
              tech: ['B2B SaaS', 'CDP', 'Web Integration']
            },
            'scrum-master-dev': {
              name: 'fullstack-dev.md',
              type: 'file',
              title: 'Scrum Master & Fullstack Developer @ Vínculos',
              content: 'Worked on the Vínculos platform, which aims to employ and train people with sensory and motor disabilities.',
              learnings: ['Agile Methodologies', 'Scrum', 'Accessibility in Tech'],
              tech: ['Fullstack', 'JavaScript', 'React']
            },
            'metro-sp': {
              name: 'metro-sp.md',
              type: 'file',
              title: 'Apprentice @ Metrô de São Paulo',
              content: 'Initial experience at the São Paulo Metro, developing basic professional skills and learning about urban infrastructure.',
              learnings: ['Professional Development', 'Urban Infrastructure'],
              tech: ['Operations', 'Maintenance']
            }
          }
        },
        education: {
          name: 'education',
          type: 'directory',
          children: {
            'fatec-sp': {
              name: 'fatec-sp.md',
              type: 'file',
              title: 'Bachelor, Computer Science @ FATEC-SP',
              content: 'Bachelor\'s degree in Computer Science at the São Paulo Faculty of Technology.',
              learnings: ['Computer Science Fundamentals', 'Algorithms', 'Operating Systems'],
              tech: ['CS', 'Mathematics']
            },
            'instituto-proa': {
              name: 'proa.md',
              type: 'file',
              title: 'Software Engineering @ Instituto PROA',
              content: 'Vocational course focused on software development and modern technologies.',
              learnings: ['Software Engineering', 'Modern Web Stack', 'Teamwork'],
              tech: ['React.js', 'Development']
            }
          }
        },
        projects: {
          name: 'projects',
          type: 'directory',
          children: {
            'second-brain': {
              name: 'second-brain.md',
              type: 'file',
              title: 'Second Brain',
              content: 'Specialized template and framework for building a personal knowledge management (PKM) system in Obsidian, optimized for interaction with AI agents. It organizes information into categories (Second Brain for ephemeral and chronological data, Wiki for formal knowledge) and supports automated ingestion and knowledge synthesis.',
              url: 'https://github.com/Gussatt/second-brain',
              learnings: ['Knowledge Synthesis', 'AI Automation', 'System Design'],
              tech: ['Obsidian', 'AI Agents', 'Markdown', 'Bash']
            }
          }
        }
      }
    }
  }
};
