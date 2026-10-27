/**
 * ASSET MANIFEST — every image on the site is referenced from here by key.
 *
 * All current images are licensed sample photography from Unsplash
 * (https://unsplash.com/license — free for commercial use). They are NOT the
 * business's own work, premises, staff or customer vehicles, and any place
 * where that could be implied captions them as "Sample photography".
 *
 * To replace one: drop your photo in /public/images/ and change `src` to
 * "/images/your-file.jpg", update width/height/alt, and set `sample: false`.
 * Component code does not need to change.
 */

export type Asset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  sample: boolean;
  credit?: string;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const assets = {
  wheelBrush: {
    src: u("1708805282683-50a060eba80f"),
    width: 3000,
    height: 4000,
    alt: "Gloved hand cleaning a tire sidewall with a soft detailing brush",
    sample: true,
    credit: "Zac Nielson / Unsplash",
  },
  wheelFoam: {
    src: u("1708805283017-c662be2c7a44"),
    width: 3000,
    height: 4000,
    alt: "Foam-covered alloy wheel on a wet workshop floor",
    sample: true,
    credit: "Zac Nielson / Unsplash",
  },
  foamFront: {
    src: u("1761312834150-4beefff097a7"),
    width: 2000,
    height: 3000,
    alt: "Front of a black car covered in wash foam",
    sample: true,
    credit: "Willian Cittadin / Unsplash",
  },
  foamGarage: {
    src: u("1608506375591-b90e1f955e4b"),
    width: 3000,
    height: 3000,
    alt: "Pre-wash foam being rinsed from a dark sports car inside a garage",
    sample: true,
    credit: "Andre Tan / Unsplash",
  },
  padHeadlight: {
    src: u("1652898072202-5084dc85b850"),
    width: 3000,
    height: 4000,
    alt: "Foam applicator pad worked across white paint beside a headlight",
    sample: true,
    credit: "Vladyslav Lytvyshchenko / Unsplash",
  },
  microfiberHood: {
    src: u("1761934657948-708146148588"),
    width: 3000,
    height: 2000,
    alt: "Folded grey microfiber towel resting on a glossy black hood",
    sample: true,
    credit: "GoGoNano / Unsplash",
  },
  reflectionBrown: {
    src: u("1773236321529-fe13541e95f2"),
    width: 3000,
    height: 2000,
    alt: "Close-up of deep brown paint holding sharp, clean reflections",
    sample: true,
    credit: "atelierbyvineeth / Unsplash",
  },
  garageCar: {
    src: u("1567808291548-fc3ee04dbcf0"),
    width: 2000,
    height: 3000,
    alt: "Dark car parked beneath strip lights in an empty garage",
    sample: true,
    credit: "Ville Kaisla / Unsplash",
  },
  studioSedan: {
    src: u("1485291571150-772bcfc10da5"),
    width: 4000,
    height: 2500,
    alt: "Black sedan in profile against a dark background",
    sample: true,
    credit: "Samuele Errico Piccarini / Unsplash",
  },
  interiorLeather: {
    src: u("1605437241278-c1806d14a4d9"),
    width: 2000,
    height: 3000,
    alt: "Black leather seats and dashboard of a clean car interior",
    sample: true,
    credit: "Ján Vlačuha / Unsplash",
  },
  interiorRed: {
    src: u("1549064233-945d7063292f"),
    width: 2000,
    height: 3000,
    alt: "Dark dashboard and red leather console of a car interior",
    sample: true,
    credit: "Viktor Theo / Unsplash",
  },
  steeringCloth: {
    src: u("1732357624591-f2137085659b"),
    width: 3200,
    height: 4000,
    alt: "Hand wiping a steering wheel with a soft cloth",
    sample: true,
    credit: "Muhammad Saad / Unsplash",
  },
  handWash: {
    src: u("1704796141009-5ed5cc8ca5f3"),
    width: 2000,
    height: 3000,
    alt: "Blue car being hand washed, water beading on the paint",
    sample: true,
    credit: "Lorenzo Hamers / Unsplash",
  },
  detailerHeadlight: {
    src: u("1622329821376-a19fd6002562"),
    width: 4000,
    height: 3000,
    alt: "Detailer leaning over the front of a black car, wiping near the headlight",
    sample: true,
    credit: "Agent J / Unsplash",
  },
} satisfies Record<string, Asset>;

export type AssetKey = keyof typeof assets;
