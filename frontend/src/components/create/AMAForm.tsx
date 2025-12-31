"use client";

import { useState } from 'react';
import { Send, MessageCircle, Sparkles, Wand2, Ghost, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AMAForm() {
    const { theme, toggleTheme } = useTheme();
    const [question, setQuestion] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim()) {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setQuestion('');
                setCharCount(0);
            }, 4000);
        }
    };

    return (
        <div className="max-w-[480px] w-full animate-slideUp">
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 group cursor-pointer" onClick={toggleTheme}>
                    <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400 group-hover:scale-125 transition-transform" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400">Interaction Portal</span>
                    <div className="ml-2 pl-2 border-l border-blue-500/20">
                        {theme === 'dark' ? <Sun className="w-3 h-3 text-blue-400" /> : <Moon className="w-3 h-3 text-blue-400" />}
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
                    Direct Line to <span className="bg-[var(--instagram-gradient)] bg-clip-text text-transparent italic">Niyaz</span>
                </h1>
                <p className="text-[var(--secondary)] text-base max-w-[320px] mx-auto leading-relaxed">
                    Have a question about my work or just want to say hi? Drop a line below.
                </p>
            </div>

            <div className="relative">
                <div className={`absolute -inset-1 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-[40px] blur-sm animate-pulse ${theme === 'dark' ? 'opacity-20' : 'opacity-10'}`}></div>

                <div className={`relative glass-card bg-[var(--card)]/90 border-[var(--border)] rounded-[38px] p-8 backdrop-blur-xl transition-all duration-500 ${theme === 'dark'
                        ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                        : 'shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
                    }`}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center gap-3 mb-8">
                            <div className="w-16 h-16 rounded-3xl bg-[var(--instagram-gradient)] flex items-center justify-center p-[2px] shadow-lg transform -rotate-3 transition-transform hover:rotate-0">
                                <div className="w-full h-full bg-[var(--card)] rounded-[22px] flex items-center justify-center">
                                    <MessageCircle className="w-8 h-8 text-[var(--foreground)]" />
                                </div>
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight">Ask me anything!</h2>
                                <p className="text-xs text-[var(--secondary)] font-medium">I'm usually online and ready to chat</p>
                            </div>
                        </div>

                        <div className="relative group">
                            <textarea
                                value={question}
                                onChange={(e) => {
                                    setQuestion(e.target.value);
                                    setCharCount(e.target.value.length);
                                }}
                                placeholder="Type your message here..."
                                className="w-full min-h-[160px] bg-[var(--foreground)]/[0.03] border border-[var(--border)] rounded-3xl p-6 text-[var(--foreground)] text-lg placeholder:text-[var(--secondary)]/40 focus:outline-none focus:ring-2 focus:ring-[#0095f6]/30 focus:border-[#0095f6]/50 transition-all resize-none leading-relaxed"
                                maxLength={280}
                                required
                            />

                            <div className="absolute bottom-4 left-4 flex gap-2">
                                <div className="p-2 rounded-full bg-[var(--foreground)]/5 border border-[var(--border)] text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer" title="Add Emoji">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="absolute bottom-4 right-6 text-[10px] font-mono text-[var(--secondary)]/40 uppercase tracking-tighter">
                                {charCount}/280
                            </div>

                            <div className={`absolute inset-0 bg-[#0095f6] rounded-3xl flex flex-col items-center justify-center transition-all duration-500 z-20 ${isSubmitted ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 rotate-2 pointer-events-none'}`}>
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                    <Send className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white italic">SENT!</h3>
                                <p className="text-white/70 text-sm mt-1">Check back soon for replies</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitted || !question.trim()}
                            className="w-full group relative overflow-hidden bg-[var(--foreground)] text-[var(--background)] font-black text-lg py-5 rounded-[24px] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            <div className="flex items-center justify-center gap-3">
                                <span>Send Message</span>
                                <Wand2 className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                            </div>
                        </button>
                    </form>
                </div>

                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce transform rotate-12 z-20">
                    <Sparkles className="w-6 h-6 text-black" />
                </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
                {['What technologies do you use?', 'Are you open for freelance?', 'Talk about your latest work'].map((tag) => (
                    <button
                        key={tag}
                        onClick={() => {
                            setQuestion(`${tag}`);
                            setCharCount(`${tag}`.length);
                        }}
                        className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--foreground)]/5 text-xs font-semibold text-[var(--secondary)] hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)] transition-all"
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            ` }} />
        </div>
    );
}
