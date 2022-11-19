const ImageGrid = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div className="photo-grid">{children}</div>;
};

export default ImageGrid;
