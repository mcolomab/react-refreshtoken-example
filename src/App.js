import LoginPage from "./pages/LoginPage";
import AuthProvider from "./providers/authProvider";

export default function App() {
  return (
    <AuthProvider>
      <LoginPage></LoginPage>
    </AuthProvider>
  );
}
