"use client";

import { useEffect, useRef } from "react";
import "./bdh.css";

// Supabase (mêmes identifiants que le site en production)
const SUPA_URL = "https://rzibogatodeondtlnepz.supabase.co";
const SUPA_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6aWJvZ2F0b2Rlb25kdGxuZXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MTU4NTksImV4cCI6MjA5Njk5MTg1OX0.iKGsoabgJPpRLXW7aQ0ooKu_HB5ncnqkOtPA1pp9kjc";
// ⚠️ À terme, déplace ces valeurs dans des variables d'environnement :
// NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY

const BODY_HTML = `<svg style="display:none">
  <symbol id="i-code" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12"/></symbol>
  <symbol id="i-phone-app" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></symbol>
  <symbol id="i-cap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></symbol>
  <symbol id="i-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
  <symbol id="i-cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4 4 0 0 1-1-7.9A5 5 0 0 1 16 9a4 4 0 0 1 1 9H7z"/></symbol>
  <symbol id="i-support" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-3a8 8 0 0 1 16 0v3"/><path d="M4 14a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2z"/><path d="M20 14a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z"/><path d="M18 16v1a2 2 0 0 1-2 2h-3"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
  <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
  <symbol id="i-rocket" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15l-2 6 6-2 9-9a4 4 0 0 0-4-4l-9 9z"/><circle cx="15" cy="9" r="1.2"/></symbol>
  <symbol id="i-briefcase" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></symbol>
  <symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></symbol>
  <symbol id="i-data" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5V14M9.5 17.5L12 14l2.5 3.5"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.7c.1 1.1.3 2.1.7 3.1a2 2 0 0 1-.4 2.1L7 9.5a16 16 0 0 0 6 6l1.6-1.4a2 2 0 0 1 2.1-.4c1 .4 2 .6 3.1.7a2 2 0 0 1 1.7 2z"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></symbol>
  <symbol id="i-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/></symbol>
  <symbol id="i-basket" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16l-1.5 11h-13L4 9z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></symbol>
  <symbol id="i-heartbeat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2 8 4-16 2 8h6"/></symbol>
</svg>

<header>
  <div class="wrap nav">
    <a href="#" class="brand"><img src="/images/bdh-mark.png" alt="BDH" style="width:34px;height:34px;object-fit:contain;border-radius:8px;"><span id="navBrandName">BDH<span>.</span></span></a>
    <ul class="nav-links">
      <li><a href="#services">Services</a></li>
      <li><a href="#realisations">Projets</a></li>
      <li><a href="#hub">Le Hub</a></li>
      <li><a href="#hub">AI Lab</a></li>
      <li><a href="#equipe">Équipe</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <a href="#contact" class="btn btn-primary" style="padding:11px 22px;font-size:0.86rem;">Démarrer</a>
      <button class="burger" id="burgerBtn" aria-label="Menu"><svg><use href="#i-menu"/></svg></button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobileMenu">
  <div class="top">
    <span class="brand"><img src="/images/bdh-mark.png" alt="BDH" style="width:30px;height:30px;object-fit:contain;border-radius:7px;margin-right:8px;vertical-align:middle;">BDH<span style="color:var(--orange);">.</span></span>
    <button class="burger" id="closeBtn" style="display:flex" aria-label="Fermer"><svg><use href="#i-close"/></svg></button>
  </div>
  <ul>
    <li><a href="#services">Services</a></li>
    <li><a href="#realisations">Projets</a></li>
    <li><a href="#hub">Le Hub</a></li>
    <li><a href="#equipe">Équipe</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</div>

<!-- ============ HERO ============ -->
<section class="hero">
  <div class="wrap">
    <div class="hero-card">
      <div class="hero-bg-pattern"></div>
      <div class="hero-glow"></div>
      <div class="hero-glow-2"></div>
      <div class="hero-content">
        <div class="eyebrow-hero">Basé à Cotonou · Bénin · depuis 2024</div>
        <h1 class="hero-title">Construisons l'avenir digital du Bénin.</h1>
        <p class="lead" id="heroLead">Agence digitale & hub d'innovation. Nous transformons vos idées en solutions tech qui impactent l'économie béninoise.</p>
        <div class="hero-ctas">
          <a href="#contact" class="btn btn-primary">Démarrer un projet <svg><use href="#i-arrow"/></svg></a>
          <a href="#hub" class="btn btn-glass">Rejoindre le Hub</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ PREUVE SOCIALE ============ -->
<section class="section-tight">
  <div class="wrap">
    <div class="section-head center reveal" style="margin-bottom:6px;">
      <div class="eyebrow" style="justify-content:center;">Nos réalisations</div>
    </div>
    <div class="proof-row reveal">
      <div class="proof-item"><img src="/images/proof-yeyemarket.png" alt="" style="width:22px;height:22px;border-radius:5px;object-fit:cover;">Yéyé Market</div>
      <div class="proof-item"><img src="/images/proof-santebenin.png" alt="" style="width:22px;height:22px;border-radius:50%;object-fit:cover;">SantéBénin</div>
      <div class="proof-item"><img src="/images/proof-unibenin.png" alt="" style="width:22px;height:22px;border-radius:5px;object-fit:cover;">UniBénin</div>
      <div class="proof-item"><svg><use href="#i-briefcase"/></svg>Le Hub 2026</div>
    </div>
  </div>
</section>

<!-- ============ SERVICES ============ -->
<section class="section" id="services">
  <div class="wrap">
    <div class="section-head reveal">
      <div class="eyebrow">Nos services</div>
      <h2>Ce que nous construisons pour vous</h2>
      <p>Des solutions digitales sur mesure, adaptées aux réalités du marché béninois.</p>
    </div>
    <div class="services-grid" id="domainsGrid">
      <div class="service-card reveal">
        <div class="service-icon"><svg><use href="#i-code"/></svg></div>
        <h3>Développement Web</h3>
        <ul>
          <li>Sites web & marketplaces</li>
          <li>Intégration paiement Mobile Money</li>
          <li>Maintenance & support 6j/7</li>
        </ul>
        <div class="service-arrow"><svg><use href="#i-arrow"/></svg></div>
      </div>
      <div class="service-card reveal">
        <div class="service-icon"><svg><use href="#i-phone-app"/></svg></div>
        <h3>Applications Mobiles</h3>
        <ul>
          <li>iOS & Android natifs (Flutter)</li>
          <li>Applications hors-ligne</li>
          <li>Publication sur les stores</li>
        </ul>
        <div class="service-arrow"><svg><use href="#i-arrow"/></svg></div>
      </div>
      <div class="service-card reveal">
        <div class="service-icon"><svg><use href="#i-cap"/></svg></div>
        <h3>Formation Tech</h3>
        <ul>
          <li>Programmes intensifs</li>
          <li>Ateliers prompt engineering</li>
          <li>Accompagnement pratique</li>
        </ul>
        <div class="service-arrow"><svg><use href="#i-arrow"/></svg></div>
      </div>
      <div class="service-card reveal">
        <div class="service-icon"><svg><use href="#i-chat"/></svg></div>
        <h3>Conseil Digital</h3>
        <ul>
          <li>Stratégie de transformation</li>
          <li>Audit technique</li>
          <li>Accompagnement produit</li>
        </ul>
        <div class="service-arrow"><svg><use href="#i-arrow"/></svg></div>
      </div>
      <div class="service-card reveal">
        <div class="service-icon"><svg><use href="#i-cloud"/></svg></div>
        <h3>Infrastructure Cloud</h3>
        <ul>
          <li>Hébergement Vercel & Supabase</li>
          <li>Bases de données PostgreSQL</li>
          <li>Sécurité & sauvegardes</li>
        </ul>
        <div class="service-arrow"><svg><use href="#i-arrow"/></svg></div>
      </div>
      <div class="service-card reveal">
        <div class="service-icon"><svg><use href="#i-support"/></svg></div>
        <h3>Support & Maintenance</h3>
        <ul>
          <li>Support réactif 6j/7</li>
          <li>Mises à jour continues</li>
          <li>Supervision proactive</li>
        </ul>
        <div class="service-arrow"><svg><use href="#i-arrow"/></svg></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ RÉALISATION EN VEDETTE ============ -->
<section class="section" style="padding-top:0;" id="realisations">
  <div class="wrap">
    <div class="feature-proj reveal">
      <div class="phone-stack">
        <img src="/images/yeye-market-mockup.png" alt="Application Yéyé Market">
      </div>
      <div class="feature-body">
        <div class="eyebrow">Réalisation en vedette</div>
        <h3>Yéyé Market</h3>
        <p>Marketplace alimentaire béninoise — livraison rapide, paiement Mobile Money intégré, et gestion complète des vendeurs et livreurs depuis une seule application.</p>
        <div class="tag-row">
          <span class="tag-chip">KKiaPay</span>
          <span class="tag-chip">Flutter</span>
          <span class="tag-chip">IA</span>
        </div>
        <a href="#contact" class="feature-link">Voir l'étude de cas <svg><use href="#i-arrow"/></svg></a>
      </div>
    </div>
  </div>
</section>

<!-- ============ HUB + AI LAB ============ -->
<section class="section" style="padding-top:0;" id="hub">
  <div class="wrap">
    <div class="section-head reveal">
      <div class="eyebrow">Écosystème</div>
      <h2>Le Hub & Bénin AI Lab</h2>
      <p>Bien plus qu'une agence : un écosystème dédié à l'innovation béninoise.</p>
    </div>
    <div class="split-grid">
      <div class="split-card hub reveal">
        <span class="eyebrow-badge"><svg style="width:14px;height:14px"><use href="#i-rocket"/></svg>Lancement 2026</span>
        <h3>Le Hub — l'innovation en marche</h3>
        <p style="color:var(--muted);font-size:0.95rem;">Le premier hub numérique du Bénin dédié à l'IA, aux startups et aux compétences digitales.</p>
        <div class="mini-grid">
          <div class="mini-item"><svg><use href="#i-rocket"/></svg><span>Incubation</span></div>
          <div class="mini-item"><svg><use href="#i-cap"/></svg><span>Formation</span></div>
          <div class="mini-item"><svg><use href="#i-users"/></svg><span>Communauté</span></div>
          <div class="mini-item"><svg><use href="#i-briefcase"/></svg><span>Emploi Tech</span></div>
        </div>
        <a href="#contact" class="btn btn-outline" style="margin-top:24px;">L'innovation en marche <svg><use href="#i-arrow"/></svg></a>
      </div>
      <div class="split-card ai reveal">
        <span class="eyebrow-badge"><svg style="width:14px;height:14px"><use href="#i-data"/></svg>En lancement</span>
        <h3>Bénin AI Lab</h3>
        <p style="color:var(--muted);font-size:0.95rem;">Notre laboratoire explore les technologies qui façonnent demain, avec un focus sur les réalités locales.</p>
        <div class="mini-grid">
          <div class="mini-item"><svg><use href="#i-chat"/></svg><span>IA générative</span></div>
          <div class="mini-item"><svg><use href="#i-globe"/></svg><span>Langues locales</span></div>
          <div class="mini-item"><svg><use href="#i-code"/></svg><span>Agents IA</span></div>
          <div class="mini-item"><svg><use href="#i-data"/></svg><span>Data Science</span></div>
        </div>
        <a href="#contact" class="btn btn-outline" style="margin-top:24px;">L'IA au service du Bénin <svg><use href="#i-arrow"/></svg></a>
      </div>
    </div>
  </div>
</section>

<!-- ============ TECH STACK ============ -->
<section class="section-tight">
  <div class="wrap">
    <div class="section-head reveal">
      <div class="eyebrow">Notre stack</div>
      <h2 style="font-size:1.4rem;">Technologies que nous utilisons</h2>
    </div>
    <div class="tech-row reveal" id="techGridPublic">
      <div class="tech-chip"><span class="tech-dot">N</span>Next.js</div>
      <div class="tech-chip"><span class="tech-dot">R</span>React</div>
      <div class="tech-chip"><span class="tech-dot">F</span>Flutter</div>
      <div class="tech-chip"><span class="tech-dot">N</span>Node.js</div>
      <div class="tech-chip"><span class="tech-dot">S</span>Supabase</div>
      <div class="tech-chip"><span class="tech-dot">V</span>Vercel</div>
      <div class="tech-chip"><span class="tech-dot">P</span>PostgreSQL</div>
      <div class="tech-chip"><span class="tech-dot">TS</span>TypeScript</div>
      <div class="tech-chip"><span class="tech-dot">K</span>KKiaPay</div>
      <div class="tech-chip"><span class="tech-dot">AI</span>OpenAI</div>
    </div>
  </div>
</section>

<!-- ============ ÉQUIPE ============ -->
<section class="section" id="equipe">
  <div class="wrap">
    <div class="section-head center reveal">
      <div class="eyebrow" style="justify-content:center;">Notre équipe</div>
      <h2>Des experts passionnés</h2>
    </div>
    <div class="team-grid" id="teamGrid">
      <div class="team-card reveal">
        <div class="team-photo"><img src="/images/team-eboun.jpg" alt="EWEDJE Eboun Benjamin" style="width:100%;height:100%;object-fit:cover;"></div>
        <div class="team-info"><h4>EWEDJE Eboun Benjamin</h4><div class="team-role">CEO & Fondateur</div><p>Entrepreneur digital, passionné de tech et de développement économique au Bénin.</p></div>
      </div>
      <div class="team-card reveal">
        <div class="team-photo open">+</div>
        <div class="team-info"><h4>Développement</h4><div class="open-badge">Poste ouvert</div><p style="margin-top:8px;">Vous maîtrisez React, Flutter ou Node.js ? Rejoignez l'aventure.</p></div>
      </div>
      <div class="team-card reveal">
        <div class="team-photo open">+</div>
        <div class="team-info"><h4>Design</h4><div class="open-badge">Poste ouvert</div><p style="margin-top:8px;">Créatif et orienté expérience utilisateur ? On a besoin de vous.</p></div>
      </div>
      <div class="team-card reveal">
        <div class="team-photo open">+</div>
        <div class="team-info"><h4>Commerce</h4><div class="open-badge">Poste ouvert</div><p style="margin-top:8px;">Réseau et passion pour le digital ? Développons notre clientèle.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ CONTACT ============ -->
<section class="section" id="contact">
  <div class="wrap contact-wrap">
    <div class="reveal">
      <div class="eyebrow">Parlons de votre projet</div>
      <h2>Démarrons ensemble</h2>
      <p style="color:var(--muted);margin-top:14px;">Que ce soit pour un projet, un partenariat ou juste une question — nous répondons dans les 24h.</p>
      <div class="contact-lines">
        <div class="contact-line"><div class="ic"><svg><use href="#i-pin"/></svg></div><div><b>Adresse</b><span id="contactAddress">Tokan, Togba · Abomey-Calavi, Bénin</span></div></div>
        <div class="contact-line"><div class="ic"><svg><use href="#i-phone"/></svg></div><div><b>WhatsApp / Téléphone</b><a id="contactPhone" href="https://wa.me/2290157021269" target="_blank" rel="noopener">+229 01 57 02 12 69</a></div></div>
        <div class="contact-line"><div class="ic"><svg><use href="#i-mail"/></svg></div><div><b>Email</b><a id="contactEmail" href="mailto:contact@benindigitalhub.tech">contact@benindigitalhub.tech</a></div></div>
        <div class="contact-line"><div class="ic"><svg><use href="#i-clock"/></svg></div><div><b>Horaires</b><span>Lundi – Samedi : 8h00 – 18h00</span></div></div>
      </div>
    </div>
    <form class="contact-form reveal">
      <div class="form-row">
        <div class="field"><label for="c-nom">Nom complet</label><input type="text" id="c-nom" placeholder="Kofi Mensah"></div>
        <div class="field"><label for="c-email">Email</label><input type="email" id="c-email" placeholder="vous@email.com"></div>
      </div>
      <div class="field" style="margin-bottom:14px;"><label for="c-service">Type de service</label>
        <select id="c-service">
          <option>Développement Web</option>
          <option>Application Mobile</option>
          <option>Conseil Digital</option>
          <option>Formation Tech</option>
        </select>
      </div>
      <div class="field" style="margin-bottom:6px;"><label for="c-message">Message</label><textarea id="c-message" placeholder="Décrivez votre idée ou besoin..."></textarea></div>
      <div class="file-row">
        <label for="c-file" class="file-drop" id="c-filelabel"><svg style="width:14px;height:14px"><use href="#i-file"/></svg><span id="c-filetext">Choisir un fichier</span></label>
        <input type="file" id="c-file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp" style="display:none;">
      </div>
      <button type="button" class="btn btn-primary submit-btn" id="c-submit">Envoyer le message <svg><use href="#i-arrow"/></svg></button>
    </form>
  </div>
</section>

<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <span class="brand" style="color:#fff;"><img src="/images/bdh-mark.png" alt="BDH" style="width:32px;height:32px;object-fit:contain;border-radius:8px;margin-right:8px;vertical-align:middle;">BDH<span style="color:var(--orange);">.</span></span>
        <p id="footBrandDesc">Agence digitale & hub d'innovation. Nous concevons des solutions numériques pour un avenir meilleur au Bénin.</p>
      </div>
      <div class="foot-col"><h5>Services</h5><ul><li><a href="#services">Développement Web</a></li><li><a href="#services">Applications Mobiles</a></li><li><a href="#hub">AI Lab</a></li></ul></div>
      <div class="foot-col"><h5>Contact</h5><ul><li><a href="#realisations">Projets</a></li><li><a href="#hub">Le Hub</a></li><li><a href="#contact">Contact</a></li></ul></div>
      <div class="foot-col"><h5>Écrivez-nous</h5><ul><li><a id="footEmail" href="mailto:contact@benindigitalhub.tech">contact@benindigitalhub.tech</a></li><li><a id="footPhone" href="https://wa.me/2290157021269">+229 01 57 02 12 69</a></li></ul></div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 BDH SARL · Abomey-Calavi, Bénin</span>
      <span>Tous droits réservés</span>
    </div>
  </div>
</footer>`;

