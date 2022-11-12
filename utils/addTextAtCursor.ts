function addContentAtCursorFunc(input: string, newContent: string) {
  const elem = document.getElementById(input) as HTMLTextAreaElement;

  if (elem) {
    if (elem.selectionStart) {
      let _startSelection = elem.selectionStart;
      let _endSelection = elem.selectionEnd;
      elem.value =
        elem.value.substring(0, _startSelection) +
        newContent +
        elem.value.substring(_endSelection, elem.value.length);
    } else {
      elem.value += newContent;
    }
  }
}

export default addContentAtCursorFunc;
