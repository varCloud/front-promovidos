import React, { useEffect, useState } from 'react'
// import {Map, InfoWindow, Marker, GoogleApiWrapper, Polygon, Polyline} from 'google-maps-react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

import poligonos from "../jsonMaps/poligonos_morelia.json";
import poligonosMorelia from "../jsonMaps/poligonos_secciones_morelia.json";
import { Polygon } from './Polygon';
import PromotorService from '../../../services/promotor.service';
import { FetchService } from '../../../services/config/FetchService';
import MarkerWithInfoWindow from './MarkerWithInfoWindow';
import { ROL } from '../../../utils/enums';
import PromovidosService from '../../../services/promovidos.service';
import CasillasService from '../../../services/casillas.service';
import imgPromotor from '../imgs/men_promotor.png'
import imgPromovido from '../imgs/men_promovido.png'
import imgCasilla from '../imgs/casilla.png'
import { BackgroundColorCasilla } from '../../../config/constants';
const polys = poligonos.id.coordinates[0][0].map((item) => {
    return {
        lat: item[1],
        lng: item[0]
    }
})

const polysSecciones = poligonos.id.coordinates[0][0].map((item) => {
    return {
        lat: item[1],
        lng: item[0]
    }
})

const _LoadingContainer = () => (
    <div key="fance loading">Fancy loading container!</div>
)

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '500px'
}

const Style = {
    position: 'relative',
    width: '100%',
    height: '500px'
}


const colorsMarker = {
    [ROL.PROMOTOR]: {
        background: "#22ccff",
        borderColor: "#1e89a1",
        glyphColor: "#0f677a",
        markerIcon: imgPromotor
    },
    [ROL.PROMOVIDO]: {
        background: "#ff7d04e1",
        color: "#ffaa0c",
        glyphColor: "#eb3a1afb",
        markerIcon: imgPromovido
    },
    "casillas": {
        background: "#04ff43e1",
        borderColor: "#118a2fe1",
        glyphColor: "#0ea333e1",
        markerIcon: imgCasilla
        
    }
}

