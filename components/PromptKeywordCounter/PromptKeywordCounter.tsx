import React from "react";
import { IPrompt } from "../../typescript";

interface IPromptKeywordCounter {
  data: IPrompt[];
}

const PromptKeywordCounter = ({ data }: IPromptKeywordCounter) => {
  let wordCounts: { [key: string]: number } = {};
  let wordCountsArray: (string | number)[][] = [];

  const caclulateWordCount = (inputString: string) => {
    let words = inputString
      .replace("{INSTANCE_PROMPT}", "")
      .replace("{CLASS_PROMPT}", "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(/\b/);

    for (let i = 0; i < words.length; i++) {
      wordCounts[words[i].toLocaleLowerCase()] =
        (wordCounts[words[i].toLocaleLowerCase()] || 0) + 1;
    }

    wordCountsArray = Object.entries(wordCounts).sort(function (a, b) {
      return (a[1] as number) - (b[1] as number) > 0 ? -1 : 1;
    });

    wordCountsArray.shift();
  };

  for (let item of data) {
    caclulateWordCount(item.prompt);
  }

  return (
    <div className="grid grid-cols-6 gap-4 p-1">
      {wordCountsArray.slice(0, 25).map((word, index) => (
        <div
          key={index}
          className="text-xl font-light flex items-center justify-center rounded-3xl bg-fuchsia-900/90 p-1"
        >
          {word[0]} ({word[1]} times)
        </div>
      ))}
    </div>
  );
};

export default PromptKeywordCounter;
