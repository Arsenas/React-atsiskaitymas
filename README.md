# Receptų Paieškos Aplikacija (React + TypeScript + JSON Server)

## 📌 Aprašymas
Ši aplikacija leidžia vartotojams peržiūrėti, pridėti, redaguoti ir trinti receptus, taip pat išsaugoti mėgstamiausius bei palikti atsiliepimus. Aplikacija sukurta naudojant **React**, **TypeScript**, **SCSS** bei **JSON Server** API.

## ⚙️ Naudojamos technologijos:
- React + TypeScript
- React Router (navigacija tarp puslapių)
- Context API + useReducer (bendrai valdomi duomenys)
- JSON Server (fake backend)
- SCSS (stiliaus failai, responsive dizainas)
- Git + GitHub (versijų kontrolė)

## 📌 Puslapiai ir funkcijos:
- **🏠 Pagrindinis puslapis** – rodomi visi receptai
- **🔎 Recepto peržiūra (`/recipe/:id`)** – galima peržiūrėti vieną receptą
- **➕ Pridėti receptą (`/add-recipe`)** – galima įtraukti naują receptą
- **📝 Redaguoti receptą (`/edit-recipe/:id`)** – galima atnaujinti esamą receptą
- **💾 Mėgstamiausi (`/favorites`)** – galima išsaugoti mėgstamiausius receptus
- **💬 Atsiliepimai (`/reviews`)** – galima palikti ir pašalinti atsiliepimus

## 📌 Kaip paleisti projektą?
1. **Instaliuoti priklausomybes**  
   ```bash
   npm install
   ```
2. **Paleisti JSON serverį**  
   ```bash
   npm run server
   ```
3. **Paleisti React aplikaciją**  
   ```bash
   npm run dev
   ```

## 📌 API Endpoint'ai:
- **GET** `/recipes` – gauti visus receptus
- **GET** `/recipes/:id` – gauti konkretų receptą
- **POST** `/recipes` – pridėti naują receptą
- **PATCH** `/recipes/:id` – redaguoti receptą
- **DELETE** `/recipes/:id` – pašalinti receptą