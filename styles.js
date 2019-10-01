import { StyleSheet } from "react-native";
import layout from "./constants/Layout"

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
    alignItems: "center"
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
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: layout.window.height,
    width: layout.window.width,
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
  centerBtn: {
    marginTop: 25,
    marginLeft: 250,
    fontSize: 40,
    width: 40
  },
  listItemWithIcon: {
    flexDirection: "row",
    marginBottom: 5
  }
});
