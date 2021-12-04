import { ADD_VALUE, REMOVE_VALUE } from './types';

export const addValue =
	({ sName, data }) =>
	(dispatch) => {
		const localStorageObj = JSON.parse(localStorage.getItem('shopList'));

		localStorageObj[sName] = data;

		localStorage.setItem('shopList', JSON.stringify(localStorageObj));

		dispatch({
			type: ADD_VALUE,
			payload: {
				shopName: sName,
				shopInfo: data
			}
		});
	};

export const removeValue =
	({ sName }) =>
	(dispatch) => {
		const localStorageObj = JSON.parse(localStorage.getItem('shopList'));

		delete localStorageObj[sName];

		localStorage.setItem('shopList', JSON.stringify(localStorageObj));

		dispatch({
			type: REMOVE_VALUE,
			payload: localStorageObj
		});
	};