const MapaCoberturaGoogleMap = () => {

    const { token } = JSON.parse(window.localStorage.getItem(`user`));
    const _promotorService: PromotorService = new PromotorService(new FetchService(token));
    const _promovidosService: PromovidosService = new PromovidosService(new FetchService(token));
    const _casillasService: CasillasService = new CasillasService(new FetchService(token));
    const [loading, setLoading] = useState<boolean>(true);
    const [promotores, setPromotores] = useState<any>([]);
    const [promovidos, setPromovidos] = useState<any>([]);
    const [casillas, setCasillas] = useState<any>([]);

    async function obtenerCasillas() {
        setLoading(true);
        const _casillas = await _casillasService.obtenerCasillas();
        setCasillas([..._casillas]);
        setLoading(false);
    }

    async function obtenerPromotores() {
        setLoading(true);
        const _promotores = await _promotorService.obtenerPromotores();
        setPromotores([..._promotores]);
        setLoading(false);
    }

    async function obtenerPromovidos() {
        setLoading(true);
        const _promovidos = await _promovidosService.obtenerPromovidos();
        setPromovidos([..._promovidos]);
        setLoading(false);
    }


    useEffect(() => {
        obtenerPromotores();
        obtenerPromovidos();
        obtenerCasillas();
        return () => { };
    }, []);

    return (
        <APIProvider apiKey={'AIzaSyAf8OZeL2LpSsDbETvBplATp-OzQA1G_8M'}>
            <Map
                style={{ width: '100%', height: '500px' }}
                defaultCenter={{ lat: 19.70295, lng: -101.19365 }}
                defaultZoom={10}
                mapId={'bf51a910020fa25a'}
            >
                {
                    promotores.map((p) => {
                        if (p.latitud && p.longitud) {
                            return (
                                <MarkerWithInfoWindow colorMarker={colorsMarker[p.Usuario.idRol]} latLng={{ lat: Number(p.latitud), lng: Number(p.longitud) }} info={`${p.Usuario.nombres} ${p.Usuario.apellidos ?? ''}`} ></MarkerWithInfoWindow>
                            )
                        }
                        return null
                    })
                }
                {
                    promovidos.map((p) => {
                        if (p.latitud && p.longitud) {
                            return (
                                <MarkerWithInfoWindow colorMarker={colorsMarker[p.idRol]} latLng={{ lat: Number(p.latitud), lng: Number(p.longitud) }} info={`${p.nombres} ${p.apellidos ?? ''}`} ></MarkerWithInfoWindow>
                            )
                        }
                        return null
                    })
                }
                {
                    casillas.map((p) => {
                        if (p.latitud && p.longitud) {
                            return (
                                <MarkerWithInfoWindow  ubicacion={`${p.tipoCasilla} ${p.ubicacion}`} backgroundColor={BackgroundColorCasilla[p.distritoLocal.split('.')[0]]} colorMarker={colorsMarker["casillas"]} latLng={{ lat: Number(p.latitud), lng: Number(p.longitud) }} info={`${p.domicilio}`} ></MarkerWithInfoWindow>
                            )
                        }
                        return null
                    })
                }
                {/* <Polygon
                    paths={polys}
                /> */}
                {/* <Polygon
                    paths={polysSecciones}
                /> */}
                {/* <Polygon encodedPaths={['kal{Bd}rmRldBh_AtjCzXnPyh@p|Aa\\uGiq@eh@eCil@ld@kbAtO{l@a{CqD{{BzlBsk@`Fm`BrhAc@nTldAlq@fh@bNa|A|bApcArbAoqCdvC|{A`iGunAz~DeaIsfD}uIleCko@qsBulFddCmzCo\\c`Il~AklAuu@s`AgeAt_@yu@mxA`w@ae@m]s_AaqAl_AkiGqnE_VkbAc`GsJ}_C{|Mde@ukOpb@oc@b`IirBgEspBbxA}kF|t@vr@dcAocA~`Bzo@`uAsoBlhAv|DfsDzeC|dCywDjpBu^tSdHoEpnAnYd`@tc@HplAsq@pTff@b]uMteBQjSlz@pmAh~A`^baAtWwX`YelAxp@gn@pA}u@nwC}aC|Smhc@_uCihF_mD|_B}cDerAjkCgcGalBokQt|@YlIodIrv@Zfe@zvBfxG}qB|Uil@ja@boAbsD_Oxp@blBrmBpQgHa`CprBuZsBk|CapDmgHdcCgqDc^oqA|_Bgy@oK}|Me~AubNsmBeqPukDohCrH_zExsApLrrCvbFsJm{H_~AcHcJijAtuJdSoQoqAqiFkg@gdIoq_@gdBeg@_TjtAahDj}Bm`DiGc}D_x@sj@~~CicEk{A|Cs_AevEmi@yu@_jBo{@pTvFp~@anAvQir@ekAagAcuBkdDoHaxAzAek@eiAwR{JrJ}iAhyDewFnsB}Yvc@u_G`uB{`DrkEnUv[zsAvgF_cA`fDx{BbhA}Qt_CcrAnwA_tEbiCceEtlDliDho@em@ut@smCf`@oWh`Hpc@nuIcpGjyHpiCiVrjCl_CrsBtdScs@veFzzI_iCxiCraAn\\oa@dsDpgBpcAk@jaA~{BbH`fAkvBnGnDz~@n[hpAo|@~oB`@|pCaiC~zBzoBrpDgw@sd@{}AjXwQrnA?r|As~Bd~Em_EsB|cAfRzJd^qTjT`]{V~y@_t@rz@lGhZx`F~QnHy]bpAk{@zuDflDnc@|kA~TlyB}XbuANns@lPjI{RxXdbBjKls@teAdwAlx@fXju@bn@lg@x_Eif@th@zrAvpE}hAhsHz_@pDz}@vZS~oGxrHtwBefCvaChx@k]twA`pNx{CpxLpeUhkIjkDbi@i~@zy@di@jAx}ApsGrhIraClaAcAbgBf}FrnEt{BjuB|hAxWsHt~@qhBpEskAtWmx@mFmkDdkDh[~|@uhAlGrgAbwFr`B~e@ttA{Qh~K}p@vhKgrBlpN}wBhaLz_CdqLskD_RmlGhcDckGznDgj@nkCc}IxbLntIi|Qb|XwyFl{C~~@niDydCzrGrwGfzPkhHbcGqgEvo@taCrcMeUroJmqDplRwOhzHvlCbhLfwDdzSkDfeC|JhgAu}@l`BgqDl{L_|IbrBiwCx}DpqA~sLuuAzbM|pJ|`Ot_Hv_EviHkvDptKt`CxhM_{ChwI|q@v_Hx|RfeC|v_@d{F`rDfv[nkBdoE{}Glb@Qxj@pb@jS~@fl@gg@~Pgi@jyC|{D`^v|A`FnsAinAlwDskCjlFo~B|_IofLfte@oyAvvd@waDpkKeh@b~Cmzl@zmiC{w`@`jQkwRhbXieDcuFusGbdEs`C`qDkaHm{Fs`@ln@uwB{h@qlGmrNsnFnLcf@y]mbB|nBm{@`^urCsdChpDczEy|F{~H_{J{wGmq@io\\{{H}tUt{Lc}BjqEk_HixNcoQq}Chk@yf@y{Ais@_pEwhIioHymHj{C{cEgyHuuOwvc@daGamR_`U{cHg~IcbC}k@{sArg@cHyOul@enEnv@gfAw}@lv@}tA{jCwq@rXrvC_zBqQcTquBiuC`Jcn@peDyvBsGaf@dTzApsBlpArlAfPlnBtmAzqAtk@eEnl@zoByeEzdEtvB~dFh@voAe]`Go`Co}BgjC_p@c^fYcpFt|@i`Cgh@o|@tqBfPbgAoB`Qk^xVqLeHy]|e@bDjvAuNtNyi@zBgQ~Rad@ExFfQ_WTwI~WaSwQkMtn@w{BqAlDdo@aLt\\_QwPlBcR{_@kIsYy`@yXuCg^}p@k}@wJkSd]a^|JcM|^scAtRgBvUutAfhAsJJs[{k@cw@pEwh@{y@x_@lmAi^t]mpAjGiq@ik@qQzf@gt@h]soBwgCBkeBsW}cCggAg`@atBoY`Fsi@wK}Zqe@y]k}@t\\se@iE}w@rr@}TcDoVdK`AhUikDhGcaGlcIqqB~cI\\h{Ac^~bB~g@bUvRxdBobBlhC{D~}@}bA|eDaAr_AdNdx@rq@j}@h|B~XXjdA{XbxAc_Adt@gBfjAqbAvo@a^qBc_@qh@i_@`XqC}QkY}@}Lc\\qbAal@_T~Sa\\{hAaUlUgqA_JbQqZgLmEwWxBwBbSm\\`AqIf[eb@RyDdQw_@yBgQbRiRgRedA`}@_nAoh@ox@iFwf@bUbJ|d@kk@yDoJxR~GqaBeTBcIk_@ya@dFub@iyAvTpCwKaL`D}k@taAu[wIskAvLwuAka@j@mFj]kg@cDuBmf@mOoQlAer@bUsj@hvB{zBsu@w\\sl@NkK_JqV`|@{h@lSs_@{Lke@jDeJ`kAqcA_SqaFk|_@bFioAklBeeFi^sdFxd@kXaZ_|AiZ_MpWoxB|\\}a@qn@swB_mCg]mQ{l@qlAiM|MqiAxq@cw@em@_gCugAyjHmcC~w@yZysBcyAwi@ipCoaMnpAgoEa|Dy_Qxf@_`Bfb@~L~h@qSkyAy_S}mAg{DywAho@kB}eO~a@wcBed@{rGklAiQmCwWjdA{Z']} /> */}
            </Map>
        </APIProvider>
    )
}

export default MapaCoberturaGoogleMap