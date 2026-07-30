import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import {
  Home, Briefcase, Layers, Cpu, FileText, MessageSquare, Building2, Users,
  Shield, Mail, Image as ImageIcon, FolderOpen, Newspaper, Settings,
  TrendingUp, Save, Search, Bell, ChevronDown, Plus, MoreVertical,
  ArrowUpRight, ArrowDownRight, Menu, UserPlus, FilePlus, Layers3,
  BarChart3, Star, X
} from "lucide-react";

const navGroups = [
  {
    label: null,
    items: [{ key: "dashboard", label: "Tableau de bord", icon: Home }],
  },
  {
    label: "Gestion",
    items: [
      { key: "projets", label: "Projets", icon: Briefcase },
      { key: "services", label: "Services", icon: Layers },
      { key: "technologies", label: "Technologies", icon: Cpu },
      { key: "blog", label: "Blog", icon: FileText },
      { key: "temoignages", label: "Témoignages", icon: Star },
      { key: "partenaires", label: "Partenaires", icon: Building2 },
      { key: "equipe", label: "Équipe", icon: Users },
    ],
  },
  {
    label: "Utilisateurs",
    items: [
      { key: "utilisateurs", label: "Utilisateurs", icon: Users },
      { key: "roles", label: "Rôles & Permissions", icon: Shield },
      { key: "demandes", label: "Demandes de contact", icon: Mail, badge: 5 },
    ],
  },
  {
    label: "Contenu",
    items: [
      { key: "pages", label: "Pages", icon: FileText },
      { key: "medias", label: "Médias", icon: ImageIcon },
      { key: "documents", label: "Documents", icon: FolderOpen },
      { key: "actualites", label: "Actualités", icon: Newspaper },
    ],
  },
  {
    label: "Paramètres",
    items: [
      { key: "reglages", label: "Réglages", icon: Settings },
      { key: "seo", label: "SEO & Analytics", icon: TrendingUp },
      { key: "sauvegardes", label: "Sauvegardes", icon: Save },
    ],
  },
];

const overviewData = [
  { day: "20 Mai", Visites: 1850, Utilisateurs: 820, Demandes: 22 },
  { day: "21 Mai", Visites: 2320, Utilisateurs: 980, Demandes: 28 },
  { day: "22 Mai", Visites: 2080, Utilisateurs: 900, Demandes: 24 },
  { day: "23 Mai", Visites: 2150, Utilisateurs: 1125, Demandes: 32 },
  { day: "24 Mai", Visites: 1920, Utilisateurs: 860, Demandes: 20 },
  { day: "25 Mai", Visites: 2010, Utilisateurs: 890, Demandes: 26 },
  { day: "26 Mai", Visites: 2200, Utilisateurs: 940, Demandes: 30 },
];

const donutData = [
  { name: "En cours", value: 10, pct: "41.7%", color: "#2563eb" },
  { name: "Terminés", value: 8, pct: "33.3%", color: "#16a34a" },
  { name: "En attente", value: 4, pct: "16.7%", color: "#f97316" },
  { name: "Annulés", value: 2, pct: "8.3%", color: "#dc2626" },
];

const visitsBarData = [
  { day: "20 Mai", visites: 2020 },
  { day: "21 Mai", visites: 2380 },
  { day: "22 Mai", visites: 2260 },
  { day: "23 Mai", visites: 2650 },
  { day: "24 Mai", visites: 2180 },
  { day: "25 Mai", visites: 2090 },
  { day: "26 Mai", visites: 2458 },
];

const recentProjects = [
  { name: "Plateforme Santé Connect", status: "En cours", lead: "Jean K.", date: "26/05/2026" },
  { name: "Refonte Site UniBénin", status: "En cours", lead: "Mariam T.", date: "25/05/2026" },
  { name: "Marketplace Yévé Market", status: "Terminé", lead: "Carlos D.", date: "23/05/2026" },
  { name: "Solution e-Gouvernement", status: "En attente", lead: "Cédric A.", date: "22/05/2026" },
  { name: "Application Mobile BDH", status: "En cours", lead: "Sophie M.", date: "21/05/2026" },
];

const statusStyle = {
  "En cours": "bg-blue-50 text-blue-700",
  "Terminé": "bg-green-50 text-green-700",
  "En attente": "bg-orange-50 text-orange-700",
  "Annulé": "bg-red-50 text-red-700",
};

const activities = [
  { icon: FilePlus, color: "bg-blue-100 text-blue-600", text: "Nouveau projet ajouté : Plateforme e-Learning", time: "Il y a 25 min" },
  { icon: Layers3, color: "bg-violet-100 text-violet-600", text: "Mariam T. a mis à jour le projet Refonte Site UniBénin", time: "Il y a 1h" },
  { icon: Newspaper, color: "bg-green-100 text-green-600", text: "Nouvel article publié : L'IA au service du Bénin", time: "Il y a 3h" },
  { icon: Cpu, color: "bg-orange-100 text-orange-600", text: "Carlos D. a ajouté une nouvelle technologie", time: "Il y a 5h" },
  { icon: Mail, color: "bg-pink-100 text-pink-600", text: "Nouvelle demande de contact : Entreprise X", time: "Il y a 6h" },
];

