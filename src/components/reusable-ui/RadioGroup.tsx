import { RadioGroup as RadioGroupBase } from "radix-ui";
import { useState } from "react";
import { styled } from "@linaria/react";
import RadioItem from "./RadioItem";

export default function RadioGroup({ ariaLabel, values, onValueChange }) {
  const [itemSelected, setItemSelected] = useState(values[0]);

  const handleSelect = (value) => {
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
