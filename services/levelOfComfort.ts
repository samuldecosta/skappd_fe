//api here is an axios instance which has the baseURL set according to the env.
import { useState } from "react";
import api from "services/api";

export const useLevelOfComfort = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comfortSettingOptions, setComfortSettingOptions] = useState();
  const [patientPopulationOptions, setPatientPopulationOptions] = useState();
  const getLevelOfComfortFormPreferences = async (preference_name: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(
        `v1/preferences?preference_name=${preference_name}`
      );
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      return Promise.reject(e);
    }
  };
  const getComfortSettingOptions = async () => {
    setIsLoading(true);
    const response = await getLevelOfComfortFormPreferences(
      "comfort_setting_preference"
    );
    setComfortSettingOptions(genrateformFieldOptions(response));
    setIsLoading(false);
  };

  const getPatientPopulationOptions = async () => {
    setIsLoading(true);
    const response = await getLevelOfComfortFormPreferences(
      "patient_populations_preference"
    );
    setPatientPopulationOptions(genrateformFieldOptions(response));
    setIsLoading(false);
  };
  return {
    getComfortSettingOptions,
    getPatientPopulationOptions,
    patientPopulationOptions,
    comfortSettingOptions,
    isLoading,
  };
};

// helpers

const genrateformFieldOptions = (apiResponse: any) => {
  const { response = []} = apiResponse;
  return response.map(({ title, id }: { title: string; id: string }) => ({
    value: id,
    label: title,
  }));
};
