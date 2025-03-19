import { createRouter, createWebHistory } from "vue-router";

// Import des vues pour le directeur
import AccueilView from "@/views/Directeur/AccueilView.vue";
import NotificationsView from "@/views/Directeur/NotificationsView.vue";
import SessionsView from "@/views/Directeur/SessionsView.vue";
import ProfilView from "@/views/Directeur/ProfilView.vue";
import ReferentView from "@/views/Directeur/ReferentView.vue";
import AttribuerPointsView from "@/views/Directeur/AttribuerPointsView.vue";
import ModifierAcces from "@/views/Directeur/ModifierAcces.vue";
import ModifierReferentielView from "@/views/Directeur/ModifierReferentielView.vue";
import HistoriqueView from "@/views/Directeur/HistoriqueView.vue";
import PointCommuleView from "@/views/Directeur/PointCommuleView.vue";

// Import des vues pour l'étudiant
import DashboardEtudiantView from "@/views/Etudiant/DashboardEtudiantView.vue";
import SaisirFicheView from "@/views/Etudiant/SaisirFicheView.vue";
import HistoriqueFichesView from "@/views/Etudiant/HistoriqueFichesView.vue";
import ProposerActiviteView from "@/views/Etudiant/ProposerActiviteView.vue";
import ProfilEtudiantView from "@/views/Etudiant/ProfilView.vue";
import NotificationsEtudiantView from "@/views/Etudiant/NotificationsView.vue";

const routes = [
  // Routes pour le directeur
  {
    path: "/directeur",
    name: "Directeur",
    redirect: "/directeur/accueil", // Redirige vers l'accueil du directeur par défaut
    children: [
      { path: "accueil", name: "AccueilDirecteur", component: AccueilView },
      { path: "notifications", name: "Notifications", component: NotificationsView },
      { path: "sessions", name: "Sessions", component: SessionsView },
      { path: "profil", name: "ProfilView", component: ProfilView },
      { path: "referent", name: "Referent", component: ReferentView },
      { path: "attribuer-points", name: "AttribuerPoints", component: AttribuerPointsView },
      { path: "modifier-acces", name: "ModifierAcces", component: ModifierAcces },
      { path: "modifier-referentiel", name: "ModifierReferentiel", component: ModifierReferentielView },
      { path: "historique", name: "Historique", component: HistoriqueView },
      { path: "points-cumules", name: "PointsCumules", component: PointCommuleView },
    ],
  },

  // Routes pour l'étudiant
  {
    path: "/etudiant",
    name: "Etudiant",
    redirect: "/etudiant/accueil", // Redirige vers l'accueil de l'étudiant par défaut
    children: [
      { path: "accueil", name: "AccueilEtudiant", component: DashboardEtudiantView },
      { path: "saisir-fiche", name: "SaisirFiche", component: SaisirFicheView },
      { path: "historique-fiches", name: "HistoriqueFiches", component: HistoriqueFichesView },
      { path: "proposer-activite", name: "ProposerActivite", component: ProposerActiviteView },
      { path: "profil", name: "ProfilEtudiant", component: ProfilEtudiantView },
      { path: "notifications", name: "NotificationsEtudiant", component: NotificationsEtudiantView },
    ],
  },

  // Redirection par défaut (vers l'accueil du directeur ou de l'étudiant selon le rôle)
  { 
    path: "/", 
    redirect: (to) => {
      // Récupérez le rôle de l'utilisateur (exemple : depuis un store ou localStorage)
      const userRole = localStorage.getItem("userRole") || "directeur"; // Par défaut, redirige vers le directeur

      // Redirige en fonction du rôle
      if (userRole === "etudiant") {
        return { path: "/etudiant/accueil" };
      } else {
        return { path: "/directeur/accueil" };
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;