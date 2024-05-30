import React, { useState } from 'react';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import AsideRouter from '../components/router/AsideRouter';
import Wrapper from '../components/layouts/Wrapper/Wrapper';
import HeaderRouter from '../components/router/HeaderRouter';
import ContentRouter from '../components/router/ContentRouter';
import FooterRouter from '../components/router/FooterRouter';
import useFontSize from '../hooks/useFontSize';
import getOS from '../utils/getOS.util';
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Button from '../components/ui/Button';
import Tooltip from '../components/ui/Tooltip';
import Modal, { ModalBody, ModalHeader } from '../components/ui/Modal';
import ChartPreliminares from '../pages/DashboardPromovido/components/ChartPreliminares';

function fallbackRender({ error }) {  
	return (
	  <div role="alert">
		<p>Something went wrong:</p>
		<pre style={{ color: "red" }}>{error.message}</pre>
	  </div>
	);
  }

const App = () => {
	getOS();
	const { fontSize } = useFontSize();
	dayjs.extend(localizedFormat);
	const [openChart, setOpenChart] = useState<boolean>(false);
	return (
		<>
			<style>{`:root {font-size: ${fontSize}px}`}</style>
			<div data-component-name='App' className='flex grow flex-col'>
				<ErrorBoundary FallbackComponent={ErrorPage} >
				
					<div className='fixed bottom-0 right-0 rounded-full bg-orange-600 mb-10'>
						<Tooltip text='Ver grafico preliminar'>
							<Button icon='HeroChartBarSquare' className=' ' id='buttonChart'  isActive color='zinc' onClick={() => { setOpenChart(true) }} />
						</Tooltip>
					</div>
						<AsideRouter />
					<Wrapper>
						<HeaderRouter />
						<ContentRouter />
						
						<FooterRouter />
					</Wrapper>
				</ErrorBoundary>
			</div>

			<Modal isOpen={openChart} fullScreen setIsOpen={setOpenChart} isStaticBackdrop>
					<ModalHeader>Resultados Preliminares de la Votación</ModalHeader>
					<ModalBody>
                    <div className='mt-10'>
                        <ChartPreliminares></ChartPreliminares>
                    </div>
					</ModalBody>
				</Modal>
		</>
	);
};

export default App;
