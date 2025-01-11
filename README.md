# Shopping List Service
Der Shopping List Service verwaltet Einkaufslisten, welche aus einzelnen Rezepten un deren aggregierten Gesamtzutaten bestehen, dessen Einkaufsstatus mengenmäßig ebefalls abgespeichert wird.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=THI-CND_shoppinglist_service&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=THI-CND_shoppinglist_service)

## Getting Started
### Abhängigkeiten
Um das Projekt lokal zu starten, müssen die folgenden Abhängigkeiten installiert werden:
- Node 22
- npm 11+
- Docker
- Docker compose

### Starten
Um die Projektabhängigkeiten zu installieren, führen Sie den folgenden Befehl aus:
```bash
npm install
```
Um das Projekt lokal zu starten, führen Sie den folgenden Befehl aus:
```bash
npm run start:dev
```

### Entwicklungsumgebung
Als Entwicklungsumgebung wird Visual Studio Code verwendet und empfohlen.

### Docker
Das Projekt kann auch lokal per Docker gestartet werden.\
Dazu muss im Projektordner der folgende Befehl ausgeführt werden:
```bash
docker compose up
```

### Umgebungsvariablen
Es stehen die folgenden Umgebungsvariablen zur Konfiguration zur Verfügung:
- `DB_HOST`: Der Hostname der Datenbank.
- `DB_PORT`: Der Port der Datenbank.
- `DB_USER`: Der Benutzername der Datenbank.
- `DB_PASSWORD`: Das Passwort der Datenbank.
- `DB_NAME`: Der Name der Datenbank.
- `RABBIT_URL`: Die URL der RabbitMQ Message Queue.\
Format: `amqp://<user>:<password>@<host>:<port>`
- `RECIPE_SERVICE_ADDRESS`: Die Adresse der gRPC Schnittstelle des Recipe Service.
- `RABBIT_EXCHANGE`: Der RabbitMQ Exchange Name für das Veröffentlichen der Events.

## Schnittstellen
### REST
#### V1
##### GET `api/v1/shopping-list`
Gibt alle Einkaufszettel zurück.
Response:
- Status: 200 OK
- Body: `List<ShoppingListResponse>`

##### GET `api/v1/shopping-list/{id}`
Gibt die Einkaufsliste mit der ID `id` zurück.
Response:
- Status: 200 OK
- Body: `ShoppingListResponse`

##### POST `api/v1/shopping-list`
Erstellt eine neue Einkaufsliste.
Request:
- Body: `ShoppingListCreateRequest`
- Status: 200 OK
- Body: `ShoppingListResponse`

##### PUT `api/v1/shopping-list/{id}`
Aktualisiert die Einkaufsliste mit der ID `id`.
Request:
- Body: `ShoppingListUpdateRequest`
- Status: 200 OK
- Body: `ShoppingListResponse`

##### DELETE `api/v1/shopping-list/{id}`
Löscht die Einkaufsliste mit der ID `id`.
Response:
- Status: 200 OK

#### V2
##### PATCH `api/v2/shopping-list/{id}/recipe`
Fügt ein neues Rezept zur Einkaufsliste mit der ID `id` hinzu.
Request:
- Body: `RecipeRequest`
- Status: 200 OK
- Body: `ShoppingListResponse`

##### DELETE `api/v2/shopping-list/{id}/recipe/{recipeId}`
Löscht das Rezept mit der ID `recipeId` aus der Einkaufsliste mit der ID `id`.
Response:
- Status: 200 OK
- Body: `ShoppingListResponse`

##### PATCH `api/v2/shopping-list/{id}/purchased-ingredient`
Fügt eine neue gekaufte Zutat zur Einkaufsliste mit der ID `id` hinzu.
Request:
- Body: `QuantifiedIngredientRequest`
- Status: 200 OK
- Body: `ShoppingListResponse`

##### DELETE `api/v2/shopping-list/{id}/purchased-ingredient/{ingredientId}`
Löscht die eingekaufte Zutat mit der ID `ingredientId` aus der Einkaufsliste mit der ID `id`.
Response:
- Status: 200 OK
- Body: `ShoppingListResponse`

##### PUT `api/v2/shopping-list/{id}/total-ingredients`
Aktualisiert die gesamten einzukaufenden Zutaten der Einkaufsliste mit der ID `id`.
Response:
- Status: 200 OK
- Body: `ShoppingListResponse`

### gRPC
```proto
syntax = "proto3";

package de.benedikt_schwering.thicnd.stubs;

option java_multiple_files = true;
option java_package = "de.benedikt_schwering.thicnd.stubs";

service ShoppingListService {
  rpc UpdateTotalIngredientsInShoppingList (ShoppingListIdRequest) returns (ShoppingListResponse);
}

message ShoppingListIdRequest {
  string id = 1;
}

message ShoppingListResponse {
  string id = 1;
  string name = 2;
  string author = 3;
  string description = 4;
  repeated string recipes = 5;
  repeated string changedRecipes = 6;
  repeated QuantifiedIngredientResponse totalIngredients = 7;
  repeated QuantifiedIngredientResponse purchasedIngredients = 8;
  bool finished = 9;
}

message QuantifiedIngredientResponse {
  int64 ingredient = 1;
  double quantity = 2;
}
```

## Events
### `shoppinglist.created`
Wird gesendet, wenn eine neue Einkaufsliste erstellt wurde.\
Payload: `ShoppingListEvent`

### `shoppinglist.updated`
Wird gesendet, wenn eine Einkaufsliste aktualisiert wurde.\
Payload: `ShoppingListEvent`

### `shoppinglist.deleted`
Wird gesendet, wenn eine Einkaufsliste gelöscht wurde.\
Payload: `ShoppingListDeletedEvent`

## Datenmodell
### ShoppingListResponse
```json
{
  "id": "string",
  "name": "string",
  "author": "string",
  "recipes": [
    "string"
  ],
  "changedRecipes": [
    "string"
  ],
  "totalIngredients": [
    {
      "recipe": 0,
      "quantity": 0
    }
  ],
  "purchasedIngredients": [
    {
      "recipe": 0,
      "quantity": 0
    }
  ],
  "finished": false
}
```

### ShoppingListCreateRequest
```json
{
  "name": "string",
  "author": "string"
}
```

### ShoppingListUpdateRequest
```json
{
  "name": "string",
  "author": "string",
  "finished": false
}
```

### RecipeRequest
```json
{
  "id": "string"
}
```

### QuantifiedIngredientRequest
```json
{
  "ingredient": 0,
  "quantity": 0
}
```

### `ShoppingListEvent`
```json
{
  "id": "string",
  "name": "string",
  "author": "string",
  "recipes": [
    "string"
  ],
  "changedRecipes": [
    "string"
  ],
  "totalIngredients": [
    {
      "ingredient": 0,
      "quantity": 0
    }
  ],
  "purchasedIngredients": [
    {
      "ingredient": 0,
      "quantity": 0
    }
  ],
  "finished": false
}
```

### `ShoppingListDeletedEvent`
```json
{
  "id": "string"
}
```
