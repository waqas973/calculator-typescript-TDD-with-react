export enum InputType {
  Numerical,
  Operational,
}

export enum OperationType {
  Add = "Add",
  Sub = "Sub",
  Equal = "Equal",
}

export type CalcInput =
  | {
      type: InputType.Numerical;
      value: number;
    }
  | {
      type: InputType.Operational;
      operator: OperationType;
    };

export type CalcState = {
  displayValue: number;
};

export type Operation = {
  operator: OperationType;
  value: number;
};

type OperationBuilder = {
  operations: Operation[];
  working: Operation;
};

const getOperations = (inputs: Array<CalcInput>): OperationBuilder => {
  return inputs.reduce<OperationBuilder>(
    (builder, input) => {
      switch (input.type) {
        case InputType.Numerical:
          const preValue = builder.working?.value || 0;
          const newValue = preValue * 10 + input.value;
          return {
            ...builder,
            working: { ...builder.working, value: newValue },
          };

        case InputType.Operational:
          if (input.operator === OperationType.Equal) {
            return {
              operations: [
                ...builder.operations,
                builder.working,
                { operator: OperationType.Equal, value: 0 },
              ],
              working: { operator: OperationType.Add, value: 0 },
            };
          } else {
            return {
              operations: [...builder.operations, builder.working],
              working: { operator: input.operator, value: 0 },
            };
          }
      }
    },
    {
      operations: [],
      working: { operator: OperationType.Add, value: 0 },
    } as OperationBuilder
  );
};

const getTotal = (operations: Array<Operation>): number => {
  return operations.reduce((sum, operation) => {
    switch (operation.operator) {
      case OperationType.Add:
        return sum + operation.value;
      case OperationType.Sub:
        return sum - operation.value;
      case OperationType.Equal:
        return sum;
    }
  }, 0);
};

const getState = (inputs: Array<CalcInput>): CalcState => {
  const builder = getOperations(inputs);
  const { operations } = builder;
  const lastOperation = operations.length
    ? operations[operations.length - 1]
    : null;

  if (!lastOperation) return { displayValue: builder.working.value };

  const lastInput = inputs.length ? inputs[inputs.length - 1] : null;
  const total = getTotal(operations);
  switch (lastOperation.operator) {
    case OperationType.Equal:
      return { displayValue: total };

    default:
      return {
        displayValue:
          lastInput && lastInput.type === InputType.Numerical
            ? builder.working.value
            : total,
      };
  }
};

const Calc = {
  getOperations,
  getState,
};
export { Calc };
