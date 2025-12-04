import { styled } from "@linaria/react";
import { FaGrinStars, FaFrownOpen } from "react-icons/fa";
import type { TooltipContainerProps } from "../../types/propsTypes";

export default function TooltipIconContainer({ boxes }: TooltipContainerProps) {
  const success_boxes = Object.assign(
    {},
    ...Object.entries(boxes)
      .filter(([, v]) => v.success)
      .map(([k, v]) => ({ [k]: v }))
  );
  const failure_boxes = Object.assign(
    {},
    ...Object.entries(boxes)
      .filter(([, v]) => !v.success)
      .map(([k, v]) => ({ [k]: v }))
  );

  return (
    <TooltipIconContainerStyled>
      {Object.keys(success_boxes).map((key) => (
        <FaGrinStars
          key={key}
          className="box"
          style={{ left: success_boxes[key].x, top: success_boxes[key].y }}
        />
      ))}
      {Object.keys(failure_boxes).map((key) => (
        <FaFrownOpen
          key={key}
          className="box"
          style={{ left: failure_boxes[key].x, top: failure_boxes[key].y }}
        />
      ))}
    </TooltipIconContainerStyled>
  );
}

const TooltipIconContainerStyled = styled.div`
  .box {
    animation: slideup 1.1s;
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -ms-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    position: absolute;
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  @keyframes slideup {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) translateY(0);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) translateY(-25px);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) translateY(-25px);
    }
  }
`;
