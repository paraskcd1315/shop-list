import { ADD_VALUE, REMOVE_VALUE } from '../actions/types';

const initialState = localStorage.getItem('shopList')
	? JSON.parse(localStorage.getItem('shopList'))
	: {};

if (!localStorage.getItem('shopList')) {
	localStorage.setItem('shopList', JSON.stringify(initialState));
}

function storageReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADD_VALUE:
			return {
				...state,
				[payload.shopName]: payload.shopInfo
			};

		case REMOVE_VALUE:
			return payload;

		default:
			return state;
	}
}

export default storageReducer;
