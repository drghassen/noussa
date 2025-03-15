<template>
  <div class="notifications-container">
    <!-- En-tête -->
    <div class="header">
      <div class="header-content">
        <h1>Notifications</h1>
        <button class="mark-read-button" @click="markAllAsRead">Marquer comme lu</button>
      </div>
    </div>

    <!-- Liste des notifications récentes -->
    <div class="notifications-list">
      <div
        v-for="(notification, index) in notifications"
        :key="index"
        class="notification-item"
        :class="{ unread: !notification.read }"
        @click="markAsRead(notification)"
      >
        <div class="notification-icon">
          <i class="fas fa-bell"></i>
        </div>
        <div class="notification-content">
          <h3>{{ notification.title }}</h3>
          <p>{{ notification.message }}</p>
          <span class="notification-time">{{ notification.time }}</span>
        </div>
        <div v-if="!notification.read" class="notification-badge">Nouveau</div>
      </div>
    </div>

    <!-- Section des notifications précédentes -->
    <div class="previous-notifications">
      <div class="previous-notifications-content">
        <h2>Notifications précédentes</h2>
        <button class="close-button" @click="closeNotifications">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Données de notifications simulées
const notifications = ref([
  {
    title: 'Nouvelle fiche soumise',
    message: 'In débutant au milieu des fiches ingénieurs Engoçé. Vous pouvez maintenant...',
    time: 'Il y a 5 minutes',
    read: false,
  },
  {
    title: 'Fiche en attente de validation',
    message: 'Une nouvelle fiche ingénieur Engoçé attend votre validation...',
    time: 'Il y a 1 heure',
    read: false,
  },
  {
    title: 'Fiche soumise avec succès',
    message: 'Une fiche supérieure Engoçé s’effectue pour seulement. On...',
    time: 'Il y a 2 heures',
    read: true,
  },
  {
    title: 'Fiche prête à être évaluée',
    message: 'En retirant le visite ou en faire longueur Engoçé, il ne compte de lui attribuer...',
    time: 'Il y a 3 heures',
    read: true,
  },
]);

// Marquer une notification comme lue
const markAsRead = (notification) => {
  notification.read = true;
};

// Marquer toutes les notifications comme lues
const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.read = true;
  });
};

// Fermer les notifications
const closeNotifications = () => {
  console.log('Fermer les notifications');
};
</script>

<style scoped>
.notifications-container {
  background-color: #f4f7fa;
  padding: 20px;
  margin: 20px;
  border-radius: 15px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 24px;
  color: #6a3fa0;
  margin: 0;
}

.user-email {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 10px;
}

.mark-read-button {
  background-color: #6a3fa0;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.mark-read-button:hover {
  background-color: #5F4E9B;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.notification-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
}

.notification-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.notification-item.unread {
  border-left: 4px solid #6a3fa0;
}

.notification-icon {
  font-size: 20px;
  margin-right: 15px;
  color: #6a3fa0;
}

.notification-content {
  flex-grow: 1;
}

.notification-content h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}

.notification-content p {
  font-size: 14px;
  color: #666;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.notification-badge {
  background-color: #d7443a;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.previous-notifications {
  margin-top: 30px;
}

.previous-notifications-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.previous-notifications h2 {
  font-size: 18px;
  color: #6a3fa0;
  margin: 0;
}

.close-button {
  background-color: #6a3fa0;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #5F4E9B;
}
</style>