import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Chat,
  Feeds,
  DisplayTotalMessage,
  Login,
  ProtectedRoute,
  NavbarComponent,
  Archive,
} from "./index";
import { useSelector } from "react-redux";

function RouterComponent() {
  const isAuthenticated = useSelector((state) => state.api.isAuthenticated);
  return (
    <>
      <NavbarComponent  isAuthenticated={isAuthenticated}/>
      <Routes>
        {/* <Route path="/feeds" element={<Feeds />} />
        <Route path="/totalmessage" element={<DisplayTotalMessage />} />
        <Route path="/chat" element={<Chat />} /> */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/feeds"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Feeds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/totalmessage"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DisplayTotalMessage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archives"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Archive />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default RouterComponent;
