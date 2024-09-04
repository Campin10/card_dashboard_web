import React, { ChangeEvent, useMemo, useState } from "react";

interface Suggestion {
  label: string;
  value: string;
}

interface AutocompleteProps {
  options: Suggestion[];
  label?: string;
  placeholder?: string;
  selected?: Suggestion;
  onSelect?: (value: Suggestion) => void;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const AutocompleteInputComponent: React.FC<AutocompleteProps> = ({
  options,
  label,
  selected,
  onSelect,
  onChange,
  placeholder,
  disabled,
}) => {
  const [query, setQuery] = useState<string>(selected?.label || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    onChange?.(value);
    setIsOpen(true);
  };

  const filteredSuggestions = useMemo(
    () =>
      query
        ? options.filter((suggestion) =>
            suggestion.label.toLowerCase().includes(query.toLowerCase())
          )
        : options,
    [options, query]
  );

  const handleSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.label);
    setIsOpen(false);
    onSelect?.(suggestion);
  };

  const handleOpenOptions = () => setIsOpen(true);

  const handleBlur = () => setIsOpen(false);

  return (
    <div className="w-full mx-auto mb-4">
      {label && (
        <label className="block text-xl font-semibold mb-2">{label}</label>
      )}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 text-gray-900 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          onClick={handleOpenOptions}
          onBlur={handleBlur}
          disabled={disabled}
        />
        {isOpen && filteredSuggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredSuggestions.map((suggestion) => (
              <li
                key={suggestion.value}
                className="px-4 py-2 text-gray-900 cursor-pointer hover:bg-blue-100 hover:text-blue-900"
                onMouseDown={() => handleSelect(suggestion)}
              >
                {suggestion.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutocompleteInputComponent;
