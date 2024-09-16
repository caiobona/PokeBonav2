export interface Carta {
  name: string;
  id: any;
  cards: Array<Cartas>;
}

export interface Cartas {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: IAncientTrait;
  abilities?: IAbility[];
  attacks?: IAttack[];
  weaknesses?: IWeakness[];
  resistances?: IResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];

  regulationMark?: string;
  images: ICardImage;

  cardmarket?: ICardmarket;
}

export interface ISetImage {
  symbol: string;
  logo: string;
}

export interface ICardImage {
  small: string;
  large: string;
}
export interface IAbility {
  name: string;
  text: string;
  type: string;
}
export interface IAncientTrait {
  name: string;
  text: string;
}
export interface IAttack {
  convertedEnergyCost: number;
  cost: string[];
  damage: string;
  name: string;
  text: string;
}
export interface ICardmarket {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number | null
    lowPrice: number | null
    trendPrice: number | null
    germanProLow: number | null
    suggestedPrice: number | null
    reverseHoloSell: number | null
    reverseHoloLow: number | null
    reverseHoloTrend: number | null
    lowPriceExPlus: number | null
    avg1: number | null
    avg7: number | null
    avg30: number | null
    reverseHoloAvg1: number | null
    reverseHoloAvg7: number | null
    reverseHoloAvg30: number | null
  }
}
export interface IWeakness {
  type: string;
  value: string;
}
export interface IResistance {
  type: string;
  value: string;
}
