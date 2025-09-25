import { RadioGroup as RadioGroupBase } from "radix-ui";
import { useState } from "react";
import { styled } from "@linaria/react";
import RadioItem from "./RadioItem";
import type { RadioGroupProps } from "../../types/propsTypes";

export default function RadioGroup({
  ariaLabel,
  values,
  onValueChange,
}: RadioGroupProps) {
  const [itemSelected, setItemSelected] = useState(values[0]);

  const handleSelect = (value: string) => {
    if (values.indexOf(itemSelected) === -1)
      return console.error("Inexistant value selected: ", value);
    setItemSelected(value);
    onValueChange(value);
  };

  return (
    <RadioGroupStyled>
      <RadioGroupBase.Root
        className="RadioGroupRoot"
        defaultValue={itemSelected}
        aria-label={ariaLabel}
        onValueChange={handleSelect}
      >
        {values.map((v) => (
          <RadioItem
            key={v}
            itemID={v}
            label={v}
            isSelected={v === itemSelected}
            onSelect={() => handleSelect(v)}
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
