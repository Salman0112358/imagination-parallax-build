import React from "react";
import Masonry from "react-responsive-masonry";

const RemixImageGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <Masonry columnsCount={4} gutter="10px">
      {children}
    </Masonry>
  );
};

export default RemixImageGrid;
