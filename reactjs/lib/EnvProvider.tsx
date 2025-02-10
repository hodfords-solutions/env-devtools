import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router';
import { EnvForm } from './EnvForm';
import type { FunctionComponent } from 'react';

interface EnvProps {
  [key: string]: string | undefined;
}

interface EnvProviderProps {
  env: EnvProps;
  routes?: RouteObject[];
}

const EnvContext = createContext<{ env: EnvProps; updateEnv: (data: EnvProps) => void }>({
  env: {},
  updateEnv: () => {},
});

export const useEnv = () => useContext(EnvContext);

export const EnvProvider: FunctionComponent<EnvProviderProps> = ({ env, routes }) => {
  const isDevMode = env.ENVIRONMENT && env.ENVIRONMENT === 'dev';
  const [envVars, setEnvVars] = useState<EnvProps>(() => {
    const storedEnv = localStorage.getItem('envVars');
    const data = storedEnv ? JSON.parse(storedEnv) : env;
    delete data['ENVIRONMENT'];
    localStorage.setItem('envVars', JSON.stringify(data));
    return data;
  });

  const updateEnv = (data: EnvProps) => {
    setEnvVars(data);
    localStorage.setItem('envVars', JSON.stringify(data));
  };

  const route: RouteObject = {
    path: '/devtools',
    element: <EnvForm isDevMode={isDevMode} />,
  };

  return (
    <EnvContext.Provider value={{ env: envVars, updateEnv }}>
      <RouterProvider router={createBrowserRouter([...routes, route])} />
    </EnvContext.Provider>
  );
};
