import { ACTIONS } from "./App";
import { Action } from "./App";

type TProps = {
	dispatch: React.Dispatch<Action>;
	payload: string;
};

function DigitBtn({ dispatch, payload }: TProps) {
	return (
		<button
			onClick={() => {
				dispatch({
					type: ACTIONS.ADD_DIGIT,
					payload: `${payload}`,
				});
			}}
		>
			{payload}
		</button>
	);
}

export default DigitBtn;
