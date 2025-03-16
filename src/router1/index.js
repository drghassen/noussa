import { createRouter, createWebHistory } from "vue-router";

// Import des vues
import AccueilView from "@/views/AccueilView.vue";
import NotificationsView from "@/views/NotificationsView.vue";
import SessionsView from "@/views/SessionsView.vue";
import ProfilView from "@/views/ProfilView.vue";
import ReferentView from "@/views/ReferentView.vue";
import AttribuerPointsView from "@/views/AttribuerPointsView.vue";
import ModifierAcces from "@/views/ModifierAcces.vue";
import ModifierReferentielView from "@/views/ModifierReferentielView.vue";
import HistoriqueView from "@/views/HistoriqueView.vue";
import PointCommuleView from "@/views/PointCommuleView.vue";

const routes = [
  { path: "/", name: "Accueil", component: AccueilView },
  { path: "/NotificationsView", name: "Notifications", component: NotificationsView },
  { path: "/SessionsView", name: "Notifications", component: SessionsView },
  { path: "/ProfilView", name: "ProfilView", component: ProfilView },
  { path: "/ReferentView", name: "ReferentView", component: ReferentView },
  { path: "/AttribuerPointsView", name: "AttribuerPointsView", component: AttribuerPointsView },
  { path: "/ModifierAcces", name: "SaisirFiche", component: ModifierAcces },
  { path: "/ModifierReferentielView", name: "ModifierReferentielView", component: ModifierReferentielView },
  { path: "/HistoriqueView", name: "HistoriqueView", component: HistoriqueView },
  { path: "/points-cumules", name: "points-cumules", component: PointCommuleView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;