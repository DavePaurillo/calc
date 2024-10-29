import { useReducer } from "react";
import "./App.css";
import DigitBtn from "./DigitBtn";
import OperationsBtn from "./OperationsBtn";

type UserInput = {
	currentOperand: string;
	previousOperand: string;
	operation: string;
};

export type Action = {
	type: string;
	payload: string;
};

// UserActions
export const ACTIONS = {
	ADD_DIGIT: "add-digit",
	DELETE: "delete",
	INSERT_OPERATION: "insert-operation",
	CLEAR_ALL: "clear-all",
	EVALUATE: "evaluate",
};

const initialState = {
	currentOperand: "",
	previousOperand: "",
	operation: "",
};

function reducer(state: UserInput, action: Action) {
	switch (action.type) {
		case ACTIONS.ADD_DIGIT:
			// handling decimals
			if (action.payload === ".") {
				if (state.currentOperand === "") {
					return {
						...state,
						currentOperand: `0${action.payload}`,
					};
				}

				if (
					state.currentOperand &&
					state.currentOperand.includes(".")
				) {
					return state;
				}
			}

			return {
				...state,
				currentOperand: `${state.currentOperand}${action.payload}`,
			};
		case ACTIONS.DELETE:
			return {
				...state,
				currentOperand: `${state.currentOperand}`.slice(0, -1),
			};
		case ACTIONS.INSERT_OPERATION:
			if (state.currentOperand === "") {
				return {
					...state,
					operation: action.payload,
				};
			}

			if (state.currentOperand && state.previousOperand) {
				return {
					previousOperand: evaluate(state),
					operation: action.payload,
					currentOperand: "",
				};
			}

			return {
				currentOperand: "",
				previousOperand: state.currentOperand,
				operation: action.payload,
			};
		case ACTIONS.CLEAR_ALL:
			return initialState;
		case ACTIONS.EVALUATE:
			return {
				previousOperand: "",
				operation: "",
				currentOperand: evaluate(state),
			};
		default:
			return state;
	}
}

function evaluate({
	previousOperand,
	currentOperand,
	operation,
}: UserInput): string {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);

	if (isNaN(prev) || isNaN(current)) return "";
	switch (operation) {
		case "+":
			return (prev + current).toString();
		case "-":
			return (prev - current).toString();
		case "*":
			return (prev * current).toString();
		case "/":
			return (prev / current).toString();
		default:
			return "";
	}
}

const INTEGER_FROMATTER = new Intl.NumberFormat("en-us", {
	maximumFractionDigits: 0,
});

function formatOperand(operand: string) {
	if (operand == "") return "";
	const [integer, decimal] = operand.split(".");
	if (decimal == null) return INTEGER_FROMATTER.format(parseInt(integer));
	return `${INTEGER_FROMATTER.format(parseInt(integer))}.${decimal}`;
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<div className='container'>
				<header>
					<h1>calc</h1>
				</header>

				<main>
					<div className='output'>
						<div className='previous-operand'>
							{formatOperand(state.previousOperand)}{" "}
							{state.operation}
						</div>
						<div className='current-operand'>
							{formatOperand(state.currentOperand)}
						</div>
					</div>
					<section>
						<DigitBtn dispatch={dispatch} payload={"7"} />
						<DigitBtn dispatch={dispatch} payload={"8"} />
						<DigitBtn dispatch={dispatch} payload={"9"} />
						<button
							className='del'
							onClick={() => {
								dispatch({
									type: ACTIONS.DELETE,
									payload: "",
								});
							}}
						>
							DEL
						</button>

						<DigitBtn dispatch={dispatch} payload={"4"} />
						<DigitBtn dispatch={dispatch} payload={"5"} />
						<DigitBtn dispatch={dispatch} payload={"6"} />
						<OperationsBtn dispatch={dispatch} payload={"+"} />

						<DigitBtn dispatch={dispatch} payload={"1"} />
						<DigitBtn dispatch={dispatch} payload={"2"} />
						<DigitBtn dispatch={dispatch} payload={"3"} />
						<OperationsBtn dispatch={dispatch} payload={"-"} />

						<DigitBtn dispatch={dispatch} payload={"."} />
						<DigitBtn dispatch={dispatch} payload={"0"} />
						<OperationsBtn dispatch={dispatch} payload={"/"} />
						<OperationsBtn dispatch={dispatch} payload={"*"} />

						<button
							className='reset span-two'
							onClick={() => {
								dispatch({
									type: ACTIONS.CLEAR_ALL,
									payload: "",
								});
							}}
						>
							RESET
						</button>
						<button
							className='equal span-two'
							onClick={() => {
								dispatch({
									type: ACTIONS.EVALUATE,
									payload: "",
								});
							}}
						>
							=
						</button>
					</section>
				</main>
			</div>
		</>
	);
}

export default App;
