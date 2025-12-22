
import React from 'react';
import { Award, Users, Music, Star } from 'lucide-react';

export const Instructor: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="professor">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-wood-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wood-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute inset-0 bg-wood-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <img 
              src="https://img.freepik.com/fotos-gratis/vista-frontal-de-um-musico-sorridente-tocando-violao-em-casa_23-2148846992.jpg?semt=ais_hybrid&w=740&q=80" 
              alt="Professor Alex tocando violão" 
              className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover border-4 border-white"
            />
            
            {/* Float Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border-l-4 border-wood-500 hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="bg-wood-100 p-2 rounded-full">
                  <Star className="w-6 h-6 text-wood-600 fill-current" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Avaliação Média</p>
                  <p className="text-xl font-bold text-gray-900">4.9/5.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-wood-100 text-wood-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Award className="w-4 h-4" />
              <span>Seu Mentor Nessa Jornada</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Prazer, sou o <span className="text-wood-600">Alex</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Com mais de 15 anos de estrada e palcos, dediquei a última década a simplificar o ensino do violão. Minha missão é provar que você não precisa de "dom", mas sim do método certo.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Já ajudei mais de 2.000 alunos a saírem do zero absoluto e tocarem suas músicas favoritas em rodas de amigos, igrejas e até profissionalmente. Meu método une a teoria musical à prática imediata, sem enrolação.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-wood-500" />
                  <span className="font-bold text-gray-900 text-lg">+2.000</span>
                </div>
                <span className="text-sm text-gray-500">Alunos formados</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <Music className="w-5 h-5 text-wood-500" />
                  <span className="font-bold text-gray-900 text-lg">15 Anos</span>
                </div>
                <span className="text-sm text-gray-500">De experiência musical</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="italic text-wood-700 font-medium">
                "O violão é a extensão da sua alma. Vamos destravá-lo juntos."
              </p>
              <p className="text-gray-400 text-sm mt-2">- Alex</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
