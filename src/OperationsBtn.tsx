import { ACTIONS } from "./App";
import { Action } from "./App";

type TProps = {
	dispatch: React.Dispatch<Action>;
	payload: string;
};

function OperationsBtn({ dispatch, payload }: TProps) {
	return (
		<button
			onClick={() => {
				dispatch({
					type: ACTIONS.INSERT_OPERATION,
					payload: `${payload}`,
				});
			}}
		>
			{payload}
		</button>
	);
}

export default OperationsBtn;
