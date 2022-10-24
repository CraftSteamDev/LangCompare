import React, { useState } from "react";

interface DisplayProps {
  //first is key, second is master lang
  keys: Array<[string, string]>;
  addLang: (key: string, lang: string) => void;
}

function DisplayBox(props: DisplayProps) {
  const [formData, setFormData] = useState(new Map<string, string>());
  return (
    <ul className="list-disc">
      {props.keys.map((entry) => (
        <div>
          <li>{entry[0]}</li>
          <form>
            <div className="mb-6">
              <input
                id={"form-" + entry[0]}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(event) =>
                  setFormData(
                    formData.set(entry[0].toString(), event.target.value)
                  )
                }
                placeholder={entry[1]}
              />
              <button
                onClick={(event) => {
                  event.preventDefault();
                  const value = formData.get(entry[0].toString());
                  if (value !== undefined) {
                    props.addLang(entry[0].toString(), value);
                    const copy = new Map(formData.entries());
                    copy.delete(entry[0].toString());
                    setFormData(copy);
                  }
                }}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      ))}
    </ul>
  );
}

export default DisplayBox;
