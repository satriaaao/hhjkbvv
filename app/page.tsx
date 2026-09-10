"use client";

import { useEffect, useState } from "react";

const services = [
  {
    icon: "✦",
    title: "AI Agent",
    text: "Agent AI yang membaca data, memahami konteks, lalu menjalankan pekerjaan berulang secara otomatis.",
    meta: "Automation · Memory · Tools",
  },
  {
    icon: "◫",
    title: "Custom App",
    text: "Aplikasi web dan dashboard custom yang mengikuti alur operasional bisnis Anda.",
    meta: "Next.js · React · TypeScript",
  },
  {
    icon: "↗",
    title: "Automation",
    text: "Hubungkan proses manual menjadi workflow otomatis yang lebih cepat dan konsisten.",
    meta: "API · Webhook · Workflow",
  },
  {
    icon: "◎",
    title: "AI Integration",
    text: "Integrasi OCR, Vision, LLM, chatbot, pencarian cerdas, dan analitik AI ke sistem internal.",
    meta: "LLM · OCR · Vision",
  },
];

const advantages = [
  ["01", "Custom Workflow", "Dibangun mengikuti proses bisnis, bukan template generik."],
  ["02", "Fast & Responsive", "UI cepat, mobile-first, dan nyaman dipakai sehari-hari."],
  ["03", "Secure System", "Arsitektur modern dengan pemisahan data dan akses yang jelas."],
  ["04", "Scalable", "Mudah dikembangkan saat tim, data, dan kebutuhan bisnis bertambah."],
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-core" />
      <span className="brand-orbit" />
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="page-width nav-row">
          <a href="#top" className="brand">
            <BrandMark />
            <span>AIORBITLAB</span>
          </a>

          <nav className="desktop-nav" aria-label="Navigasi utama">
            <a href="#about">Tentang</a>
            <a href="#services">Layanan</a>
            <a href="#process">Cara Kerja</a>
            <a href="#contact">Kontak</a>
          </nav>

          <div className="nav-actions">
            <a href="#contact" className="nav-cta">Mulai Project</a>
            <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Buka menu">
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="page-width mobile-nav">
            {[["Tentang", "#about"], ["Layanan", "#services"], ["Cara Kerja", "#process"], ["Kontak", "#contact"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </div>
        )}
      </header>

      <section id="top" className="hero-section">
        <div className="hero-bg" />
        <div className="hero-shade" />
        <div className="page-width hero-grid">
          <div className="hero-copy reveal">
            <p className="script-label">Intelligent. Elegant. Practical.</p>
            <h1>
              Experience AI
              <span>Like Never Before</span>
            </h1>
            <p className="hero-lead">
              Solusi AI custom untuk bisnis modern — dari agent otomatis, dashboard, integrasi data, sampai workflow yang bekerja 24/7.
            </p>
            <div className="hero-actions">
              <a className="primary-brown" href="#services">Explore Services <span>→</span></a>
              <a className="outline-button" href="#about">Our Story <span>↗</span></a>
            </div>
            <div className="hero-features">
              <div><span className="round-icon">✦</span><p><b>Premium</b><small>Custom System</small></p></div>
              <div><span className="round-icon">◎</span><p><b>Expertly</b><small>Engineered</small></p></div>
              <div><span className="round-icon">♡</span><p><b>Built With</b><small>Care</small></p></div>
            </div>
          </div>

          <div className="hero-visual reveal" aria-label="Visual AI system">
            <div className="hero-orb">
              <div className="hero-orb-core" />
              <div className="hero-orbit-ring ring-one"><i /></div>
              <div className="hero-orbit-ring ring-two"><i /></div>
            </div>
            <div className="floating-panel panel-a">
              <small>AI Agent</small>
              <strong>Operational</strong>
              <span>● Live</span>
            </div>
            <div className="floating-panel panel-b">
              <small>Automation</small>
              <strong>24 / 7</strong>
              <span>Running</span>
            </div>
            <div className="hero-dashboard">
              <div className="dash-top"><span>AIORBITLAB SYSTEM</span><b>LIVE</b></div>
              <div className="dash-grid">
                <div><small>Tasks</small><strong>1,248</strong></div>
                <div><small>Success</small><strong>98.7%</strong></div>
              </div>
              <div className="dash-line"><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section section-space">
        <div className="page-width about-grid">
          <div className="about-image reveal">
            <div className="about-image-glow" />
            <div className="device-frame">
              <div className="device-top"><i /><i /><i /></div>
              <div className="device-screen">
                <div className="screen-label">AI OPERATIONS</div>
                <div className="screen-stat"><span>Realtime activity</span><b>+42%</b></div>
                <div className="screen-bars"><i /><i /><i /><i /><i /><i /></div>
                <div className="screen-rows"><p /><p /><p /></div>
              </div>
            </div>
          </div>

          <div className="about-copy reveal">
            <p className="script-label">About Us</p>
            <h2>More Than Just <span>an AI System</span></h2>
            <p>
              AIORBITLAB membangun sistem yang menggabungkan desain, software, data, dan AI menjadi workflow yang bisa benar-benar digunakan tim Anda setiap hari.
            </p>
            <div className="check-list">
              <span>✦ Business-first architecture</span>
              <span>✦ Modern UI & responsive experience</span>
              <span>✦ AI automation & integrations</span>
              <span>✦ Production-ready development</span>
            </div>
            <a className="primary-brown compact" href="#process">Learn More <span>→</span></a>
          </div>
        </div>
      </section>

      <section id="services" className="services-section section-space">
        <div className="page-width">
          <div className="section-heading reveal">
            <p className="script-label">Our Signature</p>
            <h2>Popular Solutions</h2>
          </div>

          <div className="service-grid">
            {services.map((item, index) => (
              <article className="service-card reveal" key={item.title}>
                <div className="service-art">
                  <span className="service-number">0{index + 1}</span>
                  <div className="service-symbol">{item.icon}</div>
                  <div className="service-ring" />
                </div>
                <div className="service-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <small>{item.meta}</small>
                  <button className="circle-action" aria-label={`Lihat ${item.title}`}>↗</button>
                </div>
              </article>
            ))}
          </div>

          <div className="center-button reveal">
            <a href="#contact" className="outline-button">View All Services <span>→</span></a>
          </div>
        </div>
      </section>

      <section id="process" className="benefits-section">
        <div className="page-width benefit-strip reveal">
          {advantages.map(([num, title, text]) => (
            <div className="benefit-item" key={title}>
              <span className="benefit-icon">{num}</span>
              <div><strong>{title}</strong><small>{text}</small></div>
            </div>
          ))}
        </div>
      </section>

      <section className="story-section section-space">
        <div className="page-width story-grid">
          <div className="story-copy reveal">
            <p className="script-label">How We Work</p>
            <h2>From Idea to <span>Working System</span></h2>
            <p>Kami mulai dari masalah bisnis, bukan dari teknologi. Setelah alur dipahami, baru kami pilih desain, database, AI, dan automation yang paling tepat.</p>
          </div>
          <div className="story-steps reveal">
            {[
              ["01", "Discover", "Petakan kebutuhan dan workflow."],
              ["02", "Design", "Rancang UI, data, dan arsitektur."],
              ["03", "Build", "Kembangkan sistem modern."],
              ["04", "Launch", "Deploy, uji, dan tingkatkan."],
            ].map(([n, title, text]) => (
              <div key={n}><span>{n}</span><p><b>{title}</b><small>{text}</small></p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section-space">
        <div className="page-width contact-card reveal">
          <div>
            <p className="script-label">Start Your Project</p>
            <h2>Build Something <span>Smarter.</span></h2>
            <p>Ceritakan workflow yang ingin dibuat lebih cepat. Kami bantu ubah menjadi sistem yang rapi dan siap dipakai.</p>
          </div>
          <a href="mailto:hello@aiorbitlab.com" className="primary-brown">Start a Conversation <span>→</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-width footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand"><BrandMark /><span>AIORBITLAB</span></a>
            <p>AI Agent, custom application, automation, dan data intelligence untuk bisnis modern.</p>
            <div className="social-row"><span>in</span><span>ig</span><span>gh</span><span>✦</span></div>
          </div>
          <div><h4>Quick Links</h4><a href="#top">Home</a><a href="#services">Services</a><a href="#about">About Us</a><a href="#process">Process</a></div>
          <div><h4>Solutions</h4><a href="#services">AI Agent</a><a href="#services">Custom App</a><a href="#services">Automation</a><a href="#services">AI Integration</a></div>
          <div><h4>Contact Us</h4><p>hello@aiorbitlab.com</p><p>Indonesia</p><p>Build smarter. Move faster.</p></div>
        </div>
        <div className="page-width footer-bottom"><span>© 2026 AIORBITLAB</span><span>Next.js · React · TypeScript · Tailwind CSS</span></div>
      </footer>
    </main>
  );
}
