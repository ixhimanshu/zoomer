import {StyleSheet, Platform, Dimensions} from 'react-native';
import Colors from '../../theme/colors';
const { width: screenWidth } = Dimensions.get('window')

export const CELL_SIZE = 70;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const otpStyles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================

  root: {
    minHeight: 800,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  headerText: {
    fontWeight: '700',
    color: Colors.white,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5
  },
  footer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
    borderRadius: 52,
    width: 104,
    height: 104,
    backgroundColor: Colors.white,
  },
  center: {
    alignItems: 'center',
  },
  buttonsGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  customButton: {
    width: '95%',
    borderRadius: 10,
    marginTop: 10
  },
  hspace16: {
    width: 16,
  },
  linkButtonText: {
    color: Colors.onSurface,
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '400',
    fontSize: 13,
    color: Colors.primaryColor,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  footerLink: {
    fontWeight: '400'
  },
  referral: {
    position: 'absolute',
    right: 2,
    top: -18,
    fontWeight: '500',
    // backgroundColor: '#000',
    color: '#1CD6CE'
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  inputPhone: {
    margin: 10,
    padding: 0,
    fontSize: 16,
    height: 60
  },
  inputPhoneContainer: {
    margin: 0,
    padding: 0,
    height:60

  },
  logoWrapper: {
    width: screenWidth/2,
    height: 40,
    margin: 20
  },
  logo: {
    height: 40,
    width: 'auto',
    resizeMode: 'contain',
  }
});

export default otpStyles;