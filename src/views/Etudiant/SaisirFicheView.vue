<template>
  <div class="fiche-container">
    <!-- Header amélioré -->
    <header class="header">
      <div class="header-content">
        <h1>Fiche descriptive Ingénieur Engagé</h1>
        <p class="description">
          Remplissez ce formulaire pour décrire votre engagement en tant qu'ingénieur. 
          Votre contribution est essentielle pour construire un avenir meilleur.
        </p>
      </div>
    </header>

    <!-- Formulaire -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" v-model="fiche.nom" required>
      </div>

      <div class="form-group">
        <label for="prenom">Prénom :</label>
        <input type="text" id="prenom" v-model="fiche.prenom" required>
      </div>

      <div class="form-group">
        <label for="annee">Année universitaire :</label>
        <input type="text" id="annee" v-model="fiche.annee" required>
      </div>

      <div class="form-group">
        <label for="semestre">Semestre :</label>
        <input type="text" id="semestre" v-model="fiche.semestre" required>
      </div>

      <div class="form-group">
        <label for="promotion">Promotion :</label>
        <select id="promotion" v-model="fiche.promotion" required>
          <option v-for="promotion in promotions" :key="promotion" :value="promotion">
            {{ promotion }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="engagement">Engagement :</label>
        <select id="engagement" v-model="fiche.engagement" required @change="handleEngagementChange">
          <option v-for="engagement in engagements" :key="engagement" :value="engagement">
            {{ engagement }}
          </option>
        </select>
        <input
          v-if="fiche.engagement === 'Autres'"
          type="text"
          v-model="fiche.customEngagement"
          placeholder="Entrez votre engagement"
          required
        >
      </div>

      <div class="form-group">
        <label for="typeAction">Type de l’action :</label>
        <select id="typeAction" v-model="fiche.typeAction" required v-if="fiche.engagement !== 'Autres'">
          <option v-for="typeAction in filteredTypesAction" :key="typeAction" :value="typeAction">
            {{ typeAction }}
          </option>
        </select>
        <input
          v-if="fiche.engagement === 'Autres'"
          type="text"
          v-model="fiche.customTypeAction"
          placeholder="Entrez votre type d'action"
          required
        >
      </div>

      <div class="form-group">
        <label>Date(s) ou période de réalisation de l’action :</label>
        <date-picker
          v-model="fiche.dates"
          range
          lang="fr"
          placeholder="Sélectionnez une période"
          @change="updateSelectedPeriod"
        ></date-picker>
        <input
          type="text"
          :value="selectedPeriod"
          readonly
          class="selected-period"
          placeholder="Période sélectionnée"
        >
      </div>

      <div class="form-group">
        <label for="description">Description détaillée de l’action :</label>
        <textarea
          id="description"
          v-model="fiche.description"
          rows="10"
          @input="validateDescription"
          required
          placeholder="Décrire précisément l’action, depuis les étapes de préparation jusqu’à son exécution ; indiquer l’estimation du temps de travail personnel représenté par cette action"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-submit">ENVOYER</button>
        <button type="button" class="btn-cancel" @click="annuler">ANNULER</button>
      </div>
    </form>

    <div v-if="showPopup" class="popup-overlay" @click.self="showPopup = false">
    <div class="popup-content">
      <div class="popup-icon">
        <svg v-if="submissionSuccess" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
      <p class="popup-message">{{ popupMessage }}</p>
      <div class="popup-actions">
        <button class="btn-close" @click="showPopup = false">Fermer</button>
        <button v-if="submissionSuccess" class="btn-download" @click="downloadPDF">
          Télécharger le PDF
        </button>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/fr';
import jsPDF from 'jspdf';
import { PROMOTIONS, ENGAGEMENTS, TYPES_ACTION } from '../../constante/ficheEtudiantConstants'; 

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      fiche: {
        nom: '',
        prenom: '',
        annee: '',
        semestre: '',
        promotion: '',
        engagement: '',
        customEngagement: '',
        typeAction: '',
        customTypeAction: '',
        dates: [],
        description: ''
      },
      selectedPeriod: '',
      promotions: PROMOTIONS, // Utilisez la constante PROMOTIONS
      engagements: ENGAGEMENTS, // Utilisez la constante ENGAGEMENTS
      typesAction: TYPES_ACTION, // Utilisez la constante TYPES_ACTION
      showPopup: false,
      popupMessage: '',
      submissionSuccess: false
    };
  },
  computed: {
    filteredTypesAction() {
      if (this.fiche.engagement === 'Engagement Associatif') {
        return ['Bureau des étudiants', 'Ingénieur sans frontières', 'MIC', 'Horus', 'ROC'];
      }
      if (this.fiche.engagement === 'Engagement Diversité') {
        return ['La main à la pâte', 'Aide aux devoirs', 'Accompagnement d’enfants en difficulté', 'Mentorat'];
      }
      if (this.fiche.engagement === 'Engagement Climat-Environnement') {
        return ['Animation de la fresque du climat', 'du numèrique responsable', 'Organisation d’expositions', 'Organisation de conférence'];
      }
      if (this.fiche.engagement === 'Engagement école') {
        return ['Autres visant à promouvoir l’école', 'Ambassadeur ISIS', 'JPO'];
      }
      return this.typesAction;
    }
  },
  methods: {
    updateSelectedPeriod() {
      if (this.fiche.dates && this.fiche.dates.length === 2) {
        const startDate = this.fiche.dates[0];
        const endDate = this.fiche.dates[1];
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedStartDate = startDate.toLocaleDateString('fr-FR', options);
        const formattedEndDate = endDate.toLocaleDateString('fr-FR', options);
        this.selectedPeriod = `${formattedStartDate} - ${formattedEndDate}`;
      } else {
        this.selectedPeriod = '';
      }
    },
    submitForm() {
      const currentDate = new Date();
      const submissionEndDate = new Date('2025-12-31');
      if (currentDate > submissionEndDate) {
        this.popupMessage = "La période de soumission est fermée. La prochaine session ouvrira en janvier 2025.";
        this.showPopup = true;
        this.submissionSuccess = false;
        return;
      }
      if (this.fiche.engagement === 'Autres') {
        this.fiche.engagement = this.fiche.customEngagement;
        this.fiche.typeAction = this.fiche.customTypeAction;
      }
      this.popupMessage = "Votre fiche est envoyée avec succès. Téléchargez-la et continuez à avancer vers vos objectifs.";
      this.showPopup = true;
      this.submissionSuccess = true;
      console.log('Fiche soumise:', this.fiche);
    },
    annuler() {
      this.fiche = {
        nom: '',
        prenom: '',
        annee: '',
        semestre: '',
        promotion: '',
        engagement: '',
        customEngagement: '',
        typeAction: '',
        customTypeAction: '',
        dates: [],
        description: ''
      };
      this.selectedPeriod = '';
    },
    handleEngagementChange() {
      if (this.fiche.engagement !== 'Autres') {
        this.fiche.customEngagement = '';
        this.fiche.customTypeAction = '';
      }
    },
    downloadPDF() {
      const doc = new jsPDF();
      doc.text("Fiche descriptive Ingénieur Engagé", 10, 10);
      doc.text(`Nom: ${this.fiche.nom}`, 10, 20);
      doc.text(`Prénom: ${this.fiche.prenom}`, 10, 30);
      doc.text(`Année universitaire: ${this.fiche.annee}`, 10, 40);
      doc.text(`Semestre: ${this.fiche.semestre}`, 10, 50);
      doc.text(`Promotion: ${this.fiche.promotion}`, 10, 60);
      doc.text(`Engagement: ${this.fiche.engagement}`, 10, 70);
      doc.text(`Type d'action: ${this.fiche.typeAction}`, 10, 80);
      doc.text(`Dates: ${this.fiche.dates.join(', ')}`, 10, 90);
      doc.text(`Description: ${this.fiche.description}`, 10, 100);
      doc.save('fiche_ingenieur_engage.pdf');
      this.showPopup = false;
    }
  }
};
</script>

<style scoped src="./SaisirFicheView.css"></style>