import { styled } from "@linaria/react";
import { FaGrinStars, FaFrownOpen } from "react-icons/fa";

export default function TooltipIconContainer({
  boxes,
  children,
}: {
  boxes: { [key: string]: { success: boolean; x: number; y: number } };
  children?: React.ReactNode;
}) {
  const success_boxes = Object.values(boxes).filter(
    (box) => box.success && box
  );
  const failure_boxes = Object.values(boxes).filter(
    (box) => !box.success && box
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
      {children}
    </TooltipIconContainerStyled>
  );
}

const TooltipIconContainerStyled = styled.div`
  .box {
    animation: slideup 1.1s;
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
