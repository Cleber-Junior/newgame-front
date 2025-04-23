export const fetchApiState = async () => {
  try {
    const response = await fetch("https://brasilapi.com.br/api/ibge/uf/v1");
    const stateData = await response.json();
    return stateData;
  } catch (error) {
    console.error("Error fetching API state:", error);
    return null;
  }
};
