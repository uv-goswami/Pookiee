import { useEffect } from 'react';

const useBackgroundHandler = (step, backgroundImages) => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImages[step - 1]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, [step, backgroundImages]);
};

export default useBackgroundHandler;
