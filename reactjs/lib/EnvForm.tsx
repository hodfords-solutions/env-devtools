import { useState } from 'react';
import { useEnv } from './EnvProvider';
import './app.css';
import type { FunctionComponent, FormEvent } from 'react';

interface EnvProps {
  [key: string]: string | undefined;
}

const EnvForm: FunctionComponent<{ isDevMode: boolean }> = ({ isDevMode }) => {
  const { env, updateEnv } = useEnv();
  const [formValues, setFormValues] = useState<EnvProps>(env);
  const [isShowAlert, showAlert] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateEnv(formValues);
    showAlert(true);
    setTimeout(() => {
      showAlert(false);
    }, 2000);
  };

  const resetValue = () => {
    setFormValues(env);
  }

  const hideAlert = () => {
    showAlert(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 my-8">
      {isDevMode ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">Update Environment Variables</h2>
          {isShowAlert && (
            <div className="flex items-center justify-between p-4 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg" role="alert">
                <span className="font-medium">Update successfully!</span>
                <button onClick={hideAlert} className="ml-2 text-green-700 hover:text-green-900">&times;</button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {Object.entries(formValues).map(([key, value]) => (
              <div key={key} className="mb-4">
                <label className="block text-gray-700 mb-2">{key}</label>
                <input
                  type="text"
                  value={String(value) || ''}
                  className="w-full outline-none p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            ))}
            <div className="flex justify-evenly">
              <button
                type="submit"
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
              >
                Update
              </button>
              <button
                type="reset"
                onClick={resetValue}
                className="border cursor-pointer border-gray-300 px-4 py-2 rounded hover:bg-gray-100 flex items-center"
              >
                Reset
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-between p-4 text-white bg-blue-500 border border-blue-400 rounded-lg" role="alert">
            <span className="font-medium">Only support DEV MODE!</span>
        </div>
      )}
      </div>
    </div>
  );
};

export default EnvForm;
