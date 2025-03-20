<template>
  <div id="app">
    <!-- Barre supérieure -->
    <Topbar />

    <div class="layout">
      <!-- Menu latéral (conditionnel) -->
      <Sidebar v-if="showSidebar" />

      <!-- Zone de contenu : router-view -->
      <div class="main-content" :class="{ 'full-width': !showSidebar }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";

// Utiliser la route actuelle pour déterminer si la Sidebar doit être affichée
const route = useRoute();
const showSidebar = computed(() => {
  const excludedRoutes = [
    "ProfilView",
    "HistoriqueView",
    "ModifierReferentielView",
    "AccueilScolarite",
    "AccueilReferent",
    "HistoriqueReferent",
    "ProfilReferent",
    "NotificationsReferentt",
  ];
  return !excludedRoutes.includes(route.name);
});
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Layout principal : sidebar + contenu */
.layout {
  display: flex;
  flex: 1;
  margin-top: 80px; /* Ajuste l'espace sous la Topbar */
}

/* Ajuste la sidebar pour qu'elle ne chevauche pas la Topbar */
.sidebar {
  width: 250px;
  height: calc(100vh - 80px); /* Ajuste la hauteur pour éviter le débordement */
  position: fixed;
  top: 80px; /* Place la Sidebar juste en dessous de la Topbar */
  left: 0;
  background-color: #6a3fa0;
  z-index: 900;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow-y: auto;
  margin-top: 50px;
  padding: 10px;
}

/* Ajuste la zone de contenu pour éviter le chevauchement */
.main-content {
  flex: 1;
  margin-left: 250px; /* Pousse le contenu à droite pour éviter la Sidebar */
  padding: 20px;
  background-color: #f5f5f5; /* Ajoute un fond gris clair pour la Dashboard */
  transition: margin-left 0.3s ease; /* Animation fluide */
}

/* Classe pour le contenu principal en plein écran (quand la Sidebar est masquée) */
.main-content.full-width {
  margin-left: 0; /* Supprime la marge gauche */
}
</style>