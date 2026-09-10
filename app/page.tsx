"use client";

import { useEffect, useMemo, useState } from "react";

const projects = [
  { type: "AI Agent", title: "Multi-Agent Operations", text: "AI agent untuk input data, rekap, follow-up, dan workflow operasional dalam satu sistem.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=88" },
  { type: "Web App", title: "AI Finance Workspace", text: "Aplikasi keuangan personal dan keluarga dengan insight AI, scan struk, agenda, dan laporan.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=88" },
  { type: "Operations", title: "Rental Control System", text: "Inventaris, transaksi, pelanggan, vendor, quotation, dan monitoring operasional rental.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=88" },
  { type: "Automation", title: "Receipt Intelligence", text: "OCR struk dan bukti transfer, klasifikasi otomatis, sinkronisasi, dan rekap biaya.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=88" },
  { type: "Inventory", title: "Inventory Intelligence", text: "Stok, serial number, status barang, aksesori, dan insight ketersediaan dalam satu dashboard.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=88" },
  { type: "Integration", title: "Connected Business Hub", text: "Hubungkan dashboard, database, Telegram, WhatsApp, dokumen, dan API dalam satu alur.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=88" },
];

const services = [
  ["01", "AI Agent", "Agent AI custom untuk customer support, input data, analisis, ringkasan, dan pekerjaan berulang."],
  ["02", "Custom Application", "Aplikasi web dan dashboard yang dibangun mengikuti proses bisnis, bukan template generik."],
  ["03", "Business Automation", "Otomatisasi pekerjaan berulang, notifikasi, dokumen, approval, dan workflow antar sistem."],
  ["04", "Dashboard & Reporting", "KPI, grafik, laporan, monitoring, pencarian, dan kontrol data dalam satu tempat."],
  ["05", "AI Integration", "Integrasi AI dengan Telegram, WhatsApp, database, API, dokumen, dan sistem internal."],
  ["06", "OCR & Document AI", "Ubah struk, invoice, foto, dan PDF menjadi data terstruktur yang siap dipakai."],
];

