import { useState, useEffect } from "react";
import { useLoading } from "../context/LoadingContext";

const useLoadingAnimation = () => {
  const { isLoading } = useLoading();
  const [animationState, setAnimationState] = useState({
    filledParts: 0,
    expand: false,
    showText: true,
    isVisible: true,
    loadingCompleted: false,
  });

  // Controla o preenchimento progressivo das partes do ícone
  useEffect(() => {
    if (!animationState.isVisible) return;

    if (animationState.filledParts < 3) {
      const timer = setTimeout(() => {
        setAnimationState((prev) => ({
          ...prev,
          filledParts: prev.filledParts + 1,
        }));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [animationState.filledParts, animationState.isVisible]);

  // Monitora mudanças no estado global de loading
  useEffect(() => {
    if (!isLoading) {
      setAnimationState((prev) => ({
        ...prev,
        loadingCompleted: true,
      }));
    } else {
      // Reset para novo ciclo de loading
      setAnimationState({
        filledParts: 0,
        expand: false,
        showText: true,
        isVisible: true,
        loadingCompleted: false,
      });
    }
  }, [isLoading]);

  // Controla a sequência final da animação
  useEffect(() => {
    if (animationState.loadingCompleted && animationState.filledParts >= 3) {
      setAnimationState((prev) => ({
        ...prev,
        showText: false,
        expand: true,
      }));

      const timer = setTimeout(() => {
        setAnimationState((prev) => ({
          ...prev,
          isVisible: false,
        }));
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [animationState.loadingCompleted, animationState.filledParts]);

  return {
    shouldRender: animationState.isVisible,
    animationProps: {
      filledParts: animationState.filledParts,
      expand: animationState.expand,
      showText: animationState.showText,
    },
  };
};

export default useLoadingAnimation;
