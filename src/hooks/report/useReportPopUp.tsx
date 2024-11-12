import {useState} from 'react';
import reportPopUp from '../../Axios/report/⭐\uFE0FreportPopUp.ts';

interface ReportPopupState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useReportPopup = () => {
  const [reportPopupState, setReportPopupState] = useState<ReportPopupState>({
    loading: false,
    error: null,
    success: null,
  });

  const reportPopupDetails = async (
    popupId: number,
    content: string,
  ): Promise<CommonResponse<any>> => {
    setReportPopupState({loading: true, error: null, success: null});
    try {
      const response: CommonResponse<any> = await reportPopUp(popupId, content);
      if (response.success) {
        setReportPopupState({loading: false, error: null, success: true});
        return response;
      } else {
        setReportPopupState({
          loading: false,
          error: new Error(response.error?.message || 'Failed to report popup'),
          success: false,
        });
        return response;
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');
      setReportPopupState({loading: false, error: err, success: false});
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...reportPopupState, reportPopupDetails};
};

export default useReportPopup;
