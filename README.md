# **API Documentation**

Cette API permet de gérer des voitures et de calculer le temps de trajet en fonction de la distance et du modèle de voiture. Elle est construite avec **Next.js**, **Zustand**, et **Zod** pour la validation des données.

---

## **Endpoints**

### **1. CRUD pour les voitures**

#### **GET `/api/cars`**
- **Description** : Récupère la liste des voitures.
- **Méthode** : `GET`
- **URL** : `/api/cars`
- **Réponse réussie** :
  ```json
  {
    "data": [
      {
        "id": "1",
        "model": "Tesla Model 3",
        "maxSpeed": 250,
        "features": ["Autopilot", "Electric"]
      }
    ]
  }
  ```
- **Réponse d'erreur** :
  ```json
  {
    "error": "Une erreur est survenue"
  }
  ```

#### **POST `/api/cars`**
- **Description** : Ajoute une nouvelle voiture.
- **Méthode** : `POST`
- **URL** : `/api/cars`
- **Corps de la requête** :
  ```json
  {
    "model": "Tesla Model 3",
    "maxSpeed": 250,
    "features": ["Autopilot", "Electric"]
  }
  ```
- **Réponse réussie** :
  ```json
  {
    "data": {
      "id": "1",
      "model": "Tesla Model 3",
      "maxSpeed": 250,
      "features": ["Autopilot", "Electric"]
    }
  }
  ```
- **Réponse d'erreur** :
  ```json
  {
    "error": "Une erreur est survenue"
  }
  ```

#### **GET `/api/cars/:id`**
- **Description** : Récupère une voiture par son ID.
- **Méthode** : `GET`
- **URL** : `/api/cars/:id`
- **Réponse réussie** :
  ```json
  {
    "data": {
      "id": "1",
      "model": "Tesla Model 3",
      "maxSpeed": 250,
      "features": ["Autopilot", "Electric"]
    }
  }
  ```
- **Réponse d'erreur** :
  ```json
  {
    "error": "Voiture non trouvée"
  }
  ```

#### **PUT `/api/cars/:id`**
- **Description** : Met à jour une voiture par son ID.
- **Méthode** : `PUT`
- **URL** : `/api/cars/:id`
- **Corps de la requête** :
  ```json
  {
    "model": "Tesla Model 3",
    "maxSpeed": 250,
    "features": ["Autopilot", "Electric"]
  }
  ```
- **Réponse réussie** :
  ```json
  {
    "data": {
      "id": "1",
      "model": "Tesla Model 3",
      "maxSpeed": 250,
      "features": ["Autopilot", "Electric"]
    }
  }
  ```
- **Réponse d'erreur** :
  ```json
  {
    "error": "Une erreur est survenue"
  }
  ```

#### **DELETE `/api/cars/:id`**
- **Description** : Supprime une voiture par son ID.
- **Méthode** : `DELETE`
- **URL** : `/api/cars/:id`
- **Réponse réussie** :
  ```json
  {
    "data": null
  }
  ```
- **Réponse d'erreur** :
  ```json
  {
    "error": "Voiture non trouvée"
  }
  ```

---

### **2. Calcul du temps de trajet**

#### **POST `/api/travel-time`**
- **Description** : Calcule le temps de trajet en fonction de la distance et du modèle de voiture.
- **Méthode** : `POST`
- **URL** : `/api/travel-time`
- **Corps de la requête** :
  ```json
  {
    "distance": 121,
    "model": "Tesla Model 3"
  }
  ```
- **Réponse réussie** :
  ```json
  {
    "data": {
      "hours": 0,
      "minutes": 29,
      "car": {
        "id": "1",
        "model": "Tesla Model 3",
        "maxSpeed": 250,
        "features": ["Autopilot", "Electric"]
      }
    }
  }
  ```
- **Réponse d'erreur** :
  ```json
  {
    "error": "Modèle de voiture non trouvé"
  }
  ```

---

## **Utilisation**

### **1. Installation**
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votreuser/votre-repo.git
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Démarrez le serveur :
   ```bash
   npm run dev
   ```

### **2. Exemples de requêtes**

#### **Ajouter une voiture**
```bash
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{"model": "Tesla Model 3", "maxSpeed": 250, "features": ["Autopilot", "Electric"]}'
```

#### **Récupérer une voiture par son ID**
```bash
curl http://localhost:3000/api/cars/1
```

#### **Calculer le temps de trajet**
```bash
curl -X POST http://localhost:3000/api/travel-time \
  -H "Content-Type: application/json" \
  -d '{"distance": 121, "model": "Tesla Model 3"}'
```

---

## **Erreurs courantes**

- **400** : Requête invalide (ex: données manquantes ou incorrectes).
- **404** : Ressource non trouvée (ex: voiture non trouvée).
- **500** : Erreur serveur interne.

---

## **Contribuer**

1. Forkez le projet.
2. Créez une branche (`git checkout -b feature/AmazingFeature`).
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`).
4. Pushez la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.

---

## **Licence**

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---

## **Contact**

Jason Yawilhit - [jason.michel.ld@gmail.com](mailto:jason.michel.ld@gmail.com)

Lien du projet : [https://github.com/jasonviipers/klh-fullstack](https://github.com/jasonviipers/klh-fullstack)

