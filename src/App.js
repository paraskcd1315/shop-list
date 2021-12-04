import React from 'react';
import './sass/style.scss';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import store from './store';
import Navbar from './components/layout/Navbar';
import Homepage from './components/pages/Homepage';
import AddShop from './components/pages/AddShop';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className='wrapper'>
					<Navbar />
					<Routes>
						<Route path='/' element={<Homepage />} />
						<Route path='/addShop' element={<AddShop />} />
					</Routes>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
