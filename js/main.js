/* theFAUND — shared script (no dependencies) */

/* ------------------------------------------------------------
   SITE INFO — edit these values once; every page updates.
   ------------------------------------------------------------ */
const SITE = {
  email: "info@thefaund.com",
  phone: "+82-10-8609-3217",
  address: "602, Yeongdong-daero, Gangnam-gu, Seoul, Republic of Korea"
};

document.documentElement.classList.remove("no-js");

/* Fill [data-site] placeholders */
document.querySelectorAll("[data-site]").forEach((el) => {
  const key = el.getAttribute("data-site");
  const val = SITE[key];
  if (!val) return;
  if (key === "email") { el.textContent = val; if (el.tagName === "A") el.href = "mailto:" + val; }
  else if (key === "phone") { el.textContent = val; if (el.tagName === "A") el.href = "tel:" + val.replace(/[^+\d]/g, "").replace("+820", "+82"); }
  else el.textContent = val;
});

/* Year */
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

/* Header border on scroll */
const header = document.querySelector(".site-header");
const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Mobile menu */
const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (mobileNav) mobileNav.setAttribute("aria-hidden", String(!open));
}
if (toggle) toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
if (mobileNav) mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

/* Reveal on scroll */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

/* Tabs (products page) — also opens a tab from the URL hash, e.g. products.html#bividerma */
const tablists = document.querySelectorAll("[role='tablist']");
tablists.forEach((list) => {
  const tabs = [...list.querySelectorAll("[role='tab']")];
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => {
      select(t);
      history.replaceState(null, "", "#" + t.dataset.hash);
    });
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length], true);
      if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length], true);
    });
  });
  const openFromHash = () => {
    const h = location.hash.replace("#", "");
    if (!h) return;
    const direct = tabs.find((t) => t.dataset.hash === h);
    if (direct) { select(direct); return; }
    // hash points at a product inside a panel → open that panel, then scroll to it
    const target = document.getElementById(h);
    if (target) {
      const panel = target.closest("[role='tabpanel']");
      const owner = panel && tabs.find((t) => t.getAttribute("aria-controls") === panel.id);
      if (owner) { select(owner); requestAnimationFrame(() => target.scrollIntoView()); }
    }
  };
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
});

/* Contact form → opens the visitor's mail app with a pre-filled message.
   To receive submissions on a server instead, set the form's action to your
   form endpoint (e.g. Formspree) and remove data-mailto from the <form>. */
const form = document.querySelector("form[data-mailto]");
if (form) {
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((input) => {
      const field = input.closest(".field") || input.closest(".consent");
      const valid = input.type === "checkbox" ? input.checked : input.checkValidity() && input.value.trim() !== "";
      if (field) field.classList.toggle("is-invalid", !valid);
      if (!valid && ok) { input.focus(); ok = false; }
    });
    if (!ok) { status.textContent = "Please complete the required fields."; return; }

    const d = new FormData(form);
    const lines = [
      ["Contact name", d.get("name")], ["Company", d.get("company")], ["Country", d.get("country")],
      ["Email", d.get("email")], ["Phone", d.get("phone")], ["Website", d.get("website")],
      ["Interested in", d.get("interest")]
    ].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
    const body = `${d.get("message")}\n\n---\n${lines.join("\n")}`;
    const subject = `[theFAUND Inquiry] ${d.get("subject")}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Your email app has opened with the message. Please press send to complete your inquiry.";
  });
  form.querySelectorAll("input, textarea, select").forEach((el) =>
    el.addEventListener("input", () => { const f = el.closest(".field") || el.closest(".consent"); if (f) f.classList.remove("is-invalid"); })
  );
}

/* BiViDerma Export / CE switch */
document.querySelectorAll(".variant").forEach((group) => {
  const list = document.querySelector(".bv-list");
  group.querySelectorAll(".variant__btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      group.querySelectorAll(".variant__btn").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      if (list) list.dataset.variant = btn.dataset.variant;
    })
  );
});
