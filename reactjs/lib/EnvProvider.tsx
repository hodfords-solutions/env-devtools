import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router';
import { EnvForm } from './EnvForm';
import type { ReactNode, FunctionComponent } from 'react';

interface EnvProps {
  [key: string]: string | undefined;
}

interface EnvProviderProps {
  env: EnvProps;
  routes?: RouteObject[];
  children: ReactNode;
}

const EnvContext = createContext<{ env: EnvProps; updateEnv: (key: string, value: string) => void }>({
  env: {},
  updateEnv: () => {},
});

export const useEnv = () => useContext(EnvContext);

export const EnvProvider: FunctionComponent<EnvProviderProps> = ({ env, routes, children }) => {
  const [envVars, setEnvVars] = useState<EnvProps>(() => {
    const storedEnv = localStorage.getItem("envVars");
    return storedEnv ? JSON.parse(storedEnv) : env;
  });

  useEffect(() => {
    localStorage.setItem("envVars", JSON.stringify(envVars));
  }, [envVars]);

  const updateEnv = (key: string, value: string) => {
    setEnvVars((prev) => {
      const updatedEnv = { ...prev, [key]: value };
      localStorage.setItem("envVars", JSON.stringify(updatedEnv)); // Persist to localStorage
      return updatedEnv;
    });
  };

  const envSettingsRoute: RouteObject = {
    path: "/devtools",
    element: <EnvForm />,
  };

  const allRoutes = [...routes, envSettingsRoute];

  const router = createBrowserRouter(allRoutes);

  return (
    <EnvContext.Provider value={{ env: envVars, updateEnv }}>
      <RouterProvider router={router} />
      {children}
    </EnvContext.Provider>
  );
};
