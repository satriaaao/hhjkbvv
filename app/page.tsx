"use client";

import { useEffect, useMemo, useState } from "react";

const terminalLines = [
  "$ boot aiorbit-agent --workspace business-core",
  "[ok] memory loaded: operations_context",
  "[ok] tools connected: database, telegram, whatsapp, api",
  "> scanning incoming workflow...",
  "> classified task: invoice / operations / follow-up",
  "> reasoning: selecting best action path",
  "> action: write structured data to database",
  "> action: notify operations channel",
  "[done] workflow completed in 1.8s",
];

const projects = [
  { type: "AI Agent", title: "Multi-Agent Operations", text: "Agent AI untuk input data, rekap, follow-up, notifikasi, dan pekerjaan operasional yang berjalan otomatis.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=88" },
  { type: "Web App", title: "AI Finance Workspace", text: "Keuangan personal dan keluarga dengan insight AI, scan struk, agenda, laporan, dan automasi.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=88" },
  { type: "Operations", title: "Rental Control System", text: "Inventaris, transaksi, pelanggan, vendor, quotation, dan monitoring operasional dalam satu dashboard.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=88" },
  { type: "Automation", title: "Receipt Intelligence", text: "OCR struk dan bukti transfer, klasifikasi otomatis, pencocokan, sinkronisasi, dan rekap biaya.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=88" },
  { type: "Inventory", title: "Inventory Intelligence", text: "Serial number, stok, status barang, accessories, dan insight ketersediaan yang selalu terhubung.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=88" },
  { type: "Integration", title: "Connected Business Hub", text: "Satukan dashboard, database, Telegram, WhatsApp, dokumen, AI, dan API dalam satu alur kerja.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=88" },
];

const services = [
  ["01", "AI Agent", "Agent AI custom dengan memory, tools, dan workflow yang jelas untuk pekerjaan nyata."],
  ["02", "Custom Application", "Aplikasi web dan dashboard yang dibangun sesuai proses bisnis, bukan template generik."],
  ["03", "Business Automation", "Otomatisasi pekerjaan berulang, approval, notifikasi, dokumen, dan integrasi antar sistem."],
  ["04", "Dashboard & Reporting", "KPI, grafik, laporan, monitoring, pencarian, dan kontrol data dalam satu pengalaman."],
  ["05", "AI Integration", "Hubungkan AI dengan Telegram, WhatsApp, database, API, dokumen, dan sistem internal."],
  ["06", "OCR & Document AI", "Ubah foto, struk, invoice, dan PDF menjadi data terstruktur yang siap digunakan."],
];

function BrandMark() {
  return <span className="brandMark" aria-hidden="true"><i /><b /></span>;
}

