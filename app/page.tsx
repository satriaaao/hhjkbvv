"use client";

import { useEffect, useState } from "react";

const services = [
  { n: "01", icon: "✦", title: "AI Agent", text: "Agent AI yang memahami workflow bisnis, membaca data, mengambil keputusan, lalu menjalankan aksi secara otomatis.", tags: ["Automation", "Tools", "Memory"] },
  { n: "02", icon: "◫", title: "Custom Application", text: "Aplikasi web dan dashboard yang dirancang khusus sesuai operasional bisnis, bukan template generik.", tags: ["Next.js", "React", "TypeScript"] },
  { n: "03", icon: "↗", title: "Business Automation", text: "Hubungkan pekerjaan manual menjadi workflow otomatis yang lebih cepat, konsisten, dan mudah dipantau.", tags: ["Workflow", "API", "Webhook"] },
  { n: "04", icon: "⌁", title: "Messaging Integration", text: "Integrasi Telegram, WhatsApp, dan kanal komunikasi lain untuk input, notifikasi, dan operasi bisnis.", tags: ["Telegram", "WhatsApp", "Realtime"] },
  { n: "05", icon: "▦", title: "Data Intelligence", text: "Dashboard, laporan, pencarian, grafik, dan AI analytics untuk mengubah data menjadi keputusan yang lebih cepat.", tags: ["Database", "Analytics", "Reports"] },
  { n: "06", icon: "◎", title: "AI Integration", text: "Gabungkan model AI ke sistem internal untuk OCR, dokumen, customer support, klasifikasi, dan analisis.", tags: ["LLM", "OCR", "Vision"] },
];

const steps = [
  ["01", "Discover", "Petakan kebutuhan, proses kerja, dan hambatan yang paling banyak membuang waktu."],
  ["02", "Design", "Susun arsitektur, UI/UX, database, AI, dan automation flow yang tepat."],
  ["03", "Build", "Bangun sistem dengan stack modern, cepat, responsif, dan mudah dikembangkan."],
  ["04", "Launch", "Deploy ke production, uji workflow nyata, lalu tingkatkan fitur berdasarkan penggunaan."],
];

const metrics = [
  ["24/7", "AI automation"],
  ["1×", "single workflow"],
  ["∞", "scalable system"],
  ["Live", "operational data"],
];

