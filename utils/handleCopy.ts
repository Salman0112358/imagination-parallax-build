const handleCopy = (copyText: string) => {
  navigator.clipboard.writeText(copyText);
};

export default handleCopy;
