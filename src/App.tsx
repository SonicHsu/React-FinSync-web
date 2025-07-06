import { BrowserRouter as Router } from "react-router-dom";
import "./utils/chartSetup";

import { AuthProvider } from "./contexts/authContext";
import { EntryProvider } from "./contexts/entryContext";
import AppContent from "./AppContent";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
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
