export const getProvince = async () => {
  try {
    const response = await fetch('https://provinces.open-api.vn/api/');
    const jsonData = await response?.json();
    return jsonData;
  } catch (error) {
    console.error(`Download error: ${error}`);
    return null;
  }
};

export const getDistrict = async () => {
  try {
    const response = await fetch(`https://provinces.open-api.vn/api/d`);
    const jsonData = await response?.json();
    return jsonData;
  } catch (error) {
    console.error(`Download error: ${error}`);
    return null;
  }
};

export const getWard = async () => {
  try {
    const response = await fetch(`https://provinces.open-api.vn/api/w`);
    const jsonData = await response?.json();
    return jsonData;
  } catch (error) {
    console.error(`Download error: ${error}`);
    return null;
  }
};
