import { RadioGroup as RadioGroupBase } from "radix-ui";
import { useState } from "react";
import { styled } from "@linaria/react";
import RadioItem from "./RadioItem";
import type { RadioGroupProps } from "../../types/propsTypes";

export default function RadioGroup<T>({
  ariaLabel,
  displayLabel,
  values,
  defaultValue,
  onValueChange,
}: RadioGroupProps<T>) {
  const [itemSelected, setItemSelected] = useState(defaultValue);

  const handleSelect = (value: string) => {
    if (values.indexOf(itemSelected) === -1)
      return console.error("Inexistant value selected: ", value);
    setItemSelected(value as T);
    onValueChange(value as T);
  };

  return (
    <RadioGroupStyled>
      {displayLabel && <div className="radio-group-label">{ariaLabel}</div>}
      <RadioGroupBase.Root
        className="radio-group-root"
        defaultValue={defaultValue as string}
        aria-label={ariaLabel}
        onValueChange={handleSelect}
      >
        {values.map((v) => (
          <RadioItem<T>
            key={v as string}
            itemID={v}
            label={v as string}
            isSelected={v === itemSelected}
            onSelect={() => handleSelect(v as string)}
          />
        ))}
      </RadioGroupBase.Root>
    </RadioGroupStyled>
  );
}

const RadioGroupStyled = styled.div`
  display: flex;
  gap: 1rem;
  .radio-group-label {
    font-weight: bold;
  }
  .radio-group-root {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
