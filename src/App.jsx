import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { MetaAccountsProvider } from './contexts/MetaAccountsContext'
import { AdAccountProvider } from './contexts/AdAccountContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AccountConnection from './pages/AccountConnection'
import WebsiteAnalysis from './pages/WebsiteAnalysis'
import AdLibrary from './pages/AdLibrary'
import AdGenerator from './pages/AdGenerator'
import Campaigns from './pages/Campaigns'
import CampaignDetails from './pages/CampaignDetails'
import CreateCampaign from './pages/CreateCampaign'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <AuthProvider>
        <MetaAccountsProvider>
          <AdAccountProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/connect-account" element={
                <PrivateRoute>
                  <AccountConnection />
                </PrivateRoute>
              } />
              <Route path="/website-analysis" element={
                <PrivateRoute>
                  <WebsiteAnalysis />
                </PrivateRoute>
              } />
              <Route path="/ad-library" element={
                <PrivateRoute>
                  <AdLibrary />
                </PrivateRoute>
              } />
              <Route path="/ad-generator" element={
                <PrivateRoute>
                  <AdGenerator />
                </PrivateRoute>
              } />
              <Route path="/campaigns" element={
                <PrivateRoute>
                  <Campaigns />
                </PrivateRoute>
              } />
              <Route path="/campaign/:id" element={
                <PrivateRoute>
                  <CampaignDetails />
                </PrivateRoute>
              } />
              <Route path="/create-campaign" element={
                <PrivateRoute>
                  <CreateCampaign />
                </PrivateRoute>
              } />
              <Route path="/settings" element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdAccountProvider>
        </MetaAccountsProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
