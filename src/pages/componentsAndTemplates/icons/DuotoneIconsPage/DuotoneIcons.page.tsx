import React, { useState } from 'react';
import PageWrapper from '../../../../components/layouts/PageWrapper/PageWrapper';
import Icon from '../../../../components/icon/Icon';
import { TIcons } from '../../../../types/icons.type';
import Subheader, {
	SubheaderLeft,
	SubheaderRight,
	SubheaderSeparator,
} from '../../../../components/layouts/Subheader/Subheader';
import Breadcrumb from '../../../../components/layouts/Breadcrumb/Breadcrumb';
import Container from '../../../../components/layouts/Container/Container';
import Input from '../../../../components/form/Input';
import FieldWrap from '../../../../components/form/FieldWrap';
import Badge from '../../../../components/ui/Badge';

const iconList: TIcons[] = [
	'DuoActiveCall',
	'DuoAddMusic',
	'DuoAddUser',
	'DuoAddressBook1',
	'DuoAddressBook2',
	'DuoAddressCard',
	'DuoAdjust',
	'DuoAirBalloon',
	'DuoAirConditioning',
	'DuoAirDryer',
	'DuoAirplayVideo',
	'DuoAirplay',
	'DuoAirpods',
	'DuoAlarmClock',
	'DuoAlignAuto',
	'DuoAlignCenter',
	'DuoAlignJustify',
	'DuoAlignLeft',
	'DuoAlignRight',
	'DuoAnchorCenterDown',
	'DuoAnchorCenterUp',
	'DuoAnchorCenter',
	'DuoAnchorLeftDown',
	'DuoAnchorLeftUp',
	'DuoAnchorLeft',
	'DuoAnchorRightDown',
	'DuoAnchorRightUp',
	'DuoAnchorRight',
	'DuoAndroid',
	'DuoAngleDoubleDown',
	'DuoAngleDoubleLeft',
	'DuoAngleDoubleRight',
	'DuoAngleDoubleUp',
	'DuoAngleDown',
	'DuoAngleGrinder',
	'DuoAngleLeft',
	'DuoAngleRight',
	'DuoAngleUp',
	'DuoAppleWatch',
	'DuoArchive',
	'DuoArmchair',
	'DuoArrowDown',
	'DuoArrowFromBottom',
	'DuoArrowFromLeft',
	'DuoArrowFromRight',
	'DuoArrowFromTop',
	'DuoArrowLeft',
	'DuoArrowRight',
	'DuoArrowToBottom',
	'DuoArrowToLeft',
	'DuoArrowToRight',
	'DuoArrowToUp',
	'DuoArrowUp',
	'DuoArrowsH',
	'DuoArrowsV',
	'DuoArrows',
	'DuoArticle',
	'DuoAtm',
	'DuoAttachment1',
	'DuoAttachment2',
	'DuoAxe',
	'DuoBack',
	'DuoBackspace',
	'DuoBackward',
	'DuoBag1',
	'DuoBag2',
	'DuoBagChair',
	'DuoBakingGlove',
	'DuoBarcodeRead',
	'DuoBarcodeScan',
	'DuoBarcode',
	'DuoBath',
	'DuoBatteryCharging',
	'DuoBatteryEmpty',
	'DuoBatteryFull',
	'DuoBatteryHalf',
	'DuoBed',
	'DuoBeer',
	'DuoBezierCurve',
	'DuoBinocular',
	'DuoBitcoin',
	'DuoBlender',
	'DuoBluetooth',
	'DuoBold',
	'DuoBookOpen',
	'DuoBook',
	'DuoBookmark',
	'DuoBorder',
	'DuoBottle1',
	'DuoBottle2',
	'DuoBowl',
	'DuoBox1',
	'DuoBox2',
	'DuoBox3',
	'DuoBox',
	'DuoBrassiere',
	'DuoBread',
	'DuoBriefcase',
	'DuoBroom',
	'DuoBrush1',
	'DuoBrush',
	'DuoBucket1',
	'DuoBucket',
	'DuoBuilding',
	'DuoBulb1',
	'DuoBulb2',
	'DuoBulletList',
	'DuoBurger',
	'DuoCake',
	'DuoCalculator',
	'DuoCall1',
	'DuoCall',
	'DuoCamera',
	'DuoCap1',
	'DuoCap2',
	'DuoCap3',
	'DuoCap',
	'DuoCardboardVr',
	'DuoCarrot',
	'DuoCart1',
	'DuoCart2',
	'DuoCart3',
	'DuoCassette',
	'DuoCd',
	'DuoCelsius',
	'DuoChair1',
	'DuoChair2',
	'DuoChartBar1',
	'DuoChartBar2',
	'DuoChartBar3',
	'DuoChartLine1',
	'DuoChartLine2',
	'DuoChartPie',
	'DuoChat1',
	'DuoChat2',
	'DuoChat4',
	'DuoChat5',
	'DuoChat6',
	'DuoChatCheck',
	'DuoChatError',
	'DuoChatLocked',
	'DuoChatSmile',
	'DuoCheck',
	'DuoCheese',
	'DuoChef',
	'DuoChicken',
	'DuoCircle',
	'DuoClip',
	'DuoClipboardCheck',
	'DuoClipboardList',
	'DuoClipboard',
	'DuoClock',
	'DuoClose',
	'DuoCloud1',
	'DuoCloud2',
	'DuoCloudDownload',
	'DuoCloudFog',
	'DuoCloudSun',
	'DuoCloudUpload',
	'DuoCloudWind',
	'DuoCloudyNight',
	'DuoCloudy',
	'DuoCmd',
	'DuoCode1',
	'DuoCode',
	'DuoCoffee1',
	'DuoCoffee2',
	'DuoColorProfile',
	'DuoColor',
	'DuoCommit',
	'DuoCommode1',
	'DuoCommode2',
	'DuoCompass1',
	'DuoCompass',
	'DuoCompilation',
	'DuoCompiledFile',
	'DuoCompiling',
	'DuoComponent',
	'DuoContact1',
	'DuoControl',
	'DuoCookie',
	'DuoCookingBook',
	'DuoCookingPot',
	'DuoCouch',
	'DuoCpu1',
	'DuoCpu2',
	'DuoCreditCard',
	'DuoCrop',
	'DuoCrown',
	'DuoCursor',
	'DuoCurtains',
	'DuoCuttingBoard',
	'DuoDayRain',
	'DuoDeer',
	'DuoDeleteUser',
	'DuoDeletedFile',
	'DuoDeletedFolder',
	'DuoDiagnostics',
	'DuoDialNumbers',
	'DuoDifference',
	'DuoDinner1',
	'DuoDinner',
	'DuoDirection1',
	'DuoDirection2',
	'DuoDish',
	'DuoDishes',
	'DuoDislike',
	'DuoDisplay1',
	'DuoDisplay2',
	'DuoDisplay3',
	'DuoDollar',
	'DuoDoneCircle',
	'DuoDoorOpen',
	'DuoDoubleCheck',
	'DuoDown2',
	'DuoDownLeft',
	'DuoDownRight',
	'DuoDownload',
	'DuoDownloadedFile',
	'DuoDownloadsFolder',
	'DuoDress',
	'DuoDuplicate',
	'DuoDvd',
	'DuoEarth',
	'DuoEditText',
	'DuoEdit1',
	'DuoEdit',
	'DuoEject',
	'DuoEqualizer',
	'DuoEraser',
	'DuoErrorCircle',
	'DuoEuro',
	'DuoExchange',
	'DuoExpandArrows',
	'DuoExport',
	'DuoFahrenheit',
	'DuoFan',
	'DuoFileCloud',
	'DuoFileDone',
	'DuoFileMinus',
	'DuoFilePlus',
	'DuoFile',
	'DuoFilter',
	'DuoFire',
	'DuoFireplace',
	'DuoFish',
	'DuoFlag',
	'DuoFlashlight',
	'DuoFlatten',
	'DuoFlipHorizontal',
	'DuoFlipVertical',
	'DuoFlower1',
	'DuoFlower2',
	'DuoFlower3',
	'DuoFog',
	'DuoFolderCheck',
	'DuoFolderCloud',
	'DuoFolderError',
	'DuoFolderHeart',
	'DuoFolderMinus',
	'DuoFolderPlus',
	'DuoFolderSolid',
	'DuoFolderStar',
	'DuoFolderThunder',
	'DuoFolder1',
	'DuoFolder',
	'DuoFont',
	'DuoForkSpoonKnife',
	'DuoForkSpoon',
	'DuoFork',
	'DuoForward1',
	'DuoForward',
	'DuoFrenchBread',
	'DuoFridge',
	'DuoFryingPan',
	'DuoGameboy',
	'DuoGamepad1',
	'DuoGamepad2',
	'DuoGasStove',
	'DuoGenerator',
	'DuoGift',
	'DuoGit1',
	'DuoGit2',
	'DuoGit3',
	'DuoGit4',
	'DuoGithub',
	'DuoGlassMartini',
	'DuoGlobe',
	'DuoGrater',
	'DuoGroupChat',
	'DuoGroupFolders',
	'DuoGroup',
	'DuoH1',
	'DuoH2',
	'DuoHalfHeart',
	'DuoHalfStar',
	'DuoHanger',
	'DuoHardDrive',
	'DuoHat',
	'DuoHeadphones',
	'DuoHeart',
	'DuoHidden',
	'DuoHighVoltage',
	'DuoHomeHeart',
	'DuoHome',
	'DuoHomepod',
	'DuoHorizontal',
	'DuoHummer2',
	'DuoHummer',
	'DuoIceCream1',
	'DuoIceCream2',
	'DuoImac',
	'DuoImage',
	'DuoImport',
	'DuoIncomingBox',
	'DuoIncomingCall',
	'DuoIncomingMail',
	'DuoInfoCircle',
	'DuoInterSelect',
	'DuoIphoneBack',
	'DuoIphoneXBack',
	'DuoIphoneX',
	'DuoIron',
	'DuoItalic',
	'DuoJoin1',
	'DuoJoin2',
	'DuoJoin3',
	'DuoKettle',
	'DuoKey',
	'DuoKeyboard',
	'DuoKitchenScale',
	'DuoKnife1',
	'DuoKnife2',
	'DuoKnifeFork1',
	'DuoKnifeFork2',
	'DuoLadder',
	'DuoLadle',
	'DuoLamp1',
	'DuoLamp2',
	'DuoLaptopMacbook',
	'DuoLaptop',
	'DuoLayers',
	'DuoLayout3D',
	'DuoLayout4Blocks',
	'DuoLayoutArrange',
	'DuoLayoutGrid',
	'DuoLayoutHorizontal',
	'DuoLayoutLeftPanel1',
	'DuoLayoutLeftPanel2',
	'DuoLayoutRightPanel1',
	'DuoLayoutRightPanel2',
	'DuoLayoutTopPanel1',
	'DuoLayoutTopPanel2',
	'DuoLayoutTopPanel3',
	'DuoLayoutTopPanel4',
	'DuoLayoutTopPanel5',
	'DuoLayoutTopPanel6',
	'DuoLayoutVertical',
	'DuoLeft2',
	'DuoLeft3',
	'DuoLeftCircle',
	'DuoLibrary',
	'DuoLike',
	'DuoLine',
	'DuoLoader',
	'DuoLoading',
	'DuoLocationArrow',
	'DuoLockCircle',
	'DuoLockOverturning',
	'DuoLock',
	'DuoLockedFolder',
	'DuoLte1',
	'DuoLte2',
	'DuoMagic',
	'DuoMailAt',
	'DuoMailAttachment',
	'DuoMailError',
	'DuoMailHeart',
	'DuoMailLocked',
	'DuoMailNotification',
	'DuoMailOpened',
	'DuoMailUnlocked',
	'DuoMail',
	'DuoMailbox2',
	'DuoMailbox',
	'DuoMarker1',
	'DuoMarker2',
	'DuoMask',
	'DuoMc',
	'DuoMediaFolder',
	'DuoMediaLibrary1',
	'DuoMediaLibrary2',
	'DuoMediaLibrary3',
	'DuoMedia',
	'DuoMenu',
	'DuoMic',
	'DuoMidi',
	'DuoMinus1',
	'DuoMinus',
	'DuoMirror',
	'DuoMisoSoup',
	'DuoMissedCall',
	'DuoMixer',
	'DuoMoney',
	'DuoMoon',
	'DuoMouse',
	'DuoMovieLane1',
	'DuoMovieLane2',
	'DuoMusicCloud',
	'DuoMusicNote',
	'DuoMusic1',
	'DuoMusic',
	'DuoMute',
	'DuoNext',
	'DuoNightFog',
	'DuoNightRain',
	'DuoNotification2',
	'DuoNotifications1',
	'DuoOption',
	'DuoOrange',
	'DuoOther1',
	'DuoOther2',
	'DuoOutgoingBox',
	'DuoOutgoingCall',
	'DuoOutgoingMail',
	'DuoOutlet',
	'DuoPanties',
	'DuoPantone',
	'DuoParagraph',
	'DuoPatch',
	'DuoPause',
	'DuoPenRuler',
	'DuoPenToolVector',
	'DuoPencil',
	'DuoPhone',
	'DuoPicker',
	'DuoPicture',
	'DuoPictures1',
	'DuoPictures2',
	'DuoPixels',
	'DuoPizza',
	'DuoPlay',
	'DuoPlaylist1',
	'DuoPlaylist2',
	'DuoPlus1',
	'DuoPlus',
	'DuoPolygon',
	'DuoPosition1',
	'DuoPosition',
	'DuoPound',
	'DuoPrice1',
	'DuoPrice2',
	'DuoPrinter',
	'DuoProtectedFile',
	'DuoPuzzle',
	'DuoQuestionCircle',
	'DuoQuote1',
	'DuoQuote2',
	'DuoRadio',
	'DuoRain1',
	'DuoRain2',
	'DuoRain5',
	'DuoRainbow',
	'DuoRangeHood',
	'DuoReadedMail',
	'DuoRec',
	'DuoRectangle',
	'DuoRedo',
	'DuoRepeatOne',
	'DuoRepeat',
	'DuoReplyAll',
	'DuoReply',
	'DuoRight2',
	'DuoRight3',
	'DuoRightCircle',
	'DuoRight',
	'DuoRoadCone',
	'DuoRoller',
	'DuoRollingPin',
	'DuoRouble',
	'DuoRoulette',
	'DuoRoute',
	'DuoRouter1',
	'DuoRouter2',
	'DuoRss',
	'DuoRuler',
	'DuoSad',
	'DuoSafeChat',
	'DuoSafe',
	'DuoSale1',
	'DuoSale2',
	'DuoSaturation',
	'DuoSaucepan',
	'DuoSave',
	'DuoScale',
	'DuoScissors',
	'DuoScrewdriver',
	'DuoSdCard',
	'DuoSearch',
	'DuoSelect',
	'DuoSelectedFile',
	'DuoSend',
	'DuoSendingMail',
	'DuoSending',
	'DuoServer',
	'DuoSettings1',
	'DuoSettings2',
	'DuoSettings3',
	'DuoSettings4',
	'DuoSettings',
	'DuoShare1',
	'DuoShare',
	'DuoShieldCheck',
	'DuoShieldDisabled',
	'DuoShieldProtected',
	'DuoShieldThunder',
	'DuoShieldUser',
	'DuoShift',
	'DuoShirt',
	'DuoShoes',
	'DuoShorts',
	'DuoShovel1',
	'DuoShovel',
	'DuoShuffle',
	'DuoShutdown',
	'DuoSieve',
	'DuoSignIn',
	'DuoSignOut',
	'DuoSize',
	'DuoSketch',
	'DuoSmile',
	'DuoSneakers',
	'DuoSnoozedMail',
	'DuoSnow1',
	'DuoSnow2',
	'DuoSnow3',
	'DuoSnow',
	'DuoSocketEu',
	'DuoSocketUs',
	'DuoSocks',
	'DuoSort1',
	'DuoSort2',
	'DuoSort3',
	'DuoSpam',
	'DuoSpatula',
	'DuoSpeaker',
	'DuoSpoon',
	'DuoSpy',
	'DuoStairs',
	'DuoStamp',
	'DuoStar',
	'DuoStop',
	'DuoStorm',
	'DuoStrikethrough',
	'DuoSubtract',
	'DuoSunFog',
	'DuoSunGlasses',
	'DuoSun',
	'DuoSunset1',
	'DuoSunset2',
	'DuoSushi',
	'DuoSwissKnife',
	'DuoTShirt',
	'DuoTablet',
	'DuoTarget',
	'DuoTemperatureEmpty',
	'DuoTemperatureFull',
	'DuoTemperatureHalf',
	'DuoTerminal',
	'DuoTextHeight',
	'DuoTextWidth',
	'DuoText',
	'DuoThumbtack',
	'DuoThunderCircle',
	'DuoThunderMove',
	'DuoThunderNight',
	'DuoThunder1',
	'DuoThunder',
	'DuoTicket',
	'DuoTie',
	'DuoTimeSchedule',
	'DuoTimer',
	'DuoToilet',
	'DuoTools',
	'DuoTowel',
	'DuoTrash1',
	'DuoTrash',
	'DuoTriangle',
	'DuoTv1',
	'DuoTv2',
	'DuoTwoBottles',
	'DuoUmbrella',
	'DuoUnderline',
	'DuoUndo',
	'DuoUnion',
	'DuoUnlock',
	'DuoUp2',
	'DuoUpBoard',
	'DuoUpDown',
	'DuoUpLeft',
	'DuoUpRight',
	'DuoUpdate',
	'DuoUploadFolder',
	'DuoUpload',
	'DuoUploadedFile',
	'DuoUrgentMail',
	'DuoUsbStorage',
	'DuoUsb',
	'DuoUserFolder',
	'DuoUser',
	'DuoVertical',
	'DuoVideoCamera',
	'DuoVinyl',
	'DuoVisible',
	'DuoVolumeDown',
	'DuoVolumeFull',
	'DuoVolumeHalf',
	'DuoVolumeUp',
	'DuoWaiting',
	'DuoWallet2',
	'DuoWallet3',
	'DuoWallet',
	'DuoWarning1Circle',
	'DuoWarning2',
	'DuoWasher',
	'DuoWatch1',
	'DuoWatch2',
	'DuoWaterMixer',
	'DuoWeight1',
	'DuoWeight2',
	'DuoWiFi',
	'DuoWind',
	'DuoWine',
	'DuoWood1',
	'DuoWood2',
	'DuoWoodHorse',
	'DuoWrite',
	'DuoYoutube',
	'DuoZoomMinus',
	'DuoZoomPlus',
];
const DuotoneIconsPage = () => {
	const [globalFilter, setGlobalFilter] = useState<string>('');

	return (
		<PageWrapper>
			<Subheader>
				<SubheaderLeft>
					<Breadcrumb path='Components & Templates / Icons' currentPage='Duotone Icons' />
					<SubheaderSeparator />
					<Badge variant='outline' className='flex gap-2 border-transparent'>
						<span>Icons:</span>
						<b>
							{iconList.filter((key) => key.includes(globalFilter)).length}/
							{iconList.length}
						</b>
					</Badge>
				</SubheaderLeft>
				<SubheaderRight>
					<FieldWrap
						firstSuffix={<Icon className='mx-2' icon='HeroMagnifyingGlass' />}
						lastSuffix={
							globalFilter && (
								<Icon
									icon='HeroXMark'
									color='red'
									className='mx-2 cursor-pointer'
									onClick={() => {
										setGlobalFilter('');
									}}
								/>
							)
						}>
						<Input
							id='example'
							name='example'
							placeholder='Search...'
							value={globalFilter ?? ''}
							onChange={(e) => setGlobalFilter(e.target.value)}
						/>
					</FieldWrap>
				</SubheaderRight>
			</Subheader>
			<Container>
				<div className='grid gap-4 text-center sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12'>
					{iconList
						.filter((key) => key.includes(globalFilter))
						.map((iconName) => (
							<button
								type='button'
								key={iconName}
								className='flex flex-col items-center justify-center rounded-lg border border-zinc-300/25 py-4 dark:border-zinc-800/50'
								onClick={() => {
									navigator.clipboard
										.writeText(iconName)
										.then(() => {})
										.catch(() => {});
								}}>
								<Icon icon={iconName} className='text-4xl' />
								<div className='text-xs text-zinc-500'>{iconName}</div>
							</button>
						))}
				</div>
			</Container>
		</PageWrapper>
	);
};

export default DuotoneIconsPage;