const trafficSources = [
  { label: "Recherche Google", pct: 45, color: "bg-blue-500" },
  { label: "Accès direct", pct: 25, color: "bg-green-500" },
  { label: "Réseaux sociaux", pct: 15, color: "bg-violet-500" },
  { label: "Sites référents", pct: 10, color: "bg-orange-500" },
  { label: "Autres", pct: 5, color: "bg-slate-400" },
];

const quickActions = [
  { label: "Ajouter un projet", icon: Plus, color: "text-blue-600" },
  { label: "Ajouter un service", icon: Plus, color: "text-green-600" },
  { label: "Ajouter un article", icon: FileText, color: "text-orange-600" },
  { label: "Ajouter un membre", icon: UserPlus, color: "text-violet-600" },
  { label: "Ajouter une technologie", icon: Cpu, color: "text-pink-600" },
  { label: "Voir les statistiques", icon: BarChart3, color: "text-slate-700" },
];

const alerts = [
  { label: "Demandes de contact non lues", count: 5, tone: "bg-red-50 text-red-600" },
  { label: "Projets en attente de validation", count: 3, tone: "bg-red-50 text-red-600" },
  { label: "Commentaires à approuver", count: 2, tone: "bg-red-50 text-red-600" },
  { label: "Articles non publiés", count: 4, tone: "bg-red-50 text-red-600" },
  { label: "Sauvegarde recommandée", count: null, tone: "bg-amber-50 text-amber-600" },
];

const statCards = [
  { label: "Projets", value: "24", change: "14.3%", up: true, icon: Briefcase, iconBg: "bg-blue-600", spark: "#2563eb" },
  { label: "Services", value: "16", change: "11.2%", up: true, icon: Layers, iconBg: "bg-green-600", spark: "#16a34a" },
  { label: "Utilisateurs", value: "142", change: "7.8%", up: true, icon: Users, iconBg: "bg-orange-500", spark: "#f97316" },
  { label: "Demandes de contact", value: "38", change: "18.6%", up: true, icon: Mail, iconBg: "bg-violet-600", spark: "#7c3aed" },
];

