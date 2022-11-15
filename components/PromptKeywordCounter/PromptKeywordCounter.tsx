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
    <div className=" scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 p-4 w-full h-[75vh] max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-black/50 dark:border-gray-700  overflow-auto     ">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Most Used Prompt Words{" "}
        </h5>
      </div>
      <div className="flow-root">
        <ol className="space-y-1 max-w-md list-decimal list-inside text-gray-500 dark:text-gray-400">
          {wordCountsArray.map((word) => (
            <li key={word[0]}>
              <span className="font-semibold text-xl text-gray-900 dark:text-white">
                {word[0]}
              </span>{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                ({word[1]} times)
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default PromptKeywordCounter;
