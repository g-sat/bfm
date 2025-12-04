"use client";

const ContactSection = () => {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[#05030F] py-24 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,12,12,0.75),rgba(5,5,5,0.95))]" />
        <div className="pointer-events-none absolute left-1/3 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-[#262626]/40 blur-3xl" />
      </div>

      <div className="relative flex justify-center px-6 md:px-10 lg:px-12">
        <div className="w-full max-w-[420px] rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.55em] text-white/45">Contact me</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">Let&apos;s create resonance</h2>
          </header>

          <form className="mt-8 grid gap-5" noValidate>
            <div className="grid gap-2">
              <label htmlFor="contact-name" className="text-xs uppercase tracking-[0.45em] text-white/45">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Avery Chen"
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#5a5a5a] focus:outline-none focus:ring-0"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.45em] text-white/45">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@brand.com"
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#5a5a5a] focus:outline-none focus:ring-0"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.45em] text-white/45">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Project goals, timeline, vibe..."
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#5a5a5a] focus:outline-none focus:ring-0"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-[#333333]/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.45em] text-white transition hover:bg-[#2a2a2a]/90"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
