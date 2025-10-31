export const HeroSection = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center px-4">
      {/* Container that takes 80% of the screen width */}
      <div className="w-full max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
            Next Generation
            <span className="block">
              Experience
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
            Hover to reveal the layers of innovation that power our platform
          </p>
        </div>

        <div className="mt-16 flex gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold text-lg backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};