function MiniSpark({ color }) {
  const points = [4, 8, 6, 10, 7, 12, 9, 14, 11, 16];
  const data = points.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-slate-900 text-white rounded-lg px-4 py-3 shadow-lg text-xs space-y-1 min-w-[140px]">
      <div className="font-semibold mb-1">{label} 2026</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            {p.dataKey}
          </span>
          <span className="font-semibold">{p.value.toLocaleString("fr-FR")}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [range, setRange] = useState("7 derniers jours");

  return (
    <div className={`min-h-screen w-full flex bg-slate-50 ${dark ? "dark" : ""}`}>
      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        className={`bg-[#0c1c3d] text-slate-300 flex flex-col shrink-0 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-lg shrink-0">
            <span className="text-blue-600">B</span>
            <span className="text-slate-900">D</span>
            <span className="text-green-600">H</span>
          </div>
          <div className="min-w-0">
            <div className="text-white font-bold text-sm leading-tight truncate">Bénin Digital Hub</div>
            <div className="text-[11px] text-slate-400">Administration</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  {group.label}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = item.key === "dashboard";
                  return (
                    <button
                      key={item.key}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={17} className="shrink-0" />
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] font-bold bg-red-500 text-white rounded-full px-1.5 py-0.5">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5">
            <img
              src="https://i.pravatar.cc/64?img=12"
              className="w-8 h-8 rounded-full object-cover"
              alt="Administrateur"
            />
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm text-white font-semibold truncate">Administrateur</div>
              <div className="text-[11px] text-slate-400 truncate">admin@bdh.tech</div>
            </div>
            <ChevronDown size={15} className="text-slate-500" />
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN ---------------- */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center gap-4 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 shrink-0"
          >
            <Menu size={19} />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher (projets, services, utilisateurs...)"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            />
          </div>
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Basculer le mode sombre"
            >
              <span className="text-lg leading-none">{dark ? "☀️" : "🌙"}</span>
            </button>
            <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                5
              </span>
            </button>
            <button className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100">
              <img
                src="https://i.pravatar.cc/64?img=12"
                className="w-8 h-8 rounded-full object-cover"
                alt="Administrateur"
              />
              <div className="text-left hidden sm:block">
                <div className="text-sm font-semibold text-slate-800 leading-tight">Administrateur</div>
                <div className="text-[11px] text-slate-400 leading-tight">Super Admin</div>
              </div>
              <ChevronDown size={15} className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Bienvenue, Administrateur 👋</h1>
              <p className="text-slate-500 text-sm mt-1">Voici un aperçu des activités de Bénin Digital Hub.</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-4 py-2.5 hover:border-slate-300">
              20 Mai — 26 Mai 2026
              <ChevronDown size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* LEFT / MAIN COLUMN */}
            <div className="lg:col-span-3 space-y-6">
              {/* STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center text-white`}>
                          <Icon size={20} />
                        </div>
                        <MoreVertical size={16} className="text-slate-300" />
                      </div>
                      <div className="text-sm text-slate-500">{s.label}</div>
                      <div className="text-2xl font-bold text-slate-900 mt-0.5">{s.value}</div>
                      <div className="flex items-center gap-1 mt-1.5 text-xs font-semibold text-green-600">
                        <ArrowUpRight size={13} />
                        {s.change}
                        <span className="text-slate-400 font-normal">vs la semaine dernière</span>
                      </div>
                      <div className="mt-2 -mx-1">
                        <MiniSpark color={s.spark} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* OVERVIEW + DONUT */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-900">Vue d'ensemble</h3>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5">
                      {range} <ChevronDown size={13} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mb-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600" />Visites</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-600" />Utilisateurs</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" />Demandes</span>
                  </div>
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={overviewData} margin={{ left: -20, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f6" />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="Visites" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="Utilisateurs" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="Demandes" stroke="#f97316" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col">
                  <h3 className="font-semibold text-slate-900 mb-2">Répartition des projets</h3>
                  <div className="relative flex-1 flex items-center justify-center min-h-[180px]">
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={donutData}
                          dataKey="value"
                          innerRadius={55}
                          outerRadius={78}
                          paddingAngle={2}
                          stroke="none"
                        >
                          {donutData.map((d) => (
                            <Cell key={d.name} fill={d.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-bold text-slate-900">24</span>
                      <span className="text-xs text-slate-400">Total</span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    {donutData.map((d) => (
                      <div key={d.name} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                          {d.name}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {d.value} <span className="text-slate-300">({d.pct})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <a href="#" className="flex items-center gap-1 text-blue-600 text-sm font-medium mt-4">
                    Voir tous les projets <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* PROJECTS TABLE + ACTIVITIES + TRAFFIC */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Derniers projets</h3>
                    <a href="#" className="text-xs font-medium text-blue-600 flex items-center gap-1">Voir tous <ArrowUpRight size={12} /></a>
                  </div>
                  <div className="space-y-4">
                    {recentProjects.map((p) => (
                      <div key={p.name} className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/64?u=${p.lead}`} className="w-8 h-8 rounded-full shrink-0" alt={p.lead} />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-slate-800 truncate">{p.name}</div>
                          <div className="text-xs text-slate-400">{p.lead} · {p.date}</div>
                        </div>
                        <span className={`text-[11px] font-semibold px-2 py-1 rounded-md shrink-0 ${statusStyle[p.status]}`}>
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Activités récentes</h3>
                    <a href="#" className="text-xs font-medium text-blue-600 flex items-center gap-1">Voir tout <ArrowUpRight size={12} /></a>
                  </div>
                  <div className="space-y-4">
                    {activities.map((a, i) => {
                      const Icon = a.icon;
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.color}`}>
                            <Icon size={15} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm text-slate-700 leading-snug">{a.text}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{a.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900 mb-4">Sources de trafic</h3>
                  <div className="space-y-4">
                    {trafficSources.map((t) => (
                      <div key={t.label}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-slate-600">{t.label}</span>
                          <span className="text-slate-400">{t.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SITE VISITS */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Visites du site</h3>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5">
                    7 derniers jours <ChevronDown size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-center">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={visitsBarData} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f6" />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: "#f1f5f9" }} content={<CustomTooltip />} />
                      <Bar dataKey="visites" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5 lg:border-l lg:pl-6 border-slate-100">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Total visites</div>
                      <div className="text-2xl font-bold text-slate-900">2,458</div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-green-600 mt-1">
                        <ArrowUpRight size={12} /> 12.4% <span className="text-slate-400 font-normal">vs la semaine dernière</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Pages vues</div>
                      <div className="text-2xl font-bold text-slate-900">6,842</div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-green-600 mt-1">
                        <ArrowUpRight size={12} /> 10.1%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Taux de rebond</div>
                      <div className="text-2xl font-bold text-slate-900">36.7%</div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1">
                        <ArrowDownRight size={12} /> 2.3%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-4">Actions rapides</h3>
                <div className="space-y-1.5">
                  {quickActions.map((a) => {
                    const Icon = a.icon;
                    return (
                      <button
                        key={a.label}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100"
                      >
                        <Icon size={16} className={a.color} />
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-4">Alertes</h3>
                <div className="space-y-1">
                  {alerts.map((a) => (
                    <div key={a.label} className="flex items-center justify-between px-1 py-2.5 border-b last:border-b-0 border-slate-100">
                      <span className="text-sm text-slate-600">{a.label}</span>
                      {a.count ? (
                        <span className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 ${a.tone}`}>
                          {a.count}
                        </span>
                      ) : (
                        <span className={`text-xs font-bold rounded-full px-2 py-0.5 shrink-0 ${a.tone}`}>!</span>
                      )}
                    </div>
                  ))}
                </div>
                <a href="#" className="flex items-center gap-1 text-blue-600 text-sm font-medium mt-4">
                  Voir toutes les alertes <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
