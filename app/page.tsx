"use client";

import { useEffect, useMemo, useState } from "react";
import { cmsPublicGet } from "@/lib/cms";

type SiteRow = {
  id: number;
  hero_eyebrow: string;
  hero_title: string;
  hero_highlight: string;
  hero_description: string;
  hero_image: string;
  primary_cta_label: string;
  primary_cta_url: string;
  secondary_cta_label: string;
  secondary_cta_url: string;
  contact_title: string;
  contact_description: string;
  contact_email: string;
};
type ServiceRow = { id: number; sort_order: number; title: string; description: string; active: boolean };
type ProjectRow = { id: number; sort_order: number; category: string; title: string; description: string; image_url: string; active: boolean };
type TerminalRow = { id: number; sort_order: number; line_text: string; tone: "normal" | "ok" | "active"; active: boolean };

const fallbackSite: SiteRow = {
  id: 1,
  hero_eyebrow: "INTELLIGENCE THAT ACTUALLY WORKS",
  hero_title: "Build a business that",
  hero_highlight: "thinks, acts, and scales.",
  hero_description: "AI Agent, aplikasi custom, automasi, dashboard, OCR, dan integrasi yang dibangun untuk bekerja di operasional nyata — bukan hanya untuk demo.",
  hero_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=92",
  primary_cta_label: "See AI Agent Live ↗",
  primary_cta_url: "#agent",
  secondary_cta_label: "Explore Portfolio",
  secondary_cta_url: "#work",
  contact_title: "Turn your workflow into an AI-powered system.",
  contact_description: "Ceritakan bagian bisnis yang masih manual, lambat, atau sulit dipantau.",
  contact_email: "hello@aiorbitlab.com",
};

const fallbackServices: ServiceRow[] = [
  { id: 1, sort_order: 1, title: "AI Agent", description: "Agent AI custom dengan memory, tools, dan workflow untuk pekerjaan nyata.", active: true },
  { id: 2, sort_order: 2, title: "Custom Application", description: "Aplikasi web dan dashboard yang dibangun sesuai proses bisnis.", active: true },
  { id: 3, sort_order: 3, title: "Business Automation", description: "Otomatisasi pekerjaan berulang, approval, notifikasi, dan integrasi.", active: true },
  { id: 4, sort_order: 4, title: "Dashboard & Reporting", description: "KPI, grafik, laporan, monitoring, dan kontrol data.", active: true },
  { id: 5, sort_order: 5, title: "AI Integration", description: "Hubungkan AI dengan Telegram, WhatsApp, database, API, dan dokumen.", active: true },
  { id: 6, sort_order: 6, title: "OCR & Document AI", description: "Ubah foto, struk, invoice, dan PDF menjadi data terstruktur.", active: true },
];

