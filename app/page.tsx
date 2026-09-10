"use client";

import { useEffect, useState } from "react";

const services = [
  { icon: "✦", title: "AI Agent", text: "Agent AI yang dapat membantu pekerjaan rutin, membaca data, membuat ringkasan, dan menjalankan workflow bisnis." },
  { icon: "◫", title: "Custom Application", text: "Dashboard dan aplikasi web yang dibangun sesuai alur kerja bisnis, bukan template generik." },
  { icon: "↗", title: "Business Automation", text: "Hubungkan proses operasional agar input data, laporan, dan pekerjaan berulang berjalan lebih cepat." },
  { icon: "⌁", title: "Messaging Integration", text: "Integrasi Telegram dan kanal komunikasi lain untuk notifikasi, input data, serta workflow otomatis." },
  { icon: "▦", title: "Data & Dashboard", text: "Data terstruktur, dashboard interaktif, laporan, grafik, pencarian, dan pengelolaan informasi." },
  { icon: "◎", title: "AI Integration", text: "Integrasikan model AI ke aplikasi internal untuk analisis, OCR, dokumen, customer support, dan proses lainnya." },
];

const workflow = ["Kebutuhan", "Desain sistem", "Development", "Launch & improve"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("show")),
      { threshold: 0.12 }
    );
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const text = "Analisis data → buat keputusan → jalankan workflow otomatis";
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 38);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="bg-grid pointer-events-none fixed inset-0 -z-20" />
      <div className="pointer-events-none fixed left-[-120px] top-[18%] -z-10 h-[360px] w-[360px] rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="pointer-events-none fixed right-[-100px] top-[45%] -z-10 h-[320px] w-[320px] rounded-full bg-violet-500/15 blur-[100px]" />

      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 shadow-2xl shadow-black/10">
          <a href="#top" className="flex items-center gap-3 font-black tracking-[.08em]">
            <span className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-gradient-to-br from-blue-400 to-violet-500 shadow-lg shadow-blue-500/20">
              <span className="h-4 w-4 rounded-full border-2 border-white" />
              <span className="absolute right-[6px] h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <span>AIORBITLAB</span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-400 md:flex">
            <a className="transition hover:text-white" href="#services">Layanan</a>
            <a className="transition hover:text-white" href="#workflow">Cara Kerja</a>
            <a className="transition hover:text-white" href="#projects">Project</a>
            <a className="transition hover:text-white" href="#contact">Kontak</a>
          </div>

          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 sm:block">Mulai Project</a>
            <button onClick={() => setMenuOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden" aria-label="Menu">
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="glass mx-auto mt-2 grid max-w-7xl gap-1 rounded-2xl p-3 text-sm font-semibold md:hidden">
            {[["Layanan", "#services"], ["Cara Kerja", "#workflow"], ["Project", "#projects"], ["Kontak", "#contact"]].map(([label, href]) => (
              <a key={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 hover:bg-white/5" href={href}>{label}</a>
            ))}
          </div>
        )}
      </header>

      <section id="top" className="mx-auto grid min-h-[780px] max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
        <div className="reveal">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-400 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,.8)]" />
            AI SYSTEMS FOR MODERN BUSINESS
          </div>
          <h1 className="max-w-4xl text-[clamp(3.2rem,8vw,6.8rem)] font-black leading-[.92] tracking-[-.065em]">
            Build smarter. <span className="gradient-text">Move faster.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Kami membangun AI Agent, aplikasi custom, dan automasi yang membantu bisnis bekerja lebih cepat, lebih rapi, dan lebih terukur.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 text-center font-extrabold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1">Bangun Sistem AI →</a>
            <a href="#projects" className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center font-extrabold backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10">Lihat Project</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            <span>✓ Custom workflow</span><span>✓ Responsive</span><span>✓ Scalable system</span>
          </div>
        </div>

        <div className="reveal relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="pulse-ring absolute inset-[8%] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="spin-slow absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-300/10 max-sm:h-[310px] max-sm:w-[310px]" />
          <div className="glass glow relative overflow-hidden rounded-[30px] p-1">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-xs text-slate-500">
              <span className="flex gap-2"><i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" /></span>
              <span>AI Command Center</span>
              <span className="text-emerald-300">● LIVE</span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-sm leading-6">
                <span className="text-blue-300">AI › </span>
                <span className="text-slate-300">{typed}</span><span className="animate-pulse text-blue-300">|</span>
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  ["01", "Read incoming data", "Completed"],
                  ["02", "Classify & analyze", "Running"],
                  ["03", "Generate action", "Ready"],
                ].map(([n, title, status], i) => (
                  <div key={title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-3.5 transition hover:translate-x-1 hover:bg-white/[.07]">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500/25 to-violet-500/20 text-xs font-black text-blue-200">{n}</span>
                    <div className="min-w-0 flex-1"><strong className="block truncate text-sm">{title}</strong><span className="text-xs text-slate-500">Automated workflow</span></div>
                    <span className={`text-xs font-bold ${i === 1 ? "text-blue-300" : "text-emerald-300"}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="float-a glass absolute -left-3 top-20 rounded-2xl px-4 py-3 text-xs shadow-2xl sm:-left-8"><strong className="block text-lg text-white">24/7</strong><span className="text-slate-500">AI workflow</span></div>
          <div className="float-b glass absolute -right-2 bottom-16 rounded-2xl px-4 py-3 text-xs shadow-2xl sm:-right-6"><strong className="block text-lg text-white">Fast</strong><span className="text-slate-500">Automation</span></div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-white/[.02] py-4 text-xs font-black uppercase tracking-[.24em] text-slate-500">
        <div className="shimmer whitespace-nowrap bg-gradient-to-r from-transparent via-white/10 to-transparent px-5 text-center">AI Agent · Automation · Next.js · TypeScript · React · Tailwind CSS · Dashboard · Integration</div>
      </div>

      <section id="services" className="mx-auto max-w-7xl px-5 py-24">
        <div className="reveal mb-12 grid gap-5 lg:grid-cols-2 lg:items-end">
          <div><p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-blue-300">Capabilities</p><h2 className="text-4xl font-black tracking-[-.045em] sm:text-6xl">Teknologi yang benar-benar bekerja.</h2></div>
          <p className="max-w-xl leading-7 text-slate-400 lg:justify-self-end">Bukan sekadar demo AI. Sistem dirancang mengikuti kebutuhan operasional dan dapat dikembangkan seiring bisnis bertumbuh.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <article key={service.title} className="reveal group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[.045] p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/[.075]">
              <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-violet-500/20" />
              <span className="text-xs font-black text-slate-600">0{i + 1}</span>
              <div className="my-7 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-xl">{service.icon}</div>
              <h3 className="text-xl font-extrabold">{service.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-5 py-24">
        <div className="reveal mb-12 max-w-3xl"><p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-blue-300">Workflow</p><h2 className="text-4xl font-black tracking-[-.045em] sm:text-6xl">Dari masalah bisnis menjadi sistem yang jalan.</h2></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item, i) => (
            <div key={item} className="reveal rounded-[26px] border border-white/10 bg-white/[.045] p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-black">0{i + 1}</span>
              <h3 className="mt-10 text-xl font-extrabold">{item}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">{i === 0 ? "Petakan proses dan bagian yang bisa dipercepat." : i === 1 ? "Susun UI, data, AI, dan automation flow." : i === 2 ? "Bangun sistem dengan stack modern dan terukur." : "Deploy, evaluasi, lalu kembangkan fitur berikutnya."}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-24">
        <div className="reveal mb-12"><p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-blue-300">Selected Systems</p><h2 className="text-4xl font-black tracking-[-.045em] sm:text-6xl">Contoh sistem yang bisa dibangun.</h2></div>
        <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <div className="reveal relative min-h-[390px] overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-blue-500/15 via-white/[.035] to-violet-500/10 p-7">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-400">Operations</span>
            <div className="absolute right-[-70px] top-14 h-64 w-80 rotate-[-7deg] rounded-[26px] border border-white/10 bg-slate-950/70 p-5 shadow-2xl transition duration-500 hover:rotate-[-2deg] max-sm:opacity-45"><div className="h-3 w-24 rounded-full bg-white/10" /><div className="mt-5 h-12 rounded-xl bg-white/5" /><div className="mt-3 h-12 rounded-xl bg-white/5" /><div className="mt-3 h-20 rounded-xl bg-blue-500/10" /></div>
            <div className="absolute bottom-7 left-7 max-w-xl"><h3 className="text-3xl font-black">AI Operations Dashboard</h3><p className="mt-3 leading-7 text-slate-400">Dashboard operasional, data real-time, dokumen, laporan, dan AI assistant dalam satu sistem.</p></div>
          </div>
          <div className="reveal relative min-h-[390px] overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-emerald-400/10 via-white/[.035] to-blue-500/10 p-7">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-400">Automation</span>
            <div className="absolute left-1/2 top-[42%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20"><div className="spin-slow h-full w-full rounded-full border border-dashed border-violet-300/20" /></div>
            <div className="absolute bottom-7 left-7 pr-7"><h3 className="text-3xl font-black">Multi-Agent Workflow</h3><p className="mt-3 leading-7 text-slate-400">Beberapa agent AI menangani tugas berbeda dan saling terhubung dalam satu workflow.</p></div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 pb-24 pt-16">
        <div className="reveal overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-emerald-400/10 p-8 shadow-2xl shadow-blue-900/20 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[.22em] text-blue-200">Start building</p><h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-6xl">Punya proses yang ingin dibuat lebih otomatis?</h2><p className="mt-5 max-w-2xl leading-7 text-slate-300/75">AIORBITLAB membantu mengubah kebutuhan bisnis menjadi aplikasi dan automasi yang bisa benar-benar digunakan.</p></div>
          <a href="mailto:hello@aiorbitlab.com" className="mt-8 inline-flex shrink-0 rounded-2xl bg-white px-6 py-4 font-black text-slate-950 transition hover:-translate-y-1 lg:mt-0">Mulai Diskusi →</a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-sm text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row"><strong className="text-slate-400">AIORBITLAB</strong><span>Built with Next.js · TypeScript · React · Tailwind CSS</span></div>
      </footer>
    </main>
  );
}
