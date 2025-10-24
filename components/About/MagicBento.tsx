import React from 'react';
import AnalogClock from './AnalogClock';

const BentoGrid = () => {
  return (
    <section className="flex items-center justify-center min-h-[70vh] bg-gradient-to-t from-[#1a0017] to-[#0a0a0a] p-8 overflow-hidden relative">
      {/* Subtle cinematic particle background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-gradient-to-r from-[#ff4d4d]/20 to-[#1a0000]/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-6 max-w-[80%] w-full relative z-10 border border-white/10 rounded-3xl p-6 bg-black/30 backdrop-blur-sm">
        {/* Large Hero Card - spans 2 cols + 2 rows */}
        <div className="lg:col-span-4 xl:col-span-6 xl:row-span-1 lg:row-span-2 bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-8 text-white font-inter transition-all duration-500 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#ff4d4d] to-white bg-clip-text text-transparent mb-6 leading-tight drop-shadow-md">
            Hero Feature
          </h2>
          <p className="text-lg lg:text-xl font-light text-white/85 max-w-md leading-relaxed">
            Showcase your main product or service with a stunning visual that captivates and converts.
          </p>
        </div>

        {/* Medium Feature 1 - spans 2 rows */}
        <div className="lg:col-span-4 xl:col-span-4 lg:row-span-3 bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 lg:p-8 text-white font-inter transition-all duration-500 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#ff4d4d] to-white bg-clip-text text-transparent mb-4 drop-shadow-sm">Feature 1</h3>
          <p className="text-base font-light text-white/85 leading-relaxed">
            Highlight key aspects with elegant typography and smooth interactions.
          </p>
        </div>

        {/* Small Stat 1 */}
        <div className="bg-white/5 lg:col-span-2 backdrop-blur-xl border border-white/15 rounded-3xl p-6 text-white font-inter transition-all duration-500 shadow-xl hover:-translate-y-1 hover:shadow-xl hover:bg-white/15 hover:scale-[1.02]">
          <h3 className="text-xl font-bold text-white/90 mb-2 drop-shadow-sm">Quick Stat</h3>
          <p className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-[#ff4d4d] to-white bg-clip-text text-transparent">50K+</p>
          <p className="text-xs font-light text-white/75 uppercase tracking-wider mt-1">Users</p>
        </div>

        {/* Small Stat 2 */}
        <div className="bg-white/5 lg:col-span-2 lg:row-span-2 backdrop-blur-xl border border-white/15 rounded-3xl p-6 text-white font-inter transition-all duration-500 shadow-xl hover:-translate-y-1 hover:shadow-xl hover:bg-white/15 hover:scale-[1.02]">
          <h3 className="text-xl font-bold text-white/90 mb-2 drop-shadow-sm">Quick Stat</h3>
          <p className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-[#ff4d4d] to-white bg-clip-text text-transparent">99%</p>
          <p className="text-xs font-light text-white/75 uppercase tracking-wider mt-1">Uptime</p>
        </div>

        {/* Medium Feature 2 - spans 2 rows */}
        <div className="lg:col-span-4 xl:col-span-4 lg:row-span-2 bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 lg:p-8 text-white font-inter transition-all duration-500 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#ff4d4d] to-white bg-clip-text text-transparent mb-4 drop-shadow-sm">Feature 2</h3>
          <p className="text-base font-light text-white/85 leading-relaxed">
            Engage users with interactive elements and cinematic transitions.
          </p>
        </div>

        {/* Small Stat 2 */}
        <div className="bg-white/5 lg:col-span-2 lg:row-span-2 backdrop-blur-xl border border-white/15 rounded-3xl p-6 text-white font-inter transition-all duration-500 shadow-xl hover:-translate-y-1 hover:shadow-xl hover:bg-white/15 hover:scale-[1.02]">
          <h3 className="text-xl font-bold text-white/90 mb-2 drop-shadow-sm">Quick Stat</h3>
          <p className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-[#ff4d4d] to-white bg-clip-text text-transparent">99%</p>
          <p className="text-xs font-light text-white/75 uppercase tracking-wider mt-1">Uptime</p>
        </div>

        {/* Large CTA Card - spans remaining space */}
        <div className="lg:col-span-8 xl:col-span-8 lg:row-span-2 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 lg:p-10 text-white font-inter transition-all duration-500 shadow-2xl hover:-translate-y-3 hover:bg-white/10 hover:border-white/30">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white to-[#ff4d4d] bg-clip-text text-transparent mb-6 leading-tight drop-shadow-lg">Call to Action</h2>
          <p className="text-xl lg:text-2xl font-light text-white/90 mb-8 max-w-lg leading-relaxed drop-shadow-sm">
            Join now and experience the future of innovation.
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-[#ff4d4d] to-[#cc0000] text-xl font-bold rounded-2xl shadow-xl hover:shadow-[0_15px_30px_rgba(255,77,77,0.4)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-white/20 backdrop-blur-sm">
            Get Started
          </button>
        </div>
        {/* Small Stat 2 */}
        <div className="bg-white/5 lg:col-span-4 lg:row-span-2 backdrop-blur-xl border border-white/15 rounded-3xl p-6 text-white font-inter transition-all duration-500 shadow-xl hover:-translate-y-1 hover:shadow-xl hover:bg-white/15 hover:scale-[1.02]">
          <AnalogClock />
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;