import api from './api';
import type { CVResponse } from '../types/cv.types';

export const cvService = {
  getCVHTML: async (staffId: number): Promise<CVResponse> => {
    const response = await api.get(`/cv/html/${staffId}`);
    return response.data;
  },

  getCVPDF: async (staffId: number): Promise<Blob> => {
    const response = await api.get(`/cv/pdf/${staffId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  downloadCVPDF: async (staffId: number, staffName: string): Promise<void> => {
    const blob = await cvService.getCVPDF(staffId);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${staffName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};
