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
  { path: "/SessionsView", name: "Sessions", component: SessionsView },
  { path: "/ProfilView", name: "Profil", component: ProfilView }, // Route pour ProfilView
  { path: "/ReferentView", name: "Referent", component: ReferentView },
  { path: "/AttribuerPointsView", name: "AttribuerPoints", component: AttribuerPointsView },
  { path: "/ModifierAcces", name: "ModifierAcces", component: ModifierAcces },
  { path: "/ModifierReferentielView", name: "ModifierReferentiel", component: ModifierReferentielView },
  { path: "/HistoriqueView", name: "Historique", component: HistoriqueView },
  { path: "/points-cumules", name: "PointsCumules", component: PointCommuleView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;