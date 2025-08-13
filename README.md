# API - Gestion des Tâches d'une Équipe

## Authentification

### 1. Inscription (Register)
- **Méthode** : POST
- **URL** : `/api/auth/register`
- **Body (JSON)** :
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
```

### 2. Connexion (Login)
- **Méthode** : POST
- **URL** : `/api/auth/login`
- **Body (JSON)** :
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```
- **Réponse** :
  - Un token JWT à utiliser pour les routes protégées.

---

## Utilisateurs (admin uniquement)

### 3. Obtenir la liste des utilisateurs
- **Méthode** : GET
- **URL** : `/api/users?page=1&limit=10`
- **Headers** :
  - `Authorization: Bearer <token>` (admin)

### 4. Obtenir un utilisateur par ID
- **Méthode** : GET
- **URL** : `/api/users/{userId}`
- **Headers** :
  - `Authorization: Bearer <token>` (admin)

### 5. Mettre à jour un utilisateur
- **Méthode** : PUT
- **URL** : `/api/users/{userId}`
- **Headers** :
  - `Authorization: Bearer <token>` (admin)
- **Body (JSON)** :
```json
{
  "name": "Alice Updated",
  "email": "aliceupdated@example.com"
}
```

### 6. Supprimer un utilisateur
- **Méthode** : DELETE
- **URL** : `/api/users/{userId}`
- **Headers** :
  - `Authorization: Bearer <token>` (admin)

---

## Tâches (Tasks)

### 7. Ajouter une tâche
- **Méthode** : POST
- **URL** : `/api/tasks`
- **Headers** :
  - `Authorization: Bearer <token>`
- **Body (JSON)** :
```json
{
  "title": "Préparer réunion",
  "description": "Organiser les points clés",
  "priority": "high",
  "status": "todo",
  "assignedTo": "{userId}"
}
```

### 8. Obtenir la liste des tâches (pagination + filtre)
- **Méthode** : GET
- **URL** : `/api/tasks?page=1&limit=10&priority=high&status=todo`
- **Headers** :
  - `Authorization: Bearer <token>`

### 9. Obtenir une tâche par ID
- **Méthode** : GET
- **URL** : `/api/tasks/{taskId}`
- **Headers** :
  - `Authorization: Bearer <token>`

### 10. Mettre à jour une tâche
- **Méthode** : PUT
- **URL** : `/api/tasks/{taskId}`
- **Headers** :
  - `Authorization: Bearer <token>`
- **Body (JSON)** :
```json
{
  "status": "done",
  "priority": "medium"
}
```

### 11. Supprimer une tâche
- **Méthode** : DELETE
- **URL** : `/api/tasks/{taskId}`
- **Headers** :
  - `Authorization: Bearer <token>`

---

## Notes
- Toutes les routes sauf `/api/auth/register` et `/api/auth/login` nécessitent un header Authorization avec un token JWT valide.
- Les routes `/api/users` sont réservées à l'admin.
- Les membres peuvent gérer uniquement leurs propres tâches.
- Remplace `{userId}` et `{taskId}` par les vrais identifiants MongoDB.
- Pour tester, commence par t’inscrire, te connecter pour obtenir un token, puis utilise ce token dans les autres requêtes.

# GestionDeTacheBackend
