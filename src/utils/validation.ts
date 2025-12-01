export const validateEmail = (email: string): boolean => {
  if (!email || !email.trim()) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  if (!phone || !phone.trim()) return false;
  const phoneRegex = /^[\d\s+()-]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return (
    phoneRegex.test(phone.trim()) &&
    digitsOnly.length >= 10 &&
    digitsOnly.length <= 15
  );
};

export const validateRequired = (value: string | undefined): boolean => {
  return !!value && value.trim().length > 0;
};
