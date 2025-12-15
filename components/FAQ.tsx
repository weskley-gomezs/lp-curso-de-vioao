import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "Eu nunca toquei violão, esse curso é para mim?",
    answer: "Com certeza! O Método ViolãoPro foi desenhado especificamente para levar você do zero absoluto até tocar suas primeiras músicas em poucas semanas. Começamos com a postura correta, como segurar o instrumento e exercícios de coordenação motora."
  },
  {
    question: "Preciso ter um violão profissional?",
    answer: "Não. Você pode começar com qualquer violão que tiver em casa, seja de nylon ou aço. Nas primeiras aulas, eu inclusive dou dicas de como escolher ou ajustar seu instrumento se precisar comprar um."
  },
  {
    question: "As aulas são ao vivo ou gravadas?",
    answer: "As aulas são gravadas em alta qualidade (4K) para você assistir quando e onde quiser. Além disso, temos encontros ao vivo mensais para tirar dúvidas e a comunidade VIP para suporte diário."
  },
  {
    question: "Quanto tempo de acesso eu tenho?",
    answer: "Você terá acesso vitalício ao curso! Isso significa que pode fazer no seu próprio ritmo, rever as aulas quantas vezes quiser e ainda receber todas as atualizações futuras gratuitamente."
  },
  {
    question: "E se eu não me adaptar ao método?",
    answer: "Você tem uma garantia incondicional de 7 dias. Se por qualquer motivo achar que o curso não é para você, basta enviar um e-mail e devolvemos 100% do seu dinheiro. O risco é todo nosso."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white relative" id="faq">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-wood-100 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-wood-100 text-wood-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Tire suas Dúvidas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
          <div className="w-20 h-1 bg-wood-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="bg-wood-50 rounded-2xl border border-wood-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-wood-200"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-wood-700' : 'text-gray-800'}`}>
                  {item.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-wood-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-wood-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-wood-200/50 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};