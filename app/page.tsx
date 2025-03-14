"use client"; // Necesario porque usamos hooks de estado

import { useState } from "react";
import { signup, login } from "../lib/api";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = isSignup
        ? await signup(email, password)
        : await login(email, password);
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Ocurrió un error");
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-gray-200 flex items-center justify-center p-4">
      {token ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Bienvenido!
          </h1>
          <p className="text-gray-600 mb-6 break-words">
            Token: <span className="text-sm text-gray-500">{token}</span>
          </p>
          <button
            onClick={() => {
              setToken(null);
              localStorage.removeItem("token");
            }}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {isSignup ? "Crear Cuenta" : "Iniciar Sesión"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out font-medium"
            >
              {isSignup ? "Registrarse" : "Iniciar Sesión"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            {isSignup ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
            <span
              onClick={toggleForm}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              {isSignup ? "Inicia sesión" : "Regístrate"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
