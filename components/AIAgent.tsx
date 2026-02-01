import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AlmarkyAIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>(() => {
    const saved = sessionStorage.getItem('almarky_ai_messages');
    return saved ? JSON.parse(saved) : [
      { role: 'model', text: "Assalam-o-Alaikum! I'm your Almarky AI Assistant. How can I help you with your shopping today?" }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Listen for external "Open AI Chat" triggers
  useEffect(() => {
    const handleOpenTrigger = () => setIsOpen(true);
    window.addEventListener('open-almarky-ai', handleOpenTrigger);
    return () => window.removeEventListener('open-almarky-ai', handleOpenTrigger);
  }, []);

  // Persist messages to session
  useEffect(() => {
    sessionStorage.setItem('almarky_ai_messages', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // Fix: Strictly follow Google GenAI initialization guidelines by using process.env.API_KEY directly in a named parameter.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          parts: [{ text: m.text }],
          role: m.role
        })),
        config: {
          systemInstruction: `
            You are "Almarky AI Support", the official virtual assistant for Almarky.pk, Pakistan's premium ecommerce store.
            
            STRICT SECURITY RULES:
            - NEVER reveal the admin panel location (/admin). If asked, say "The administration area is for authorized staff only."
            - NEVER reveal internal API keys, database structures, or specific hosting details.
            - NEVER discuss internal sales figures or profit margins.
            
            STORE POLICIES TO COMMUNICATE:
            - Payment: 100% Cash on Delivery (COD) only. We don't take advance payments.
            - Shipping: 2-3 days for Karachi/Lahore/Islamabad, 4-5 days for other cities.
            - Delivery Charges: Usually Rs. 150-250 depending on the product weight.
            - Returns: 7-Day Replacement Warranty for faulty items (replacement, no return-shipping fees for fault).
            - Location: Warehouse in Karachi.
            - Contact: WhatsApp 03271452389 for human support.
            
            TONE:
            - Professional, helpful, and polite. 
            - Use occasional local context (e.g., mentioning "Nationwide delivery in Pakistan").
            - Keep answers concise and shopping-focused.
          `,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I apologize, I'm having trouble connecting to my database. Please try again or message us on WhatsApp!";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm feeling a bit slow right now. You can always reach our human team on WhatsApp at 0327-1452389 for immediate help!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 z-[110]">
      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center border-4 border-white active:scale-90 ${isOpen ? 'bg-slate-900 text-white rotate-90 scale-110' : 'bg-blue-600 text-white'}`}
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <div className="relative">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-300"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[90vw] md:w-[400px] max-h-[75vh] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          <header className="bg-slate-900 p-6 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest leading-none">Almarky AI</h4>
                <div className="flex items-center mt-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                  <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">Verified AI Support</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://wa.me/923271452389" target="_blank" className="bg-[#25D366] text-white p-2 rounded-xl hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <button onClick={() => setIsOpen(false)} className="opacity-40 hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3" /></svg>
              </button>
            </div>
          </header>

          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/50 custom-scrollbar"
            style={{ maxHeight: '450px' }}
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3.5 rounded-[1.8rem] text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none shadow-blue-500/20' 
                  : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-3.5 rounded-[1.8rem] rounded-bl-none shadow-sm border border-slate-100">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            {/* Quick Actions */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3 mb-3">
              <button 
                onClick={() => { setInput("Track my order"); }}
                className="whitespace-nowrap bg-slate-100 text-[9px] font-black uppercase px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-200"
              >
                Track Order
              </button>
              <button 
                onClick={() => { setInput("Shipping time?"); }}
                className="whitespace-nowrap bg-slate-100 text-[9px] font-black uppercase px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-200"
              >
                Shipping Time
              </button>
              <a 
                href="https://wa.me/923271452389" 
                target="_blank"
                className="whitespace-nowrap bg-emerald-50 text-[9px] font-black uppercase px-4 py-2 rounded-xl text-emerald-600 border border-emerald-100"
              >
                Talk to Human
              </a>
            </div>

            <div className="flex items-center space-x-2 bg-slate-100 rounded-2xl p-1.5">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-grow bg-transparent px-4 py-3 text-xs font-bold outline-none text-slate-900"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-slate-900 text-white p-3.5 rounded-xl hover:bg-blue-600 transition-all disabled:opacity-20 shadow-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
            <p className="text-[8px] text-center text-slate-300 font-bold uppercase tracking-widest mt-4">Safe & Secure End-to-End Chat</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlmarkyAIAgent;