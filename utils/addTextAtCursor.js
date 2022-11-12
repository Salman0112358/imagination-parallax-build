function addContentAtCursorFunc(input, newContent) {
  const elem = document.getElementById(input);

  if (elem) {
    if (elem.selectionStart || elem.selectionStart == "0") {
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
