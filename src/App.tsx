import React from "react";
import "./App.css";
import Main from "./components/Layout/Main";
import PastIPC from "./components/Layout/PastIPC";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Models from "./components/Layout/Models";
import Features from "./components/Layout/Features";
import NotFound from "./components/Layout/NotFound";

function App() {
  return (
    <Main>
      <Routes>
        <Route index element={<PastIPC/>} />
        <Route path="past_ipc" element={<PastIPC />} />
        <Route path="features" element={<Features />} />
        <Route path="predictions" element={<Models />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </Main>
  );
}

export default App;
