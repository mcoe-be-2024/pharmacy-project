import React from "react";
import { Containers } from './containers/Containers';
import { AuthProvider } from "./context";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Containers />
      </AuthProvider>
    </>
  );
}
