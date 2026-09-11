"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./admin.module.css";
import { cmsAuthed, cmsGetSession, cmsSignIn, cmsSignOut, cmsUploadImage } from "@/lib/cms";

type Site = {
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

type Service = { id: number; sort_order: number; title: string; description: string; active: boolean };
type Project = { id: number; sort_order: number; category: string; title: string; description: string; image_url: string; active: boolean };
type TerminalLine = { id: number; sort_order: number; line_text: string; tone: "normal" | "ok" | "active"; active: boolean };
type Session = ReturnType<typeof cmsGetSession> extends infer T ? Exclude<T, null> : never;

const emptySite: Site = {
  id: 1,
  hero_eyebrow: "",
  hero_title: "",
  hero_highlight: "",
  hero_description: "",
  hero_image: "",
  primary_cta_label: "",
  primary_cta_url: "",
  secondary_cta_label: "",
  secondary_cta_url: "",
  contact_title: "",
  contact_description: "",
  contact_email: "",
};

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"site" | "services" | "projects" | "terminal">("site");
  const [site, setSite] = useState<Site>(emptySite);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [terminal, setTerminal] = useState<TerminalLine[]>([]);

  useEffect(() => {
    const saved = cmsGetSession();
    if (saved) verifyAndLoad(saved);
    else setLoading(false);
  }, []);

  async function verifyAndLoad(next: Session) {
    setLoading(true);
    setError("");
    try {
      if (!next.user?.id) throw new Error("Session tidak valid.");
      const admin = await cmsAuthed<{ user_id: string }[]>("cms_admins", "GET", next, `user_id=eq.${next.user.id}&select=user_id`);
      if (!admin.length) throw new Error("Akun ini belum diberi akses CMS.");
      setSession(next);
      setAuthorized(true);
      await loadAll(next);
    } catch (e) {
      setAuthorized(false);
      setSession(null);
      cmsSignOut();
      setError(e instanceof Error ? e.message : "Gagal membuka CMS.");
    } finally {
      setLoading(false);
    }
  }

  async function loadAll(s: Session) {
    const [siteRows, serviceRows, projectRows, terminalRows] = await Promise.all([
      cmsAuthed<Site[]>("cms_site", "GET", s, "id=eq.1&select=*"),
      cmsAuthed<Service[]>("cms_services", "GET", s, "select=*&order=sort_order.asc,id.asc"),
      cmsAuthed<Project[]>("cms_projects", "GET", s, "select=*&order=sort_order.asc,id.asc"),
      cmsAuthed<TerminalLine[]>("cms_terminal_lines", "GET", s, "select=*&order=sort_order.asc,id.asc"),
    ]);
    if (siteRows[0]) setSite(siteRows[0]);
    setServices(serviceRows);
    setProjects(projectRows);
    setTerminal(terminalRows);
  }

  async function login(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const next = await cmsSignIn(email.trim(), password);
      await verifyAndLoad(next as Session);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login gagal.");
      setLoading(false);
    }
  }

  function logout() {
    cmsSignOut();
    setSession(null);
    setAuthorized(false);
    setPassword("");
    setMessage("");
  }

  async function saveSite() {
    if (!session) return;
    setMessage(""); setError("");
    try {
      const body = { ...site, updated_at: new Date().toISOString() } as Record<string, unknown>;
      delete body.id;
      await cmsAuthed("cms_site", "PATCH", session, "id=eq.1", body);
      setMessage("Konten beranda berhasil disimpan.");
    } catch (e) { setError(e instanceof Error ? e.message : "Gagal menyimpan."); }
  }

  async function uploadHero(file?: File) {
    if (!session || !file) return;
    setMessage("Mengupload foto...");
    try {
      const url = await cmsUploadImage(file, session);
      setSite(v => ({ ...v, hero_image: url }));
      setMessage("Foto terupload. Klik Simpan Perubahan untuk menerapkannya.");
    } catch (e) { setError(e instanceof Error ? e.message : "Upload gagal."); }
  }

  async function saveService(item: Service) {
    if (!session) return;
    const { id, ...body } = item;
    await cmsAuthed("cms_services", "PATCH", session, `id=eq.${id}`, body);
    setMessage(`Layanan “${item.title}” disimpan.`);
  }

  async function addService() {
    if (!session) return;
    await cmsAuthed("cms_services", "POST", session, "", { sort_order: services.length + 1, title: "Layanan Baru", description: "Deskripsi layanan.", active: true });
    await loadAll(session);
  }

  async function deleteService(id: number) {
    if (!session || !confirm("Hapus layanan ini?")) return;
    await cmsAuthed("cms_services", "DELETE", session, `id=eq.${id}`);
    setServices(v => v.filter(x => x.id !== id));
  }

  async function saveProject(item: Project) {
    if (!session) return;
    const { id, ...body } = item;
    await cmsAuthed("cms_projects", "PATCH", session, `id=eq.${id}`, body);
    setMessage(`Portfolio “${item.title}” disimpan.`);
  }

  async function addProject() {
    if (!session) return;
    await cmsAuthed("cms_projects", "POST", session, "", { sort_order: projects.length + 1, category: "AI Agent", title: "Project Baru", description: "Deskripsi project.", image_url: "", active: true });
    await loadAll(session);
  }

  async function deleteProject(id: number) {
    if (!session || !confirm("Hapus project ini?")) return;
    await cmsAuthed("cms_projects", "DELETE", session, `id=eq.${id}`);
    setProjects(v => v.filter(x => x.id !== id));
  }

  async function uploadProject(id: number, file?: File) {
    if (!session || !file) return;
    setMessage("Mengupload foto portfolio...");
    try {
      const url = await cmsUploadImage(file, session);
      setProjects(v => v.map(p => p.id === id ? { ...p, image_url: url } : p));
      setMessage("Foto terupload. Klik Simpan pada project untuk menerapkannya.");
    } catch (e) { setError(e instanceof Error ? e.message : "Upload gagal."); }
  }

  async function saveTerminal(item: TerminalLine) {
    if (!session) return;
    const { id, ...body } = item;
    await cmsAuthed("cms_terminal_lines", "PATCH", session, `id=eq.${id}`, body);
    setMessage("Baris terminal disimpan.");
  }

  async function addTerminal() {
    if (!session) return;
    await cmsAuthed("cms_terminal_lines", "POST", session, "", { sort_order: terminal.length + 1, line_text: "agent.action → new workflow step", tone: "normal", active: true });
    await loadAll(session);
  }

  async function deleteTerminal(id: number) {
    if (!session || !confirm("Hapus baris terminal ini?")) return;
    await cmsAuthed("cms_terminal_lines", "DELETE", session, `id=eq.${id}`);
    setTerminal(v => v.filter(x => x.id !== id));
  }

  if (loading && !authorized) return <main className={styles.page}><div className={styles.login}><div className={styles.loginCard}><h1>AIORBITLAB CMS</h1><p>Membuka dashboard...</p></div></div></main>;

  if (!authorized || !session) {
    return <main className={styles.page}><div className={styles.login}><form className={styles.loginCard} onSubmit={login}>
      <div className={styles.logo}>AI</div>
      <h1>AIORBITLAB CMS</h1>
      <p>Login dengan akun yang sudah terdaftar. CMS ini digunakan untuk mengubah website production tanpa edit kode.</p>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.loginForm}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button disabled={loading}>{loading ? "Masuk..." : "Masuk CMS"}</button>
      </div>
      <div className={styles.footerNote}>Akses edit dilindungi Supabase Auth + Row Level Security.</div>
    </form></div></main>;
  }

  return <main className={styles.page}><div className={styles.shell}>
    <div className={styles.top}>
      <div className={styles.brand}><div className={styles.logo}>AI</div><div><h1>AIORBITLAB CMS</h1><p>Content & Portfolio Manager</p></div></div>
      <div className={styles.actions}><a className={styles.ghost} href="/" target="_blank">Lihat Website ↗</a><button className={styles.ghost} onClick={logout}>Keluar</button></div>
    </div>

    <div className={styles.tabs}>
      {[["site","Beranda"],["services","Layanan"],["projects","Portfolio"],["terminal","AI Terminal"]].map(([key,label]) => <button key={key} className={`${styles.tab} ${tab === key ? styles.active : ""}`} onClick={() => setTab(key as typeof tab)}>{label}</button>)}
    </div>

    {message && <div className={styles.notice}>{message}</div>}
    {error && <div className={styles.error}>{error}</div>}

    {tab === "site" && <section className={styles.panel}>
      <div className={styles.panelTitle}><div><h2>Beranda & Kontak</h2><p>Edit hero utama, tombol CTA, foto, dan kontak.</p></div><button className={styles.button} onClick={saveSite}>Simpan Perubahan</button></div>
      <div className={styles.grid}>
        <Field label="Eyebrow" value={site.hero_eyebrow} onChange={v => setSite({ ...site, hero_eyebrow: v })} />
        <Field label="Judul Utama" value={site.hero_title} onChange={v => setSite({ ...site, hero_title: v })} />
        <Field label="Highlight Judul" value={site.hero_highlight} onChange={v => setSite({ ...site, hero_highlight: v })} />
        <div className={`${styles.field} ${styles.full}`}><label>Deskripsi Hero</label><textarea value={site.hero_description} onChange={e => setSite({ ...site, hero_description: e.target.value })} /></div>
        <div className={`${styles.field} ${styles.full}`}><label>Foto Hero</label>{site.hero_image && <div className={styles.preview}><img src={site.hero_image} alt="Hero preview" /></div>}<div className={styles.upload}><input className={styles.file} type="file" accept="image/*" onChange={e => uploadHero(e.target.files?.[0])} /><input value={site.hero_image} onChange={e => setSite({ ...site, hero_image: e.target.value })} placeholder="Atau tempel URL foto" /></div></div>
        <Field label="Tombol Utama" value={site.primary_cta_label} onChange={v => setSite({ ...site, primary_cta_label: v })} />
        <Field label="Link Tombol Utama" value={site.primary_cta_url} onChange={v => setSite({ ...site, primary_cta_url: v })} />
        <Field label="Tombol Kedua" value={site.secondary_cta_label} onChange={v => setSite({ ...site, secondary_cta_label: v })} />
        <Field label="Link Tombol Kedua" value={site.secondary_cta_url} onChange={v => setSite({ ...site, secondary_cta_url: v })} />
        <div className={`${styles.field} ${styles.full}`}><label>Judul CTA Bawah</label><textarea value={site.contact_title} onChange={e => setSite({ ...site, contact_title: e.target.value })} /></div>
        <div className={`${styles.field} ${styles.full}`}><label>Deskripsi CTA Bawah</label><textarea value={site.contact_description} onChange={e => setSite({ ...site, contact_description: e.target.value })} /></div>
        <Field label="Email Kontak" value={site.contact_email} onChange={v => setSite({ ...site, contact_email: v })} type="email" />
      </div>
      <div className={styles.saveRow}><button className={styles.button} onClick={saveSite}>Simpan Perubahan</button></div>
    </section>}

    {tab === "services" && <section className={styles.panel}>
      <div className={styles.panelTitle}><div><h2>Layanan</h2><p>Tambah, edit, urutkan, tampilkan atau sembunyikan layanan.</p></div><button className={styles.button} onClick={addService}>+ Tambah Layanan</button></div>
      <div className={styles.list}>{services.map((item, index) => <div className={styles.item} key={item.id}>
        <div className={styles.itemTop}><strong>{item.title || `Layanan ${index + 1}`}</strong><div className={styles.itemActions}><button className={styles.ghost} onClick={() => saveService(item)}>Simpan</button><button className={styles.danger} onClick={() => deleteService(item.id)}>Hapus</button></div></div>
        <div className={styles.grid}><Field label="Urutan" type="number" value={String(item.sort_order)} onChange={v => setServices(x => x.map(s => s.id === item.id ? { ...s, sort_order: Number(v) } : s))} /><Field label="Judul" value={item.title} onChange={v => setServices(x => x.map(s => s.id === item.id ? { ...s, title: v } : s))} /><div className={`${styles.field} ${styles.full}`}><label>Deskripsi</label><textarea value={item.description} onChange={e => setServices(x => x.map(s => s.id === item.id ? { ...s, description: e.target.value } : s))} /></div><label className={styles.switch}><input type="checkbox" checked={item.active} onChange={e => setServices(x => x.map(s => s.id === item.id ? { ...s, active: e.target.checked } : s))} />Tampilkan di website</label></div>
      </div>)}</div>
    </section>}

    {tab === "projects" && <section className={styles.panel}>
      <div className={styles.panelTitle}><div><h2>Portfolio</h2><p>Kelola project, kategori, deskripsi, dan foto portfolio.</p></div><button className={styles.button} onClick={addProject}>+ Tambah Project</button></div>
      <div className={styles.list}>{projects.map(item => <div className={styles.item} key={item.id}>
        <div className={styles.itemTop}><strong>{item.title}</strong><div className={styles.itemActions}><button className={styles.ghost} onClick={() => saveProject(item)}>Simpan</button><button className={styles.danger} onClick={() => deleteProject(item.id)}>Hapus</button></div></div>
        {item.image_url && <div className={styles.preview}><img src={item.image_url} alt={item.title} /></div>}
        <div className={styles.grid}><Field label="Urutan" type="number" value={String(item.sort_order)} onChange={v => setProjects(x => x.map(p => p.id === item.id ? { ...p, sort_order: Number(v) } : p))} /><Field label="Kategori" value={item.category} onChange={v => setProjects(x => x.map(p => p.id === item.id ? { ...p, category: v } : p))} /><Field label="Judul" value={item.title} onChange={v => setProjects(x => x.map(p => p.id === item.id ? { ...p, title: v } : p))} /><div className={`${styles.field} ${styles.full}`}><label>Deskripsi</label><textarea value={item.description} onChange={e => setProjects(x => x.map(p => p.id === item.id ? { ...p, description: e.target.value } : p))} /></div><div className={`${styles.field} ${styles.full}`}><label>Foto</label><div className={styles.upload}><input type="file" accept="image/*" onChange={e => uploadProject(item.id, e.target.files?.[0])} /><input value={item.image_url} onChange={e => setProjects(x => x.map(p => p.id === item.id ? { ...p, image_url: e.target.value } : p))} placeholder="Atau tempel URL foto" /></div></div><label className={styles.switch}><input type="checkbox" checked={item.active} onChange={e => setProjects(x => x.map(p => p.id === item.id ? { ...p, active: e.target.checked } : p))} />Tampilkan di website</label></div>
      </div>)}</div>
    </section>}

    {tab === "terminal" && <section className={styles.panel}>
      <div className={styles.panelTitle}><div><h2>AI Agent Terminal</h2><p>Edit log yang tampil pada animasi terminal AI Agent.</p></div><button className={styles.button} onClick={addTerminal}>+ Tambah Baris</button></div>
      <div className={styles.list}>{terminal.map(item => <div className={styles.item} key={item.id}>
        <div className={styles.itemTop}><strong>#{item.sort_order}</strong><div className={styles.itemActions}><button className={styles.ghost} onClick={() => saveTerminal(item)}>Simpan</button><button className={styles.danger} onClick={() => deleteTerminal(item.id)}>Hapus</button></div></div>
        <div className={styles.grid}><Field label="Urutan" type="number" value={String(item.sort_order)} onChange={v => setTerminal(x => x.map(t => t.id === item.id ? { ...t, sort_order: Number(v) } : t))} /><div className={styles.field}><label>Warna</label><select value={item.tone} onChange={e => setTerminal(x => x.map(t => t.id === item.id ? { ...t, tone: e.target.value as TerminalLine["tone"] } : t))}><option value="normal">Normal</option><option value="ok">Success</option><option value="active">Active / Bronze</option></select></div><div className={`${styles.field} ${styles.full}`}><label>Isi Terminal</label><textarea value={item.line_text} onChange={e => setTerminal(x => x.map(t => t.id === item.id ? { ...t, line_text: e.target.value } : t))} /></div><label className={styles.switch}><input type="checkbox" checked={item.active} onChange={e => setTerminal(x => x.map(t => t.id === item.id ? { ...t, active: e.target.checked } : t))} />Tampilkan</label></div>
      </div>)}</div>
    </section>}
  </div></main>;
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <div className={styles.field}><label>{label}</label><input type={type} value={value} onChange={e => onChange(e.target.value)} /></div>;
}
