export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Present';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
};

export const formatDateInput = (dateString: string | undefined): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};