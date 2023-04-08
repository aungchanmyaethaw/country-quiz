import { useQuery } from "@tanstack/react-query";
import { getCountriesWithCapital, getCountriesWithFlag } from "../api/quiz";

export const useGetCountriesWithCapital = () => {
  return useQuery(["countriesCapital"], getCountriesWithCapital);
};

export const useGetCountriesWithFlag = () => {
  return useQuery(["countriesFlag"], getCountriesWithFlag);
};
