import React, { useState } from "react";
import "./App.css";
import CodeBox from "./components/CodeBox";
import DisplayBox from "./components/DisplayBox";

function App() {
  const [masterLang, setMasterText] = useState<string | null>("");
  const [compareLang, setCompareText] = useState<string | null>("");

  function valid(input: string | null) {
    return !(input === null || input?.length === 0);
  }

  function findMissingKeys(): Array<string> {
    const missingKeys = [];
    const masterKeys = Object.keys(JSON.parse(masterLang!!));
    const compareKeys = Object.keys(JSON.parse(compareLang!!));
    for (const key of masterKeys) {
      if (!compareKeys.includes(key)) {
        missingKeys.push(key);
      }
    }
    return missingKeys;
  }

  function addLang(key: string, lang: string) {
    const obj = JSON.parse(compareLang!!)
    obj[key] = lang;
    setCompareText(JSON.stringify(obj, null, 2))
  }

  return (
    <div id="main-container" className="container mx-auto grid grid-rows-2">
      <div className="columns-2">
        <div className="w-full h-full">
          <CodeBox text={masterLang} setText={setMasterText} />
        </div>
        <div className="w-full h-full">
          <CodeBox text={compareLang} setText={setCompareText} />
        </div>
      </div>
      {valid(masterLang) && valid(compareLang) ? (
        <DisplayBox keys={findMissingKeys()} addLang={addLang} />
      ) : null}
    </div>
  );
}

export default App;
