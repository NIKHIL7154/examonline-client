declare module 'react-masonry-css' {
    import * as React from 'react';
  
    interface MasonryProps {
      breakpointCols: number | { [key: string]: number };
      className?: string;
      children: React.ReactNode;
      columnClassName: string;
    }
  
    const Masonry: React.FC<MasonryProps>;
  
    export default Masonry;
  }
  