export default function BdhHomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // ---------- Menu mobile ----------
    const burgerBtn = root.querySelector<HTMLButtonElement>("#burgerBtn");
    const closeBtn = root.querySelector<HTMLButtonElement>("#closeBtn");
    const mobileMenu = root.querySelector<HTMLDivElement>("#mobileMenu");

    const openMenu = () => mobileMenu?.classList.add("open");
    const closeMenu = () => mobileMenu?.classList.remove("open");

    burgerBtn?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    const mobileLinks = mobileMenu?.querySelectorAll("a") ?? [];
    mobileLinks.forEach((a) => a.addEventListener("click", closeMenu));

    // ---------- Reveal au scroll ----------
    const revealEls = root.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    // ---------- Input fichier (formulaire contact) ----------
    const fileInput = root.querySelector<HTMLInputElement>("#c-file");
    const fileText = root.querySelector<HTMLSpanElement>("#c-filetext");
    const fileLabel = root.querySelector<HTMLLabelElement>("#c-filelabel");

    const onFileChange = () => {
      const f = fileInput?.files?.[0];
      if (f) {
        if (fileText) fileText.textContent = f.name;
        fileLabel?.classList.add("has");
      } else {
        if (fileText) fileText.textContent = "Choisir un fichier";
        fileLabel?.classList.remove("has");
      }
    };
    fileInput?.addEventListener("change", onFileChange);

    // ---------- Toast ----------
    function toast(msg: string, type: "ok" | "err") {
      const t = document.createElement("div");
      t.textContent = msg;
      t.style.cssText =
        "position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);background:" +
        (type === "err" ? "#dc2626" : "#0f172a") +
        ";color:#fff;padding:14px 26px;border-radius:14px;font-size:14px;font-weight:600;z-index:99999;box-shadow:0 12px 40px rgba(0,0,0,0.3);opacity:0;transition:opacity .3s,transform .3s;font-family:Inter,sans-serif;";
      document.body.appendChild(t);
      requestAnimationFrame(() => {
        t.style.opacity = "1";
        t.style.transform = "translateX(-50%) translateY(0)";
      });
      setTimeout(() => {
        t.style.opacity = "0";
        t.style.transform = "translateX(-50%) translateY(20px)";
        setTimeout(() => t.remove(), 300);
      }, 4000);
    }

    // ---------- Formulaire de contact -> Supabase ----------
    const submitBtn = root.querySelector<HTMLButtonElement>("#c-submit");
    const onSubmit = async () => {
      const nomEl = root.querySelector<HTMLInputElement>("#c-nom");
      const emailEl = root.querySelector<HTMLInputElement>("#c-email");
      const serviceEl = root.querySelector<HTMLSelectElement>("#c-service");
      const messageEl = root.querySelector<HTMLTextAreaElement>("#c-message");

      const nom = nomEl?.value.trim() ?? "";
      const email = emailEl?.value.trim() ?? "";
      const service = serviceEl?.value ?? "";
      const message = messageEl?.value.trim() ?? "";
      const file = fileInput?.files?.[0];

      if (!nom || !email || !message) {
        toast("Merci de remplir nom, email et message.", "err");
        return;
      }
      if (file && file.size > 10 * 1024 * 1024) {
        toast("Le fichier dépasse 10 Mo.", "err");
        return;
      }

      const original = submitBtn?.innerHTML ?? "";
      if (submitBtn) {
        submitBtn.textContent = "Envoi en cours...";
        submitBtn.disabled = true;
      }

      try {
        let fichier_url: string | null = null;
        if (file) {
          const ext = file.name.split(".").pop();
          const path =
            "contacts/" +
            Date.now() +
            "_" +
            nom.replace(/\s/g, "_").replace(/[^a-zA-Z0-9_]/g, "") +
            "." +
            ext;
          const up = await fetch(SUPA_URL + "/storage/v1/object/bdh-contacts/" + path, {
            method: "POST",
            headers: {
              apikey: SUPA_KEY,
              Authorization: "Bearer " + SUPA_KEY,
              "Content-Type": file.type || "application/octet-stream",
              "x-upsert": "true",
            },
            body: file,
          });
          if (up.ok) fichier_url = SUPA_URL + "/storage/v1/object/public/bdh-contacts/" + path;
        }

        const res = await fetch(SUPA_URL + "/rest/v1/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPA_KEY,
            Authorization: "Bearer " + SUPA_KEY,
          },
          body: JSON.stringify({ nom, email, telephone: "", service, message, fichier_url }),
        });
        if (!res.ok) throw new Error("http " + res.status);

        toast("Message envoyé ! Nous vous répondons dans les 24h.", "ok");
        if (nomEl) nomEl.value = "";
        if (emailEl) emailEl.value = "";
        if (messageEl) messageEl.value = "";
        if (fileInput) fileInput.value = "";
        if (fileText) fileText.textContent = "Choisir un fichier";
        fileLabel?.classList.remove("has");
      } catch (err) {
        toast("Une erreur est survenue. Réessayez ou écrivez-nous directement.", "err");
      }

      if (submitBtn) {
        submitBtn.innerHTML = original;
        submitBtn.disabled = false;
      }
    };
    submitBtn?.addEventListener("click", onSubmit);

    // ---------- Réglages généraux du site (Supabase) ----------
    async function loadSiteSettings() {
      try {
        const res = await fetch(`${SUPA_URL}/rest/v1/site_settings?select=*&limit=1`, {
          headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` },
          cache: "no-store",
        });
        if (!res.ok) return;
        const rows = await res.json();
        if (!rows.length) return;
        const s = rows[0];

        const setText = (id: string, value?: string) => {
          const el = root?.querySelector<HTMLElement>("#" + id);
          if (el && value) el.textContent = value;
        };
        const setHref = (id: string, hrefFn: (v: string) => string, value?: string) => {
          const el = root?.querySelector<HTMLAnchorElement>("#" + id);
          if (el && value) el.href = hrefFn(value);
        };

        setText("heroLead", s.description);
        setText("footBrandDesc", s.description);
        setText("contactAddress", s.address);
        if (s.contact_email) {
          setText("contactEmail", s.contact_email);
          setHref("contactEmail", (v) => "mailto:" + v, s.contact_email);
          setText("footEmail", s.contact_email);
          setHref("footEmail", (v) => "mailto:" + v, s.contact_email);
        }
        if (s.phone) {
          const displayPhone = s.phone.startsWith("+") ? s.phone : "+229 " + s.phone;
          setText("contactPhone", displayPhone);
          setText("footPhone", displayPhone);
        }
        if (s.favicon_url) {
          const link = root?.querySelector<HTMLLinkElement>("#faviconLink");
          if (link) link.href = s.favicon_url;
        }
      } catch (err) {
        console.warn("Réglages du site non chargés depuis Supabase :", (err as Error).message);
      }
    }

    // ---------- Sections dynamiques : services / équipe / technologies ----------
    async function loadDynamicSections() {
      const HEADERS_ = { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` };

      async function fetchTable(table: string) {
        const res = await fetch(`${SUPA_URL}/rest/v1/${table}?select=*`, {
          headers: HEADERS_,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      }

      // Services
      try {
        const services = await fetchTable("services");
        const actifs = services.filter((s: any) => s.status === "Actif" && s.category);
        if (actifs.length) {
          const categoryMeta: Record<string, string> = {
            "Développement": "i-code",
            "Intelligence Artificielle": "i-chat",
            "Cloud & Infrastructure": "i-cloud",
            Formation: "i-cap",
            Conseil: "i-chat",
            Support: "i-support",
          };
          const byCategory: Record<string, any[]> = {};
          actifs.forEach((s: any) => {
            (byCategory[s.category] = byCategory[s.category] || []).push(s);
          });

          const grid = root?.querySelector<HTMLElement>("#domainsGrid");
          if (grid) {
            grid.innerHTML = Object.entries(byCategory)
              .map(([cat, items]) => {
                const icon = categoryMeta[cat] || "i-briefcase";
                return `
                  <div class="service-card reveal in">
                    <div class="service-icon"><svg><use href="#${icon}"/></svg></div>
                    <h3>${cat}</h3>
                    <ul>${items.map((s) => `<li>${s.name}</li>`).join("")}</ul>
                    <div class="service-arrow"><svg><use href="#i-arrow"/></svg></div>
                  </div>`;
              })
              .join("");
          }
        }
      } catch (err) {
        console.warn("Services non chargés depuis Supabase :", (err as Error).message);
      }

      // Équipe
      try {
        const team = await fetchTable("team_members");
        if (team.length) {
          const grid = root?.querySelector<HTMLElement>("#teamGrid");
          if (grid) {
            grid.innerHTML = team
              .map((m: any) => {
                const initials = (m.name || "?")
                  .split(" ")
                  .map((w: string) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();
                const photoBlock = m.photo_url
                  ? `<div class="team-photo"><img src="${m.photo_url}" alt="${m.name}" style="width:100%;height:100%;object-fit:cover;"></div>`
                  : `<div class="team-photo">${initials}</div>`;
                if (m.status === "Actif") {
                  return `
                    <div class="team-card reveal in">
                      ${photoBlock}
                      <div class="team-info"><h4>${m.name}</h4><div class="team-role">${
                    m.role || ""
                  }</div><p>${m.bio || ""}</p></div>
                    </div>`;
                }
                return `
                  <div class="team-card reveal in">
                    <div class="team-photo open">+</div>
                    <div class="team-info"><h4>${m.role || m.name}</h4><div class="open-badge">Poste ouvert</div><p style="margin-top:8px;">${
                  m.bio || ""
                }</p></div>
                  </div>`;
              })
              .join("");
          }
        }
      } catch (err) {
        console.warn("Équipe non chargée depuis Supabase :", (err as Error).message);
      }

      // Technologies
      try {
        const techs = await fetchTable("technologies");
        const actives = techs.filter((t: any) => t.status === "Actif");
        if (actives.length) {
          const grid = root?.querySelector<HTMLElement>("#techGridPublic");
          if (grid) {
            grid.innerHTML = actives
              .map((t: any) => {
                const initials = (t.name || "?").replace(/\..*/, "").slice(0, 2).toUpperCase();
                return `<div class="tech-chip"><span class="tech-dot">${initials}</span>${t.name}</div>`;
              })
              .join("");
          }
        }
      } catch (err) {
        console.warn("Technologies non chargées depuis Supabase :", (err as Error).message);
      }
    }

    loadSiteSettings();
    loadDynamicSections();

    // ---------- Nettoyage ----------
    return () => {
      burgerBtn?.removeEventListener("click", openMenu);
      closeBtn?.removeEventListener("click", closeMenu);
      mobileLinks.forEach((a) => a.removeEventListener("click", closeMenu));
      fileInput?.removeEventListener("change", onFileChange);
      submitBtn?.removeEventListener("click", onSubmit);
      revealObserver.disconnect();
    };
  }, []);

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
