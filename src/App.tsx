import { BrowserRouter as Router } from "react-router-dom";
import "./utils/chartSetup";

import { AuthProvider } from "./contexts/authContext";
import { EntryProvider } from "./contexts/entryContext";
import AppContent from "./AppContent";
import { Toaster } from "react-hot-toast";
import { useBreakpoint } from "./hooks/useBreakpoint";

export default function App() {

const { isMobile } = useBreakpoint();
  return (
    <>
      <Toaster
        position={isMobile ? "top-center" : "bottom-center"} 
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: isMobile? "8px" : "10px",
            fontSize: isMobile? "14px" : "20px",
            padding: "12px 24px",
            color: "#fff",
          },
          success: {
            style: {
              background: "#15803d",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#166534",
            },
          },
          error: {
            style: {
              background: "#b91c1c",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#991b1b",
            },
          },
        }}
      />
      <Router>
        <AuthProvider>
          <EntryProvider>
            <AppContent />
          </EntryProvider>
        </AuthProvider>
      </Router>
    </>
  );
}