function BrandMark() {
  return <span className="brandMark" aria-hidden="true"><i /><b /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.1 });
    nodes.forEach(node => observer.observe(node));

    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const visibleProjects = useMemo(() => filter === "All" ? projects : projects.filter(p => p.type === filter), [filter]);
  const filters = ["All", ...Array.from(new Set(projects.map(p => p.type)))];

  return (
    <main>
      <header className="topbar">
        <div className="page nav">
          <a className="brand" href="#top"><BrandMark /><span>AIORBITLAB</span></a>
          <nav className="desktopNav">
            <a href="#studio">Studio</a><a href="#services">Services</a><a href="#work">Portfolio</a><a href="#process">Process</a>
          </nav>
          <div className="navActions">
            <a className="navGhost" href="#work">View Work</a>
            <a className="navSolid" href="#contact">Start Project ↗</a>
            <button className="menuButton" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">{menuOpen ? "×" : "☰"}</button>
          </div>
          <div className={`mobileNav ${menuOpen ? "open" : ""}`}>
            {[["Studio", "#studio"], ["Services", "#services"], ["Portfolio", "#work"], ["Process", "#process"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </div>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="heroBackdrop"><img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=92" alt="Digital world" /></div>
        <div className="heroNoise" />
        <div className="page heroGrid">
          <div className="heroCopy reveal show">
            <p className="eyebrow"><span /> AI systems for modern business</p>
            <h1>Build a business that <em>thinks.</em></h1>
            <p className="heroLead">AIORBITLAB merancang AI Agent, aplikasi custom, automasi, dashboard, OCR, dan integrasi yang benar-benar bekerja di operasional harian.</p>
            <div className="heroButtons">
              <a className="button light" href="#work">Explore Portfolio ↗</a>
              <a className="button glass" href="#services">What We Build</a>
            </div>
            <div className="heroMeta"><span>AI AGENT</span><span>AUTOMATION</span><span>APPLICATION</span><span>INTEGRATION</span></div>
          </div>

          <div className="heroVisual reveal show">
            <div className="visualMain">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1500&q=90" alt="AI analytics dashboard" />
              <div className="visualShade" />
              <div className="screenUI">
                <div className="uiTop"><span>AIORBITLAB / COMMAND CENTER</span><b>● LIVE</b></div>
                <h3>Operations Intelligence</h3>
                <p>Agents · automations · integrations · reporting</p>
                <div className="uiChart"><i /><i /><i /><i /><i /><i /><i /><i /></div>
                <div className="uiStats"><div><small>Agents</small><strong>12</strong></div><div><small>Flows</small><strong>28</strong></div><div><small>Success</small><strong>98%</strong></div></div>
              </div>
            </div>
            <div className="floatCard fc1"><small>AI AGENT</small><b>05 Active</b><span>Automate · Decide · Act</span></div>
            <div className="floatCard fc2"><small>WORKFLOW</small><b>Running 24/7</b><span>Connected systems</span></div>
            <div className="floatCard fc3"><small>IMPACT</small><b>+230%</b><span>Operational visibility</span></div>
          </div>
        </div>
        <div className="scrollLine">SCROLL TO EXPLORE</div>
      </section>

      <section className="ticker"><div>AI AGENT · AUTOMATION · WEB APP · DASHBOARD · OCR · DATABASE · TELEGRAM · WHATSAPP · API · AI AGENT · AUTOMATION · WEB APP · DASHBOARD · OCR · DATABASE · TELEGRAM · WHATSAPP · API · </div></section>

      <section id="studio" className="page manifesto reveal">
        <p className="miniLabel">/ THE STUDIO</p>
        <div>
          <h2>Not another AI demo.<br />We build <em>working systems.</em></h2>
          <p>Desain yang bagus memang penting. Tapi setelah tampilannya selesai, sistem harus tetap berguna: menerima data, memprosesnya, menyimpan hasil, memberi insight, lalu membantu tim mengambil tindakan.</p>
        </div>
      </section>

      <section className="page mosaic">
        <article className="tile tall reveal"><img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1500&q=88" alt="Artificial intelligence" /><div><small>01 / INTELLIGENCE</small><h3>AI that understands the work.</h3><p>Agent dengan konteks, tools, dan workflow yang jelas.</p></div></article>
        <article className="tile reveal"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=88" alt="Application development" /><div><small>02 / APPLICATION</small><h3>Built around your workflow.</h3></div></article>
        <article className="tile reveal"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=88" alt="Automation technology" /><div><small>03 / AUTOMATION</small><h3>Connect repetitive work.</h3></div></article>
        <article className="tile wide reveal"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=88" alt="Business team" /><div><small>04 / HUMAN + AI</small><h3>Technology should make teams easier to run.</h3><p>Less friction. Better visibility. Faster action.</p></div></article>
      </section>

      <section id="services" className="servicesSection">
        <div className="page">
          <div className="sectionHead reveal">
            <div><p className="miniLabel dark">/ CAPABILITIES</p><h2>Everything needed to build <em>smarter operations.</em></h2></div>
            <p>Mulai dari satu AI Agent sampai sistem bisnis lengkap yang menghubungkan dashboard, database, bot, dokumen, dan API.</p>
          </div>
          <div className="serviceList">
            {services.map(([num, title, text]) => <article className="serviceRow reveal" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p><a href="#contact">↗</a></article>)}
          </div>
        </div>
      </section>

      <section className="caseSection">
        <div className="page caseCard reveal">
          <div className="caseImage"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=88" alt="Business workflow" /></div>
          <div className="caseCopy">
            <p className="miniLabel">/ DESIGNED FOR REAL TEAMS</p>
            <h2>One system.<br /><em>Less friction.</em></h2>
            <p>Antarmuka dibuat sederhana. Di belakangnya, sistem bisa menghubungkan AI, database, Telegram, WhatsApp, laporan, dokumen, dan workflow lain yang dibutuhkan.</p>
            <div className="tags"><span>AI Agent</span><span>Responsive Web</span><span>Automation</span><span>Database</span><span>API</span></div>
          </div>
        </div>
      </section>

      <section id="work" className="page workSection">
        <div className="workHead reveal"><div><p className="miniLabel">/ SELECTED SYSTEMS</p><h2>Portfolio</h2></div><div className="filters">{filters.map(item => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div>
        <div className="projectGrid">
          {visibleProjects.map((project, index) => <article className={`project reveal ${index % 3 === 0 ? "large" : ""}`} key={project.title}><img src={project.image} alt={project.title} /><div className="projectShade" /><div className="projectInfo"><small>{project.type.toUpperCase()}</small><h3>{project.title}</h3><p>{project.text}</p><a href="#contact">Discuss Similar Project ↗</a></div></article>)}
        </div>
      </section>

      <section className="page metrics reveal">
        <div><strong>AI</strong><span>built into the workflow</span></div><div><strong>24/7</strong><span>automation-ready systems</span></div><div><strong>1</strong><span>connected source of truth</span></div><div><strong>∞</strong><span>room to keep scaling</span></div>
      </section>

      <section id="process" className="page processSection">
        <div className="sectionHead darkHead reveal"><div><p className="miniLabel">/ PROCESS</p><h2>From idea to <em>production.</em></h2></div><p>Setiap tahap dibuat jelas supaya keputusan UI, database, integrasi, dan AI tidak berantakan saat sistem berkembang.</p></div>
        <div className="steps">
          {[["01", "Discover", "Petakan masalah, proses, data, dan target yang paling penting."], ["02", "Design", "Susun pengalaman pengguna, struktur data, integrasi, dan alur AI."], ["03", "Build", "Kembangkan sistem responsif dengan struktur yang mudah ditingkatkan."], ["04", "Launch", "Deploy, uji alur utama, ukur hasil, lalu iterasi berdasarkan kebutuhan."]].map(([num, title, text]) => <article className="step reveal" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section id="contact" className="page contactSection">
        <div className="contactCard reveal">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=92" alt="Digital network" />
          <div className="contactShade" />
          <div className="contactContent"><p className="miniLabel">/ START BUILDING</p><h2>Turn your workflow into a <em>smart system.</em></h2><p>Ceritakan bagian bisnis yang masih manual, lambat, atau sulit dipantau. Dari situ kita bisa merancang sistem yang benar-benar berguna.</p><a className="button light" href="mailto:hello@aiorbitlab.com">Start a Project ↗</a></div>
        </div>
      </section>

      <footer className="footer">
        <div className="page footerGrid">
          <div><a className="brand" href="#top"><BrandMark /><span>AIORBITLAB</span></a><p>AI Agent, aplikasi custom, automation, dashboard, OCR, dan integration untuk bisnis modern.</p></div>
          <div><h4>Explore</h4><a href="#studio">Studio</a><a href="#services">Services</a><a href="#work">Portfolio</a><a href="#process">Process</a></div>
          <div><h4>Solutions</h4><a href="#services">AI Agent</a><a href="#services">Automation</a><a href="#services">Dashboard</a><a href="#services">OCR</a></div>
          <div><h4>Contact</h4><a href="mailto:hello@aiorbitlab.com">hello@aiorbitlab.com</a><p>Indonesia</p></div>
        </div>
        <div className="page footerBottom"><span>© 2026 AIORBITLAB</span><span>Ideas × AI × Real Impact</span></div>
      </footer>
    </main>
  );
}
