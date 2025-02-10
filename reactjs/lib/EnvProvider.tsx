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

const EnvContext = createContext<{ env: EnvProps; updateEnv: (data: EnvProps) => void }>({
  env: {},
  updateEnv: () => {},
});

export const useEnv = () => useContext(EnvContext);

export const EnvProvider: FunctionComponent<EnvProviderProps> = ({ env, routes, children }) => {
  const [envVars, setEnvVars] = useState<EnvProps>(() => {
    const storedEnv = localStorage.getItem('envVars');
    const data = storedEnv ? JSON.parse(storedEnv) : env;
    localStorage.setItem('envVars', JSON.stringify(data));
    return data;
  });

  const updateEnv = (data: EnvProps) => {
    setEnvVars(data);
    localStorage.setItem('envVars', JSON.stringify(data));
  };

  const route: RouteObject = {
    path: '/devtools',
    element: <EnvForm />,
  };

  return (
    <EnvContext.Provider value={{ env: envVars, updateEnv }}>
      <RouterProvider router={createBrowserRouter([...routes, route])} />
      {children}
    </EnvContext.Provider>
  );
};
