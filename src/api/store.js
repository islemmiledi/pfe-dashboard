import authSlice from "./slices/authSlice";
import gerantSlice from "./slices/gerantSlice";

import { configureStore } from "@reduxjs/toolkit";
import salleSlice from "./slices/salleSlice";
import membreSlice from "./slices/membreSlice";
import coachSlice from "./slices/coachSlice";
import footerSlice from "./slices/footerSlice";
import aboutusSlice from "./slices/aboutusSlice";
import offreSlice from "./slices/offreSlice";
import accueilSlice from "./slices/accueilSlice";
import programSlice from "./slices/programSlice";
import produitSlice from "./slices/produitSlice";
import ordresSlice from "./slices/ordreSlice";

const store = configureStore({
  reducer: {
    gerant: gerantSlice,
    auth: authSlice,
    salle: salleSlice,
    membre: membreSlice,
    coach: coachSlice,
    footer: footerSlice,
    aboutus: aboutusSlice,
    offre: offreSlice,
    accueil: accueilSlice,
    Program: programSlice,
    Produit: produitSlice,
    Ordres: ordresSlice,
  },
});
export default store;
