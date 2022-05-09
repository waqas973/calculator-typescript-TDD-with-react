import { Calc, CalcInput, InputType, Operation, OperationType } from "./Calc";

test("generate operations", () => {
  const inputs: Array<CalcInput> = [
    { type: InputType.Numerical, value: 1 },
    { type: InputType.Numerical, value: 2 },
    { type: InputType.Operational, operator: OperationType.Add },
    { type: InputType.Numerical, value: 3 },
    { type: InputType.Operational, operator: OperationType.Equal },
  ];

  const operations: Array<Operation> = [
    { operator: OperationType.Add, value: 12 },
    { operator: OperationType.Add, value: 3 },
    { operator: OperationType.Equal, value: 0 },
  ];

  expect(Calc.getOperations(inputs).operations).toEqual(operations);
});

test("display 0  value when no operation povided", () => {
  const inputs: Array<CalcInput> = [];
  const state = Calc.getState(inputs);

  expect(state.displayValue).toEqual(0);
});

test("display value upon  first numerical value", () => {
  const inputs: Array<CalcInput> = [{ type: InputType.Numerical, value: 1 }];

  const state = Calc.getState(inputs);

  expect(state.displayValue).toEqual(1);
});

test("display value upon  operator input", () => {
  const inputs: Array<CalcInput> = [
    { type: InputType.Numerical, value: 1 },
    { type: InputType.Numerical, value: 2 },
    { type: InputType.Operational, operator: OperationType.Add },
  ];

  const state = Calc.getState(inputs);

  expect(state.displayValue).toEqual(12);
});

test("display value upon  new numerical value", () => {
  const inputs: Array<CalcInput> = [
    { type: InputType.Numerical, value: 1 },
    { type: InputType.Numerical, value: 2 },
    { type: InputType.Operational, operator: OperationType.Add },
    { type: InputType.Numerical, value: 3 },
  ];

  const state = Calc.getState(inputs);

  expect(state.displayValue).toEqual(3);
});

test("derive final  state after adding", () => {
  const inputs: Array<CalcInput> = [
    { type: InputType.Numerical, value: 1 },
    { type: InputType.Numerical, value: 2 },
    { type: InputType.Operational, operator: OperationType.Add },
    { type: InputType.Numerical, value: 3 },
    { type: InputType.Operational, operator: OperationType.Equal },
  ];

  const state = Calc.getState(inputs);

  expect(state.displayValue).toEqual(15);
});

test("derive final  state after substract and addding", () => {
  const inputs: Array<CalcInput> = [
    { type: InputType.Numerical, value: 1 },
    { type: InputType.Numerical, value: 2 },
    { type: InputType.Operational, operator: OperationType.Add },
    { type: InputType.Numerical, value: 3 },
    { type: InputType.Operational, operator: OperationType.Sub },
    { type: InputType.Numerical, value: 5 },
    { type: InputType.Operational, operator: OperationType.Equal },
  ];

  const state = Calc.getState(inputs);

  expect(state.displayValue).toEqual(10);
});
