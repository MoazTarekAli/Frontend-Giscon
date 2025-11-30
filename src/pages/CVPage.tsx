import React, { useEffect } from 'react';
import { useStaff } from '../hooks/useStaff';
import { useCV } from '../hooks/useCV';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const CVPage: React.FC = () => {
  const { staff, loading: staffLoading, fetchStaff } = useStaff();
  const { cvHtml, loading: cvLoading, error, generateCV, downloadPDF, clearCV } = useCV();
  const [selectedStaffId, setSelectedStaffId] = React.useState<number | null>(null);

  useEffect(() => {
    fetchStaff(1);
  }, [fetchStaff]);

  const handleGenerateCV = async () => {
    if (!selectedStaffId) return;
    await generateCV(selectedStaffId);
  };

  const handleDownloadPDF = async () => {
    if (!selectedStaffId) return;
    const selectedStaff = staff.find(s => s.staff_id === selectedStaffId);
    if (!selectedStaff) return;
    await downloadPDF(selectedStaffId, selectedStaff.staff_name);
  };

  const handleReset = () => {
    setSelectedStaffId(null);
    clearCV();
  };

  if (staffLoading && staff.length === 0) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="mt-20" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Generate CV</h2>

        <Card title="Select Staff Member">
          <div className="space-y-4">
            <select
              value={selectedStaffId || ''}
              onChange={(e) => {
                setSelectedStaffId(Number(e.target.value));
                clearCV();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a staff member...</option>
              {staff.map((member) => (
                <option key={member.staff_id} value={member.staff_id}>
                  {member.staff_name} {member.title && `- ${member.title}`}
                </option>
              ))}
            </select>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                onClick={handleGenerateCV}
                disabled={!selectedStaffId || cvLoading}
                className="flex-1"
              >
                {cvLoading ? 'Generating...' : 'Generate CV Preview'}
              </Button>
              {cvHtml && (
                <>
                  <Button
                    variant="success"
                    onClick={handleDownloadPDF}
                    disabled={cvLoading}
                  >
                    Download PDF
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {cvLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {cvHtml && !cvLoading && (
          <Card title="CV Preview">
            <div 
              className="cv-preview prose max-w-none"
              dangerouslySetInnerHTML={{ __html: cvHtml }}
            />
          </Card>
        )}

        {!cvHtml && !cvLoading && !error && (
          <div className="text-center py-12 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No CV Generated</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select a staff member and click "Generate CV Preview" to get started.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CVPage;