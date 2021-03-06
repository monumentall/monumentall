import { StyleSheet } from "react-native";
import layout from "./constants/Layout";

export const reusableStyles = StyleSheet.create({
  listIcon: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: "grey",
    marginRight: 10,
    alignSelf: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header1: {
    marginTop: 15,
    marginBottom: 10,
    fontFamily: "nunito-bold",
    fontSize: 20
  },
  header2: {
    fontFamily: "nunito-bold",
    fontSize: 16
  },
  text1: {
    fontFamily: "nunito"
  },
  block: {
    margin: 5,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white"
  },
  scrollblock: {
    margin: 5,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white",
    height: layout.window.height * .8
  },
  scrollblockcontent: {
    paddingBottom: 50
  },
  flexrow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "black",
    flex: 1,
    margin: 5,
    padding: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});

export const specificStyles = StyleSheet.create({
  insetPic: {
    height: 75,
    width: 75,
    borderRadius: 100,
    backgroundColor: "black"
  },
  main: {
    flex: 1
  },
  landmarkContainer : {
    margin: 5,
    borderRadius: 20,
    height: layout.window.height * .8
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: layout.window.height,
    width: layout.window.width
  },
  menuBtn: {
    marginTop: 25,
    marginLeft: 15,
    fontSize: 40,
    width: 40
  },
  menuContainer: {
    flex: 1,
    position: "absolute",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#00000080"
  },
  menu: {
    width: 200,
    height: 300,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  centerBtnContainer: {
    position: "absolute",
    top: layout.window.height - layout.window.height / 1.05,
    left: layout.window.width - layout.window.width * 0.15,
    width: 50,
    height: 50
  },
  listItemWithIcon: {
    flexDirection: "row",
    marginBottom: 5
  },
  drawerButtons: {
    fontFamily: "nunito-bold",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    padding: 5
  },
  drawerButtonsBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  listButtons: {
    fontFamily: "nunito-bold",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    padding: 5,
    textAlign: "center"
  }
});
