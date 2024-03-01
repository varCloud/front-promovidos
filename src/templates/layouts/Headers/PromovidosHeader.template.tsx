import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../components/layouts/Header/Header';
import SettingsPartial from './_partial/Settings.partial';

const PromovidosHeaderTemplate = () => {
	return (
		<Header>
			<HeaderLeft>
				<p></p>
			</HeaderLeft>
			<HeaderRight>
            <SettingsPartial />
			</HeaderRight>
		</Header>
	);
};

export default PromovidosHeaderTemplate;
