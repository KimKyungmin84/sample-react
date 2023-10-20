export const createJsonFromFormData = (formData) => {
    const json = {};
    for (const [key, value] of formData.entries()) {
      json[key] = value;
    }
    return json;
  };