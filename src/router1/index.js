import { createRouter, createWebHistory } from "vue-router";

// Import des vues
import AccueilView from "@/views/AccueilView.vue";
import NotificationsView from "@/views/NotificationsView.vue";
import ProfilView from "@/views/ProfilView.vue";
// import SaisirFicheView from "@/views/SaisirFicheView.vue";
// import HistoriqueFichesView from "@/views/HistoriqueFichesView.vue";
// import ActiviteHorsRefView from "@/views/ActiviteHorsRefView.vue";

const routes = [
  { path: "/", name: "Accueil", component: AccueilView },
  { path: "/NotificationsView", name: "Notifications", component: NotificationsView },
  { path: "/ProfilView", name: "ProfilView", component: ProfilView },
  // { path: "/saisir-fiche", name: "SaisirFiche", component: SaisirFicheView },
  // { path: "/historique-fiches", name: "HistoriqueFiches", component: HistoriqueFichesView },
  // { path: "/activite-hors-ref", name: "ActiviteHorsRef", component: ActiviteHorsRefView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;