import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;
const topBarHeight = 44;
const bottomNaviHeight = 56;
const mainBannerHeight = (width - 30) * (3 / 4);
const mainAdBannerHeight = width * (1 / 5);
const widthFix = width - 30;

const baseFs = 8;
const fsXXS = baseFs;
const fsXS = baseFs + 2;
// const fsXMS = baseFs + 3;
const fsS = baseFs + 4;
const fsSM = baseFs + 5;
const fsM = baseFs + 6;
const fsL = baseFs + 8;
const fsXL = baseFs + 10;
const fsXXL = baseFs + 12;
const fsXXXL = baseFs + 14;
const fsXXXXL = baseFs + 16;
const fs6XL = baseFs + 20;
const fs8XL = baseFs + 24;
const fs11XL = baseFs + 30;

const fsFontNsR = Platform.OS === 'ios' ? 'NanumSquare' : 'NanumSquareRegular';
// const fsFontNsB = Platform.OS === 'ios' ? ('NanumSquare') : ('NanumSquareBold')

const GapLvI = (width * 1) / 2;
const GapLvI2 = (width * 1) / 3;
const GapLvII = (width * 1) / 4;
const GapLvIII = (width * 1) / 6;
const GapLvIV = (width * 1) / 8;
const GapLvV = (width * 1) / 10;
const GapLvVI = (width * 1) / 12;
const GapLvVII = (width * 1) / 14;
const GapLvVIII = (width * 1) / 16;
const GapLvIX = (width * 1) / 18;
const GapLvX = (width * 1) / 20;
const GapLvXI = (width * 1) / 22;

const window = {
  width,
  height,
  topBarHeight,
  bottomNaviHeight,
  mainBannerHeight,
  widthFix,
  mainAdBannerHeight,
  GapLvI,
  GapLvI2,
  GapLvII,
  GapLvIII,
  GapLvIV,
  GapLvV,
  GapLvVI,
  GapLvVII,
  GapLvVIII,
  GapLvIX,
  GapLvX,
  GapLvXI,
};

// const fsXMS = fsXMS;
export default {
  window,
  fsXXS,
  fsXS,
  fsS,
  fsSM,
  fsM,
  fsL,
  fsXL,
  fsXXL,
  fsXXXL,
  fsXXXXL,
  fs6XL,
  fs8XL,
  fs11XL,
  fsFontNsR,
  // fsXMS,
  // fsFontNsB
};
