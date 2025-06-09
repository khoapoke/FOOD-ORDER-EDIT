import { useEffect } from "react";
import { useState } from "react";

export function useFetch(fetchFunc, initValue) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initValue);
  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const meals = await fetchFunc();
        setData(meals);
      } catch (error) {
        setError(error.message || "Failed to fetch");
      }
      setIsLoading(false);
    }
    fetchMeals();
  }, [fetchFunc]);
  return { isLoading, error, data, setData };
}
