import { RadioGroup as RadioGroupBase } from "radix-ui";
import { useState } from "react";
import { styled } from "@linaria/react";
import RadioItem from "./RadioItem";
import type { RadioGroupProps } from "../../types/propsTypes";

export default function RadioGroup<T>({
  ariaLabel,
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
      <RadioGroupBase.Root
        className="RadioGroupRoot"
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
  .RadioGroupRoot {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
