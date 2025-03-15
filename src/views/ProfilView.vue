<template>
  <div class="profile-page">
    <!-- Image en haut de l'écran -->
    <div class="top-image">
      <img src="@/Images/headerProfile.png" alt="Header Image" />
    </div>

    <!-- Conteneur principal pour la sidebar et le contenu -->
    <div class="main-container">
      <!-- Profile Section -->
      <div class="profile-section">
        <!-- Boutons à droite -->
        <div class="action-buttons">
          <button
            @click="activeTab = 'profile'"
            :class="{ active: activeTab === 'profile' }"
          >
            <i class="fas fa-user"></i> Profil
          </button>
          <button
            @click="activeTab = 'notifications'"
            :class="{ active: activeTab === 'notifications' }"
          >
            <i class="fas fa-bell"></i> Notifications
          </button>
          <button @click="openPasswordPopup">
            <i class="fas fa-lock"></i> Mot de passe
          </button>
        </div>

        <!-- Ligne de séparation -->
        <div class="separator"></div>

        <!-- Contenu principal -->
        <div class="profile-content">
          <!-- Profile Picture and Role -->
          <div class="profile-header">
            <div class="profile-pic-container">
              <img
                src="@/Images/headerProfile.png"
                alt="Profile Picture"
                class="profile-pic"
                v-if="profile.image"
              />
              <div v-else class="profile-pic-placeholder">
                {{ profileInitials }}
              </div>
              <span class="role">Directeur</span>
            </div>
            <span class="notification-badge">8</span>
          </div>

          <!-- Profile Form -->
          <div v-if="activeTab === 'profile'" class="profile-form">
            <form @submit.prevent="saveProfile">
              <!-- Nom et Prénom sur la même ligne -->
              <div class="name-fields">
                <div class="form-group">
                  <label for="lastName">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    v-model="profile.lastName"
                    required
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label for="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    v-model="profile.firstName"
                    required
                    class="form-input"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="profile.email"
                  required
                  class="form-input"
                />
              </div>
              <p class="last-update">Dernière mise à jour : 1 août 2023</p>
              <button type="submit" class="save-btn">
                <i class="fas fa-save"></i> Enregistrer
              </button>
            </form>
          </div>

          <!-- Notifications -->
          <div v-if="activeTab === 'notifications'" class="notifications-section">
            <h2><i class="fas fa-bell"></i> Notifications</h2>
            <p>Vous n'avez pas de nouvelles notifications.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup pour changer le mot de passe -->
    <div v-if="showPasswordPopup" class="password-popup-overlay">
      <div class="password-popup">
        <!-- Icône SVG au sommet de la popup -->
        <div class="popup-icon">
          <img :src="LockIcon" alt="Lock Icon" />
        </div>
        <h2>Changer votre mot de passe</h2>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label for="newPassword">Nouveau mot de passe</label>
            <input
              type="password"
              id="newPassword"
              v-model="password.new"
              required
              class="form-input"
              placeholder="nouveau mot de passe"
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmer</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="password.confirm"
              required
              class="form-input"
              placeholder="confirmer votre mot de passe"
            />
          </div>
          <p class="password-requirements">
            Le mot de passe doit contenir au moins 8 caractères.
          </p>
          <div class="popup-buttons">
            <button type="button" @click="closePasswordPopup" class="cancel-btn">
              Annuler
            </button>
            <button type="submit" class="confirm-btn">
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// Importation de l'image pour la popup
import LockIcon from "@/Images/lock.png";

export default {
  name: "ProfileView",
  data() {
    return {
      activeTab: "profile", // Onglet actif par défaut
      showPasswordPopup: false, // Contrôle l'affichage de la popup
      profile: {
        firstName: "Adrien",
        lastName: "Defossez",
        email: "adrien.defossez@univ-jfc.fr",
        image: "", // Image de profil (vide par défaut)
      },
      password: {
        new: "",
        confirm: "",
      },
      LockIcon: LockIcon, // Utilisation de l'image importée
    };
  },
  computed: {
    // Initiales du profil
    profileInitials() {
      return (
        this.profile.firstName.charAt(0) + this.profile.lastName.charAt(0)
      ).toUpperCase();
    },
  },
  methods: {
    // Sauvegarder le profil
    saveProfile() {
      console.log("Profil mis à jour :", this.profile);
      alert("Profil mis à jour avec succès !");
    },
    // Changer le mot de passe
    changePassword() {
      if (this.password.new !== this.password.confirm) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
      if (this.password.new.length < 8) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        return;
      }
      console.log("Mot de passe changé :", this.password);
      this.password = { new: "", confirm: "" }; // Réinitialiser le formulaire
      alert("Mot de passe changé avec succès !");
      this.closePasswordPopup(); // Fermer la popup après la soumission
    },
    // Ouvrir la popup
    openPasswordPopup() {
      this.showPasswordPopup = true;
    },
    // Fermer la popup
    closePasswordPopup() {
      this.showPasswordPopup = false;
    },
    // Gérer l'upload d'image
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

.profile-page {
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
}

.top-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;
}

.top-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-container {
  display: flex;
  flex: 1;
  margin-top: 20px;
}

.profile-section {
  flex: 1;
  padding: 40px 20px;
  background-color: #ffffff;
  margin-left: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  padding-right: 20px;
}

.action-buttons button {
  background-color: #f8f8f9;
  color: #caced8;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-buttons button:hover {
  background-color: #5a3ccf;
}

.action-buttons button.active {
  background-color: #7d64d4;
}

.separator {
  width: 1px;
  background-color: #ddd;
  margin: 0 20px;
}

.profile-content {
  flex: 1;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.profile-pic-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #6b48ff;
  object-fit: cover;
}

.profile-pic-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e6d9ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #6b48ff;
}

.role {
  font-size: 16px;
  color: #555;
  font-weight: 500;
}

.notification-badge {
  background-color: #ff4d4f;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.name-fields {
  display: flex;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  border-color: #6b48ff;
  box-shadow: 0 0 8px rgba(107, 72, 255, 0.2);
  outline: none;
}

.last-update {
  font-size: 12px;
  color: #999;
  text-align: right;
  margin-top: 10px;
}

.save-btn {
  background-color: #6b48ff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  align-self: flex-start;
}

.save-btn:hover {
  background-color: #5a3ccf;
}

.notifications-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

p {
  font-size: 14px;
  color: #777;
}

.password-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.password-popup {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
}

.password-popup h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.password-popup .form-group {
  margin-bottom: 20px;
}

.password-popup .form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.password-popup .password-requirements {
  font-size: 12px;
  color: #777;
  text-align: center;
  margin-bottom: 20px;
}

.password-popup .popup-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.password-popup .cancel-btn {
  background-color: #f8f8f9;
  color: #333;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  flex: 1;
}

.password-popup .cancel-btn:hover {
  background-color: #e0e0e0;
}

.password-popup .confirm-btn {
  background-color: #ED6962;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  flex: 1;
}

.password-popup .confirm-btn:hover {
  background-color: #5a3ccf;
}

.popup-icon {
  text-align: center;
  margin-bottom: 20px;
}

.popup-icon img {
  width: 50px;
  height: 50px;
}
</style>