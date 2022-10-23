import React, { useState } from "react";

interface DisplayProps {
  keys: Array<String>;
  addLang: (key: string, lang: string) => void;
}

function DisplayBox(props: DisplayProps) {
  const [formData, setFormData] = useState(new Map<string, string>());
  return (
    <ul className="list-disc">
      {props.keys.map((key) => (
        <div>
          <li>{key}</li>
          <form>
            <div className="mb-6">
              <input
                id={"form-" + key}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(event) =>
                  setFormData(formData.set(key.toString(), event.target.value))
                }
                value={formData.get(key.toString())}
              />
              <button
                onClick={(event) => {
                  event.preventDefault();
                  const value = formData.get(key.toString());
                  if (value !== undefined) {
                    props.addLang(key.toString(), value);
                    const copy = new Map(formData.entries());
                    copy.delete(key.toString());
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
