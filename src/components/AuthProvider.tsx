"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthUser } from "@/types";
import { toast } from "sonner";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  initializing: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function parseResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("[AUTH_REFRESH]", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await refresh();
      setInitializing(false);
    })();
  }, [refresh]);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const data = await parseResponse(response);

        if (!response.ok || !data?.success) {
          throw new Error(data?.error ?? "Failed to sign in");
        }

        setUser(data.data);
        toast.success("Signed in successfully");
      } catch (error) {
        console.error("[AUTH_LOGIN]", error);
        toast.error(error instanceof Error ? error.message : "Failed to sign in");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async ({ name, email, password }: { name: string; email: string; password: string }) => {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        });

        const data = await parseResponse(response);

        if (!response.ok || !data?.success) {
          throw new Error(data?.error ?? "Failed to create account");
        }

        setUser(data.data);
        toast.success("Account created successfully");
      } catch (error) {
        console.error("[AUTH_REGISTER]", error);
        toast.error(error instanceof Error ? error.message : "Failed to create account");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await parseResponse(response);
      if (!response.ok || !data?.success) {
        throw new Error("Failed to sign out");
      }

      setUser(null);
      toast.success("Signed out");
    } catch (error) {
      console.error("[AUTH_LOGOUT]", error);
      toast.error(error instanceof Error ? error.message : "Failed to sign out");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initializing,
        login,
        register,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

