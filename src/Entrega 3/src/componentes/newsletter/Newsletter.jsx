import React, { useState, useEffect } from 'react'; 
const Newsletter = () => {
  const [email, setEmail] = useState(''); 
  const [notification, setNotification] = useState({ 
    visible: false,
    message: ''
  });


  const handleSubmit = (event) => {
    event.preventDefault(); 
    

    console.log("Email para inscrição:", email); 

 
    setNotification({ visible: true, message: 'Você agora é um inscrito!' });
    
 
    setEmail(''); 
  };


  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification({ visible: false, message: '' });
      }, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [notification]);

  return (
    <section className="py-16 px-4 bg-white relative"> 
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Receba nossas novidades</h2>
        <p className="text-gray-600 mb-8">
          Inscreva-se para receber inspirações criativas e ficar por dentro de tudo que acontece no Instituto Criativo!
        </p>
        
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF254A]"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <button 
            type="submit" 
            className="bg-[#FF254A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e61e43] transition-colors"
          >
            Inscrever
          </button>
        </form>
      </div>

    
      {notification.visible && (
        <div 
   
        
          className={`absolute bottom-[-60px] left-1/2 -translate-x-1/2 mt-4 bg-green-600 text-white py-2 px-5 rounded-md shadow-lg transition-all duration-300 ease-out transform ${notification.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ zIndex: 10 }} 
        >
          {notification.message}
        </div>
      )}
    </section>
  );
};

export default Newsletter;