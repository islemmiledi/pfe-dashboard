import React, { useState, useContext, useEffect } from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Link, Navigate, Outlet } from "react-router-dom";
import SideBar from "./components/Sidebar";
import Login from "./pages/Login/Login";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import { Toaster } from "react-hot-toast";
import Gerant from "./pages/gerant/Gerant";
import Membres from "./pages/Membres/Membres";
import Salle from "./pages/Salle/Salle";
import DashboardGerant from "./pages/DashboardGerant/DashboardGerant";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import ProtectedRouteGerant from "./protectedRoute/protectedRouteGerant";
import SideBarGerant from "./components/Sidebar/SideBarGerant";
import Coach from "./pages/coach/Coach";
import GestionDesMembres from "./pages/Gestion Membre/GestionDesMembres";
import Contact from "./pages/Contact/Contact";
import Footer from "./pages/Footer/Footer";
import AboutUs from "./pages/about us/AboutUs";
import Offre from "./pages/Nos Offres/Offre";
import Accueil from "./pages/accueil/Accueil";
import Program from "./pages/program/Program";
import { useDispatch } from "react-redux";
import { getfindOneWithId } from "./api/actions/gerant.actions";
import Produit from "./pages/produit/Produit";
import Ordre from "./pages/ordre/Ordre";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getfindOneWithId());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Common Login Route */}
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dash-gerant"
            element={
              <SideBarGerant>
                <DashboardGerant />
              </SideBarGerant>
            }
          />
          <Route
            path="/coach"
            element={
              <SideBarGerant>
                <Coach />
              </SideBarGerant>
            }
          />
          <Route
            path="/accueil"
            element={
              <SideBarGerant>
                <Accueil />
              </SideBarGerant>
            }
          />
          <Route
            path="/aboutus"
            element={
              <SideBarGerant>
                <AboutUs />
              </SideBarGerant>
            }
          />

          <Route
            path="/program"
            element={
              <SideBarGerant>
                <Program />
              </SideBarGerant>
            }
          />
          <Route
            path="/gestion-membres"
            element={
              <SideBarGerant>
                <GestionDesMembres />
              </SideBarGerant>
            }
          />

          <Route
            path="/contact"
            element={
              <SideBarGerant>
                <Contact />
              </SideBarGerant>
            }
          />
          <Route
            path="/footer"
            element={
              <SideBarGerant>
                <Footer />
              </SideBarGerant>
            }
          />
          <Route
            path="/nosoffres"
            element={
              <SideBarGerant>
                <Offre />
              </SideBarGerant>
            }
          />
          {/* <Route
            path="/informationslle"
            element={
              <SideBarGerant>
                <InformationSalle />
              </SideBarGerant>
            }
          /> */}
          <Route
            path="/produit"
            element={
              <SideBarGerant>
                <Produit />
              </SideBarGerant>
            }
          />
          <Route
            path="/ordres"
            element={
              <SideBarGerant>
                <Ordre />
              </SideBarGerant>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dash-admin"
            element={
              <SideBar>
                <Dashboard />
              </SideBar>
            }
          />
          <Route
            path="/gerant"
            element={
              <SideBar>
                <Gerant />
              </SideBar>
            }
          />
          <Route
            path="/membres"
            element={
              <SideBar>
                <Membres />
              </SideBar>
            }
          />
          <Route
            path="/salle"
            element={
              <SideBar>
                <Salle />
              </SideBar>
            }
          />
        </Route>

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
