import {MessageRef} from "./refs";

export class Country {

	private static readonly _iso = {"AF":"AFG","AX":"ALA","AL":"ALB","DZ":"DZA","AS":"ASM","AD":"AND","AO":"AGO","AI":"AIA","AQ":"ATA","AG":"ATG","AR":"ARG","AM":"ARM","AW":"ABW","AU":"AUS","AT":"AUT","AZ":"AZE","BS":"BHS","BH":"BHR","BD":"BGD","BB":"BRB","BY":"BLR","BE":"BEL","BZ":"BLZ","BJ":"BEN","BM":"BMU","BT":"BTN","BO":"BOL","BQ":"BES","BA":"BIH","BW":"BWA","BR":"BRA","IO":"IOT","BN":"BRN","BG":"BGR","BF":"BFA","BI":"BDI","KH":"KHM","CM":"CMR","CA":"CAN","CV":"CPV","KY":"CYM","CF":"CAF","TD":"TCD","CL":"CHL","CN":"CHN","CX":"CXR","CC":"CCK","CO":"COL","KM":"COM","CG":"COG","CD":"COD","CK":"COK","CR":"CRI","CI":"CIV","HR":"HRV","CU":"CUB","CW":"CUW","CY":"CYP","CZ":"CZE","DK":"DNK","DJ":"DJI","DM":"DMA","DO":"DOM","EC":"ECU","EG":"EGY","SV":"SLV","GQ":"GNQ","ER":"ERI","EE":"EST","ET":"ETH","FK":"FLK","FO":"FRO","FJ":"FJI","FI":"FIN","FR":"FRA","GF":"GUF","PF":"PYF","TF":"ATF","GA":"GAB","GM":"GMB","GE":"GEO","DE":"DEU","GH":"GHA","GI":"GIB","GR":"GRC","GL":"GRL","GD":"GRD","GP":"GLP","GU":"GUM","GT":"GTM","GG":"GGY","GN":"GIN","GW":"GNB","GY":"GUY","HT":"HTI","VA":"VAT","HN":"HND","HK":"HKG","HU":"HUN","IS":"ISL","IN":"IND","ID":"IDN","IR":"IRN","IQ":"IRQ","IE":"IRL","IM":"IMN","IL":"ISR","IT":"ITA","JM":"JAM","JP":"JPN","JE":"JEY","JO":"JOR","KZ":"KAZ","KE":"KEN","KI":"KIR","KP":"PRK","KR":"KOR","KW":"KWT","KG":"KGZ","LA":"LAO","LV":"LVA","LB":"LBN","LS":"LSO","LR":"LBR","LY":"LBY","LI":"LIE","LT":"LTU","LU":"LUX","MO":"MAC","MK":"MKD","MG":"MDG","MW":"MWI","MY":"MYS","MV":"MDV","ML":"MLI","MT":"MLT","MH":"MHL","MQ":"MTQ","MR":"MRT","MU":"MUS","YT":"MYT","MX":"MEX","FM":"FSM","MD":"MDA","MC":"MCO","MN":"MNG","ME":"MNE","MS":"MSR","MA":"MAR","MZ":"MOZ","MM":"MMR","NA":"NAM","NR":"NRU","NP":"NPL","NL":"NLD","NC":"NCL","NZ":"NZL","NI":"NIC","NE":"NER","NG":"NGA","NU":"NIU","NF":"NFK","MP":"MNP","NO":"NOR","OM":"OMN","PK":"PAK","PW":"PLW","PS":"PSE","PA":"PAN","PG":"PNG","PY":"PRY","PE":"PER","PH":"PHL","PN":"PCN","PL":"POL","PT":"PRT","PR":"PRI","QA":"QAT","RE":"REU","RO":"ROU","RU":"RUS","RW":"RWA","BL":"BLM","SH":"SHN","KN":"KNA","LC":"LCA","MF":"MAF","PM":"SPM","VC":"VCT","WS":"WSM","SM":"SMR","ST":"STP","SA":"SAU","SN":"SEN","RS":"SRB","SC":"SYC","SL":"SLE","SG":"SGP","SX":"SXM","SK":"SVK","SI":"SVN","SB":"SLB","SO":"SOM","ZA":"ZAF","GS":"SGS","SS":"SSD","ES":"ESP","LK":"LKA","SD":"SDN","SR":"SUR","SJ":"SJM","SZ":"SWZ","SE":"SWE","CH":"CHE","SY":"SYR","TW":"TWN","TJ":"TJK","TZ":"TZA","TH":"THA","TL":"TLS","TG":"TGO","TK":"TKL","TO":"TON","TT":"TTO","TN":"TUN","TR":"TUR","TM":"TKM","TC":"TCA","TV":"TUV","UG":"UGA","UA":"UKR","AE":"ARE","GB":"GBR","US":"USA","UM":"UMI","UY":"URY","UZ":"UZB","VU":"VUT","VE":"VEN","VN":"VNM","VG":"VGB","VI":"VIR","WF":"WLF","EH":"ESH","YE":"YEM","ZM":"ZMB","ZW":"ZWE"};

	private static readonly _codes = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"];

	static codes(): string[] {
		return Country._codes.slice();
	}

	static countries(): Country[] {

		let cntrs: Country[] = [];

		for (let c of Country._codes) {
			let i = new Country(c);
			cntrs.push(i);
		}

		return cntrs;
	}

	constructor(code: string);

	constructor(codeOrPrototype: string | any) {
		this.$constructor(codeOrPrototype);
	}

	private $constructor(codeOrPrototype: string | any) {

		if (typeof codeOrPrototype === "string") {
			this["code" as any] = codeOrPrototype;
		} else if (codeOrPrototype["code"] && typeof codeOrPrototype["code"] === "string") {
			this["code" as any] = codeOrPrototype["code"];
		} else {
			throw new Error("Country code must be given in order to create Country instance");
		}

		if (this.code.length == 3) {
			for (let a in Country._iso) {
				let c = Country._iso[a];
				if (c == this.code) {
					this["code" as any] = a;
					break;
				}
			}
		}

		this["name" as any] = new MessageRef("@umpirsky/country-list", this.code);
	}

	equals(country: Country): boolean {
		return this.code == (country && country.code);
	} 

	readonly code: string;

	readonly name: MessageRef;

	get alpha2(): string {
		return this.code;
	}

	get alpha3(): string {
		return Country._iso[this.code];
	}

	toString(): string {
		return this.code;
	}

	toJSON(): any {
		return this.code;
	}

	protected fromJSON(json: any) {
		if (typeof json === "string" || (json && typeof json["code"] == "string")) {
			this.$constructor(json);
		} else {
			throw new Error("Cannot unserialize  '" + json + "' to Country");
		}
	}
}
