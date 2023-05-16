import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms';
import { HttpClient } from  "@angular/common/http";
import { Router } from '@angular/router';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {StringFilterByPipe} from './stringFilterByPipe'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import{SignUpService} from '../../services/sign-up.service';
export interface State {
  value: string;
}

// import { from } from 'rxjs';
@Component({
  selector: 'app-fx-blue-details',
  templateUrl: './fx-blue-details.component.html',
  styleUrls: ['./fx-blue-details.component.scss']
})
export class FxBlueDetailsComponent implements OnInit {
  public form:FormGroup;
  public url = 'https://www.fxblue.com/_Login.aspx';
  public postUrl= 'https://www.fxblue.com/mt4/_mt4signup.aspx';
  public serverUrl ='https://8e451ad1dec5.ngrok.io'
  public settings: Settings;
  public hasFxAccount = false;
  public hideSpinner = true;
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  public options=[{value:'121clearing-Live'},{ value:'21IncPool-Live'},{ value:'3TGFX-Main'},{ value:'AAATrade-MT4'},{ value:'AAFX-Demo'},{ value:'AAFX-Real'},{ value:'ABCMarkets-MT4 Demo'},{ value:
    'ABCMarkets-Real3'},{ value:'ABS-Demo'},{ value:'ABS-Live'},{ value:'ACCFXBrokers-Real'},{ value:'ACCFX-Demo'},{ value:'ACCFX-Live'},{ value:'AceForex-Demo'},{ value:'AcenyaCapital-Live'},{ value:'ACM-Demo'
    },{ value:'ACM-Live'},{ value:'ACM-Live 2'},{ value:'ACMPLC-Live'},{ value:'Activtrades-1'},{ value:'Activtrades-2'},{ value:'Activtrades-3'},{ value:'Activtrades-4'},{ value:'Activtrades-5'},{ value:'ActivTradesCorp-5'
    },{ value:'Activtrades-Demo'},{ value:'ACYFX-Demo'},{ value:'ACYFX-Live'},{ value:'ACYSecurities-Live'},{ value:'Admiral-Demo'},{ value:'Admiralex-Live2'},{ value:'Admiral-Live'},{ value:'AdmiralMarkets-Demo'
    },{ value:'AdmiralMarkets-Demo2'},{ value:'AdmiralMarkets-Live'},{ value:'AdmiralMarkets-Live2'},{ value:'AdmiralMarkets-Live3'},{ value:'ADSS-Demo'},{ value:'ADSSecurities-Demo2'},{ value:'ADSSecurities-Live2'
    },{ value:'ADSS-Live'},{ value:'ADSS-Live1'},{ value:'ADSS-Live3'},{ value:'AdvancedMarkets-Demo'},{ value:'AdvancedMarkets-Live'},{ value:'AdvancedMarkets-Live1'},{ value:'AdvancedMarkets-Live2'},{ value:'AETOSAU-Live'},{ value:
    'AETOS-Demo'},{ value:"AETOS-Demo F"},{ value:"AETOS-Live"},{ value:"AETOS-LIVE F"},{ value:"AETOS-LIVE M"},{ value:"AETOSUK-Demo"},{ value:"AFB-Demo"},{ value:"AFBFX-Demo"},{ value:"AFBFX-Live"},{ value:"AFB-Server"},{ value:"AForex-Real"},{ value:
    "AFXCapital-Demo"},{ value:"AFXCapital-Real"},{ value:"AFX-Demo"},{ value:"AFX-Real"},{ value:"AGEA-Demo"},{ value:"AGEA-Live"},{ value:"AGMMarkets-Demo"},{ value:"AGMMarkets-Live"},{ value:"Aims-Demo"},{ value:"AIMS-Live Server"},{ value:
    "Aims-MetaTrader Live"},{ value:"AKFXFinancial-Demo-2"},{ value:"AKFXFinancial-Live-2"},{ value:"AKFXFinancial-Live-3"},{ value:"AKFXFinancial-Live-5"},{ value:"ALBForex-Demo_Server"},{ value:
    "ALB-REAL_SERVER"},{ value:"AlfaForex-Demo"},{ value:"AlfaForex-Real"},{ value:"AlfaForex-Server"},{ value:"AlgoCipher-Demo"},{ value:"AlgoCipher-Live"},{ value:"AlgoTrade-Main Server 1"},{ value:"AllyInvestForex-Demo(R)"},{ value:
    "AllyInvestForex-Live 7"},{ value:"ALNUSFX-DEMO"},{ value:"ALNUSFX-Live"},{ value:"Alpari-Classic"},{ value:"Alpari-Classic2"},{ value:"Alpari-Contest"},{ value:"Alpari-Demo"},{ value:"Alpari-Demo2"},{ value:"Alpari-ECN1"
    },{ value:"Alpari-ECN-Demo"},{ value:"Alpari-ECN-Live"},{ value:"Alpari-ECN-New"},{ value:"Alpari-ECN-Pro"},{ value:"AlpariFS-ECN"},{ value:"AlpariFS-ECN-Demo"},{ value:"AlpariFS-Standard"},{ value:"AlpariFS-Standard-Demo"},{ value:
    "Alpari-Int-Cent"},{ value:"Alpari-Int-ECN-Pro"},{ value:"Alpari-Int-Fix"},{ value:"Alpari-Int-Trade"},{ value:"AlpariJapan-Demo-1"},{ value:"AlpariJapan-Live-1"},{ value:"AlpariJapan-Pro"},{ value:"Alpari-Micro"
    },{ value:"Alpari-Micro2"},{ value:"Alpari-Micro3"},{ value:"Alpari-Nano"},{ value:"Alpari-NDD-Demo"},{ value:"Alpari-NDD-Live"},{ value:"Alpari-PRO"},{ value:"Alpari-Pro.ECN"},{ value:"Alpari-Pro.ECN-Demo"},{ value:"Alpari-Standard1"},{ value:
    "Alpari-Standard2"},{ value:"Alpari-Standard3"},{ value:"Alpari-Standard4"},{ value:"Alpari-Trade"},{ value:"AlphaJetFinancial-LIVE"},{ value:"ALTAIR-Live"},{ value:"AM_Australia-Demo"},{ value:"AM_Australia-Live"},{ value:"AmanaCapital-Demo"},{ value:
    "AmanaCapital-Real"},{ value:"AMarkets-Demo"},{ value:"AMarkets-Real"},{ value:"AM-Demo"},{ value:"AM-Demo2"},{ value:"Amenda-Demo"},{ value:"Amenda-Live2"},{ value:"AMFinancials-Demo"},{ value:"AMFinancials-Real"},{ value:"AM-Live"},{ value:"AM-Live2"},{ value:
    "AMPGlobalEU-DEMO"},{ value:"AMPGlobalEU-LIVE"},{ value:"AM-UK-Demo"},{ value:"AM-UK-Demo2"},{ value:"AM-UK-Live"},{ value:"AM-UK-Live2"},{ value:"AM-UK-Live3"},{ value:"AnzoCapital-Demo"},{ value:"AnzoCapital-Live"},{ value:"AORRLtd-Live"},{ value:"ApuroFX-London"},{ value:
    "ArcherConsultants-MetaTrader Live"},{ value:"ArenaForex-Demo"},{ value: "ArgusFX-Demo"},{ value:"ArgusFX-Live"},{ value:"Armada-DemoUK"},{ value:"Armada-Live"},{ value:"AssetsFx-Demo" 
    },{ value:"AssetsFx-Live"},{ value:"AtaForeks-Demo"},{ value:"AtaForeks-RealATA" },{ value:"ATCBrokers-Demo"  
    },{ value:"ATCBrokersLiq1-Demo"},{ value:"ATCBrokers-Live 1"},{ value:"ATCBrokers-UK Demo"},{ value:"ATCBrokers-UK Live"   
    },{ value:"ATCBrokers-US Demo"},{ value:"ATCBrokers-US Live"},{ value:"ATech-Demo"},{ value:"ATech-Live"},{ value:"ATFXGM1-Demo"    
    },{ value:"ATFXGM1-Live"},{ value:"ATFXGM2-Demo"},{ value:"ATFXGM2-Live" },{ value:"ATIG-Srv"},{ value:"Atiora-Live"},{ value:"Atiora-Server"  
    },{ value:"AtlanticPearl-Demo" },{ value:"AtlanticPearl-Live 1"},{ value:"AtlasCapital-Demo"},{ value:"AtlasCapital-Live"    
    },{ value:"Atom8-Demo"},{ value:"AudentiaCapital-Live" },{ value:"AuraFX-Demo"    
    },{ value:"AuraFX-LD Live"},{ value:"AuraFX-Live"},{ value:"AuraFX-Live-2"},{ value:"AuraFX-NY Live"},{ value:
    "AUSForex-Demo"},{ value:"AUSForex-Live"},{ value:"AUSForex-Live 2"},{ value:"Ava-AVA Demo"},{ value:
    "Ava-Demo" },{ value:"AvaFinancial-Demo"},{ value:"AvaFinancial-Real"},{ value:"Ava-Real"},{ value:
    "Ava-Real 1"},{ value:"Ava-Real 2"},{ value:"Ava-Real 3"},{ value:"Ava-Real 4"},{ value:"Ava-Real 5"},{ value:"AvaTrade-Real-Floating"},{ value:
    "AxioryAsia-01Demo"},{ value:"AxioryAsia-01Live"},{ value:"AxioryAsia-02Demo"},{ value:"AxioryAsia-02Live"},{ value:"AxioryAsia-03Live"
    },{ value:"AxioryAsia-04Live"},{ value:"Axiory-Demo"},{ value:"Axiory-Demo 1"},{ value:"AxioryEuro-01Demo"},{ value:"AxioryEuro-03Live"},{ value:"AxioryEuro-04Live"
    },{ value:"Axiory-Live"},{ value:"Axiory-Live 6"},{ value:"Axiory-Live2"},{ value:"AxioryMT4-Live"},{ value:"AxiTrader-AU01-Demo"},{ value:"AxiTrader-Demo"},{ value:
    "AxiTrader-Live"},{ value:"AxiTrader-US02-Live"},{ value:"AxiTrader-US03-Demo"},{ value:"AxiTrader-US03-Live"},{ value:"AxiTrader-US05-Live"},{ value:
    "AxiTrader-US06-Live"},{ value:"AxiTrader-US07-Live"},{ value:"AxiTrader-US08-Live"},{ value:"AxiTrader-US09-Live"},{ value:
    "AxiTrader-US888-Demo"},{ value:
    "AxiTrader-US888-Live"},{ value:"AxiTrader-US-Live-02"},{ value:"B.I.C.Markets-Demo"},{ value:"B.I.C.Markets-Live"},{ value:
    "BAXHoldings-Live"},{ value:"BDFX-Live"},{ value:
    "BDSSwissMarkets-Real01"},{ value:"BDSwiss-Demo01"},{ value:"BDSwissGlobal-Demo01"},{ value:"BDSwissGlobal-Real01"},{ value:
    "BDSwissGlobal-Real02"},{ value:"BDSwiss-Real01"},{ value:"BeidaJadeBirdGroupLtd-Demo" },{ value:"BeidaJadeBirdGroupLtd-Live"},{ value:
    "BELARTA-Demo"},{ value:"BELARTA-Live"},{ value:"Belfor-Demo"},{ value:"Belfor-Live"},{ value:"BenchMark-Demo"},{ value:"BenchMark-Real"},{ value:
    "BenefitZoneFX-Live"},{ value:
    "BerndaleCapital-DemoUK"},{ value:"BerndaleCapital-Live"},{ value:"BerndaleCapitalSecurities-Demo"},{ value:
    "BerndaleCapitalSecurities-Live"},{ value:
    "BerndaleGroup-Live"},{ value:"Bernstein-Bank-Demo"},{ value:"Bernstein-Bank-Live"},{ value:"BessTechnology-Live"},{ value:"Bestec-Demo"},{ value:
    "Bestec-Live"},{ value:"BetaMGM-Server"},{ value:"BFx-Live 8"},{ value:"BIC-Live"},{ value:"BirchwoodFx-Live 8"},{ value:"BIS-Demo"},{ value:"BISFX-Demo"},{ value:
    "BISFX-Live"},{ value:"BIS-Main"},{ value:"BlackBullMarkets-Demo"},{ value:"BlackBullMarkets-Live"},{ value:"BlackPearlFX-Demo"},{ value:
    "BlackPearlFX-Live"},{ value:
    "BlackridgeCapital-DemoUK"},{ value:"BlackridgeCapital-LiveUK"},{ value:"BlackRiverMarkets-Demo"},{ value:"BlackwellGlobal1-Demo5"},{ value:
    "BlackwellGlobal1-Live3"},{ value:"BlackwellGlobal1-Live5"},{ value:"BlackwellGlobal2-Demo3"},{ value:"BlackwellGlobal2-Live3"},{ value:
    "BlackwellGlobalCY-Demo"},{ value:"BlackwellGlobalCY-Live"},{ value:"BlackwellGlobalCY-Live2"},{ value:"BlackwellGlobal-Demo"},{ value:
    "BlackwellGlobal-Live"},{ value:"BlackwellGlobal-Live2"},{ value:"BlitzBrokers-Live"},{ value:"BlueberryMarkets2-Real2"},{ value:
    "BlueberryMarkets-Demo"},{ value:
    "BlueberryMarkets-Real"},{ value:"BlueMax-Live"},{ value:"BlueMountain-Live"},{ value:"BlueStarFX-Live"},{ value:"BlueStarFX-Live-2"},{ value:
    "BlueStarFX-Practice" },{ value:"BlueSuisse-Demo"},{ value:"BlueSuisse-Real"},{ value:"BMFN-Demo"},{ value:"BMFN-DemoCFD"},{ value:
    "BMFN-DMA"},{ value:"BMFN-DMADemo"},{ value:"BMFN-Real"},{ value:"BMFN-RealCFD"},{ value:"BossaFX-Demo"},{ value:"BossaFX-Real"},{ value:
    "BostonPrime-Live"},{ value:"BostonPrime-Live 7"},{ value:"BostonTechnologies-BT Japan"},{ value:"BPSCapital2-Live"},{ value:
    "BrightFX-Main"},{ value:"BrightWin-Demo"},{ value:"BrightWin-Primary"},{ value:"BriskLiquidity-Live"},{ value:"BroCo-Classic"},{ value:
    "BroCo-Demo"},{ value:"BroCoInvestments-Contest"},{ value:"BroCoInvestments-Scalper-Mini"},{ value:"Brokersclub-Live" },{ value:
    "BTC-eExchange-ECN Demo Server" },{ value:"BTC-eExchange-Real1"},{ value:"BuanaArtha-DEMO" },{ value:"BuanaArtha-LIVE" },{ value:
    "Butenix-Server"},{ value:"C7TradersClub-Capital7" },{ value:"CaesarEnterprise-Demo"},{ value:"CaesarEnterprise-Live"},{ value:
    "Cantor-CFE Demo"},{ value:"Cantor-Demo"},{ value:"Cantor-LIVE"},{ value:"CapitalCityMarkets-Demo"},{ value:"CapitalCityMarkets-Live"
    },{ value:"CapitalIndex-Demo"},{ value:"CapitalIndexGlobal-Demo"},{ value:"CapitalIndex-LD4"},{ value:"CapitalIndex-Live"},{ value:
    "CapitalIndexUK-Demo"},{ value:"CapitalIndexUK-Live"},{ value:"CapitalTrust-Demo"},{ value:"CapitalTrustFX-Demo"},{ value:
    "CapitalTrustFX-Live"},{ value:"CapitalTrust-Live"},{ value:"CapitalUnionGroup-MetaTrader Live"
    },{ value:"CapmarFX-Live"},{ value:"CapXM-Real"},{ value:"CardiffGlobalMarkets-Demo"},{ value:"CaxtonGlobal-Demo"},{ value:
    "CaxtonGlobal-Live"},{ value:"CCCUK-Live"},{ value:"CCF-Demo"},{ value:"CCFX-DemoUK"},{ value:"CCFX-LiveUK" },{ value:"CFHClearing-Demo" 
    },{ value:"CFHClearing-Live1"},{ value:"CFHMarkets-Demo"},{ value: "CFHMarkets-Live1"},{ value:"CFHMarkets-LM1"},{ value:"CFHMarkets-Real"},{ value:"CFIM-Server"},{ value:
    "CFMarketingGroup-Live"},{ value:"ChandonGroup-Server"},{ value:"CharlesFX-Demo-1"},{ value:"CharlesFX-Live-2"},{ value:"CharlesFX-Live-3"},{ value:
    "CharlesFX-Standard"},{ value:"CharterprimeAU-Live"},{ value:"Charterprime-Demo"},{ value:"Charterprime-Live"},{ value:
    "CircleMarkets-Demo"},{ value:"CircleMarkets-Live2" },{ value:"CitiFX-Demo2"},{ value:"CitiFX-Live"},{ value:"CityIndex-Live"},{ value:
    "CityIndexSG-Demo 106"},{ value:"CityIndexSG-Live 107" },{ value:"ClearMarkets-Demo" },{ value:"ClearMarkets-Live"},{ value:
    "CLMarkets-Trading"},{ value:"CMAP-Demo"},{ value:"CMAP-Real" },{ value:"CMCMarkets1-Canada" },{ value:"CMCMarkets1-Demo"},{ value:
    "CMCMarkets1-Europe"},{ value:"CMCMarkets1-Live"},{ value:"CMCMarkets1-Singapore"},{ value:"CMGAustraliaPtyLtd-US03-Demo"},{ value:
    "CMGAustraliaPtyLtd-US10-Live"},{ value:"CMGAustralia-Real"},{ value:"CMI-Live" },{ value:"CMSFX-Demo" },{ value:"CMTrading-Live"},{ value:
    "CNS-Live"},{ value:"COFX-Demo"},{ value:"COFX-Real"},{ value:"Coinexx-Demo"},{ value:"Coinexx-Live" },{ value:"CollectiveFX-Demo" },{ value:
    "CollectiveFX-DEMO1"},{ value:"CollectiveFX-LIVE1"},{ value:"ColmexFX-Demo"},{ value:"ColmexFX-Live"},{ value:
    "CommexFX-Demo"},{ value:"CommexFX-Real"},{ value:"ConcordBay-DemoUK"},{ value:"ContiFX-CFX" },{ value:"CoreLiquidity-Demo" },{ value:
    "CoreLiquidityMarkets-Live 2"},{ value:"CoreLiquidity-Real 1"},{ value:"CoreLiquidity-Real 2" },{ value:"CoreSpreads-DemoBravo"},{ value:
    "CoreSpreads-LiveBravo"},{ value:"CrescoCapitalMarkets-DemoUK" },{ value:"CrescoCapitalMarkets-LiveUK"},{ value:
    "CrescoFX-Demo" },{ value:"CrescoFX-Live" },{ value:"CrescoFX-Malta-DemoUS" },{ value:"CrescoFX-Malta-LiveUS"},{ value:
    "CTFC-Real"},{ value:"Darwinex-Demo"},{ value:"Darwinex-Live"},{ value:"DawedaLimited-Live"},{ value:"DCFxBroker-Demo"},{ value:"DCFxBroker-Live" 
    },{ value:"DCMDirect-DemoUK"},{ value:"DCMDirect-LiveUK"},{ value:"DCMForex-Demo"},{ value:"DCMForex-Live"},{ value:"Deltastock-Demo"},{ value:
    "Deltastock-Live" },{ value:"DenizFX-DEMO"},{ value:"DenizFX-Live"},{ value:"DestekFX-Demo"},{ value:"DestekFX-Trade"},{ value:"DestekMarkets-Demo"
    },{ value:"DestekMarkets-Live"},{ value:"DeutscheTrading-Live"},{ value:"DFMarkets-Demo"},{ value:"DFMarkets-Live"},{ value:"DirectaSIM-Live"
    },{ value:"DirectFX-Demo" },{ value:"DirectFX-Live"},{ value:"DirectMarkets-Demo"},{ value:"DirectMarkets-Live"},{ value:
    "Divisa-Demo" },{ value:"Divisa-Live"},{ value:"DMABrokers-Live5"},{ value:"DMF-Demo"},{ value:"DMF-Server"},{ value:"DMI-Demo" },{ value:
    "DMI-Live"},{ value:"DMI-Live2" },{ value:"DMI-Test Server" },{ value:"DMI-TestLab88" },{ value:"DMMFXAU-Demo" },{ value:"DMMFXAU-Main"
    },{ value:"DooHolding-Live 2"},{ value:"Dukascopy-demo-1"},{ value:"Dukascopy-live-1" 
    },{ value:"EACHMARKETS-Demo" },{ value:"EACHMARKETS-Live" },{ value:"EagleFX-Demo" 
    },{ value:"EagleFX-Live"},{ value:"Eanree-Real"},{ value:"EasyForex-Demo"},{ value:
    "EasyForex-Live" },{ value:"ECNAlpha-Demo" },{ value:"ECNAlpha-LIVE"},{ value:"ECNTrade-Demo"
    },{ value:"ECNTrade-Live" },{ value:"EGlobal-Cent1"},{ value:"EGlobal-Cent2" },{ value:
    "EGlobal-Cent3"},{ value:"EGlobal-Cent4" },{ value:"EGlobal-Cent5" },{ value:"EGlobal-Cent6"
    },{ value:"EGlobal-Cent7" },{ value:"EGlobal-Cent8"},{ value:"EGlobal-Classic1" 
    },{ value:"EGlobal-Classic2"},{ value:"EGlobal-Classic3"},{ value:
    "EGlobal-Demo"},{ value:"EGlobal-PAMM" },{ value:"EGlobal-Pro" },{ value:
    "EGMSecurities-Demo"},{ value:"EGMSecurities-Live" },{ value:"Eightcap-Demo" },{ value:
    "Eightcap-Real"},{ value:"EliteTechnology-Live" },{ value:"EliteTechnology-Live 2"},{ value:"EliteTrader-Live"},{ value:
    "Enfinium-Demo"},{ value:
    "Enfinium-Live" },{ value:"Equilor-MT4-ID01"},{ value:"Equilor-MT4-IS02"},{ value:"Equilor-MT4-IS04"},{ value:
    "EquitiCapitalUK-Demo"},{ value:"Equiti-Demo"},{ value:"EquitiGroup-Demo"},{ value:"EquitiGroup-Live"},{ value:"EquitiGroupLtd-Demo"},{ value:"Equiti-Live"},{ value:
    "EquitiUS-Live" },{ value:"Esplanade-Live"},{ value:"EssenceMillennium-Demo"},{ value:"EssenceMillennium-Live"},{ value:"Esteem-Demo"},{ value:
    "Esteem-Real"},{ value:"ETFinance-Demo"},{ value:"ET-Main"},{ value:"ETXCapital-Demo Server"},{ value:"ETXCapital-Live Server"},{ value:
    "ETXCapital-Live2 Server"},{ value:"EUBrokerageHouse-Pro Live"},{ value:"Euromaxfx-Main"},{ value:"EuropeFX1-Demo"},{ value:
    "EuropeFX1-Live"},{ value:"EverFX1-Demo1"},{ value:"EverFX1-Real1"},{ value:"EVERFX-Demo1"},{ value:"EvolveMarkets-MT4 Demo Server"},{ value:"EvolveMarkets-MT4 Live Server"},{ value:
    "Excel-Demo"},{ value:"Excel-Live"},{ value:"ExcelMarketsNZ-Demo"},{ value:"Exness-Real"},{ value:"Exness-Real10"},{ value:"Exness-Real11"},{ value:"Exness-Real2"},{ value:"Exness-Real3"  
    },{ value:"Exness-Real4"},{ value:"Exness-Real5"},{ value:"Exness-Real6"},{ value:"Exness-Real7"},{ value:"Exness-Real8"},{ value:"Exness-Real9"},{ value:"Exness-Trial"},{ value:"Exness-Trial2"},{ value:
    "Exness-Trial5"},{ value:"EZINVEST-Live"},{ value:"FACGlobalLimited-Live"},{ value:"FBForexBrokerInc-Demo"},{ value:"FBPLimited-Demo"},{ value:"FBPLimited-Live"},{ value:
    "FBS-Demo"},{ value:"FBS-Real"},{ value:"FBS-Real-1"},{ value:"FBS-Real-10"},{ value:"FBS-Real-2"},{ value:"FBS-Real-3"},{ value:"FBS-Real-4"},{ value:"FBS-Real-5"},{ value:"FBS-Real-6"},{ value:"FBS-Real-7"},{ value:
    "FBS-Real-8"},{ value:"FBS-Real-9"},{ value:"FBS-Real-Micro-Cent"},{ value:"FCMCY-Live"},{ value:"FCTFLAND-Server"},{ value:"FECH-Demo"},{ value:"FECH-Server"},{ value:
    "FFTraderSRO-Demo"},{ value:"FIBO-FIBO Group MT4 Demo Server"},{ value:"FIBO-FIBO Group MT4 Real (CENT)"},{ value:
    "FIBO-FIBO Group MT4 Real Server"},{ value:"FIBO-FIBO Group MT4 Real Server 2"},{ value:"FIBOGroup-DEMO FIBO Group Holdings Ltd" },{ value:
    "FIBOGroup-FIBO GROUP HOLDINGS LTD REAL"},{ value:"FIBOGroup-REAL FIBO Group Holdings Ltd" },{ value:"FidelisCapitalMarkets-Demo"},{ value:
    "FidelisCapitalMarkets-Live" },{ value:"FideliscmCyprus-Live"},{ value:"FidelisCM-Demo"},{ value:"FidelisCM-Live"},{ value:"FidelisCM-Real1" },{ value:
    "FidelisCM-Real2" },{ value:"FidelityAsiaBank-LiveUK"},{ value:"FienexGroup-Demo Server" },{ value:"FienexGroup-Real Server" },{ value:"FIGSolutions-Server"},{ value:
    "FINAM-Demo" },{ value:"FinansOnlineFX-Demo"},{ value:"FinansOnlineFX-Live"},{ value:"Finex-Live" },{ value:"Finexo-Live."},{ value:"Finexo-Real"},{ value:"FinFx Trading O-Live" },{ value:
    "FinFX.com-Demo" },{ value:"FinFX.com-Live"},{ value:"FinFX-Demo" },{ value:"FinFX-Live"},{ value:"FinFX-Managed Live"},{ value:"FinFX-PRO Live"},{ value:"FinotecFX-Live"},{ value:
    "FinproHoldings-Live" },{ value:"FinsaPty-DemoBravo" },{ value:"FinsaPty-LiveBravo"},{ value:"FintecGlobalMarkets-Real"},{ value:"FirewoodFX-Main" },{ value:
    "Firewood-LiveUS"},{ value:"FixiMarkets-Demo" },{ value:"FixiMarkets-Live"},{ value:"flatexAG-FX Server" },{ value:"FlatexGmbH-DemoServer"},{ value:
    "FN-US02-Live" },{ value:"FN-US03-Demo"},{ value:"FN-US05-Live"},{ value:"FOG-Pacific"},{ value:"FOG-Server"},{ value:"ForeignExchangeClearingHouse-Live"},{ value:
    "Foreksyoner-Tera Menkul Degerler A.S."},{ value:"Forex Capital M-Demo"},{ value:"FOREX.comCA-Live 11"},{ value:"Forex.com-Demo 106"},{ value:"Forex.com-Demo 3"},{ value:"Forex.com-Demo 5"},{ value:"Forex.com-Demo(I)"},{ value:
    "Forex.com-Demo(R)"},{ value:"FOREX.comGlobal-Live 117" },{ value:"FOREX.comJapan-Live 12"},{ value:"FOREX.comJapan-Live 8" },{ value:"Forex.com-Live 1"},{ value:"Forex.com-Live 120"},{ value:"Forex.com-Live 121"},{ value:"Forex.com-Live 122"},{ value:
    "Forex.com-Live 123" },{ value:"Forex.com-Live 124"},{ value:"Forex.com-Live 125"},{ value:"Forex.com-Live 17"},{ value:"Forex.com-Live 2"},{ value:"Forex.com-Live 22"},{ value:"Forex.com-Live 23"},{ value:"Forex.com-Live 24"},{ value:
    "Forex.com-Live 3"},{ value:"Forex.com-Live 5"},{ value:"Forex.com-Live 6"},{ value:"Forex.com-Live 7"},{ value:"Forex.comUK-Demo 5"},{ value:"Forex.comUK-Demo(R)"},{ value:"Forex.comUK-Live(R)"},{ value:"Forex.comUKLtd-Demo 3"},{ value:"ForexBrokerInc-Demo"},{ value:
    "ForexBrokerInc-Main" },{ value:"ForexChief-Classic" },{ value:"ForexChief-DirectFX" },{ value:"ForexClubBY-MT4 Market Demo Server"},{ value:"ForexClubBY-MT4 Market Real 2 Server" },{ value:"ForexClubCIF-MT4 Real Server"},{ value:"ForexClub-MT4 Demo Server" },{ value:
    "ForexClub-MT4 Market Demo Server"},{ value:"ForexClub-MT4 Market Real Server" },{ value:"ForexClub-MT4 MoneyManager Server" },{ value:"ForexClub-MT4 Real 2 Server" },{ value:"ForexClub-MT4 Real Server"},{ value:"ForexMart-DemoServer"},{ value:
    "ForexMart-RealServer" },{ value:"ForexPlace-Demo Server" },{ value:"ForexPlace-Main Server" },{ value:"ForexPlace-Main Server 2" },{ value:"ForexPlace-Main Server 3"},{ value:"FOREX-Server"},{ value:"ForexServer-Real"},{ value:"Forexstart-Demo"},{ value:"Forexstart-Real"},{ value:
    "ForexTime-Amanah" },{ value:"ForexTime-Cent"},{ value:"ForexTime-Cent-demo" },{ value:"ForexTime-ECN" },{ value:"ForexTime-ECN-demo"},{ value:"ForexTime-ECN-Zero"},{ value:"ForexTime-ECN-Zero-demo"},{ value:"ForexTimeFXTM-Cent"},{ value:"ForexTimeFXTM-Cent-demo"},{ value:"ForexTimeFXTM-ECN"},{ value:"ForexTimeFXTM-ECN-demo"},{ value:"ForexTimeFXTM-ECN-Zero"},{ value:
    "ForexTimeFXTM-ECN-Zero-demo"},{ value:"ForexTimeFXTM-Pro" },{ value:"ForexTimeFXTM-Standard" },{ value:"ForexTimeFXTM-Standard-demo"},{ value:"ForexTimeNZ-ECN2"},{ value:"ForexTimeNZ-ECN-Demo2"},{ value:"ForexTimeNZ-Standard2"},{ value:"ForexTimeNZ-Standard-Demo2"},{ value:"ForexTime-Pro" },{ value:"ForexTime-Standard"},{ value:"ForexTime-Standard-demo"},{ value:"ForexTrading-Demo"},{ value:"ForexTrading-Live" 
    },{ value:"FormaxPrime-Demo"},{ value:"FormaxPrime-Live"},{ value: "FortFS-Demo"},{ value:"FortFS-Real"},{ value:"ForTrade-Demo01"},{ value:"ForTrade-Real01"},{ value:"FPMarkets-Demo"},{ value:"FPMarkets-Live"},{ value:"FreshForex-Real"},{ value:"FSDClearing-Live"},{ value:"FTD-MT4 Demo Server"},{ value:"FTD-MT4 Live Server" },{ value:"FTD-MT4 Live Server 3"},{ value:"FTD-MT4 Live Server 4" },{ value:"FTD-MT4 Live Server 6"},{ value:
    "FTT-Demo"},{ value:"FTT-Live"},{ value:"FTT-Live2"},{ value:"FullertonMarkets-Demo" },{ value:"FullertonMarkets-Live"},{ value:"FusionMarkets-Demo" },{ value:"FusionMarkets-Live" },{ value:"FXAsia-Demo"},{ value:"FXAsia-Live" },{ value:"FXcarat-Server" },{ value:"FXcast-NEXTT"},{ value:"FXCC1-Demo"},{ value:"FXCC1-Live"},{ value:
    "FXCC-Demo"},{ value:"FXCC-Live" },{ value:"FxCentral-Live"},{ value:"FxCentral-server"},{ value:"FxCentral-spreads" },{ value:"FXCESS-CT01"},{ value:"FXCH-Demo"},{ value:"FXCH-Live" },{ value:"FXChoice-Classic Demo" },{ value:"FXChoice-Classic Live"},{ value:"FXChoice-FX Choice MT4" },{ value:"FXChoice-Pro Demo"},{ value:
    "FXChoice-Pro Live"},{ value:"FxClearing-Demo"},{ value:"FxClearing-Main"},{ value:"FxClearing-Main2" },{ value:"FXCL-Main2"},{ value:"FXCM-AUDDemo01"},{ value:"FXCM-AUDReal01" },{ value:"FXCM-CADReal01"},{ value:"FXCM-Demo1" },{ value:"FXCM-EURDemo01" },{ value:"FXCM-EURReal01"},{ value:"FXCM-GBPDemo01" },{ value:"FXCM-GBPReal01"},{ value:
    "FXCM-JPYDemo01"},{ value:"FXCM-JPYReal01"},{ value:"FXCM-JPYReal02"},{ value:"FXCM-Live" },{ value:"FXCM-MT4-2.0-USDReal03"},{ value:"FXCM-Powered by BT"},{ value:"FXCM-Real"},{ value:"FXCM-Real2"},{ value:"FXCMSB-GBPDemo01" },{ value:"FXCMSB-GBPReal01"},{ value:"FXCMSpreadBetting-EURReal01"},{ value:"FXCMSpreadBetting-GBPReal01"},{ value:
    "FXCM-USDDemo01"},{ value:"FXCM-USDDemo02"},{ value:"FXCM-USDReal01"},{ value:"FXCM-USDReal02" },{ value:"FXCM-USDReal03"},{ value:"FXCM-USDReal04"},{ value:"FXCM-USDReal05"},{ value:"FXCM-USDReal07"},{ value:"FXCM-USDReal08"},{ value:"FXCM-USDReal09" },{ value:"FXDDMalta-MT4 Demo Server 2"},{ value:"FXDDMalta-MT4 Live Server"},{ value:"FXDDMalta-MT4 Live Server 2"},{ value:
    "FXDDMalta-MT4 Live Server 3"},{ value:"FXDDMalta-MT4 Live Server 4"},{ value:"FXDDMalta-MT4 Live Server 5" },{ value:"FXDDMalta-MT4 Live Server 6" },{ value:"FXDDMalta-MT4 Live Server 7"},{ value:"FXDD-MT4 Demo Server"},{ value:"FXDD-MT4 Demo Server 2"},{ value:"FXDD-MT4 Live Server"},{ value:"FXDD-MT4 Live Server 2" },{ value:"FXDD-MT4 Live Server 3"},{ value:
    "FXDD-MT4 Live Server 4" },{ value:"FXDD-MT4 Live Server 5"},{ value:"FXDD-MT4 Live Server 6" },{ value:"FXDD-MT4 Live Server 7" },{ value:"FXEDGE-DEMO" },{ value:"FXEDGE-LIVE"},{ value:"FxEthos-Live"},{ value:"FXFinPro-Real"},{ value:"FXFlatMT4-DemoServer" },{ value:"FXFlatMT4-LiveServer"},{ value:"FXFS-Demo Server" },{ value:"FXFS-Main Server"},{ value:"FXGiantsUK-Real4" },{ value:"FXGiantsUK-Real8"}
    ,{ value:"Fxglobe-Demo"},{ value:"Fxglobe-Real"},{ value:"FXGlory-Demo Server"},{ value:"FXGlory-Real Server"},{ value:"FxGrow-Demo"},{ value:"FxGrow-Live"}
    ,{ value:"FXLider-Demo01"},{ value:"FxMars-Demo"},{ value:"FXNEXTGLOBAL-DemoUK"},{ value:"FXNEXTGLOBAL-LiveUK"},{ value:"FXOpenAU-ECN Demo Server"},
    { value:"FXOpenAU-ECN Live Server"},{ value:"FXOpen-Competition"},{ value:"FXOpen-Demo" },{ value:"FXOpen-Demo STP"},{ value:
    "FXOpen-ECN Demo Server" },{ value:"FXOpen-ECN Live Server" },{ value:"FXOpen-Real1"},{ value:"FXOpen-Real2"},{ value:
    "FXOpen-Real3"},{ value:"FXOpenUK-Demo STP" },{ value:"FXOpenUK-ECN Demo Server" },{ value:"FXOpenUK-ECN Live Server"},{ value:
    "FXOPTIMAX-LiveUS"},{ value:"FXPIG-Demo"},{ value:"FXPIGECN-ECN Demo Server"},{ value:"FXPIGECN-ECN Live Server"},{ value:
    "FXPIG-LD4 LIVE"},{ value:"FXPIG-Live" },{ value:"FXPIG-LIVE"},{ value:"FXPIG-NY7 DEMO"},{ value:"FXPremax-Real2"},{ value:"FXPRIMUS-Live"},{ value:
    "FXPRIMUS-Live-2"},{ value:"FXPRIMUS-Live-3"},{ value:"FXPRIMUS-Practice"},{ value:"FXPrimus-Real"},{ value:"FxPro.com-Demo01"},{ value:
    "FxPro.com-Demo02"},{ value:"FxPro.com-Demo03"},{ value:"FxPro.com-Demo04"},{ value:"FxPro.com-Demo04FixedSpread"},{ value:
    "FxPro.com-Demo05"},{ value:"FxPro.com-Demo06" },{ value:"FxPro.com-Real01" },{ value:"FxPro.com-Real02"},{ value:"FxPro.com-Real03"},{ value:
    "FxPro.com-Real04"},{ value:"FxPro.com-Real05"},{ value:"FxPro.com-Real06"},{ value:"FxPro.com-Real07"},{ value:"FXSalt-Demo"},{ value:
    "FXSALT-DemoUS"},{ value:"FXSALT-LiveUS"},{ value:"FXSalt-Real"},{ value:"FXSolutionsAustralia-Demo Server"},{ value:
    "FXSolutionsAustralia-Real Server"},{ value:"FXSolutions-Demo Server"},{ value:"FXSolutions-Real Server"},{ value:
    "FXSolutionsUK-Demo Server"},{ value:"FXSolutionsUK-Real Server"},{ value:"FXstart-Demo"},{ value:
    "FXstart-Real"},{ value:"FXSystems-Demo"},{ value:"FXSystems-Live"},{ value:"FXTCR-Demo"},{ value:"FXTCR-Live"},{ value:   
    "FXTG-Main Server 1"},{ value:"FXTrade-Demo FXTF"},{ value:"FXTrade-Live FXTF"},{ value:"FXTRADING.com-Live"},{ value:"FxUnited-Demo"},{ value:
    "FxUnited-Live"},{ value:
    "FXUPME-Server"},{ value:"GAINCapitalJapan-Demo 104"},{ value:"GAINSY-Demo"},{ value:"GAINSY-Real"},{ value:"Gamma-Server"},{ value:
    "GanaTraderIntelliSystem3-Demo"},{ value:
    "GarudaBerjangka-Demo"},{ value:"Garuda-Demo"},{ value:"Garuda-Live"},{ value:"GBEbrokers-Demo"},{ value:"GBEbrokers-Live"},{ value:
    "GCG-Demo"},{ value:"GCG-Server"},{ value:"GCI-Demo"},{ value:
    "GCIFinancial-Demo"},{ value:"GCIFinancial-Live"},{ value:"GCI-Live"},{ value:"GCM-Demo"},{ value:"GCMFX-Demo"},{ value:"GCMFX-Live"},{ value:
    "GCMFX-Server"},{ value:"GCM-Real"},{ value:"GDMFXAustralia-Live"},{ value:"GDMFX-Demo"},{ value:"GDMFX-Live"},{ value:"GedikForex-Demo"},{ value:
    "GedikForex-Live" },{ value:"GelkoPartners-Real2"},{ value:"GemTrade-Demo"},{ value:"GemTrade-Live"},{ value:"GemTrade-Live2" },{ value:
    "GenesisBusinessGroup-Demo"},{ value:"GenesisBusinessGroup-Live"},{ value:"GerchikCo-Demo"},{ value:"GerchikCo-Live"},{ value:
    "GFTForex-Demo"},{ value:"GFTForex-Server"},{ value:"GhanaFX-Demo"},{ value:"GhanaFX-Main"},{ value:"GIFX-Live"},{ value:"GIO-Live"},{ value:
    "GKFX-Demo-1" },{ value:"GKFX-Demo-2"},{ value:"GKFX-Live-1"},{ value:"GKFX-Live-2"},{ value:"GKFX-Live-3"},{ value:"GKFX-Live-4"},{ value:"GKFX-Live-5"},{ value:
    "GKFXPrime-Demo-1" },{ value:
    "GKFXPrime-Live-1" },{ value:"GKFXPrime-Live-1.2" },{ value:"GKFXPrime-Live-1.3" },{ value:"GKFXPrime-Live-1.4" },{ value:"GKFX-SB-1" },{ value:
    "GKFX-SB-2"},{ value:"GKGoh-Demo" },{ value:"GKGoh-Live 1" },{ value:"GlobalClearingGroup-Demo" 
    },{ value:"GlobalClearingGroup-Live" },{ value:"GlobalFX-Server" 
    },{ value:"GlobalHoldings-Real" },{ value:"GlobalPrime-Demo" },{ value:
    "GlobalPrime-Live" },{ value:"Globtrex-Live03" },{ value:"GMIEdge-Demo01"},{ value:
    "GMIEdge-Live01" },{ value:"GMIEdge-Live02"},{ value:"GMIEdge-Live05" },{ value:
    "GMI-Live03"},{ value:"Go Markets Pty -Demo" },{ value:"GO4X-Demo"},{ value:"GO4X-Live" 
    },{ value:"Goldboro-Demo"},{ value:"Goldboro-Real"},{ value:"Gold-Demo" },{ value:"GoldenVIP-Live2" 
    },{ value:"GoldFX-Live" },{ value:"Gold-Live"},{ value:"Goldrockfx-Demo" },{ value:"Goldrockfx-Live"
    },{ value:"GoldsteinBrokers-Demo 1" },{ value:"GoldsteinBrokers-Live" },{ value:
    "Goldstone-Demo"},{ value:"Goldstone-Live" },{ value:"GoMarkets-Demo"},{ value:"GoMarkets-Live UK"
    },{ value:"GoMarkets-Real"},{ value:"GoMarkets-Real 1"},{ value:"GoMarkets-Real 2"},{ value:
    "GoMarkets-Real 3" },{ value:"GoMarkets-Real 8" },{ value:"GoodStep-Demo"},{ value:"GoodStep-Real"},{ value:
    "GotMoneyFX-MT4-IM01"},{ value:"GotMoneyFX-MT4-IS01"},{ value:"GotMoneyFX-VIP"},{ value:"GrandCapital-Demo"},{ value:
    "GrandCapital-Server"},{ value:"GrandInvesting-Demo"},{ value:"GrandInvesting-Live"},{ value:"GrintaInvest-Demo"},{ value:
    "GrintaInvest-Live"},{ value:"GrowBrokers-Demo"},{ value:"GTHFX-LIVE"},{ value:"GTLAustralia-Server"},{ value:"Halifax-Live 1" },{ value:
    "HalifaxPro-Demo"},{ value:"HalifaxPro-Live" },{ value:"Hangsiu-Live"},{ value:"Hankotrade-Demo"},{ value:"Hankotrade-Live"},{ value:
    "HanseaticBrokerhouse-Demo"},{ value:"HanseaticBrokerhouse-Live"},{ value:"HantecGlobal-Live"},{ value:"HantecMarkets-Demo" },{ value:
    "HantecMarkets-Main"},{ value:"HantecMarkets-Server1"},{ value:"HantecMarkets-Server2"},{ value:"HantecNZ-S3-Demo"},{ value:"HantecNZ-S3-Main"},{ value:"HBS-CFD-Server"},{ value:
    "Hedefonline-Demo"},{ value:"Hedefonline-Real"},{ value:"Hedge4x-AsiaPac Demo"},{ value:"Hedge4x-Live"},{ value:"Henyep-Demo"},{ value:"Henyep-DemoEU"},{ value:
    "Henyep-Live"},{ value:"HermesMarket-LIVE"},{ value:"HFMarkets-Demo Server"},{ value:"HFMarketsEurope-Demo Server"},{ value:"HFMarketsEurope-Demo Server 2"
    },{ value:"HFMarketsEurope-Live Server"},{ value:"HFMarketsEurope-Live Server2"},{ value:"HFMarkets-Live Server"},{ value:"HFMarkets-Live Server2"
    },{ value:"HFMarkets-Real" },{ value:"HFMarketsSA-Demo Server"},{ value:"HFMarketsSA-Live Server"},{ value:"HFMarketsSA-Live Server 3"},{ value:
    "HFMarketsSA-Live Server 4" },{ value:"HFMarketsSA-Live Server 5" },{ value:"HFMarketsSC-Demo Server"},{ value:"HFMarketsSC-Live Server"},{ value:"HFMarketsSC-Live Server 3"},{ value:
    "HFMarketsSC-Live Server 4" },{ value:"HFMarketsSC-Live Server 5"},{ value:"HFMarketsSC-Live Server 6"},{ value:"HFMarketsSV-Demo Server"},{ value:
    "HFMarketsSV-Live Server"},{ value:"HFMarketsSV-Live Server 3" },{ value:"HFMarketsSV-Live Server 4" },{ value:"HFMarketsSV-Live Server 5" },{ value:
    "HFMarketsSV-Live Server 6"},{ value:"HFMarketsSV-Live Server2"},{ value:"HiroseFinancialLtd-MT4Live1"},{ value:"HiroseFinancialUK-MT4Live1"},{ value:"HiWayFx-Real01"},{ value:"HLL-Live"},{ value:"HoliwayInvestments-LD Live"},{ value:"HoliwayInvestments-NY Live"},{ value:"HugosWay-Demo3"},{ value:"HugosWay-Real3"   
    },{ value:"HVMarkets-Demo"},{ value:"HVMarkets-Live03"},{ value:"Hydra-Demo"},{ value:"Hydra-ECN Live"},{ value:"HydraMarkets-Live"},{ value:"IamFX-Demo"},{ value:"IamFX-Demo2"},{ value:"IamFX-Live"},{ value:
    "IamFX-Live2"},{ value:"IBCfx-Real"},{ value:"iBiz-Live"},{ value:"iBrokers.trade-Server"},{ value:"IceFX-Server"},{ value:"ICGlobal-Live"},{ value:"ICMarkets-Demo01"},{ value:"ICMarkets-Demo02"},{ value:"ICMarkets-Demo03"},{ value:"ICMarketsEU-Demo03"},{ value:"ICMarketsEU-Live05" },{ value:"ICMarkets-Live01"},{ value:
    "ICMarkets-Live02" },{ value:"ICMarkets-Live03" },{ value:"ICMarkets-Live04" },{ value:"ICMarkets-Live05" },{ value:"ICMarkets-Live06" },{ value:
    "ICMarkets-Live07"},{ value:"ICMarkets-Live08" },{ value:"ICMarkets-Live09" },{ value:"ICMarkets-Live10" },{ value:"ICMarkets-Live11" },{ value:
    "ICMarkets-Live12" },{ value:"ICMarkets-Live14" },{ value:"ICMarkets-Live15" },{ value:"ICMarkets-Live16" },{ value:"ICMarkets-Live17"},{ value:"ICMarkets-Live18"},{ value:
    "ICMarkets-Live19" },{ value:"ICMarkets-Live20" },{ value:"ICMarkets-Live22" },{ value:
    "ICMarketsSC-Demo01" },{ value:"ICMarketsSC-Demo02"},{ value:"ICMarketsSC-Demo03"
    },{ value:"ICMarketsSC-Live02" },{ value:"ICMarketsSC-Live03"},{ value:
    "ICMarketsSC-Live04"},{ value:"ICMarketsSC-Live05" },{ value:"ICMarketsSC-Live09"
    },{ value:"ICMarketsSC-Live10"},{ value:"ICMarketsSC-Live12"},{ value:
    "ICMarketsSC-Live14" },{ value:"ICMarketsSC-Live16" },{ value:"ICMarketsSC-Live17"
    },{ value:"ICMarketsSC-Live18" },{ value:"ICMarketsSC-Live19"},{ value:
    "ICMarketsSC-Live20" },{ value:"ICMarketsSC-Live22" },{ value:"ICMBrokers-Demo" 
    },{ value:"ICMBrokers-Live" },{ value:"ICMCapital-Demo"},{ value:"ICMCapital-Real"
    },{ value:"ICMCapitalVC-Demo" },{ value:"ICMCapitalVC-LIVE" },{ value:
    "ICMTrader-LIVE"},{ value:"IFCMarkets-Demo" },{ value:"IFCMarkets-Real" },{ value:
    "IFGM-Demo" },{ value:"IFGM-Live"},{ value:"IFMTrade-Demo"},{ value:"IFMTrade-Live"},{ value:
    "IFSMarketsLimited-Main Server" },{ value:"IFSMarkets-Main Server" 
    },{ value:"IFXBrokers-Demo"},{ value:"IFXBrokers-Live" },{ value:
    "IFX-Demo"},{ value:"IFX-Live"},{ value:"IG-DEMO"},{ value:"IG-LIVE"},{ value:"IGOFX-Demo"},{ value:
    "IGOFX-Live"},{ value:"IKOfx-Demo"},{ value:"IKOfx-Main"},{ value:"IKONGROUPCORP-Real"
    },{ value:"IkonGroup-Demo" },{ value:"IkonGroup-Demo 2" },{ value:
    "IkonGroup-Live" },{ value:"IkonGroup-Live 2" },{ value:"IKTrust-Live"},{ value:
    "ILQAu1-A1 Live"},{ value:"ILQAu1-ILQ Australia 1 (lots)"},{ value:
    "ILQAu2-ILQ Australia 2 (notional)"},{ value:"ILQAu-A1 Live"},{ value:
    "ILQAu-A2 Live"},{ value:"ILQAU-ILQ Australia 1 (lots)"},{ value:
    "ILQAU-ILQ Australia demo 1 (lots)"},{ value:"ILQ-M1 Live"},{ value:
    "ILQ-M2 Live"},{ value:"imdFX-Demo"},{ value:"imdFX-Main"},{ value:"IMMFX-Real"},{ value:
    "InArabiaFX-Live"},{ value:"InArabiaFX-X-Demo"},{ value:"IncoNeon-Demo"},{ value:
    "IncoNeon-Real"},{ value:"IndigoDMA-Demo"},{ value:"IndigoDMA-Live"},{ value:
    "InfinoxCapital-DemoBHS"},{ value:"InfinoxCapital-InfinoxBHS1"},{ value:
    "InfinoxCapitalLimited-Demo" },{ value:"InfinoxCapitalLimited-InfinoxUK" 
    },{ value:"InfinoxCapitalLimited-InfinoxUK2"},{ value:
    "InfinoxCapitalLimited-Live04"},{ value:"InfinoxCapital-Live03"},{ value:"InfinoxCapital-Live05"
    },{ value:"IngotBrokers-Server" },{ value:"InstaForex-1Contest.com" 
    },{ value:"InstaForex-1Demo.com"},{ value:"InstaForex-Demo.com" 
    },{ value:"InstaForex-Europe.com" },{ value:"InstaForex-HongKong.com" 
    },{ value:"InstaForex-Singapore.com" },{ value:"InstaForex-UK.com"
    },{ value:"InstaForex-USA.com" },{ value:"InstaForex-USA2.com" },{ value:
    "Integral-AsiaPac Demo" },{ value:"IntegralFX-MetaServer(Main)" },{ value:
    "Integral-Live" },{ value:"Integral-Universal-FX ECN Live"},{ value:
    "Intell-US01-Demo" },{ value:"Intell-US02-Live" },{ value:"Intell-US05-Live"
    },{ value:"InternationalFXBrokers-Demo"},{ value:"InternationalFXBrokers-Real" 
    },{ value:"InterTrader-Demo" },{ value:"InterTrader-InterTraderDirect-Demo"
    },{ value:"InterTrader-InterTraderDirect-Live"},{ value:"InterTrader-Live"},{ value:
    "InterTrader-Live Pro"},{ value:"INTFX-Demo" },{ value:"INTFX-Live"},{ value:"IntlMitraFutures-Demo"
    },{ value:"InvastGlobal-Demo"},{ value:"InvastGlobal-Live"},{ value:
    "InvestAZ-DEMO"},{ value:"InvestAZ-REAL"},{ value:"InvestAZ-REAL-Turkey"},{ value:
    "InvestorsEurope-Demo2"},{ value:"InvestorsEurope-Live2"},{ value:
    "InvestTechFx-Demo"},{ value:"InvestTechFx-Live"},{ value:"iQuoto-Demo"},{ value:
    "iQuoto-Live"},{ value:"IronFXBM-Demo1"},{ value:"IronFXBM-Real2"},{ value:"IronFXBM-Real3"},{ value:"IronFXBM-Real4"},{ value:"IronFXBM-Real8"},{ value:
    "IronFX-Demo1"},{ value:"IronFX-Demo2"},{ value:"IronFX-Demo3"},{ value:"IronFX-Real1"},{ value:"IronFX-Real10"},{ value:"IronFX-Real11"},{ value:
    "IronFX-Real12"},{ value:"IronFX-Real13"},{ value:"IronFX-Real14"},{ value:"IronFX-Real2"},{ value:"IronFX-Real3"},{ value:"IronFX-Real4"},{ value:
    "IronFX-Real5"  
    },{ value:"IronFX-Real6"},{ value:"IronFX-Real7"},{ value:"IronFX-Real8"},{ value:"IronFX-Real9"},{ value:"is6com-Live"},{ value:"ISecurities-Real"},{ value:"itexsys-Demo"},{ value:"itexsys-Live"},{ value:
    "JadenCenter-Demo"},{ value:"JadenCenter-Live"},{ value:"JAFX-Demo"},{ value:"JAFX-Demo3"},{ value:"JAFX-Real3"},{ value:"JCMFX-Live"},{ value:"JCMFX-Online"},{ value:"JFD-Live01"},{ value:
    "JFD-Live02"},{ value:"JFX-Demo"},{ value:"JFX-Live"},{ value:"JMFinancial2-Live"},{ value:"JMFinancial-Demo"},{ value:"JMFinancial-Real" },{ value:"JPHoldings-Demo"},{ value:
    "JPHoldings-Real"},{ value:"JPMarkets-Demo"},{ value:"JPMarkets-Live"},{ value:"JPMarkets-Real"},{ value:
    "JPMarketsSA-Demo" },{ value:"JPMarketsSA-Live" },{ value:"Juno-Demo"},{ value:
    "Juno-Live3" },{ value:"Just2Trade-Real3" },{ value:"JustForex-Demo" },{ value:
    "JustForex-Live" },{ value:"KapSecure-Demo" },{ value:"KapSecure-Live"},{ value:
    "Karma-DemoUK"},{ value:"KGI-Live Server"},{ value:"KGISecurities-Live Server" 
    },{ value:"KhweziFinancial-Demo"},{ value:"KhweziFinancial-Live2"
    },{ value:"Kingstone-Demo"},{ value:"Kingstone-Live"},{ value:"Klimex-Demo" 
    },{ value:"Klimex-Live"},{ value:"Knight-Live"},{ value:"KnitFX-Real"},{ value:"KOT-Demo"
    },{ value:"KOT-Live"},{ value:"KTM-Demo"},{ value:"KTM-Live"},{ value:"KTMNZ-Demo"},{ value:"KTMNZ-Live"
    },{ value:"KVBKunlun-Demo Server"},{ value:"KVBKunlun-Production Server 2" 
    },{ value:"LandFX-Demo"},{ value:"LandFX-Live"},{ value:"LandFX-Live2"
    },{ value:"LCG-Demo Production"},{ value:"LCG-Demo01"},{ value:"LCG-Demo2"},{ value:
    "LCG-Live"},{ value:"LCG-Live2"},{ value:"LeadcapitalMarkets-Live"},{ value:
    "LegoMarket-LIVE"},{ value:"LetsTrade-Live01"},{ value:"Leverate-Demo"
    },{ value:"Leverate-Europe"},{ value:"Leverate-Live" },{ value:"Leverate-Main"
    },{ value:"Leverate-Real" },{ value:"LidyaTrade-Main"},{ value:"LIGFX-Live" 
    },{ value:"LimitTrading-Live" },{ value:"LionBrokersLimited-Live" 
    },{ value:"LiqCon2-BT Japan" },{ value:"LiqCon2-BT Japan US" 
    },{ value:"LiqCon2-Demo 5" },{ value:"LiqCon2-Live"},{ value:
    "LiqCon2-Live 7"},{ value:"LiqCon-Live2"},{ value:"LiqCon-Test MT4 | ASIA" 
    },{ value:"LiteForex-Cent.com"},{ value:"LiteForex-Classic.com" 
    },{ value:"LiteForex-ECN.com"},{ value:"LiteForexEU-Classic.com"
    },{ value:"LiteForexEU-Demo.com"},{ value:"LiteForexEU-ECN.com" 
    },{ value:"LiteForexEU-Platinum.com"},{ value:"LiteForex-Lite2.com"
    },{ value:"LiteForex-Pamm.com"},{ value:"LiteForex-Real.com"},{ value:
    "LizGroupltd-Demo" },{ value:"LizGroupltd-Live" },{ value:"LMAX-DemoUK"
    },{ value:"LMAX-LiveUK" },{ value:"LMAXNZ-LiveUK" },{ value:"LMFX-Demo Server" 
    },{ value:"LMFX-Live Server 1" },{ value:"LnPLiq-Demo"},{ value:"LnPLiq-Live" 
    },{ value:"LogiPipLtd-Demo" },{ value:"LogiPipLtd-Real" },{ value:"LogiPipLtd-Real2" 
    },{ value:"LongAsiaGroup-Demo"},{ value:"LongAsiaGroup-Live"},{ value:
    "LoyalBank-Demo"},{ value:"LoyalBank-Real5"},{ value:"LQD1-Demo01"},{ value:
    "LQD1-Live01" },{ value:"LQDMarkets-Live" },{ value:"LQDMarkets-Live 2"},{ value:
    "LQDMarketsUK-Demo"},{ value:"LQD-MT4 Demo"},{ value:"LQD-Real3" },{ value:
    "LuckyGamesLimited-Asia 2"},{ value:"LuckyGamesLimited-Asia Demo"
    },{ value:"Lucrorfx-Demo" },{ value:"Lucrorfx-Demo1" },{ value:
    "Lucrorfx-Live"},{ value:"Lucrorfx-Server"},{ value:"LUXOSB-MetaTrader Live" 
    },{ value:"LynfxEternal-Live"},{ value:"MarketAllianceLtd-Demo"
    },{ value:"MarketAllianceLtd-Live"},{ value:"MarketierHoldings-Live"},{ value:
    "Markets.com-Live"},{ value:"Markets.com-Live02"},{ value:"Markets.com-Live03"
    },{ value:"Markets.com-Live-EUR"},{ value:"Markets.com-Practice"
    },{ value:"MatadorPrime-Demo"},{ value:"MatadorPrime-Live" },{ value:
    "MatadorPrime-MetaTrader Live" },{ value:"MatadorPrimeMX-Demo" },{ value:
    "MatadorPrimeMX-Live"},{ value:"MatchTrade-DEMO"},{ value:"MatchTrade-LIVE" },{ value:
    "MaxFX-Demo" },{ value:"MaxFX-Live Server" },{ value:"MaximusMarkets-LiveLiquidity1"
    },{ value:"MaxrichGroup-Real"},{ value:"MBB24-Demo"},{ value:
    "MBB24-Live"},{ value:"MBCFX-Real" },{ value:"MBT-Free EXN Live"},{ value:"MBTrading-Demo" 
    },{ value:"MBTrading-Live"},{ value:"MegaTraderFx-Demo"},{ value:"MegaTraderFx-Real" 
    },{ value:"Meksa-Meksa"},{ value:"Mentari-Demo"},{ value:"Mentari-Real"},{ value:
    "MetisEtrade-MT4"},{ value:"MEXExchange-Demo"},{ value:"MEXExchange-Live"},{ value:
    "MEXIntGroup-Demo"},{ value:"MEXIntGroup-Real"},{ value:"mForex-Demo"},{ value:
    "mForex-REAL"},{ value:"MFXBroker-Cent"},{ value:"MFXBroker-Demo"},{ value:"MFXBroker-Dollar"
    },{ value:"MFXBroker-ECN"},{ value:"MGMManagement-Live"},{ value:"MIC-Demo.com"},{ value:
    "MIC-IECY-Real.com"},{ value:"MIC-Lite.com"},{ value:"MIC-Live.com"},{ value:
    "MIC-MECY-Real.com"},{ value:"MIC-Real.com"},{ value:"MIC-STP-Classic-EU.com" 
    },{ value:"MIC-STP-Mini-EU.com"},{ value:"MIC-STP-Platinum-EU.com"},{ value:"MIGBank-Demo"},{ value:"MIGBank-MAM"},{ value:"MIGBank-Real1"  
    },{ value:"MIGBank-Real2"},{ value:"MIGCapital-Demo"},{ value:"MIGCapital-Live"},{ value:"Milestone-Demo"},{ value:"Milestone-Live"},{ value:"MISO-Real"},{ value:"MiuraCap-Demo"},{ value:
    "MiuraCap-Live"},{ value:"MMCIS-Demo"},{ value:"MMCIS-Real"},{ value:"MMIGmarkets-Live"},{ value:"MMIGNZ-Live"},{ value:"Mocaz.com-Live"},{ value:"Monex-Demo"},{ value:"Monex-Server"},{ value: 
    "Monex-Server2"},{ value:"Monex-Server3" },{ value:"MPFX-Live"},{ value:"MTCOOK-Demo" },{ value:"MTCOOK-Live" },{ value:
    "MTIGroup-Live"},{ value:"MTOneF-Demo" },{ value:"MTOneF-Real" },{ value:"MTrading-Demo"
    },{ value:"MTrading-Live"},{ value:"MTrading-Live2"},{ value:"MusashiFX-Demo"
    },{ value:"MusashiFX-Live"},{ value:"MWBrokers-Server"},{ value:
    "MXCapitalCorporation-Demo" },{ value:"MXCapitalCorporation-Live" 
    },{ value:"MXT-Live"},{ value:"MYFXMarkets-US03-Live"},{ value:
    "MYFXMarkets-US09-Live" },{ value:"MYFX-US01-Live"},{ value:"MYFX-US03-Live"
    },{ value:"MYFX-US07-Live" },{ value:"MyGroupFintech-Live"},{ value:
    "N1CapitalMarkets-Demo"},{ value:"N1CapitalMarkets-Live"},{ value:
    "NagaMarkets-Demo"},{ value:"NagaMarkets-Live"},{ value:"Nano4x-Demo"},{ value:
    "Nano4x-Real"},{ value:"NatureForex-Demo"},{ value:"NatureForex-Server"},{ value:
    "NBHMarkets-Demo"},{ value:"NBHMarkets-Live"},{ value:"NCSEC-JPYDemo01"},{ value:
    "NCSEC-JPYReal02"},{ value:"NebulaXC-Demo"},{ value:"NebulaXC-Live-UK"},{ value:
    "NetStockECN-ECN Demo Server"},{ value:"NetStockECN-ECN Live Server" 
    },{ value:"NetStockECN-Real1"},{ value:"NewCapTrader-Live 7" 
    },{ value:"NewForex-Demo" },{ value:"NewForex-Live" },{ value:"NgelPartnersPte-Asia 3"
    },{ value:"NICOFX-MAIN Live" },{ value:"NixonFx-Demo"},{ value:"NixonFx-Main" 
    },{ value:"NoaFX-Live" },{ value:"NoaPrime-Live"},{ value:"NobleSecurities-Real"
    },{ value:"NobleTribe-Demo"},{ value:"NobleTribe-Live"},{ value:
    "NoorCapital-Live"},{ value:"NoorCM-Demo"},{ value:"NoorCM-Live"},{ value:
    "NordFX-Real2"},{ value:"NordGroupInv-Demo"},{ value:"NordGroupInv-Real1"
    },{ value:"NordGroupInv-Real2"},{ value:"NordGroupInv-Real3"},{ value:
    "NordGroupInv-Real4"},{ value:"NordHedge-Live"},{ value:"NordHedge-Live2"
    },{ value:"NordMarkets-Demo"},{ value:"NordMarkets-Demo 3"},{ value:
    "NordMarkets-Demo2"},{ value:"NordMarkets-Live"},{ value:"NPBFX-Real"},{ value:
    "NSDMarkets-Live"},{ value:"NSFX-Demo"},{ value:"NSFX-Live1"},{ value:"NZF-Demo"},{ value:
    "NZF-Live"},{ value:"OANDA-GMT+2 Live"},{ value:"OANDA-GMT-5 Live"},{ value:
    "OANDA-GMT-5 Practice"},{ value:"OANDA-Japan Live"},{ value:"OANDA-Japan Practice" 
    },{ value:"OANDA-MT4 FXTrade JP"},{ value:"OANDA-v20 Live"},{ value:"OANDA-v20 Live-1"
    },{ value:"OANDA-v20 Live-2"},{ value:"OANDA-v20 Live-4"},{ value:"OANDA-v20 Live-5"},{ value:
    "OANDA-v20 Practice-1"},{ value:"OANDA-v20 Practice-2"},{ value:"OCM-Demo"},{ value:
    "OCM-Real5"},{ value:"OctaFX-Demo"},{ value:"OctaFX-Real"},{ value:"OctaFX-Real2"},{ value:
    "OctaFX-Real3"},{ value:"ODL-MT4 PRO"},{ value:"ODMarkets-Live"},{ value:"OGL-Real"},{ value:
    "OliveFinancialMarkets-Demo"},{ value:"OliveFinancialMarkets-Live2" 
    },{ value:"OlympFOREX-OlympFX"},{ value:"OneF-Demo"},{ value:
    "OneFinancialMarkets-Demo"},{ value:"OneFinancialMarkets-Real"},{ value:"OneFinancialMarkets-US11-Live"
    },{ value:"OneF-Real"},{ value:"OneFX-Demo"},{ value:"OneFX-Main"},{ value:
    "OneFX-Primary" },{ value:"OneTrade-Demo" },{ value:"OneTrade-Real" },{ value:" field-Trading" 
    },{ value:"OrbexGlobal-Live"},{ value:"OrbexGlobal-Server"},{ value:"Orbex-Live"},{ value:"OriginECN-Demo"},{ value:
    "OrionCapital-Demo"},{ value:"OrionCapital-Live" },{ value:"OrionCapital-Live2"
    },{ value:"OroCapitalMarkets-Server" },{ value:"OrtegaCapital-Server"
    },{ value:"OspreyFX-Live"},{ value:"OTISFX-Live"},{ value:"OxfordForex-Live" 
    },{ value:"OZHS-Real"},{ value:"PAT-Live"},{ value:"PaxForex-Demo Server"},{ value:
    "PaxForex-Live Server"},{ value:"PaxForex-Server"},{ value:"PAXInternational-Live" 
    },{ value:"PCMTrader-Demo"},{ value:"PCMTrader-Live"},{ value:"Pearl-Live" 
    },{ value:"Pearl-Live-NY4"},{ value:"PellucidFX-Demo" },{ value:"PellucidFX-Main" 
    },{ value:"Pepperstone-01"},{ value:"Pepperstone-02"},{ value:"Pepperstone-03" 
    },{ value:"Pepperstone-Demo01"},{ value:"Pepperstone-Demo02"},{ value:
    "Pepperstone-Edge01"},{ value:"Pepperstone-Edge02"},{ value:"Pepperstone-Edge03" 
    },{ value:"Pepperstone-Edge04"},{ value:"Pepperstone-Edge05" },{ value:
    "Pepperstone-Edge06"},{ value:"Pepperstone-Edge07"},{ value:"Pepperstone-Edge08" 
    },{ value:"Pepperstone-Edge09"},{ value:"Pepperstone-Edge11" },{ value:
    "PepperstoneFinancial-US01-Demo"},{ value:"PepperstoneUK-Demo03" 
    },{ value:"PepperstoneUK-Edge10"},{ value:"PerfectLion-Demo"},{ value:
    "PerfectLion-Live"},{ value:"PerfectLion-LiveUS"},{ value:"PFD-Demo"
    },{ value:"PFD-Real"},{ value:"PFG-Demo"},{ value:"PFG-Real"},{ value:"PGI-Live"},{ value:"PhillipCapital-AU-Live"},{ value:"PhillipCapitalFX-Demo"},{ value:
    "PhillipCapital-Live"},{ value:"PHP-Demo"},{ value:"PHP-LiveLiquidity1"},{ value:"PipHijau-Demo"},{ value:"PipHijau-Real"},{ value:"PipIndexCapitalMarkets-Demo"},{ value:
    "PipIndexCapitalMarkets-Live"},{ value:"PivotMarkets-Demo"},{ value:"PivotMarkets-Live"},{ value:"PMSforex-Live"},{ value:"PortexMarkets-Demo"},{ value:
    "PortexMarkets-Real"},{ value:"PortFX-Demo"},{ value:"PortFX-Real"},{ value:"PPSFX-Demo"},{ value:"PPSFX-Live"},{ value:"PrestigeVenture-Demo"
    },{ value:"PrestigeVenture-Real"},{ value:"PriceMarkets-Demo"},{ value:
    "PriceMarkets-Live"},{ value:"PriceMarkets-Live2"},{ value:"PrimeBusiness-Live" 
    },{ value:"PrimeSolutionsServices-LiveUK"},{ value:"PrimeXM-demo"},{ value:
    "PrimeXM-DemoUK"},{ value:"PrimeXM-DemoUS"},{ value:"PrimeXMDMA-LiveJP"},{ value:
    "PrimeXM-Live"},{ value:"PrimeXM-Live 2"},{ value:"PrimeXM-LiveUK"},{ value:"PrimeXM-LiveUS" 
    },{ value:"PrimusGlobal-Live"},{ value:"PrimusGlobal-Live-3"},{ value:
    "PrimusGlobal-Practice"},{ value:"PrimusMarkets-Live"},{ value:"PrimusMarkets-Live-2"},{ value:"PrimusMarkets-Live-3"},{ value:"PrimusMarkets-Live-4"},{ value:
    "PrimusMarkets-Practice"},{ value:"PriorFX-Demo"},{ value:"PriorFX-Live"},{ value:"PriorFX-Live2" },{ value:"Profiforex-Server"},{ value:
    "PROFTrading-Live"},{ value:"ProFXmarket-Demo"},{ value:"ProtonCapital-Live"},{ value:"PSS-MT4" },{ value:"PTMillennium-Demo Accounts Server"},{ value:
    "PTMillennium-International Server"},{ value:"PTMillennium-Real Accounts Server"},{ value:"PuHuei-Live"},{ value:"PureMarket-Demo"},{ value:
    "PureMarket-Live"},{ value:"PureMGlobal-Live"},{ value:"PurpleTrading-01Demo"},{ value:"PurpleTrading-01Live"},{ value:"PurpleTrading-02Demo"},{ value:
    "PurpleTrading-02Live"},{ value:"PurpleTrading-03Live"},{ value:"PurpleTrading-04Live"},{ value:"QTrade-3"},{ value:"QTrade-Classic 2 Server" },{ value:
    "QtradeFX-Demo2"},{ value:"QtradeFX-Live2"},{ value:"Quantix-Demo"},{ value:"QuantixFS-Demo" },{ value:"QuantixFS-Live2"},{ value:"Quantix-Live2"},{ value:"RakutenSecuritiesAustralia-Demo"},{ value:
    "RakutenSecuritiesAustralia-Live"},{ value:"RakutenSecurities-Demo"},{ value:"RakutenSecurities-Live"},{ value:"RaptorTrade-Live"},{ value:"RealECN-Live"},{ value:
    "RedexHoldings-Real"},{ value:"RedMountain-Demo"},{ value:"RedMountain-Real2"},{ value:"RedRunLtd-Live"},{ value:"Renco-Demo"},{ value:"Renco-Live" },{ value:"Renesource-DEMO"},{ value:
    "Renesource-REAL"},{ value:"RepairFX-LiveUS"},{ value:"Revotrade-Demo"},{ value:"Revotrade-Real"},{ value:"RFoSolution-Live"},{ value:"Rhodium-Server"},{ value:"RichlyActive-Live"},{ value:
    "RistonCapital-Demo"},{ value:"RistonCapital-FreshForex Demo"},{ value:"RistonCapital-FreshForex Real"},{ value:"RistonCapital-Real"},{ value:"RoboForex-Demo"},{ value:
    "RoboForex-DemoPro"},{ value:"RoboForex-ECN"},{ value:"RoboForex-Fix"},{ value:"RoboForex-FixCent"},{ value:"RoboForex-FixStandard"},{ value:"RoboForex-Prime"},{ value:"RoboForex-Pro"},{ value:
    "RoboForex-Pro-2"},{ value:"RoboForex-ProCent"},{ value:"RoboForex-ProCent-2"},{ value:"RoboForex-ProCent-3"},{ value:"RoboForex-ProCent-4"},{ value:"RoboForex-ProStandard"},{ value:"ROCO-Demo"},{ value:
    "ROYAL-Demo"},{ value:"RoyalFinancials-Demo"},{ value:"RoyalForexLtd-Live"},{ value:"RoyalFXT-Demo"},{ value:"RoyalFXT-Real"},{ value:"RoyalPlatforms-Demo"},{ value:"RoyalPlatforms-Real"},{ value:
    "RoyalPlatforms-Real-01"},{ value:"ROYAL-Real-01"},{ value:"RPDFX-Live Server"},{ value:"RubixFX-Demo"},{ value:"RubixFX-Live"},{ value:"RVDMarkets-Demo"},{ value:"RVDMarkets-Live ECN"},{ value:
    "RVMarkets-Server"},{ value:"RynatTrading-Real"},{ value:"SageFx-Live"},{ value:"SalmaMarkets-Live"},{ value:"SaturnForex-Demo"},{ value:"SaturnForex-Live"},{ value:"SaxoBank-Live"},{ value:
    "SaxoBank-Server"},{ value:"SaxoMT4-Demo"},{ value:"SaxoMT4-Live"},{ value:"ScandinavianCapital-Demo-UK"},{ value:"ScandinavianCapital-Live-UK"},{ value:"ScandinavianMarkets-Live"},{ value:
    "ScopeMarkets-Live"},{ value:"SCO-Server"},{ value:"SentratamaInvestorFuture-Demo"},{ value:"SentratamaInvestorFuture-Live"},{ value:"SFM-Demo"},{ value:"SFM-Live"},{ value:"SFM-Live02"},{ value:
    "SFXGlobal-Server"},{ value:"SFXMarkets-Server"},{ value:"SGTMarkets-Demo"},{ value:"SGTMarkets-Live"},{ value:"ShiftForex-Demo"},{ value:"ShiftForex-Real"},{ value:"SIG-Demo.com"},{ value:"SIG-Lite.com"},{ value:
    "SIG-Lite2.com"},{ value:"SIG-Pamm.com"},{ value:"SIG-Real.com"},{ value:"SimpleFintech-Live"},{ value:"SimpleFX-DemoUK"},{ value:"SimpleFX-LiveUK"},{ value:"Skopalino-Server"},{ value:"SKYFX-Main Server 1"},{ value:
    "SmartLive-Demo"},{ value:"SmartLive-FX-CFD Live"},{ value:"SmartLive-Spread Trading Live"},{ value:"SmartTradeFX-Demo"},{ value:"SmartTradeFX-Real"},{ value:"SMFX-US01-Demo"},{ value:"SMFX-US02-Live"},{ value:"SMGlobal-Live"},{ value:"SoegeeTrader-Demo"},{ value:"SoegeeTrader-Real"  
    },{ value:"Solforex-Demo"},{ value:"Solforex-Live"},{ value:"SolidaryMarkets-LiveLiquidity1"},{ value:"SpartanFX-Demo"},{ value:"SpartanFX-Live"},{ value:"SpotTrader-Real"},{ value:
    "SquaredDirect-Demo"},{ value:"SquaredDirect-Demo2"},{ value:"SquaredDirect-Live"},{ value:"SquaredFinancial-Demo2"},
    { value:"SquaredFinancial-Live" },{ value:"SquaredMT4-Demo"},{ value:"SquaredMT4-Live"},
    { value:"SquaredProMT4-Demo" },{ value:"SquaredProMT4-Live"},{ value:"SRDresdner-Demo"},
    { value:"SRDresdner-Live"},{ value:"StarFinancial-AU01-Demo"},{ value:"StarFinancial-AU01-Live" },{ value:"StarFinancial-Demo"},
    { value:"StarFinancial-Live" },{ value:"StarFinancial-US03-Demo"},
    { value:"StarFinancial-US05-Live"},{ value:"StarfishFX-Demo"},{ value:"StarfishFX-Live"},
    { value:"StarpeakEquityFutures-Demo"},{ value:"StarpeakEquityFutures-Live"},{ value:"STForex-Demo"},
    { value:"STForex-Live"},{ value:"STOUK-Demo"},{ value:"STOUK-Real"},{ value:"Strategon-Live"},
    {value:"StrategyStation-DemoUK"},{ value:"StrategyStation-LiveUK"},{ value:"STS-Demo"},
    { value:"STS-Real"},{ value:"StumacTeam-Live"},{ value:"SucdenFinancial-Live"},{ value:"Sunbird-Demo"},{ value:"Sunbird-Real"}
    ,{ value:"SunFXGlobal-Demo"},{ value:"SunFXGlobal-Live"},{ value:"SuperForex-Real"},{ value:"SuperForex-Real Europe" 
      },{ value:"SuperWinnersMax-Live 2"},{ value:"SureForex-Demo"},{ value:"SureForex-Live"},{ value:"SVSFX-Demo" 
    },{ value:"SVSFX-Live"},{ value:"SwissInternational-DemoFX" },{ value:"SwissInternational-RealFX"},{ value:"SwissPrime-RealFX"
    },{ value:"Swissquote-Demo"},{ value:"Swissquote-Demo1"},{ value:"Swissquote-Demo2" },{ value:"Swissquote-Live"},{ value:
    "Swissquote-Live1"},{ value:"Swissquote-Live2"},{ value:"Swissquote-Live3"},{ value:"Swissquote-Live6"},{ value:"SwissquoteLtd-Demo"
      },{ value:"SwissquoteLtd-Live"},{ value:"SwissquoteLtd-Live5"},{ value:"Swissquote-MAM"},{ value:"Swissquote-Real1"},{ value:
    "Swissquote-Real2"},{ value:"Swissquote-Real6"},{ value:"Tadawulfx-MAM"},{ value:"Tahoe-Live"},{ value:"Tallinex-Demo"},{ value:"Tallinex-Live"
    },{ value:"TarsierFX-Real"},{ value:"TDMHoldings-Demo"},{ value:"TDMHoldings-Real"},{ value:"TechInvest-Server"},{ value:"TegasFX-Demo"
    },{ value:"TegasFX-Live-UK"},{ value:"TeleTRADECY-Demo"},{ value:"TeleTRADECY-NoDealingDesk"},{ value:"TeleTRADECY-Server"},{ value:
      "TeleTrade-NoDealingDesk"},{ value:"TeleTrade-Server"},{ value:"TempleFX-Live 2"},{ value:"Templer-server.templerfx.com"},{ value:
      "Templer-TemplerFX-Cent"},{ value:"TenkoFX-Demo"},{ value:"TeraEurope-Demo" },{ value:"TeraEurope-Main"},{ value:"TFB-Demo"},{ value:"TFB-Live"},{ value:
    "TGLColmex-Demo"},{ value:"TharaHeights-Server"},{ value:"ThinkForexAU-Demo"},{ value:"ThinkForexAU-Demo 2"},{ value:"ThinkForexAU-Demo Asia"
    },{ value:"ThinkForexAU-Live"},{ value:"ThinkForexAU-Live 2"},{ value:"ThinkForex-Demo" },{ value:"ThinkForex-Demo Asia"},{ value:
    "ThinkForex-Live" },{ value:"ThinkForex-Live 2"},{ value:"ThinkForex-ThinkForex Live"},{ value:"ThinkForexUK-Demo"},{ value:"ThinkForexUK-Demo 2"},{ value:"ThinkForexUK-Demo Asia"},{ value:"ThinkForexUK-Live"},{ value:
    "ThinkForexUK-Live 2" },{ value:"Tickmill-Demo"},{ value:"Tickmill-DemoUK" },{ value:"TickmillEU-Demo" },{ value:"TickmillEU-Live"},{ value:"Tickmill-Live" },{ value:
    "Tickmill-Live02" },{ value:"Tickmill-Live04" },{ value:"Tickmill-Live05" },{ value:"TickmillUK-Live03" },{ value:
    "Tier1FX-Demo" },{ value:"Tier1FX-Live 2" },{ value:"Tier1FX-Real"},{ value:"TierOneFX-Demo" },{ value:
    "Tifia-Demo" },{ value:"Tifia-Universal" },{ value:"TigerWit-Live"},{ value:"TIOMarkets-Live-4"},{ value:
    "TIOMarkets-Practice"},{ value:"TitanFX-01"},{ value:"TitanFX-02"},{ value:"TitanFX-03"},{ value:"TMS-Demo"},{ value:
    "TMS-Live"},{ value:"TMSTrader-Live"},{ value:"TOPFOREX-Demo"},{ value:"TOPFOREX-Real"},{ value:
    "TOPFX-Demo Server"},{ value:"TOPFX-Live Server"},{ value:"TPGlobal-Demo"},{ value:"TPGlobal-Live"},{ value:
    "Trade24-Live"},{ value:"TradeKing-Demo(R)"},{ value:"TradeKing-Live 7"},{ value:
    "TradeMasterFX-Demo"},{ value:"TradeMasterFX-Live1"},{ value:"TradeMasterFX-Live2"},{ value:
    "TradeMaxCapital-Live1"},{ value:"TradeMax-Demo"},{ value:"TradeMax-Live1" },{ value:"TradeMax-Live2"},{ value:
    "TradeMono-Demo" },{ value:"TradeMono-Live"},{ value:"Tradenext-Demo"},{ value:"TradenextiTrader-Demo"},{ value:
    "TradenextiTrader-Real" },{ value:"Tradenext-Live"},{ value:"Tradenext-Real"},{ value:"Tradeo-Demo"},{ value:
    "Tradeology-Live"},{ value:"Tradeo-Real"},{ value:"TradeProServices-Demo"},{ value:
    "TradeProServices-Live" },{ value:"TradersDomainFX-Real" },{ value:"TradersWay-Demo"},{ value:
    "TradersWay-Live" },{ value:"TradeSocioCy-Demo Server"},{ value:"TradestoCorp-Demo"},{ value:
    "TradestoCorp-MetaTrader Live"},{ value:"TraDesto-Live"},{ value:"Tradestone-Demo"},{ value:"Tradestone-Real-1"},{ value:"TradeTechMarkets-Live"},{ value:"TradeTools-Trading"  
    },{ value:"Tradeview-Demo"},{ value:"Tradeview-Live"},{ value:"TradeWise-DemoUS"},{ value:"TradeWise-LiveUS"},{ value:"Trading.com-Demo 2"},{ value:"Trading.com-Real 17"},{ value:
    "Trading.com-Real 19"},{ value:"Trading.com-Real 20"},{ value:"TradingForex-Live"},{ value:"TradingPoint-Demo"},{ value:"TradingPoint-Real"},{ value:"TradingTechnologies-Real"},{ value:
    "Tradize-Demo"},{ value:"TrioMarkets-Live Server"},{ value:"Tripleafx-Demo"},{ value:"Tripleafx-FX-Demo"},{ value:"Tripleafx-FX-Real"},{ value:
    "Tripleafx-Triple A Live Server"},{ value:"TriumphFX-live"},{ value:"TrueSTP-Demo"},{ value:"TrueSTP-Live"},{ value:"TrustBrokerGroup-Live"},{ value:
    "TTCM-Demo"},{ value:"TTCM-Live"},{ value:"TurkishYatirim-Demo"},{ value:"TurkishYatirim-RealYatirim"},{ value:"TurnkeyFX-Demo"},{ value:"TurnkeyFX-Live"},{ value:
    "TurnkeyGlobal-Demo"},{ value:"TurnkeyGlobal-Live"},{ value:"TyTradiumFX-Demo"},{ value:"TyTradiumFX-Real"},{ value:"UAG-Demo"},{ value:"UAG-Live"},{ value:
    "UGLExchange-Demo"},{ value:"UGLExchange-Live01"},{ value:"Ulukartal-MetaServer(Main)"},{ value:"UMOFX-Demo"},{ value:"UMOFX-Main"},{ value:"UniBorsa-LiveUK"},{ value:
    "UniglobeMarkets-Live"},{ value:"UnitedForex-Demo Server"},{ value:"UnitedForex-Real Server"},{ value:"UniversalFX-Universal-FX Demo" },{ value:
    "UniversalFX-Universal-FX Live"},{ value:"UpFX-Demo"},{ value:"UpFX-Main"},{ value:"USGFX-Demo"},{ value:"USGFX-Live"},{ value:"USGFX-Live2"},{ value:"USGFX-Live3"},{ value:
    "UtradeFX-Demo"},{ value:"UtradeFX-Live"},{ value:"UWC-Demo.com"},{ value:"UWC-Lite.com"},{ value:"UWC-Real.com"},{ value:"VAF-Demo"},{ value:"VAF-Real"},{ value:"ValburyCapitalLimited-Demo"},{ value:"ValburyCapitalLimited-Live"},{ value:
    "Valutrades-Demo"},{ value:"Valutrades-Real"},{ value:"VantageAU-Live 2"},{ value:"VantageFX-Demo"},{ value:"VantageFXInternational-Demo"},{ value:"VantageFXInternational-Live 1"},{ value:
    "VantageFXInternational-Live 2"},{ value:"VantageFXInternational-Live 3"},{ value:"VantageFXInternational-Live 4"},{ value:"VantageFX-Live 1"},{ value:"VantageFX-Live 2"},{ value:"VantageFX-Live 3"},{ value:
    "VantageFX-Live 4"},{ value:"VantageFX-UK-Demo"},{ value:"VantageFX-UK-Live UK"},{ value:"VantageGlobalPrime-Live"},{ value:"VantagePrime-Live"},{ value:"Varchev-Demo"},{ value:"Varchev-Real"},{ value:"VarengoldBank-EUR Server"},{ value:
    "Varengold-Demo Server"},{ value:"Varengold-Server"},{ value:"Varengold-Varengold"},{ value:"VARIANSE-Demo"},{ value:"VARIANSE-Main"},{ value:"VCL-DemoUS"},{ value:"VCL-LiveUS"},{ value:"VDX-Demo"},{ value:"VDX-Live"},{ value:
    "Venbey-Demo"},{ value:"Venbey-Live"},{ value:"VeniceBanks-Demo"},{ value:"VeniceBanks-Live"},{ value:"VeracityMarkets-Demo"},{ value:"VeracityMarkets-Real"},{ value:"VeritasSolutions-Live"},{ value:"VerumFX-Demo"},{ value:
    "VerumFX-Real"},{ value:"VIBHS-Demo"},{ value:"VIBHSFinancialLtd-Main"},{ value:"VIBHS-Main"},{ value:"VIBHSUK-Demo"},{ value:"VIBHSUK-Live"},{ value:"VIF-Demo Accounts Server" },{ value:"VIF-International Server"},{ value:
    "VIF-Real Accounts 2 Server"},{ value:"VIF-Real Accounts Server"},{ value:"VIPortal-Live"},{ value:"ViproMarkets-Demo"},{ value:"ViproMarkets-Live"},{ value:"VirexEnterprises-Virex"},{ value:"VivaFx-Demo"},{ value:
    "VivaFx-Live"},{ value:"VPEAG-Demo"},{ value:"VPEAG-Real"},{ value:"VTMT4-Demo 5"},{ value:"VTMT4-Live 5"},{ value:"WaterGarden-Live"},{ value:"Weltrade-Live"},{ value:"WestValley-Demo"},{ value:"WestValley-Live"},{ value:
    "WetradeInternational-Live"},{ value:"WhaleMarkets-Real01"},{ value:"WholeLearnedIntl-Demo"},{ value:"WholeLearnedIntl-Live-f"},{ value:"WHSELFINVEST-Server"},{ value:"WindsorBrokers-Demo"},{ value:"WindsorBrokers-REAL"},{ value:
    "Windsor-REAL"},{ value:"WisdomMarketLimited-Demo"},{ value:"WisdomMarketLimited-Live"},{ value:"WistonGlobalLimited-Demo"},{ value:"WistonGlobalLimited-Live"},{ value:"WithFX-Demo"},{ value:"WithFX-Live"},{ value:"WorldForex-Live"},{ value:
    "WorldProFX-Demo"},{ value:"WorldProFX-Live"},{ value:"WPEX-Live"},{ value:"WSIForex-Demo"},{ value:"WSIForex-Live"},{ value:"WSL-Live"},{ value:"WVC-Live"},{ value:"WVC-Server"},{ value:"WWM-Demo"},{ value:"WWM-Live"},{ value:"XeroCapital-Real"},{ value:"Xforex-Main"},{ value:"XGLOBAL-Demo"},{ value:
    "XGLOBAL-Real"},{ value:"XIGLimited-Live"},{ value:"XM.COM-AU-Demo 2"},{ value:"XM.COM-AU-Real 17"},{ value:"XM.COM-AU-Real 19"},{ value:"XM.COM-AU-Real 20"},{ value:"XM.COM-Demo"},{ value:"XM.COM-Demo 2"},{ value:"XM.COM-Real 1"},{ value:
    "XM.COM-Real 10" },{ value:"XM.COM-Real 11"},{ value:"XM.COM-Real 12"},{ value:"XM.COM-Real 13"},{ value:"XM.COM-Real 14"},{ value:"XM.COM-Real 15"},{ value:"XM.COM-Real 16"},{ value:"XM.COM-Real 17"},{ value:"XM.COM-Real 18"},{ value:"XM.COM-Real 19"},{ value:"XM.COM-Real 2"},{ value:"XM.COM-Real 20"},{ value:"XM.COM-Real 23"},{ value:"XM.COM-Real 3"  
    },{ value:"XM.COM-Real 4"},{ value:"XM.COM-Real 5"},{ value:"XM.COM-Real 6"},{ value:"XM.COM-Real 7"},{ value:"XM.COM-Real 8"},{ value:"XM.COM-Real 9"},{ value:"XMAU-Demo 2"},{ value:"XMAU-Real 17"},{ value:
    "XMAU-Real 19"},{ value:"XMAU-Real 20"},{ value:"XMGlobal-Demo"},{ value:"XMGlobal-Demo 4"},{ value:"XMGlobal-Real 1"},{ value:"XMGlobal-Real 10"},{ value:"XMGlobal-Real 13"},{ value:
    "XMGlobal-Real 14"},{ value:"XMGlobal-Real 15"},{ value:"XMGlobal-Real 16"},{ value:"XMGlobal-Real 17"},{ value:
    "XMGlobal-Real 18"},{ value:"XMGlobal-Real 19" },{ value:"XMGlobal-Real 20" },{ value:"XMGlobal-Real 21"},{ value:
    "XMGlobal-Real 22"},{ value:"XMGlobal-Real 23"},{ value:"XMGlobal-Real 24"},{ value:"XMGlobal-Real 26"},{ value:
    "XMGlobal-Real 27"},{ value:"XMGlobal-Real 28"},{ value:"XMGlobal-Real 29"},{ value:"XMGlobal-Real 3"},{ value:
    "XMGlobal-Real 32"},{ value:"XMGlobal-Real 33"},{ value:"XMGlobal-Real 35"},{ value:"XMGlobal-Real 36"},{ value:
    "XMGlobal-Real 38"},{ value:"XMGlobal-Real 39"},{ value:"XMGlobal-Real 4"},{ value:"XMGlobal-Real 40"},{ value:
    "XMGlobal-Real 41"},{ value:"XMGlobal-Real 42"},{ value:"XMGlobal-Real 43"},{ value:"XMGlobal-Real 44"},{ value:
    "XMGlobal-Real 5"},{ value:"XMGlobal-Real 6"},{ value:"XMGlobal-Real 8"},{ value:"XMGlobal-Real 9"},{ value:
    "XMTrading-Demo 3"},{ value:"XMTrading-Real 11"},{ value:"XMTrading-Real 12"},{ value:"XMTrading-Real 25"},{ value:
    "XMTrading-Real 27"},{ value:"XMTrading-Real 31"},{ value:"XMTrading-Real 34"},{ value:"XMTrading-Real 37"},{ value:
    "XMTrading-Real 40"},{ value:"XMTrading-Real 7"},{ value:"XMUK-Demo"},{ value:"XMUK-Demo 2"},{ value:"XMUK-Real 14"},{ value:
    "XMUK-Real 15"},{ value:"XMUK-Real 16"},{ value:"XMUK-Real 17"},{ value:"XMUK-Real 18"},{ value:"XMUK-Real 19"},{ value:
    "XMUK-Real 20"},{ value:"XMUK-Real 23"},{ value:"XMUK-Real 3"},{ value:"XMUK-Real 6"},{ value:"XMUK-Real 8"},{ value:
    "XTrade-MT4 Demo"},{ value:"XTrade-Real"},{ value:"XTrade-Real2"},{ value:"XTrade-Real3"},{ value:"XTuneMedia-Real"},{ value:
    "Yadixcom-Demo"},{ value:"Yadixcom-Live"},{ value:"YFTradeFX-Demo"},{ value:"YFTradeFX-Live"},{ value:"Youtradefx-Demo"},{ value:
    "Youtradefx-Real"},{ value:"YuloTrading-Live"},{ value:"Z.comTradeUKLtd-Demo-UK"},{ value:"Z.comTradeUKLtd-Live-UK"},{ value:
    "ZealCapitalMarketSC-Demo"},{ value:"ZenTrade-Server"},{ value:"ZeroMarkets-Demo"},{ value:"ZeroMarkets-Live"},{ value:
    "ZhanHuang-Demo"},{ value:"ZhanHuang-Live" }]
constructor(private service:SignUpService,public appSettings:AppSettings,public snackBar: MatSnackBar, public fb: FormBuilder,private http:HttpClient,private router:Router) {
    this.settings = this.appSettings.settings;
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.options.slice())
    );
    this.form = this.fb.group({
      username: [''],
      userpassword: [''],
      hasAccount:[''],
      bankCtrl:[''],
      bankFilterCtrl:[''],
      accNumber:[''],
      accPassword:[''],
      // accEmail:[''],
    })
   }
   private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(state => state.value.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnInit(): void {
    console.log(this.options.length);
    // console.log(this.service)
  }
  public onSubmit(values:Object):void {
    console.log(this.form.value)
    if(!this.hasFxAccount){
      this.service.customerObj.fxUserName = this.form.get('accNumber').value;
    } 
    if(this.hasFxAccount){
      this.service.customerObj.fxUserName = this.form.get('username').value;
    }
    console.log(this.service.customerObj)
    this.hideSpinner = false;
    this.http.post(this.serverUrl+'/auth/signup',this.service.customerObj).
    subscribe(res=>{
      this.sendFxBlueAccountRequest();
    },err=>{
      console.log(err)
      this.openSnackBar(err);
      this.hideSpinner = false;
    })
    
  }
  checkValue(e){
    console.log(e);
    this.hasFxAccount = e;
    console.log(this.hasFxAccount);

  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 4000,
    });
  }
  sendFxBlueAccountRequest(){
    if(!this.hasFxAccount){
     
      const formData = new FormData();
      formData.append("brokerserver",this.stateCtrl.value);
      formData.append("mt4account",this.form.get('accNumber').value);
      formData.append("mt4password",this.form.get('accPassword').value);
      formData.append("registeruser",this.form.get('accNumber').value);
      formData.append("registerpass",this.form.get('accPassword').value);
      formData.append("registeremail",this.service.customerObj.email);
      formData.append("includeopenorders",'1');
      formData.append("includependingorders",'1');
      formData.append("publishordercomments",'1');
      formData.append("hideordersunlessloggedin",'0');
      this.http.post(this.postUrl,formData).
       subscribe(data=>{
       },error=>{
        if(error['error']['text'].startsWith("OKAY")){
          window.localStorage.setItem('username',this.form.get('accNumber').value)
          this.hideSpinner = true;
          this.router.navigate(['/loggedin/dashboard']);
        } else if(error['error']['text'].startsWith("ERR")){
          this.hideSpinner = true;
            this.openSnackBar(error['error']['text'])
            }
          })
    }
    if (this.hasFxAccount) {
      this.hideSpinner = false;
      const formData = new FormData();
      console.log(this.form.get('username').value)
      formData.append("username",this.form.get('username').value);
      formData.append("userpassword",this.form.get('userpassword').value);
      console.log(formData)
      this.http.post(this.url,formData).
       subscribe(data=>{
          console.log(data['error']['text'])
          if(data['error']['text'].startsWith("OKAY")){
            console.log('Yupp Login')
          }
       },error=>{
        console.log(error['error']['text'])
        if(error['error']['text'].startsWith("OKAY")){
          window.localStorage.setItem('username',this.form.get('username').value)
          console.log('Yupp Login')
          this.hideSpinner = true;
          this.router.navigate(['/loggedin/dashboard']);
        } else if(error['error']['text'].startsWith("ERR")){
          this.hideSpinner = true;
            this.openSnackBar(error['error']['text'])
            }
          })
    }
  }

}
