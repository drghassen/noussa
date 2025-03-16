<template>
  
      <div class="main-content">
        <!-- 📌 Titre -->
        <h1 class="title">Attribution des points</h1>

        <!-- 📅 Filtres -->
        <div class="filters">
          <div class="filter-group">
            <label>Date début</label>
            <input type="date" class="date-input" v-model="dateDebut" />
          </div>
          <div class="filter-group">
            <label>Date fin</label>
            <input type="date" class="date-input" v-model="dateFin" />
          </div>
          <div class="filter-group">
            <label>Année universitaire</label>
            <select v-model="anneeUniversitaire" class="select-input">
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
              <option value="2022/2023">2022/2023</option>
            </select>
          </div>
        </div>

        <!-- 📊 Tableau -->
        <div class="table-container">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Promotion</th>
                <th>Type engagement</th>
                <th>Résumé contenu</th>
                <th>Validé</th>
                <th>NB points</th>
                <th>Remarque</th>
                <th>Points accordés</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(eleve, index) in eleves" :key="index">
                <td>{{ eleve.nom }}</td>
                <td>{{ eleve.promotion }}</td>
                <td>
                  <input type="text" v-model="eleve.typeEngagement" class="editable-input" />
                </td>
                <td>
                  <input type="text" v-model="eleve.resume" class="editable-input" />
                </td>
                <td>
                  <label class="custom-checkbox">
                    <input type="checkbox" v-model="eleve.valide" class="hidden-checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <input type="number" v-model="eleve.nbPointsEnvisages" class="editable-input" />
                </td>
                <td>
                  <span>{{ eleve.remarqueReferent }}</span>
                </td>
                <td>
                  <input type="number" v-model="eleve.pointsAccordes" class="editable-input" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 📩 Bouton d’envoi -->
        <div class="button-container">
          <button class="btn-submit" @click="validerEnvoi">
            Envoyer au service de scolarité
          </button>
        </div>

        <!-- ✅ Modale de confirmation -->
        <div v-if="showModal" class="modal-overlay">
          <div class="modal">
            <h3>✅ Accès activé !</h3>
            <p>Le service de scolarité peut maintenant visualiser les fiches avec les points attribués.</p>
            <button class="modal-btn" @click="showModal = false">OK</button>
          </div>
        </div>
      </div>
   
</template>

<script setup>
import { ref } from "vue";

const eleves = ref([
  {
    nom: "Ines Gribaa",
    promotion: "FIE4",
    typeEngagement: "École",
    resume: "Participation Abibus",
    valide: true,
    nbPointsEnvisages: 0.1,
    remarqueReferent: "",
    pointsAccordes: 0.1,
  },
  {
    nom: "Wilma Bourglia",
    promotion: "FIE4",
    typeEngagement: "Diversité",
    resume: "Tuteur Main à la pâte",
    valide: true,
    nbPointsEnvisages: 0.2,
    remarqueReferent: "",
    pointsAccordes: 0.2,
  },
  {
    nom: "Nabilou Anoir",
    promotion: "FIE4",
    typeEngagement: "Associatif",
    resume: "Trésorier BDE",
    valide: true,
    nbPointsEnvisages: 0.1,
    remarqueReferent: "un seul atelier réalisé",
    pointsAccordes: 0.1,
  },
]);

const dateDebut = ref("");
const dateFin = ref("");
const anneeUniversitaire = ref("2024/2025");
const showModal = ref(false);

const validerEnvoi = () => {
  showModal.value = true;
};
</script>

<style scoped>

/* 📌 Contenu principal */
.main-content {
    font-family: 'Inter', sans-serif;
    max-width: 100%;
    margin: 0 auto;
    background-color: #f8f9fa;
}

/* 📌 Titre */
.title {
  font-size: 24px;
  font-weight: 600;
  color: #6a3fa0;
  margin-bottom: 20px;
  text-align: start;
}

/* 📅 Filtres */
.filters {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
}

.filter-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

.date-input, .select-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.date-input:focus, .select-input:focus {
  border-color: #6a3fa0;
  outline: none;
}

/* 📊 TABLEAU */
.table-container {
  width: 100%;
  overflow-x: auto; /* Permet le défilement horizontal si nécessaire */
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 20px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; /* Permet aux colonnes de s'adapter au contenu */
}

.styled-table th,
.styled-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #eee;
  word-wrap: break-word; /* Permet aux mots longs de se diviser */
}

.styled-table th {
  background: #f8f8f8;
  font-weight: 600;
  color: #555;
}

.styled-table tbody tr:hover {
  background: #f5f5f5;
}

/* 📌 Champs modifiables */
.editable-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: 100%; /* Prend toute la largeur de la cellule */
  box-sizing: border-box; /* Inclut le padding dans la largeur */
  transition: border-color 0.3s ease;
}

.editable-input:focus {
  border-color: #6a3fa0;
  outline: none;
}

/* 📌 Checkbox personnalisé */
.custom-checkbox {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.hidden-checkbox {
  opacity: 0;
  position: absolute;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #6a3fa0;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.hidden-checkbox:checked ~ .checkmark {
  background-color: #6a3fa0;
}

.checkmark::after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.hidden-checkbox:checked ~ .checkmark::after {
  display: block;
}

.button-container {
  display: flex;
  justify-content: flex-end; /* Aligne le bouton à droite */
  margin-top: 20px;
}


/* 📩 Bouton */
.btn-submit {
  display: block;
  padding: 16px;
  background: #6a3fa0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background: #5a2f90;
}

/* ✅ Modale de confirmation */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 16px;
}

.modal p {
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
}

.modal-btn {
  padding: 10px 20px;
  background: #6a3fa0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.modal-btn:hover {
  background: #5a2f90;
}

/* 📌 Responsive */
@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
  }

  .btn-submit {
    font-size: 14px;
    padding: 12px;
  }
}
</style>