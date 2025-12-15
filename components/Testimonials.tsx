import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ricardo Silva",
    role: "Aluno Iniciante",
    image: "https://picsum.photos/100/100?random=1",
    text: "Sempre achei que não tinha dom para música. Em 3 semanas já estava tocando Legião Urbana. O método é incrível!"
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "Nível Intermediário",
    image: "https://picsum.photos/100/100?random=2",
    text: "As aulas de harmonia abriram minha mente. Hoje consigo tirar músicas de ouvido, algo que parecia impossível antes."
  },
  {
    id: 3,
    name: "Pedro Santos",
    role: "Aluno Avançado",
    image: "https://picsum.photos/100/100?random=3",
    text: "Já tocava há 5 anos mas estava estagnado. O curso me ajudou a refinar minha técnica e velocidade. Recomendo demais!"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-wood-50" id="depoimentos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O que nossos alunos dizem</h2>
          <div className="w-24 h-1 bg-wood-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-wood-500 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full mr-4 border-2 border-wood-200" />
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-wood-600">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
