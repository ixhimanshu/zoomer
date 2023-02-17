// import config setting
import config from "../config";

// Color Themes
const themes = {
  food: {

    // primary color
    primaryLightColor: "#2FA4FF",
    primaryColor: "#16213E",//00b970//0E185F
    primaryColorDark: "#0E3EDA",
    primaryColorLight: "#00FFDD",
    onPrimaryColor: "#ffffff",//
    customonOnPrimaryColor:'#0E185F',

    //dark background
    //darkBackgroundColor:'#0E185F',
    //darkScreenPrimaryText:'#ffffff',
    //darkScreensecondaryText:'#ffffff',

    // accent color, triad
    accentColor: "#0069b9",
    onAccentColor: "#fff",

    // secondary color, primary color split
    secondaryColor: "#b90039",
    onSecondaryColor: "#fff",

    // tertiary color, secondary color intermediately related
    tertiaryColor: "#ffa400",
    onTertiaryColor: "#fff",

    // status bar color
    statusBarColor: "#0E185F",//#fff

    // gradient colors
    primaryGradientColor: "#0E185F",
    secondaryGradientColor: "#0E185F",

    // overlay color
    overlayColor: "#b90039",

    // text color
    primaryText: "#010203",//#010203
    secondaryText: "#5d5d5d",
    disabledText: "rgba(0, 0, 0, 0.38)",

    // background, surface
    background: "#ffffff",
    onBackground: "#212121",
    surface: "#fff",
    onSurface: "#757575",
    error: "#cd040b",
    onError: "#fff",
    black: "#010203",
    white: "#ffffff",
    red: '#ff1616'
  }
};

const theme = themes[config.theme];

export default theme;
