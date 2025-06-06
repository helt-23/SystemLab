import { useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import { useParams } from 'react-router-dom';

export function useFinishLoadingOnLabChange() {
  const { finishLoading } = useLoading();
  const { labId } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [labId, finishLoading]);
}