function Logo() {
  return (
    <span className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-600 shadow-[0_10px_40px_rgba(59,130,246,.32)]">
      <span className="absolute inset-[9px] rounded-full border border-white/90" />
      <span className="orbit-dot absolute h-1.5 w-1.5 rounded-full bg-white" />
      <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_18px_white]" />
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("show")),
      { threshold: 0.12 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const phrase = "Data masuk → AI memahami → workflow berjalan otomatis";
    let i = 0;
    let direction = 1;
    const timer = window.setInterval(() => {
      i += direction;
      if (i >= phrase.length) {
        i = phrase.length;
        direction = -1;
        window.setTimeout(() => {}, 900);
      } else if (i <= 0) {
        i = 0;
        direction = 1;
      }
      setTyped(phrase.slice(0, i));
    }, 55);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveStep(v => (v % 3) + 1), 1800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="ambient" />
      <div className="mesh pointer-events-none fixed inset-0 -z-20" />
      <div className="mouse-glow pointer-events-none fixed inset-0 -z-10" />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <nav className="nav-glass mx-auto flex max-w-7xl items-center justify-between rounded-[22px] px-4 py-3">
          <a href="#top" className="flex items-center gap-3 font-black tracking-[.08em]">
            <Logo />
            <span className="text-sm sm:text-base">AIORBITLAB</span>
          </a>

          <div className="hidden items-center gap-7 text-[13px] font-semibold text-slate-400 md:flex">
            <a className="nav-link" href="#services">Layanan</a>
            <a className="nav-link" href="#workflow">Cara Kerja</a>
            <a className="nav-link" href="#projects">Project</a>
            <a className="nav-link" href="#contact">Kontak</a>
          </div>

          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden rounded-xl bg-white px-4 py-2.5 text-xs font-black text-slate-950 transition hover:-translate-y-0.5 sm:inline-flex">Mulai Project</a>
            <button onClick={() => setMenuOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[.05] md:hidden" aria-label="Buka menu">
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="nav-glass mx-auto mt-2 grid max-w-7xl gap-1 rounded-2xl p-3 text-sm font-semibold md:hidden">
            {[["Layanan", "#services"], ["Cara Kerja", "#workflow"], ["Project", "#projects"], ["Kontak", "#contact"]].map(([label, href]) => (
              <a key={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5" href={href}>{label}</a>
            ))}
          </div>
        )}
      </header>

      <section id="top" className="mx-auto grid min-h-[860px] max-w-7xl items-center gap-14 px-5 pb-20 pt-36 lg:grid-cols-[1.05fr_.95fr] lg:pt-28">
        <div className="reveal relative z-10">
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-cyan-200/10 bg-cyan-200/[.04] px-3.5 py-2 text-[11px] font-black uppercase tracking-[.16em] text-cyan-100/70 backdrop-blur-xl">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" /><span className="relative h-2 w-2 rounded-full bg-emerald-300" /></span>
            Intelligent systems for modern business
          </div>

          <h1 className="max-w-4xl text-[clamp(3.4rem,8vw,7.2rem)] font-black leading-[.87] tracking-[-.075em] text-white">
            Your business,
            <span className="gradient-text block pb-3">on autopilot.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Kami membangun <b className="font-semibold text-slate-200">AI Agent, aplikasi custom, dan automasi</b> yang mengubah pekerjaan manual menjadi sistem cerdas yang berjalan lebih cepat dan terukur.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="primary-btn group rounded-2xl px-6 py-4 text-center text-sm font-black">Bangun Sistem AI <span className="inline-block transition group-hover:translate-x-1">→</span></a>
            <a href="#projects" className="soft-btn rounded-2xl px-6 py-4 text-center text-sm font-black">Lihat Capability</a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-2 text-center sm:gap-3">
            {[['AI-first','Architecture'],['Realtime','Workflow'],['Custom','System']].map(([a,b]) => (
              <div key={a} className="rounded-2xl border border-white/[.07] bg-white/[.025] px-3 py-3 backdrop-blur-xl">
                <strong className="block text-sm text-white">{a}</strong><span className="text-[11px] text-slate-600">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal relative mx-auto flex min-h-[560px] w-full max-w-[580px] items-center justify-center">
          <div className="reactor-glow absolute h-[420px] w-[420px] rounded-full" />
          <div className="orbit orbit-one absolute h-[440px] w-[440px] rounded-full border border-white/[.07] max-sm:h-[320px] max-sm:w-[320px]" />
          <div className="orbit orbit-two absolute h-[330px] w-[330px] rounded-full border border-dashed border-blue-300/10 max-sm:h-[245px] max-sm:w-[245px]" />

          <div className="dashboard-card relative z-10 w-full overflow-hidden rounded-[32px] p-1">
            <div className="flex items-center justify-between border-b border-white/[.08] px-5 py-4 text-[11px] text-slate-500">
              <span className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-rose-400/70" /><i className="h-2 w-2 rounded-full bg-amber-300/70" /><i className="h-2 w-2 rounded-full bg-emerald-300/70" /></span>
              <span className="font-semibold tracking-wide">AI ORCHESTRATOR</span>
              <span className="flex items-center gap-1.5 text-emerald-300"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> LIVE</span>
            </div>

            <div className="p-5 sm:p-6">
              <div className="terminal rounded-2xl border border-white/[.08] p-4 font-mono text-[12px] leading-6 sm:text-[13px]">
                <div className="mb-2 flex items-center justify-between text-slate-600"><span>agent.workflow</span><span>v2.6</span></div>
                <span className="text-cyan-300">orbit@ai </span><span className="text-slate-300">{typed}</span><span className="cursor-blink text-cyan-300">▋</span>
              </div>

              <div className="mt-4 grid gap-2.5">
                {[
                  ["01", "Capture incoming data", "Done"],
                  ["02", "Reason & classify", "Running"],
                  ["03", "Execute business action", "Ready"],
                ].map(([n,title,status], i) => {
                  const active = activeStep === i + 1;
                  return (
                    <div key={title} className={`flow-row flex items-center gap-3 rounded-2xl border p-3.5 ${active ? "active" : "border-white/[.07] bg-white/[.025]"}`}>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500/25 to-violet-500/20 text-[11px] font-black text-blue-200">{n}</span>
                      <div className="min-w-0 flex-1"><strong className="block truncate text-[13px] text-slate-100">{title}</strong><span className="text-[11px] text-slate-600">Autonomous workflow</span></div>
                      <span className={`text-[10px] font-black uppercase tracking-wide ${active ? "text-cyan-300" : "text-slate-600"}`}>{status}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[['98%','Tasks automated'],['1.2s','Avg. response'],['24/7','System active']].map(([v,l]) => (
                  <div key={l} className="rounded-xl border border-white/[.06] bg-white/[.02] p-3"><strong className="block text-sm text-white">{v}</strong><span className="text-[9px] text-slate-600">{l}</span></div>
                ))}
              </div>
            </div>
          </div>

          <div className="float-one nav-glass absolute -left-3 top-20 z-20 rounded-2xl px-4 py-3 shadow-2xl sm:-left-10"><span className="text-[10px] uppercase tracking-widest text-slate-600">Agent status</span><strong className="mt-1 flex items-center gap-2 text-sm"><i className="h-2 w-2 rounded-full bg-emerald-300" /> Operational</strong></div>
          <div className="float-two nav-glass absolute -right-2 bottom-16 z-20 rounded-2xl px-4 py-3 shadow-2xl sm:-right-8"><span className="text-[10px] uppercase tracking-widest text-slate-600">Automation</span><strong className="mt-1 block text-sm text-cyan-200">+ Faster workflow</strong></div>
        </div>
      </section>

      <div className="marquee-wrap border-y border-white/[.07] bg-white/[.015] py-4">
        <div className="marquee-line text-[10px] font-black uppercase tracking-[.28em] text-slate-600">
          <span>AI Agent</span><b>◆</b><span>Automation</span><b>◆</b><span>Next.js</span><b>◆</b><span>TypeScript</span><b>◆</b><span>React</span><b>◆</b><span>Tailwind CSS</span><b>◆</b><span>Realtime Data</span><b>◆</b><span>AI Integration</span><b>◆</b>
          <span>AI Agent</span><b>◆</b><span>Automation</span><b>◆</b><span>Next.js</span><b>◆</b><span>TypeScript</span><b>◆</b><span>React</span><b>◆</b><span>Tailwind CSS</span><b>◆</b><span>Realtime Data</span><b>◆</b><span>AI Integration</span><b>◆</b>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="reveal grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([value,label]) => (
            <div key={label} className="metric-card rounded-[24px] border border-white/[.07] p-6"><strong className="gradient-text text-4xl font-black tracking-[-.05em]">{value}</strong><span className="mt-2 block text-xs font-semibold text-slate-500">{label}</span></div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="reveal mb-12 grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div><p className="eyebrow">Capabilities</p><h2 className="section-title">One system.<br/><span className="text-slate-600">Many possibilities.</span></h2></div>
          <p className="max-w-xl text-sm leading-7 text-slate-400 lg:justify-self-end sm:text-base">AIORBITLAB menggabungkan aplikasi, data, AI, dan automation menjadi sistem yang benar-benar bisa dipakai untuk operasional sehari-hari.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.title} className={`service-card reveal group relative overflow-hidden rounded-[28px] border border-white/[.075] p-6 ${i === 0 || i === 4 ? "lg:col-span-2" : ""}`}>
              <div className="service-glow absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="relative z-10 flex items-start justify-between"><span className="text-[10px] font-black tracking-[.2em] text-slate-700">{s.n}</span><span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/[.08] bg-white/[.035] text-lg text-cyan-100 transition duration-500 group-hover:rotate-6 group-hover:scale-110">{s.icon}</span></div>
              <div className="relative z-10 mt-12 max-w-xl"><h3 className="text-xl font-black tracking-[-.02em] sm:text-2xl">{s.title}</h3><p className="mt-3 max-w-lg text-sm leading-7 text-slate-500">{s.text}</p><div className="mt-5 flex flex-wrap gap-2">{s.tags.map(t => <span key={t} className="rounded-full border border-white/[.06] bg-white/[.025] px-3 py-1.5 text-[10px] font-bold text-slate-600">{t}</span>)}</div></div>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="reveal mb-12 max-w-4xl"><p className="eyebrow">How we build</p><h2 className="section-title">From business problem<br/><span className="text-slate-600">to working system.</span></h2></div>
        <div className="relative grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-6 hidden h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent lg:block" />
          {steps.map(([n,title,text]) => (
            <div key={n} className="step-card reveal relative rounded-[26px] border border-white/[.07] p-6">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl border border-blue-300/10 bg-blue-500/10 text-xs font-black text-blue-200 shadow-[0_0_30px_rgba(59,130,246,.08)]">{n}</span>
              <h3 className="mt-10 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
        <div className="reveal mb-12"><p className="eyebrow">Selected systems</p><h2 className="section-title">Built for operations.<br/><span className="text-slate-600">Designed for tomorrow.</span></h2></div>
        <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
          <div className="project-card reveal group relative min-h-[500px] overflow-hidden rounded-[32px] border border-white/[.08] p-7 sm:p-9">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-violet-500/10" />
            <div className="project-ui absolute right-[-80px] top-20 w-[420px] rotate-[-7deg] rounded-[28px] border border-white/[.08] bg-[#080f20]/90 p-5 shadow-2xl transition duration-700 group-hover:rotate-[-2deg] max-sm:opacity-35">
              <div className="flex gap-2"><i className="h-2 w-2 rounded-full bg-white/15"/><i className="h-2 w-2 rounded-full bg-white/15"/><i className="h-2 w-2 rounded-full bg-white/15"/></div>
              <div className="mt-5 grid grid-cols-3 gap-2"><div className="h-20 rounded-xl bg-blue-500/10"/><div className="h-20 rounded-xl bg-white/[.04]"/><div className="h-20 rounded-xl bg-white/[.04]"/></div>
              <div className="mt-3 h-32 rounded-xl border border-white/[.05] bg-gradient-to-t from-blue-500/10 to-white/[.02] p-4"><div className="graph-line h-full rounded-lg"/></div>
              <div className="mt-3 grid grid-cols-2 gap-2"><div className="h-12 rounded-xl bg-white/[.04]"/><div className="h-12 rounded-xl bg-white/[.04]"/></div>
            </div>
            <span className="relative z-10 rounded-full border border-white/[.08] bg-white/[.04] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500">AI Operations</span>
            <div className="absolute bottom-8 left-7 right-7 z-10 sm:bottom-10 sm:left-9"><h3 className="max-w-xl text-3xl font-black tracking-[-.04em] sm:text-5xl">One dashboard for your entire operation.</h3><p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">Data, transaksi, laporan, dokumen, notifikasi, dan AI assistant dalam satu command center.</p></div>
          </div>

          <div className="grid gap-4">
            <div className="project-card reveal relative min-h-[240px] overflow-hidden rounded-[30px] border border-white/[.08] p-7"><div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-dashed border-cyan-300/15 spin-slow"/><span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Multi-Agent</span><h3 className="mt-20 text-2xl font-black tracking-[-.03em]">AI teams that work together.</h3><p className="mt-3 text-sm leading-6 text-slate-500">Agent berbeda untuk input, analisis, laporan, dan action.</p></div>
            <div className="project-card reveal relative min-h-[240px] overflow-hidden rounded-[30px] border border-white/[.08] p-7"><div className="data-pulse absolute right-8 top-8 grid h-16 w-16 place-items-center rounded-full border border-emerald-300/15 bg-emerald-300/[.04]"><span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(110,231,183,.8)]"/></div><span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Realtime</span><h3 className="mt-20 text-2xl font-black tracking-[-.03em]">Your data, always moving.</h3><p className="mt-3 text-sm leading-6 text-slate-500">Realtime dashboard, alerts, event tracking, dan automation.</p></div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:pb-32">
        <div className="cta-card reveal relative overflow-hidden rounded-[36px] border border-white/[.09] p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="cta-orb absolute -right-20 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-[90px]" />
          <div className="relative z-10 max-w-3xl"><p className="eyebrow">Start building</p><h2 className="text-4xl font-black leading-[.95] tracking-[-.055em] sm:text-6xl">Turn your workflow into an <span className="gradient-text">AI-powered system.</span></h2><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Mulai dari satu proses yang paling menyita waktu. Kami ubah menjadi sistem yang lebih otomatis, rapi, dan scalable.</p></div>
          <a href="mailto:hello@aiorbitlab.com" className="primary-btn relative z-10 mt-8 inline-flex shrink-0 rounded-2xl px-6 py-4 text-sm font-black lg:mt-0">Mulai Diskusi →</a>
        </div>
      </section>

      <footer className="border-t border-white/[.07] px-5 py-8 text-xs text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><Logo/><div><strong className="block text-slate-300">AIORBITLAB</strong><span>Build smarter. Move faster.</span></div></div><span>Next.js · React · TypeScript · Tailwind CSS</span></div>
      </footer>
    </main>
  );
}
