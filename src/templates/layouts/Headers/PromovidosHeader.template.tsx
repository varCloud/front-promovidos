import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import SettingsPartial from './_partial/Settings.partial';

const PromovidosHeaderTemplate = ({ title }) => {
	return (
		<Header>
			<HeaderLeft>
				<h1>{title}</h1>
			</HeaderLeft>
			<HeaderRight>
				<SettingsPartial />
			</HeaderRight>
		</Header>
	);
};

export default PromovidosHeaderTemplate;
