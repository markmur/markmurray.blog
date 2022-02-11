import React from 'react';
import { Carousel as StyledCarousel, CarouselItem } from '../../styles';

interface Carousel {
  observe: (node: HTMLDivElement) => void;
  count: number;
  next: () => void;
  prev: () => void;
}

export const useCarousel = (containerRef, itemWidth: number): Carousel => {
  const [count, setCount] = React.useState(0);
  const refs = React.useRef<any[]>([]);
  const observer = React.useRef<IntersectionObserver>(null);
  const observe = React.useCallback(
    (node: HTMLDivElement) => refs.current.push(node),
    [],
  );

  const getObserver = (
    ref: React.MutableRefObject<IntersectionObserver | null>,
  ) => {
    if (!ref.current) {
      return new IntersectionObserver(handler, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      });
    }

    return ref.current;
  };

  const handler = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.intersectionRatio >= 1) {
        setCount(refs.current.indexOf(entry.target));
      }
    }
  };

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    const newObserver = getObserver(observer);

    for (const node of refs.current) {
      newObserver.observe(node);
    }

    return () => newObserver.disconnect();
  }, []);

  const next = () => {
    containerRef.current.scrollLeft += itemWidth;
  };

  const prev = () => {
    containerRef.current.scrollLeft -= itemWidth;
  };

  return {
    observe,
    count,
    next,
    prev,
  };
};

const Carousel = ({ children, ...props }) => {
  const containerRef = React.useRef(null);
  const { observe, count, next, prev } = useCarousel(containerRef, 300);

  return (
    <React.Fragment>
      <StyledCarousel {...props} ref={containerRef}>
        {React.Children.map(children, child => (
          <CarouselItem ref={observe}>{child}</CarouselItem>
        ))}
      </StyledCarousel>
      {count}
      <button onClick={next}>next</button>
      <button onClick={prev}>prev</button>
    </React.Fragment>
  );
};

export default Carousel;
