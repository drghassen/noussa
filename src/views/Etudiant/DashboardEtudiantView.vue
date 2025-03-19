<template>
    <div class="accueil-etudiant">
      <!-- En-tête -->
      <div class="header">
        <h1>Bonjour, {{ user.firstName }} 👋</h1>
        <p class="subtitle">Voici un aperçu de vos activités et participations.</p>
      </div>
  
      
      <div class="stats">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-chart-line" style="color: #007074;"></i>
          </div>
          <div class="stat-content">
            <span class="stat-label">Total de points obtenus</span>
            <span class="stat-value" style="color: #007074;">{{ totalPoints }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-check-circle" style="color: #27AE60;"></i>
          </div>
          <div class="stat-content">
            <span class="stat-label">Participations validées</span>
            <span class="stat-value" style="color: #27AE60;">{{ participationsValidees }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-user-tie" style="color: #CE9F0F;"></i>
          </div>
          <div class="stat-content">
            <span class="stat-label">Validées par le directeur</span>
            <span class="stat-value" style="color: #CE9F0F;">{{ participationsValideesDirecteur }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-hourglass-half" style="color: #143D60;"></i>
          </div>
          <div class="stat-content">
            <span class="stat-label">Participations en attente</span>
            <span class="stat-value" style="color: #143D60;">{{ participationsNonTraitees }}</span>
          </div>
        </div>
      </div>
  
      <!-- Informations supplémentaires -->
      <div class="info">
        <p>Pour plus d’informations, cliquez sur le bouton ci-dessous.</p>
        <button @click="showMoreInfo" class="modern-button">Cliquez ici !</button>
      </div>
  
      <!-- Message de confidentialité -->
      <div class="privacy-message">
        <p>Vos données seront protégées et supprimées de nos serveurs dès que vous quitterez l'établissement.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Données de l'étudiant
  const user = ref({
    firstName: 'Ines', 
  });
  
  // Statistiques
  const totalPoints = ref(12);
  const participationsValidees = ref(2);
  const participationsValideesDirecteur = ref(4);
  const participationsNonTraitees = ref(6);
  
  // Fonction pour afficher plus d'informations
  const showMoreInfo = () => {
    alert('Plus d\'informations seront affichées ici.');
  };
  </script>
  
  <style scoped>
  /* Style général */
  .accueil-etudiant {
    padding: 40px 20px;
    font-family: 'Inter', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #fafafa;
    min-height: 100vh;
  }
  
  /* En-tête */
  .header {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .header h1 {
    font-size: 2.8rem;
    color: #2c3e50;
    margin-bottom: 10px;
    font-weight: 700;
  }
  
  .header .subtitle {
    font-size: 1.1rem;
    color: #7f8c8d;
    font-weight: 400;
  }
  
  /* Statistiques sous forme de cartes */
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 60px;
  }
  
  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    align-items: center;
    border: 1px solid #e0e0e0;
  }
  
  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .stat-icon {
    font-size: 1.5rem;
    margin-right: 20px;
    color: #6A3FA0;
  }
  
  .stat-content {
    flex: 1;
  }
  
  .stat-label {
    display: block;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
  }
  
  /* Informations supplémentaires */
  .info {
    text-align: center;
    margin-bottom: 60px;
  }
  
  .info p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 20px;
    font-weight: 400;
  }
  
  .modern-button {
    background: linear-gradient(135deg, #6A3FA0, #8E44AD);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background 0.3s ease, transform 0.3s ease;
  }
  
  .modern-button:hover {
    background: linear-gradient(135deg, #8E44AD, #6A3FA0);
    transform: scale(1.05);
  }
  
  /* Message de confidentialité */
  .privacy-message {
    text-align: center;
    font-size: 0.9rem;
    color: #7f8c8d;
    margin-top: 60px;
    font-weight: 400;
  }
  </style>