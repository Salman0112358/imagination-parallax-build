import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const RemixImageGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 6 }}
    >
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  );
};

export default RemixImageGrid;
