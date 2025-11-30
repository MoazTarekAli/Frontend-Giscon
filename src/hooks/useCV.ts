import { useState, useCallback } from 'react';
import { cvService } from '../services/cv.service';

export const useCV = () => {
  const [cvHtml, setCvHtml] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCV = useCallback(async (staffId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cvService.getCVHTML(staffId);
      setCvHtml(response.data);
      return response.data;
    } catch (err) {
      setError('Failed to generate CV');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadPDF = useCallback(async (staffId: number, staffName: string) => {
    setLoading(true);
    setError(null);
    try {
      await cvService.downloadCVPDF(staffId, staffName);
      return true;
    } catch (err) {
      setError('Failed to download CV PDF');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCV = useCallback(() => {
    setCvHtml('');
    setError(null);
  }, []);

  return {
    cvHtml,
    loading,
    error,
    generateCV,
    downloadPDF,
    clearCV,
  };
};