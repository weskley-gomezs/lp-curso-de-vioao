import React from 'react';
import { Music, Zap, Star, Video, Award, Heart, CheckCircle2 } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: 1,
    title: "Método Acelerado 3x",
    description: "Nossa técnica exclusiva de 'Memorização Muscular Ativa' permite que você toque músicas completas em semanas, não anos. Foco total na prática.",
    icon: <Zap className="w-6 h-6 text-white" />
  },
  {
    id: 2,
    title: "Repertório Inteligente",
    description: "Chega de 'Parabéns pra Você'. Aprenda com as músicas que você ama. O sistema adapta os exercícios ao seu gosto musical pessoal.",
    icon: <Music className="w-6 h-6 text-white" />
  },
  {
    id: 3,
    title: "Mentoria Diária VIP",
    description: "Você nunca estará sozinho. Tenha acesso direto ao professor Alex para corrigir sua postura e tirar dúvidas todos os dias da semana.",
    icon: <Heart className="w-6 h-6 text-white" />
  },
  {
    id: 4,
    title: "Produção Cinematográfica",
    description: "Aulas gravadas em 4K com 3 ângulos de câmera simultâneos. Veja exatamente onde colocar cada dedo com clareza cristalina.",
    icon: <Video className="w-6 h-6 text-white" />
  },
  {
    id: 5,
    title: "Certificação Reconhecida",
    description: "Ao concluir os módulos, receba um certificado digital premium para comprovar sua evolução e técnica em todo o território nacional.",
    icon: <Award className="w-6 h-6 text-white" />
  },
  {
    id: 6,
    title: "Networking & Comunidade",
    description: "Entre para o 'Club do Violão'. Uma comunidade de elite para trocar experiências, fazer parcerias musicais e participar de desafios.",
    icon: <Star className="w-6 h-6 text-white" />
  }
];

export const Features: React.FC = () => {
  return (
    // Fixed background to a specific dark wood color because wood-950 wasn't defined
    <section className="py-24 bg-[#1a0f0a] text-white relative overflow-hidden" id="metodo">
       {/* Background Elements - Subtle Texture and Glow */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-wood-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1 mb-6 backdrop-blur-sm shadow-lg">
             <span className="w-2 h-2 rounded-full bg-wood-500 animate-pulse"></span>
             <span className="text-xs font-bold text-wood-300 uppercase tracking-widest">Diferenciais Exclusivos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
            Por que este é o <span className="text-transparent bg-clip-text bg-gradient-to-r from-wood-200 to-wood-500">Último Curso</span> de Violão<br/> que você vai precisar?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Esqueça métodos arcaicos e teoria chata. Aqui focamos no que realmente importa: fazer você tocar com confiança, técnica e emoção.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="group relative bg-[#2a120a] border border-white/10 hover:border-wood-500/50 p-8 rounded-2xl transition-all duration-300 hover:bg-[#351810] hover:-translate-y-2 overflow-hidden shadow-xl hover:shadow-wood-900/50">
              
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-wood-600/0 to-wood-600/0 group-hover:from-wood-600/10 group-hover:to-transparent transition-all duration-500"></div>

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-xl bg-wood-900 border border-wood-700 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-wood-500 transition-all duration-300">
                <div className="absolute inset-0 bg-wood-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="relative text-xl font-bold mb-4 text-wood-50 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="relative text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
              
              {/* Bottom decorative line (Progress indicator metaphor) */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-wood-600 to-wood-400 group-hover:w-full transition-all duration-500 ease-out"></div>
            </div>
          ))}
        </div>

        {/* Bottom Validation Badge */}
        <div className="mt-16 text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl hover:bg-white/10 transition-colors cursor-default">
                <div className="bg-green-500/10 p-2 rounded-full">
                  <CheckCircle2 className="text-green-500 w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="block text-xs text-wood-400 uppercase tracking-wider font-bold">Garantia de Qualidade</span>
                  <span className="block text-sm font-medium text-gray-200">Método testado e validado por <strong className="text-white">+2.000 alunos</strong></span>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
