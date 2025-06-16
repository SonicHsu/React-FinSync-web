import { BrowserRouter as Router } from "react-router-dom"; 
import "./utils/chartSetup"; 

import { AuthProvider } from "./contexts/authContext";
import { EntryProvider } from "./contexts/entryContext";
import AppContent from './AppContent';

export default function App() {
  return (
    // 確保 Context Providers 包裹在 Router 內部
    // 這樣所有的路由元件都能存取 Context
    <Router>
      <AuthProvider>
        <EntryProvider>
          <AppContent />
        </EntryProvider>
      </AuthProvider>
    </Router>
  );
}