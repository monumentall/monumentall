import { StyleSheet } from "react-native";

export const reusableStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headline: {
    marginTop: 25,
    alignSelf: "center"
  }
});

export const specificStyles = StyleSheet.create({
  main: {
    flex: 1
  },
  hamburger: {
    marginTop: 25,
    marginLeft: 15,
    //need position absolute for hamburger icon to recognize padding
    position: "absolute"
  },
  menuContainer: {
    flex: 1,
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
  }
});
