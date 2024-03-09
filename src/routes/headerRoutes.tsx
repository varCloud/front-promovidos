import React from 'react';
import { RouteProps } from 'react-router-dom';
import DefaultHeaderTemplate from '../templates/layouts/Headers/DefaultHeader.template';
import { appPages, authPages, componentsPages, promovidosAllPages } from '../config/pages.config';
import ComponentAndTemplateHeaderTemplate from '../templates/layouts/Headers/ComponentAndTemplateHeader.template';
import PromovidosHeaderTemplate from '../templates/layouts/Headers/PromovidosHeader.template';

const headerRoutes: RouteProps[] = [
	{ path: authPages.loginPage.to, element: null },
	{
		path: `${componentsPages.uiPages.to}/*`,
		element: <ComponentAndTemplateHeaderTemplate />,
	},
	{
		path: `${componentsPages.formPages.to}/*`,
		element: <ComponentAndTemplateHeaderTemplate />,
	},
	{
		path: `${componentsPages.integratedPages.to}/*`,
		element: <ComponentAndTemplateHeaderTemplate />,
	},
	{
		path: appPages.projectAppPages.subPages.projectDashboardPage.to,
		element: null,
	},
	{
		path: promovidosAllPages.promovidoAppPages.to,
		element: <PromovidosHeaderTemplate title={'Promovidos'} />
	},
	{
		path: promovidosAllPages.promotorAppPages.to,
		element: <PromovidosHeaderTemplate title={'Promotores'}/>
	},
	{
		path: promovidosAllPages.dashboardPromodivosAppPages.to,
		element: <PromovidosHeaderTemplate title={'Dashboard'}/>
	},
	{
		path: promovidosAllPages.enlaceAppPages.to,
		element: <PromovidosHeaderTemplate title={'Enlaces'}/>
	},
	{
		path: '',
		element: null,
	},
	{ path: '*', element: <DefaultHeaderTemplate /> },
];

export default headerRoutes;