function AgentTerminal({ compact = false }: { compact?: boolean }) {
  const [history, setHistory] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const current = terminalLines[lineIndex];
    const delay = typed.length < current.length ? 18 + Math.random() * 30 : 520;
    const timer = window.setTimeout(() => {
      if (typed.length < current.length) {
        setTyped(current.slice(0, typed.length + 1));
      } else {
        setHistory(prev => [...prev, current].slice(compact ? -5 : -7));
        setTyped("");
        setLineIndex(i => (i + 1) % terminalLines.length);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [typed, lineIndex, compact]);

  return (
    <div className={`terminal ${compact ? "compact" : ""}`}>
      <div className="terminalTop">
        <div className="traffic"><i /><i /><i /></div>
        <span>AIORBITLAB / AGENT TERMINAL</span>
        <b><i /> LIVE</b>
      </div>
      <div className="terminalMeta">
        <span>agent://operations-core</span>
        <span>model: adaptive-reasoner</span>
        <span>latency: 1.8s</span>
      </div>
      <div className="terminalBody" aria-live="polite">
        {history.map((line, index) => <div className={`terminalLine ${line.startsWith("[ok]") || line.startsWith("[done]") ? "ok" : ""}`} key={`${line}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><code>{line}</code></div>)}
        <div className="terminalLine active"><span>{String(history.length + 1).padStart(2, "0")}</span><code>{typed}<i className="cursor" /></code></div>
      </div>
      <div className="terminalFooter">
        <div><span className="pulseDot" /> Agent online</div>
        <div className="terminalProgress"><i /></div>
        <div>Memory synced</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("show")), { threshold: 0.1 });
    nodes.forEach(node => observer.observe(node));
    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => { observer.disconnect(); window.removeEventListener("mousemove", move); };
  }, []);

  const filters = ["All", ...Array.from(new Set(projects.map(p => p.type)))];
  const visibleProjects = useMemo(() => filter === "All" ? projects : projects.filter(p => p.type === filter), [filter]);

  return (
    <main>
      <header className="topbar">
        <div className="page nav">
          <a className="brand" href="#top"><BrandMark /><span>AIORBITLAB</span></a>
          <nav className="desktopNav"><a href="#studio">Studio</a><a href="#services">Services</a><a href="#agent">AI Agent</a><a href="#work">Portfolio</a><a href="#process">Process</a></nav>
          <div className="navActions"><a className="navGhost" href="#work">View Work</a><a className="navSolid" href="#contact">Start Project ↗</a><button className="menuButton" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">{menuOpen ? "×" : "☰"}</button></div>
          <div className={`mobileNav ${menuOpen ? "open" : ""}`}>{[["Studio", "#studio"], ["Services", "#services"], ["AI Agent", "#agent"], ["Portfolio", "#work"], ["Process", "#process"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="heroBackdrop"><img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=92" alt="Digital world" /></div>
        <div className="heroGrid page">
          <div className="heroCopy reveal show">
            <p className="eyebrow"><span /> INTELLIGENCE THAT ACTUALLY WORKS</p>
            <h1>Build a business that <em>thinks, acts, and scales.</em></h1>
            <p className="heroLead">AI Agent, aplikasi custom, automasi, dashboard, OCR, dan integrasi yang dibangun untuk bekerja di operasional nyata — bukan hanya untuk demo.</p>
            <div className="heroButtons"><a className="button light" href="#agent">See AI Agent Live ↗</a><a className="button glass" href="#work">Explore Portfolio</a></div>
            <div className="heroMeta"><span>AI AGENT</span><span>MEMORY</span><span>TOOLS</span><span>AUTOMATION</span><span>API</span></div>
          </div>
          <div className="heroTerminal reveal show">
            <div className="terminalHalo" />
            <AgentTerminal compact />
            <div className="agentBadge badgeOne"><small>AGENTS</small><b>05 ACTIVE</b><span>orchestrated</span></div>
            <div className="agentBadge badgeTwo"><small>WORKFLOWS</small><b>28 RUNNING</b><span>24 / 7</span></div>
            <div className="agentBadge badgeThree"><small>STATUS</small><b>HEALTHY</b><span>all systems online</span></div>
          </div>
        </div>
        <div className="scrollLine">SCROLL TO EXPLORE</div>
      </section>

      <section className="ticker"><div>AI AGENT · MEMORY · TOOLS · AUTOMATION · WEB APP · DASHBOARD · OCR · DATABASE · TELEGRAM · WHATSAPP · API · AI AGENT · MEMORY · TOOLS · AUTOMATION · WEB APP · DASHBOARD · OCR · DATABASE · TELEGRAM · WHATSAPP · API · </div></section>

      <section id="studio" className="page manifesto reveal">
        <p className="miniLabel">/ AIORBITLAB STUDIO</p>
        <div><h2>AI should not just answer.<br />It should <em>do the work.</em></h2><p>Kami merancang sistem yang menerima data, memahami konteks, mengambil keputusan, memanggil tools, menyimpan hasil, dan menjalankan tindakan berikutnya secara terukur.</p></div>
      </section>

      <section className="page mosaic">
        <article className="tile tall reveal"><img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1500&q=88" alt="AI intelligence" /><div><small>01 / INTELLIGENCE</small><h3>Agents with context, memory, and tools.</h3><p>Bukan chatbot biasa. Agent memahami pekerjaan dan menjalankan langkah berikutnya.</p></div></article>
        <article className="tile reveal"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=88" alt="Application" /><div><small>02 / APPLICATION</small><h3>Interface built for real work.</h3></div></article>
        <article className="tile reveal"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=88" alt="Automation" /><div><small>03 / AUTOMATION</small><h3>Systems that keep moving.</h3></div></article>
        <article className="tile wide reveal"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=88" alt="Business team" /><div><small>04 / HUMAN + AI</small><h3>Less manual work. Better visibility. Faster action.</h3></div></article>
      </section>

      <section id="agent" className="agentSection">
        <div className="page agentGrid">
          <div className="agentCopy reveal"><p className="miniLabel">/ LIVE AGENT RUNTIME</p><h2>Watch the agent <em>work.</em></h2><p>Terminal ini mensimulasikan bagaimana AI Agent memproses workflow: memuat memory, membaca tugas, memilih tools, menulis data, lalu melakukan follow-up.</p><div className="agentFacts"><div><strong>01</strong><span>Understand context</span></div><div><strong>02</strong><span>Select tools</span></div><div><strong>03</strong><span>Execute action</span></div><div><strong>04</strong><span>Log every step</span></div></div></div>
          <div className="agentRuntime reveal"><div className="runtimeOrbit"><i /><i /><i /></div><AgentTerminal /></div>
        </div>
      </section>

      <section id="services" className="servicesSection"><div className="page"><div className="sectionHead reveal"><div><p className="miniLabel dark">/ CAPABILITIES</p><h2>Everything needed to build <em>smarter operations.</em></h2></div><p>Mulai dari satu AI Agent sampai sistem bisnis lengkap yang menghubungkan dashboard, database, bot, dokumen, dan API.</p></div><div className="serviceList">{services.map(([num, title, text]) => <article className="serviceRow reveal" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p><a href="#contact">↗</a></article>)}</div></div></section>

      <section id="work" className="page workSection">
        <div className="workHead reveal"><div><p className="miniLabel">/ SELECTED SYSTEMS</p><h2>Portfolio</h2></div><div className="filters">{filters.map(item => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        <div className="projectGrid">{visibleProjects.map((project, index) => <article className={`project reveal ${index % 3 === 0 ? "large" : ""}`} key={project.title}><img src={project.image} alt={project.title} /><div className="projectShade" /><div className="projectInfo"><small>{project.type.toUpperCase()}</small><h3>{project.title}</h3><p>{project.text}</p><a href="#contact">Discuss Similar Project ↗</a></div></article>)}</div>
      </section>

      <section className="page metrics reveal"><div><strong>AI</strong><span>inside the workflow</span></div><div><strong>24/7</strong><span>automation-ready</span></div><div><strong>1</strong><span>connected source of truth</span></div><div><strong>∞</strong><span>room to keep scaling</span></div></section>

      <section id="process" className="page processSection"><div className="sectionHead darkHead reveal"><div><p className="miniLabel">/ PROCESS</p><h2>From idea to <em>production.</em></h2></div><p>Setiap tahap dibuat jelas supaya UI, database, integrasi, dan AI tetap rapi saat sistem berkembang.</p></div><div className="steps">{[["01", "Discover", "Petakan masalah, proses, data, dan target paling penting."], ["02", "Design", "Susun pengalaman pengguna, struktur data, integrasi, dan agent flow."], ["03", "Build", "Kembangkan sistem responsif, aman, dan mudah ditingkatkan."], ["04", "Launch", "Deploy, uji alur utama, ukur hasil, lalu terus iterasi."]].map(([num, title, text]) => <article className="step reveal" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section id="contact" className="page contactSection"><div className="contactCard reveal"><img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=92" alt="Digital network" /><div className="contactShade" /><div className="contactContent"><p className="miniLabel">/ START BUILDING</p><h2>Turn your workflow into an <em>AI-powered system.</em></h2><p>Ceritakan bagian bisnis yang masih manual, lambat, atau sulit dipantau. Kami bantu ubah menjadi sistem yang benar-benar bekerja.</p><a className="button light" href="mailto:hello@aiorbitlab.com">Start a Project ↗</a></div></div></section>

      <footer className="footer"><div className="page footerGrid"><div><a className="brand" href="#top"><BrandMark /><span>AIORBITLAB</span></a><p>AI Agent, aplikasi custom, automation, dashboard, OCR, dan integration untuk bisnis modern.</p></div><div><h4>Explore</h4><a href="#studio">Studio</a><a href="#agent">AI Agent</a><a href="#services">Services</a><a href="#work">Portfolio</a></div><div><h4>Solutions</h4><a href="#services">Automation</a><a href="#services">Dashboard</a><a href="#services">OCR</a><a href="#services">Integration</a></div><div><h4>Contact</h4><a href="mailto:hello@aiorbitlab.com">hello@aiorbitlab.com</a><p>Indonesia</p></div></div><div className="page footerBottom"><span>© 2026 AIORBITLAB</span><span>Ideas × AI × Real Impact</span></div></footer>
    </main>
  );
}
