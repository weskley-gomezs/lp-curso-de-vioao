import { useState } from 'react';
import { Guitar } from './components/Guitar';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Instructor } from './components/Instructor';
import { FAQ } from './components/FAQ';
import { BackgroundMusic } from './components/BackgroundMusic';
import { CheckCircle, Phone, ArrowRight, Music2, Facebook, Instagram, Youtube, Maximize2, X } from 'lucide-react';

const WHATSAPP_NUMBER = "5511999999999"; // Replace with real number
const WHATSAPP_MSG = "Olá! Gostaria de saber mais sobre as aulas de violão.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

function App() {
  const [isGuitarModalOpen, setIsGuitarModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-wood-50">
      
      {/* Background Ambience Music */}
      <BackgroundMusic />
      
      {/* Sophisticated Floating Navbar */}
      <div className="fixed top-0 w-full z-50 px-4 py-4 md:py-6 flex justify-center">
        <nav className="w-full max-w-6xl bg-[#1a0f0a]/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between transition-all duration-300 hover:bg-[#1a0f0a]/95 ring-1 ring-black/5">
           
           {/* Logo Area */}
           <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-wood-400 to-wood-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                <Music2 size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-wide leading-none">
                  VIOLÃO<span className="text-wood-400">PRO</span>
                </span>
                <span className="text-[10px] text-wood-300 uppercase tracking-[0.2em] leading-none mt-1">
                  Premium Class
                </span>
              </div>
           </div>

           {/* Desktop Navigation */}
           <div className="hidden md:flex items-center gap-1">
              {[
                { name: 'Início', href: '#inicio' },
                { name: 'Método', href: '#metodo' },
                { name: 'O Professor', href: '#professor' },
                { name: 'Depoimentos', href: '#depoimentos' },
              ].map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="px-5 py-2 text-xs font-bold text-wood-100 hover:text-white uppercase tracking-widest hover:bg-white/5 rounded-full transition-all duration-300"
                >
                  {item.name}
                </a>
              ))}
           </div>

           {/* CTA Button */}
           <div className="flex items-center gap-4">
             <a 
               href={WHATSAPP_LINK}
               target="_blank"
               rel="noopener noreferrer"
               className="hidden md:flex items-center gap-2 bg-gradient-to-r from-wood-500 to-wood-600 hover:from-wood-400 hover:to-wood-500 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-wood-500/20 transition-all transform hover:-translate-y-0.5 border border-white/10"
             >
               <Phone size={14} />
               <span>Agendar Aula</span>
             </a>
             
             {/* Mobile Menu Icon Placeholder */}
             <a href={WHATSAPP_LINK} className="md:hidden text-wood-100 p-2">
                <Phone size={24} />
             </a>
           </div>
        </nav>
      </div>

      {/* Hero Section - Increased padding for floating nav */}
      <section id="inicio" className="pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-wood-50 relative">
        {/* Decorative background elements for Hero */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-wood-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Copy */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-wood-100 rounded-full shadow-sm mb-8 animate-fade-in-up">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-wood-800 uppercase tracking-wider">Vagas Abertas para Outubro</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
                Domine a arte do <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wood-600 to-wood-800">
                  Violão Clássico
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Aprenda com o professor Alex em um método validado por milhares de alunos. Da postura inicial aos arranjos complexos, no seu tempo.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href={WHATSAPP_LINK} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-wood-900 hover:bg-wood-800 text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 7 dias de garantia
                </span>
              </div>
            </div>

            {/* Interactive Guitar Wrapper */}
            <div className="relative perspective-1000">
               {/* Decorative background blobs */}
               <div className="absolute -top-20 -right-20 w-72 h-72 bg-wood-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse-slow"></div>
               <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
               
               {/* Desktop: Show Guitar Directly */}
               <div className="hidden lg:block relative bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] shadow-2xl border border-white/50 transform rotate-1 transition-transform duration-500 hover:rotate-0">
                 <div className="absolute -top-3 -right-3 bg-wood-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg z-30 tracking-widest uppercase">
                    Toque as cordas
                 </div>
                 <h3 className="text-center font-bold text-wood-300 text-xs mb-4 uppercase tracking-[0.3em]">Simulador Interativo</h3>
                 <Guitar />
               </div>

               {/* Mobile: Show Launcher Card */}
               <div className="lg:hidden relative bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-2xl border border-white/50 text-center">
                  <div className="w-20 h-20 bg-wood-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Music2 className="w-10 h-10 text-wood-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Simulador de Violão</h3>
                  <p className="text-gray-500 text-sm mb-6">Experimente tocar agora mesmo no seu celular sem sair da página.</p>
                  <button 
                    onClick={() => setIsGuitarModalOpen(true)}
                    className="w-full py-4 bg-wood-600 text-white rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-wood-700 transition-all shadow-lg active:scale-95"
                  >
                    <Maximize2 className="w-5 h-5" />
                    Abrir Simulador
                  </button>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Instructor Section (New) */}
      <Instructor />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* About Instructor/CTA Strip */}
      <section className="bg-wood-900 py-24 text-white relative overflow-hidden">
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Sua jornada musical começa aqui</h2>
          <p className="text-wood-200 text-xl mb-10 font-light max-w-2xl mx-auto">
            Não deixe para depois o sonho que você pode começar a realizar hoje. Fale diretamente com o Alex e tire suas dúvidas.
          </p>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-white text-wood-900 font-bold text-sm uppercase tracking-widest rounded-full shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            <Phone className="w-5 h-5 mr-3" />
            Chamar no WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a0f0a] text-gray-400 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-wood-800 p-2 rounded-lg">
                   <Music2 className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl text-white tracking-wide">ViolãoPro</span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
                Uma escola focada em resultados práticos e na paixão pela música. Junte-se a nossa comunidade e descubra seu potencial.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Menu</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#inicio" className="hover:text-wood-400 transition-colors">Início</a></li>
                <li><a href="#metodo" className="hover:text-wood-400 transition-colors">Método</a></li>
                <li><a href="#professor" className="hover:text-wood-400 transition-colors">Professor</a></li>
                <li><a href="#depoimentos" className="hover:text-wood-400 transition-colors">Depoimentos</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Conecte-se</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-wood-600 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-wood-600 hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-wood-600 hover:text-white transition-all"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-16 pt-8 text-xs text-center text-gray-600 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} ViolãoPro. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button (Mobile) */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:hidden z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors animate-bounce"
        aria-label="Fale conosco no WhatsApp"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Mobile Guitar Modal */}
      {isGuitarModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in-up">
          <button 
            onClick={() => setIsGuitarModalOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-wood-100 mb-2">Modo Interativo</h3>
            <p className="text-gray-400 text-sm">Toque nas cordas para ouvir</p>
          </div>

          <div className="w-full max-w-lg">
             <Guitar />
          </div>

          <button 
            onClick={() => setIsGuitarModalOpen(false)}
            className="mt-8 px-8 py-3 bg-wood-600 text-white rounded-full font-bold uppercase tracking-wider text-sm shadow-lg hover:bg-wood-500"
          >
            Fechar Simulador
          </button>
        </div>
      )}

    </div>
  );
}

export default App;