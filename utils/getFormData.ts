const getFormData = <T extends Record<string, string>>(
  form: HTMLFormElement
): T => {
  const formData = new FormData(form);
  const data: T = {} as T;
  for (const [key, value] of formData.entries()) {
    data[key as keyof T] = value as T[keyof T];
  }
  return data;
};

export default getFormData;
