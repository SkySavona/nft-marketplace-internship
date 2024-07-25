import { useState, useEffect } from "react";

const getSlidesToShow = (width) => {
  if (width > 1120) return 4;
  if (width > 768) return 3;
  if (width > 550) return 2;
  return 1;
};

const useSlidesToShow = () => {
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return slidesToShow;
};

export default useSlidesToShow;
