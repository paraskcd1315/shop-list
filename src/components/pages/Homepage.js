import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeValue } from '../../actions/storage';

function Homepage({ storageReducer, removeValue }) {
	const checkClosed = (date) => {
		const currentDate = Date.now();
		const closingDate = new Date(date);

		if (currentDate > closingDate) {
			return true;
		} else {
			return false;
		}
	};

	const renderShopList = () => {
		return Object.keys(storageReducer).map((shopName) => {
			return (
				<div
					key={shopName}
					className='shop'
					onClick={(e) => {
						e.preventDefault();
						let q = window.confirm(
							'Are you sure you want to Delete this Shop from the List?'
						);

						if (q) {
							removeValue({ sName: shopName });
							return;
						} else {
							return;
						}
					}}>
					<div className='shopName'>{storageReducer[shopName].shopName}</div>
					<div className='shopCategory'>
						{storageReducer[shopName].shopCategory}
					</div>
					<div className='shopArea'>{storageReducer[shopName].shopArea}</div>
					<div className='shopClosed'>
						<div
							className={
								checkClosed(storageReducer[shopName].closingDate)
									? 'light redLight'
									: 'light greenLight'
							}></div>
					</div>
				</div>
			);
		});
	};

	return (
		<div className='homepage'>
			<div className='shopList'>
				{Object.keys(storageReducer).length === 0 &&
				storageReducer.constructor === Object ? (
					<div className='empty m-2'>
						Welcome to the Shop List App, tap the Button Below to add Shops to
						the List.
					</div>
				) : (
					<div className='container'>
						<div className='listHeader m-1 p-1'>
							<div>Name</div>
							<div>Category</div>
							<div>Area</div>
							<div>Opened/Closed</div>
						</div>
						<div className='listContent m-1 p-1'>{renderShopList()}</div>
					</div>
				)}
			</div>
			<Link to='/addShop' className='btn btn-normal add-button m-2 p-1'>
				Add Shop
			</Link>
		</div>
	);
}

const mapStateToProps = (state) => ({
	storageReducer: state.storageReducer
});

export default connect(mapStateToProps, { removeValue })(Homepage);
