import { BrowserRouter as Router } from "react-router-dom"; 
import "./utils/chartSetup"; 

import { AuthProvider } from "./contexts/authContext";
import { EntryProvider } from "./contexts/entryContext";
import AppContent from './AppContent';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <EntryProvider>
          <AppContent />
        </EntryProvider>
      </AuthProvider>
    </Router>
  );
}