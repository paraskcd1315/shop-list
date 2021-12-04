import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { addValue } from '../../actions/storage';

const initialState = {
	shopName: '',
	shopCategory: '',
	shopArea: '',
	openingDate: '',
	closingDate: ''
};

function AddShop({ addValue }) {
	const navigate = useNavigate();
	const [formData, setformData] = useState(initialState);

	const [errorData, seterrorData] = useState('');

	const { shopName, shopCategory, shopArea, openingDate, closingDate } =
		formData;

	const onChange = (e) => {
		setformData((state) => {
			return {
				...state,
				[e.target.name]: e.target.value
			};
		});
	};

	const checkDates = () => {
		const oDate = new Date(openingDate);
		const cDate = new Date(closingDate);

		if (oDate < cDate) {
			return true;
		} else {
			seterrorData((state) => {
				let newState = state;
				newState = `Closing Date can't be before Opening Date`;
				return newState;
			});
			return false;
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		let x = checkDates();

		if (x) {
			addValue({
				sName: shopName,
				data: {
					shopName: shopName,
					shopCategory: shopCategory,
					shopArea: shopArea,
					openingDate: openingDate,
					closingDate: closingDate
				}
			});
			navigate('/', { replace: true });
		} else {
			return;
		}
	};

	return (
		<div className='addShopPage'>
			{errorData.length > 0 ? (
				<div className='btn btn-danger m-1 p-1'>{errorData}</div>
			) : (
				''
			)}
			<div className='btn btn-danger'></div>
			<div className='addShopForm'>
				<div className='header'>
					<h2>Add Shop</h2>
					<Link to='/' className='btn btn-back'>
						← Go Back
					</Link>
				</div>
				<form className='shopForm' onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Shop Name'
							name='shopName'
							value={shopName}
							onChange={onChange}
							required
						/>
						<small className='form-text'>Enter the Name of the Shop</small>
					</div>
					<div className='form-group'>
						<select
							name='shopCategory'
							value={shopCategory}
							onChange={onChange}
							required>
							<option>* Select the Category of the Shop</option>
							<option value='Grocery'>Grocery</option>
							<option value='Butcher'>Butcher</option>
							<option value='Baker'>Baker</option>
							<option value='Chemist'>Chemist</option>
							<option value='Stationery'>Stationery</option>
						</select>
						<small className='form-text'>Enter the Category of the Shop</small>
					</div>
					<div className='form-group'>
						<select
							name='shopArea'
							value={shopArea}
							onChange={onChange}
							required>
							<option>* Select the Area of the Shop</option>
							<option value='Thane'>Thane</option>
							<option value='Pune'>Pune</option>
							<option value='Mumbai Suburban'>Mumbai Suburban</option>
							<option value='Nashik'>Nashik</option>
							<option value='Nagpur'>Nagpur</option>
							<option value='Ahmednagar'>Ahmednagar</option>
							<option value='Solapur'>Solapur</option>
						</select>
						<small className='form-text'>
							Enter the Area, the Shop resides
						</small>
					</div>
					<div className='form-group'>
						<input
							type='date'
							name='openingDate'
							value={openingDate}
							onChange={onChange}
							required
						/>
						<small className='form-text'>
							Enter the Opening Date of the Shop
						</small>
					</div>
					<div className='form-group'>
						<input
							type='date'
							name='closingDate'
							value={closingDate}
							onChange={onChange}
							required
						/>
						<small className='form-text'>
							Enter the Closing Date of the Shop
						</small>
					</div>
					<input type='submit' className='btn btn-success p-1' />
				</form>
			</div>
		</div>
	);
}

export default connect(null, { addValue })(AddShop);
