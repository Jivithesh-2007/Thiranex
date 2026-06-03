import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import { useAuth } from "./hooks/useAuth";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

// Pages
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AuthorProfilePage from "./pages/AuthorProfilePage";
import SearchResultsPage from "./pages/SearchResultsPage";

import "./styles/App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Writer-Only Route
const WriterRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user?.role === "writer" ? children : <Navigate to="/blog" />;
};

function AppContent() {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/post/:slug" element={<PostDetailPage />} />
          <Route path="/author/:userId" element={<AuthorProfilePage />} />
          <Route path="/search" element={<SearchResultsPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Writer-Only Routes */}
          <Route
            path="/write"
            element={
              <WriterRoute>
                <CreatePostPage />
              </WriterRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <WriterRoute>
                <EditPostPage />
              </WriterRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <AppContent />
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
