import { RadioGroup as RadioGroupBase } from "radix-ui";
import { useState } from "react";
import { styled } from "@linaria/react";
import { MdCheckCircle } from "react-icons/md";
import type { RadioItemProps } from "../../types/propsTypes";
import { theme } from "../../theme/theme";

export default function RadioItem<T>({
  itemID,
  label,
  isSelected,
  onSelect,
}: RadioItemProps<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleClick = () => {
    onSelect(itemID);
  };

  return (
    <RadioItemStyled
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      onClick={handleClick}
    >
      <RadioGroupBase.Item
        className="RadioGroupItem"
        value={itemID as string}
        id={itemID as string}
      >
        {isHovered && !isSelected && <MdCheckCircle className="hovered" />}
        <RadioGroupBase.Indicator className="RadioGroupIndicator">
          <MdCheckCircle className="selected" />
        </RadioGroupBase.Indicator>
      </RadioGroupBase.Item>
      <label className="Label" htmlFor={itemID as string}>
        {label}
      </label>
    </RadioItemStyled>
  );
}

const RadioItemStyled = styled.div`
  display: flex;
  align-items: center;

  .RadioGroupItem {
    background-color: #fcf5e5;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    box-shadow: ${theme.shadows.paneledElt};
    padding: 0;
  }

  .selected {
    font-size: 20px;
    color: #3f2f07;
  }
  .hovered {
    font-size: 20px;
    color: #b98816;
  }

  .RadioGroupIndicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    position: relative;
  }

  .Label {
    font-size: 15px;
    line-height: 1;
    padding-left: 15px;
  }
`;
