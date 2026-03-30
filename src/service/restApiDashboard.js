import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

/* ── helpers ─────────────────────────────────────── */

function extractArrayOrThrow(res, endpoint) {
  const payload = res?.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  throw new Error(`Format de reponse invalide pour ${endpoint}`);
}

function startOfWeek() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const start = new Date(now);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function endOfWeek() {
  const start = startOfWeek();
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

/* ── dashboard stats ─────────────────────────────── */

export async function getDashboardStats() {
  const opts = { withCredentials: true };

  const [offresRes, candidaturesRes, entretiensRes] = await Promise.all([
    axios.get(`${API_URL}/offre/getOffresByEntreprise`, opts),
    axios.get(`${API_URL}/candidature/getAllCandidatures`, opts),
    axios.get(`${API_URL}/entretien/getAllEntretiens`, opts),
  ]);

  const offres = extractArrayOrThrow(offresRes, "/offre/getOffresByEntreprise");
  const candidatures = extractArrayOrThrow(
    candidaturesRes,
    "/candidature/getAllCandidatures"
  );
  const entretiens = extractArrayOrThrow(entretiensRes, "/entretien/getAllEntretiens");

  const now = new Date();
  const weekStart = startOfWeek();
  const weekEnd = endOfWeek();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(now);
  todayEnd.setHours(23, 59, 59, 999);
  const tomorrowStart = new Date(todayEnd.getTime() + 1);
  const tomorrowEnd = new Date(tomorrowStart);
  tomorrowEnd.setHours(23, 59, 59, 999);

  // Candidatures en attente = etape "soumise"
  const candidaturesEnAttente = candidatures.filter(function (c) {
    return c.etape === "soumise";
  });
  const nouvellesToday = candidatures.filter(function (c) {
    const d = new Date(c.createdAt);
    return d >= todayStart && d <= todayEnd;
  });

  // Postes ouverts
  const postesOuverts = offres.filter(function (o) {
    const s = String(o.statut || o.status || "").toLowerCase();
    return ["open", "ouverte", "ouvert", "actif", "active", "en cours"].includes(s);
  });

  // Offres fermant cette semaine
  const enClotureSemaine = offres.filter(function (o) {
    const dl = new Date(o.dateLimite);
    return dl >= weekStart && dl <= weekEnd;
  });

  // Entretiens cette semaine
  const entretiensSemaine = entretiens.filter(function (e) {
    const d = new Date(e.dateEntretien || e.date_entretien);
    return d >= weekStart && d <= weekEnd;
  });
  const entretiensAujourdhui = entretiens.filter(function (e) {
    const d = new Date(e.dateEntretien || e.date_entretien);
    return d >= todayStart && d <= todayEnd;
  });
  const entretiensDemain = entretiens.filter(function (e) {
    const d = new Date(e.dateEntretien || e.date_entretien);
    return d >= tomorrowStart && d <= tomorrowEnd;
  });

  // Offres en attente (closed / en pause)
  const offresEnAttente = offres.filter(function (o) {
    const s = String(o.statut || o.status || "").toLowerCase();
    return !["open", "ouverte", "ouvert", "actif", "active", "en cours"].includes(s);
  });

  return {
    candidatures_en_attente: {
      total: candidaturesEnAttente.length,
      nouvelles_aujourd_hui: nouvellesToday.length,
    },
    postes_ouverts: {
      total: postesOuverts.length,
      en_cloture_cette_semaine: enClotureSemaine.length,
    },
    entretiens_cette_semaine: {
      total: entretiensSemaine.length,
      aujourd_hui: entretiensAujourdhui.length,
      demain: entretiensDemain.length,
    },
    offres_en_attente: {
      total: offresEnAttente.length,
      delai_moyen_reponse_jours: 3,
    },
  };
}

/* ── recent candidatures ─────────────────────────── */

export async function getRecentCandidatures() {
  const res = await axios.get(`${API_URL}/candidature/getAllCandidatures`, {
    withCredentials: true,
  });
  const items = extractArrayOrThrow(res, "/candidature/getAllCandidatures");

  return items
    .slice()
    .sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 5);
}

/* ── upcoming entretiens ─────────────────────────── */

export async function getUpcomingEntretiens() {
  const res = await axios.get(`${API_URL}/entretien/getAllEntretiens`, {
    withCredentials: true,
  });
  const items = extractArrayOrThrow(res, "/entretien/getAllEntretiens");
  const now = new Date();

  return items
    .filter(function (e) {
      return new Date(e.dateEntretien || e.date_entretien) >= now;
    })
    .sort(function (a, b) {
      return (
        new Date(a.dateEntretien || a.date_entretien) -
        new Date(b.dateEntretien || b.date_entretien)
      );
    })
    .slice(0, 5);
}

/* ── hiring chart data (last 6 months) ───────────── */

export async function getHiringChartData() {
  const res = await axios.get(`${API_URL}/candidature/getAllCandidatures`, {
    withCredentials: true,
  });
  const items = extractArrayOrThrow(res, "/candidature/getAllCandidatures");

  const MONTH_NAMES = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
  ];

  const now = new Date();
  const labels = [];
  const candidatures = [];
  const pourvus = [];
  const tauxConversion = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const m = d.getMonth();
    const y = d.getFullYear();
    labels.push(MONTH_NAMES[m]);

    const monthItems = items.filter(function (c) {
      const cd = new Date(c.createdAt);
      return cd.getMonth() === m && cd.getFullYear() === y;
    });

    const accepted = monthItems.filter(function (c) {
      return c.etape === "accepte";
    });

    candidatures.push(monthItems.length);
    pourvus.push(accepted.length);
    tauxConversion.push(
      monthItems.length > 0
        ? Math.round((accepted.length / monthItems.length) * 100)
        : 0
    );
  }

  return { labels, candidatures, pourvus, tauxConversion };
}