const fallbackProjects: ProjectRow[] = [
  { id: 1, sort_order: 1, category: "AI Agent", title: "Multi-Agent Operations", description: "Agent AI untuk input data, rekap, follow-up, notifikasi, dan pekerjaan operasional.", image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=88", active: true },
  { id: 2, sort_order: 2, category: "Web App", title: "AI Finance Workspace", description: "Keuangan dengan insight AI, scan struk, agenda, laporan, dan automasi.", image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=88", active: true },
  { id: 3, sort_order: 3, category: "Operations", title: "Rental Control System", description: "Inventaris, transaksi, pelanggan, vendor, quotation, dan monitoring.", image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=88", active: true },
  { id: 4, sort_order: 4, category: "Automation", title: "Receipt Intelligence", description: "OCR struk, klasifikasi otomatis, sinkronisasi, dan rekap biaya.", image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=88", active: true },
  { id: 5, sort_order: 5, category: "Inventory", title: "Inventory Intelligence", description: "Serial number, stok, status barang, dan insight ketersediaan.", image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=88", active: true },
  { id: 6, sort_order: 6, category: "Integration", title: "Connected Business Hub", description: "Dashboard, database, Telegram, WhatsApp, dokumen, AI, dan API.", image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=88", active: true },
];

const fallbackTerminal: TerminalRow[] = [
  { id: 1, sort_order: 1, line_text: "boot agent://operations-core", tone: "active", active: true },
  { id: 2, sort_order: 2, line_text: "memory.load → workspace context", tone: "ok", active: true },
  { id: 3, sort_order: 3, line_text: "tools.connect → database, telegram, whatsapp", tone: "ok", active: true },
  { id: 4, sort_order: 4, line_text: "task.read → analyze incoming business request", tone: "normal", active: true },
  { id: 5, sort_order: 5, line_text: "plan.create → 4 executable steps", tone: "active", active: true },
  { id: 6, sort_order: 6, line_text: "database.write → record synchronized", tone: "ok", active: true },
  { id: 7, sort_order: 7, line_text: "notification.send → follow-up queued", tone: "ok", active: true },
  { id: 8, sort_order: 8, line_text: "agent.wait → ready for next task", tone: "active", active: true },
];

function BrandMark() { return <span className="brandMark" aria-hidden="true"><i /><b /></span>; }

function AgentTerminal({ lines, compact = false }: { lines: TerminalRow[]; compact?: boolean }) {
  const activeLines = lines.length ? lines : fallbackTerminal;
  const [history, setHistory] = useState<TerminalRow[]>([]);
  const [typed, setTyped] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    setHistory([]); setTyped(""); setLineIndex(0);
  }, [activeLines.length]);

  useEffect(() => {
    const current = activeLines[lineIndex % activeLines.length];
    const delay = typed.length < current.line_text.length ? 18 + Math.random() * 30 : 560;
    const timer = window.setTimeout(() => {
      if (typed.length < current.line_text.length) setTyped(current.line_text.slice(0, typed.length + 1));
      else {
        setHistory(prev => [...prev, current].slice(compact ? -5 : -7));
        setTyped("");
        setLineIndex(i => (i + 1) % activeLines.length);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [typed, lineIndex, compact, activeLines]);

  const current = activeLines[lineIndex % activeLines.length];
  return <div className={`terminal ${compact ? "compact" : ""}`}>
    <div className="terminalTop"><div className="traffic"><i /><i /><i /></div><span>AIORBITLAB / AGENT TERMINAL</span><b><i /> LIVE</b></div>
    <div className="terminalMeta"><span>agent://operations-core</span><span>memory: synced</span><span>tools: connected</span></div>
    <div className="terminalBody" aria-live="polite">
      {history.map((line, index) => <div className={`terminalLine ${line.tone === "ok" ? "ok" : line.tone === "active" ? "active" : ""}`} key={`${line.id}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><code>{line.line_text}</code></div>)}
      <div className={`terminalLine ${current.tone === "ok" ? "ok" : current.tone === "active" ? "active" : ""}`}><span>{String(history.length + 1).padStart(2, "0")}</span><code>{typed}<i className="cursor" /></code></div>
    </div>
    <div className="terminalFooter"><div><span className="pulseDot" /> Agent online</div><div className="terminalProgress"><i /></div><div>Memory synced</div></div>
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [site, setSite] = useState<SiteRow>(fallbackSite);
  const [services, setServices] = useState<ServiceRow[]>(fallbackServices);
  const [projects, setProjects] = useState<ProjectRow[]>(fallbackProjects);
  const [terminalLines, setTerminalLines] = useState<TerminalRow[]>(fallbackTerminal);

  useEffect(() => {
    Promise.all([
      cmsPublicGet<SiteRow[]>("cms_site", "id=eq.1&select=*"),
      cmsPublicGet<ServiceRow[]>("cms_services", "active=eq.true&select=*&order=sort_order.asc,id.asc"),
      cmsPublicGet<ProjectRow[]>("cms_projects", "active=eq.true&select=*&order=sort_order.asc,id.asc"),
      cmsPublicGet<TerminalRow[]>("cms_terminal_lines", "active=eq.true&select=*&order=sort_order.asc,id.asc"),
    ]).then(([siteRows, serviceRows, projectRows, terminalRows]) => {
      if (siteRows[0]) setSite(siteRows[0]);
      if (serviceRows.length) setServices(serviceRows);
      if (projectRows.length) setProjects(projectRows);
      if (terminalRows.length) setTerminalLines(terminalRows);
    }).catch(() => {});
  }, []);

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
  }, [projects.length, services.length]);

  const filters = useMemo(() => ["All", ...Array.from(new Set(projects.map(p => p.category)))], [projects]);
  const visibleProjects = useMemo(() => filter === "All" ? projects : projects.filter(p => p.category === filter), [filter, projects]);

  return <main>
    <header className="topbar"><div className="page nav">
      <a className="brand" href="#top"><BrandMark /><span>AIORBITLAB</span></a>
      <nav className="desktopNav"><a href="#studio">Studio</a><a href="#services">Services</a><a href="#agent">AI Agent</a><a href="#work">Portfolio</a><a href="#process">Process</a></nav>
      <div className="navActions"><a className="navGhost" href="#work">View Work</a><a className="navSolid" href="#contact">Start Project ↗</a><button className="menuButton" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">{menuOpen ? "×" : "☰"}</button></div>
      <div className={`mobileNav ${menuOpen ? "open" : ""}`}>{[["Studio","#studio"],["Services","#services"],["AI Agent","#agent"],["Portfolio","#work"],["Process","#process"],["Contact","#contact"]].map(([label,href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>
    </div></header>

    <section id="top" className="hero">
      <div className="heroBackdrop"><img src={site.hero_image || fallbackSite.hero_image} alt="AIORBITLAB" /></div>
      <div className="heroGrid page">
        <div className="heroCopy reveal show"><p className="eyebrow"><span /> {site.hero_eyebrow}</p><h1>{site.hero_title} <em>{site.hero_highlight}</em></h1><p className="heroLead">{site.hero_description}</p><div className="heroButtons"><a className="button light" href={site.primary_cta_url}>{site.primary_cta_label}</a><a className="button glass" href={site.secondary_cta_url}>{site.secondary_cta_label}</a></div><div className="heroMeta"><span>AI AGENT</span><span>MEMORY</span><span>TOOLS</span><span>AUTOMATION</span><span>API</span></div></div>
        <div className="heroTerminal reveal show"><div className="terminalHalo" /><AgentTerminal lines={terminalLines} compact /><div className="agentBadge badgeOne"><small>AGENTS</small><b>05 ACTIVE</b><span>orchestrated</span></div><div className="agentBadge badgeTwo"><small>WORKFLOWS</small><b>28 RUNNING</b><span>24 / 7</span></div><div className="agentBadge badgeThree"><small>STATUS</small><b>HEALTHY</b><span>all systems online</span></div></div>
      </div><div className="scrollLine">SCROLL TO EXPLORE</div>
    </section>

    <section className="ticker"><div>AI AGENT · MEMORY · TOOLS · AUTOMATION · WEB APP · DASHBOARD · OCR · DATABASE · TELEGRAM · WHATSAPP · API · AI AGENT · MEMORY · TOOLS · AUTOMATION · WEB APP · DASHBOARD · OCR · DATABASE · TELEGRAM · WHATSAPP · API · </div></section>

    <section id="studio" className="page manifesto reveal"><p className="miniLabel">/ AIORBITLAB STUDIO</p><div><h2>AI should not just answer.<br />It should <em>do the work.</em></h2><p>Kami merancang sistem yang menerima data, memahami konteks, mengambil keputusan, memanggil tools, menyimpan hasil, dan menjalankan tindakan berikutnya secara terukur.</p></div></section>

    <section className="page mosaic">
      <article className="tile tall reveal"><img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1500&q=88" alt="AI intelligence" /><div><small>01 / INTELLIGENCE</small><h3>Agents with context, memory, and tools.</h3><p>Bukan chatbot biasa. Agent memahami pekerjaan dan menjalankan langkah berikutnya.</p></div></article>
      <article className="tile reveal"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=88" alt="Application" /><div><small>02 / APPLICATION</small><h3>Interface built for real work.</h3></div></article>
      <article className="tile reveal"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=88" alt="Automation" /><div><small>03 / AUTOMATION</small><h3>Systems that keep moving.</h3></div></article>
      <article className="tile wide reveal"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=88" alt="Business team" /><div><small>04 / HUMAN + AI</small><h3>Less manual work. Better visibility. Faster action.</h3></div></article>
    </section>

    <section id="agent" className="agentSection"><div className="page agentGrid"><div className="agentCopy reveal"><p className="miniLabel">/ LIVE AGENT RUNTIME</p><h2>Watch the agent <em>work.</em></h2><p>Terminal ini dikontrol dari CMS. Ubah urutan log, isi terminal, atau sembunyikan baris tanpa menyentuh kode.</p><div className="agentFacts"><div><strong>01</strong><span>Understand context</span></div><div><strong>02</strong><span>Select tools</span></div><div><strong>03</strong><span>Execute action</span></div><div><strong>04</strong><span>Log every step</span></div></div></div><div className="agentRuntime reveal"><div className="runtimeOrbit"><i /><i /><i /></div><AgentTerminal lines={terminalLines} /></div></div></section>

    <section id="services" className="servicesSection"><div className="page"><div className="sectionHead reveal"><div><p className="miniLabel dark">/ CAPABILITIES</p><h2>Everything needed to build <em>smarter operations.</em></h2></div><p>Semua layanan di bawah ini bisa ditambah, diubah, diurutkan, atau disembunyikan langsung dari CMS.</p></div><div className="serviceList">{services.map((item, index) => <article className="serviceRow reveal" key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p><a href="#contact">↗</a></article>)}</div></div></section>

    <section id="work" className="page workSection"><div className="workHead reveal"><div><p className="miniLabel">/ SELECTED SYSTEMS</p><h2>Portfolio</h2></div><div className="filters">{filters.map(item => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="projectGrid">{visibleProjects.map((project,index) => <article className={`project reveal ${index % 3 === 0 ? "large" : ""}`} key={project.id}>{project.image_url ? <img src={project.image_url} alt={project.title} /> : <div />}<div className="projectShade" /><div className="projectInfo"><small>{project.category.toUpperCase()}</small><h3>{project.title}</h3><p>{project.description}</p><a href="#contact">Discuss Similar Project ↗</a></div></article>)}</div></section>

    <section className="page metrics reveal"><div><strong>AI</strong><span>inside the workflow</span></div><div><strong>24/7</strong><span>automation-ready</span></div><div><strong>1</strong><span>connected source of truth</span></div><div><strong>∞</strong><span>room to keep scaling</span></div></section>

    <section id="process" className="page processSection"><div className="sectionHead darkHead reveal"><div><p className="miniLabel">/ PROCESS</p><h2>From idea to <em>production.</em></h2></div><p>Setiap tahap dibuat jelas supaya UI, database, integrasi, dan AI tetap rapi saat sistem berkembang.</p></div><div className="steps">{[["01","Discover","Petakan masalah, proses, data, dan target paling penting."],["02","Design","Susun pengalaman pengguna, struktur data, integrasi, dan agent flow."],["03","Build","Kembangkan sistem responsif, aman, dan mudah ditingkatkan."],["04","Launch","Deploy, uji alur utama, ukur hasil, lalu terus iterasi."]].map(([num,title,text]) => <article className="step reveal" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

    <section id="contact" className="page contactSection"><div className="contactCard reveal"><img src={site.hero_image || fallbackSite.hero_image} alt="Digital network" /><div className="contactShade" /><div className="contactContent"><p className="miniLabel">/ START BUILDING</p><h2>{site.contact_title}</h2><p>{site.contact_description}</p><a className="button light" href={`mailto:${site.contact_email}`}>Start a Project ↗</a></div></div></section>

    <footer className="footer"><div className="page footerGrid"><div><a className="brand" href="#top"><BrandMark /><span>AIORBITLAB</span></a><p>AI Agent, aplikasi custom, automation, dashboard, OCR, dan integration untuk bisnis modern.</p></div><div><h4>Explore</h4><a href="#agent">AI Agent</a><a href="#services">Services</a><a href="#work">Portfolio</a><a href="#process">Process</a></div><div><h4>CMS</h4><a href="/admin">Admin CMS</a><a href="#top">Website</a></div><div><h4>Contact</h4><a href={`mailto:${site.contact_email}`}>{site.contact_email}</a><p>Indonesia</p></div></div><div className="page footerBottom"><span>© 2026 AIORBITLAB</span><span>Content managed with AIORBITLAB CMS</span></div></footer>
  </main>;
}
