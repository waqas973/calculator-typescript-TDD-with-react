import React from "react";
import styled from "styled-components";

export enum ButtonType {
  number,
  operation,
}

type buttonProps = React.HTMLProps<HTMLButtonElement> & {
  buttonType?: ButtonType;
  label: string;
  position: [x: number, y: number];
  width?: number;
  height?: number;
};

const StyledButton = styled.button`
  border: none;
  background: #727171;
  color: white;
  border-radius: 8px;
  font-size: 24px;
`;

const Button: React.FC<buttonProps> = ({
  buttonType,
  label,
  position,
  width,
  height,
  onClick,
}) => {
  const styles: React.CSSProperties = {};
  if (position) {
    styles.gridColumnStart = position[0] + 1;
    styles.gridRowStart = position[1] + 1;
  }
  if (width) {
    styles.gridColumnEnd = `span ${width}`;
  }
  if (height) {
    styles.gridRowEnd = `span ${height}`;
  }
  if (buttonType === ButtonType.number) {
    styles.color = "black";
    styles.background = "#e48900";
  }
  return (
    <StyledButton onClick={onClick} style={styles}>
      {label}
    </StyledButton>
  );
};

export default Button;
