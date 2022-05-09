import React, { useState } from "react";
import styled from "styled-components";
import Button, { ButtonType } from "./Button";
import { Calc, CalcInput, InputType, OperationType } from "./Calc/Calc";

const Container = styled.div`
  /* background: #323232; */
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-template-rows: 120px repeat(5, 80px);
  grid-gap: 10px;
`;

const Display = styled.div`
  background: white;
  border-radius: 8px;
  font-size: 48px;
  padding: 24px;
  grid-column-end: span 4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Calculator: React.FC = () => {
  const [inputs, setInputs] = useState<Array<CalcInput>>([]);
  const state = Calc.getState(inputs);

  const appendInput = (input: CalcInput): void => {
    setInputs((prev) => [...prev, input]);
  };
  const handleNumerical = (value: number) => {
    appendInput({ type: InputType.Numerical, value });
  };

  const handleOperater = (operator: OperationType) => {
    appendInput({ type: InputType.Operational, operator });
  };

  const handleClear = () => setInputs([]);
  const handleOops = () => setInputs((prev) => prev.slice(0, -1));
  return (
    <Container>
      <Grid>
        <Display>{state.displayValue}</Display>
        <Button
          buttonType={ButtonType.operation}
          label="AC"
          position={[0, 1]}
          width={2}
          onClick={handleClear}
        />
        <Button
          buttonType={ButtonType.operation}
          label="Oops"
          position={[2, 1]}
          width={2}
          onClick={handleOops}
        />
        <Button
          buttonType={ButtonType.operation}
          label="-"
          position={[3, 2]}
          onClick={() => handleOperater(OperationType.Sub)}
        />
        <Button
          buttonType={ButtonType.operation}
          label="+"
          position={[3, 3]}
          onClick={() => handleOperater(OperationType.Add)}
        />
        <Button
          buttonType={ButtonType.operation}
          label="="
          position={[3, 4]}
          height={2}
          onClick={() => handleOperater(OperationType.Equal)}
        />
        <Button
          buttonType={ButtonType.number}
          label="9"
          position={[2, 2]}
          onClick={() => handleNumerical(9)}
        />
        <Button
          buttonType={ButtonType.number}
          label="8"
          position={[1, 2]}
          onClick={() => handleNumerical(8)}
        />
        <Button
          buttonType={ButtonType.number}
          label="7"
          position={[0, 2]}
          onClick={() => handleNumerical(7)}
        />
        <Button
          buttonType={ButtonType.number}
          label="6"
          position={[2, 3]}
          onClick={() => handleNumerical(6)}
        />
        <Button
          buttonType={ButtonType.number}
          label="5"
          position={[1, 3]}
          onClick={() => handleNumerical(5)}
        />
        <Button
          buttonType={ButtonType.number}
          label="4"
          position={[0, 3]}
          onClick={() => handleNumerical(4)}
        />
        <Button
          buttonType={ButtonType.number}
          label="3"
          position={[2, 4]}
          onClick={() => handleNumerical(3)}
        />
        <Button
          buttonType={ButtonType.number}
          label="2"
          position={[1, 4]}
          onClick={() => handleNumerical(2)}
        />
        <Button
          buttonType={ButtonType.number}
          label="1"
          position={[0, 4]}
          onClick={() => handleNumerical(1)}
        />
        <Button
          buttonType={ButtonType.number}
          label="0"
          position={[0, 5]}
          width={3}
        />
      </Grid>
    </Container>
  );
};

export default Calculator;
