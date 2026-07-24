import React from 'react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "The deep ocean is another world entirely. Standing at 11,000 meters depth changes your perception of life on Earth forever.",
      author: "James Cameron",
      role: "Oceanographer & Deepsea Challenger Pilot",
      depth: "10,908m Hadal Dive"
    },
    {
      quote: "With every meter you descend, human noise fades into complete, sacred stillness. The ocean is the beating heart of our planet.",
      author: "Dr. Sylvia Earle",
      role: "National Geographic Explorer-in-Residence",
      depth: "Deepsea Mission Pioneer"
    },
    {
      quote: "Down in the Hadal Trench, pressure exceeds 1,000 atmospheres. Yet life finds a way to thrive in silence.",
      author: "Capt. Don Walsh",
      role: "Trieste Bathyscaphe Commander",
      depth: "Challenger Deep 1960"
    }
  ];

  return (
    <section 
      id="testimonials" 
      className="relative min-h-[80vh] w-full flex flex-col justify-center items-center px-6 py-28 z-10 select-none"
    >
      <div className="max-w-5xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-300/80 uppercase">
            CHAPTER VIII • VOICES OF THE ABYSS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif-luxury uppercase tracking-wider">
            REFLECTIONS FROM THE DEEP
          </h2>
        </div>

        {/* Minimalist Documentary Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((t, idx) => (
            <div 
              key={t.author}
              className="glass-panel-luxury p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-white/20 transition-all duration-500"
            >
              <p className="text-sm text-slate-200 font-light leading-relaxed italic">
                “{t.quote}”
              </p>

              <div className="pt-4 border-t border-white/5 space-y-1">
                <h4 className="font-bold text-white font-serif-luxury text-base">
                  {t.author}
                </h4>
                <div className="text-[11px] font-mono text-cyan-300/80">
                  {t.role}
                </div>
                <div className="text-[9px] font-mono text-slate-500 uppercase">
                  {t.depth}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
