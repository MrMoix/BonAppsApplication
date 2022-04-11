import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#4BBE77",
  },
  logo: {
    //flex: 1,
    height: 80,
    width: 400,
    alignSelf: "center",
    marginBottom: 10,
    //marginTop: 10,
  },
  button: {
    backgroundColor: "#4cce4a",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },

  buttonAdd: {
    backgroundColor: "#4cce4a",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    height: 48,
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  TitleText: {
    color: "white",
    fontSize: 32,
    textAlign: "center",
  },

  NormalText: {
    color: "white",
    fontSize: 22,
    marginTop: 20,
    textAlign: "center",
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
  },
  logoPicture: {
    height: 80,
    width: 80,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    direction: "ltr",
    backgroundColor: "#E8EFCB",
    marginBottom: 20,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 5,
  },
  restaurantContainer: {
    flex: 2,
    marginTop: 10,
    marginLeft: 10,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 25,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 15,
  },
  restuarantTitle: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
    marginBottom: 0,
  },
  restaurantDesc: {
    flex: 2,
    marginTop: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    direction: "ltr",
    alignItems: "flex-start",
  },
  icons: {
    height: 25,
    width: 25,
    //margin: 20,
  },
  restaurantText: {
    marginLeft: 15,
    marginTop: 30,
    fontSize: 18,
    marginRight: 15,
    backgroundColor: "#E8EFCB",
    color: "#1B1E1C",
    borderRadius: 5,
  },
  container2: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#4BBE77",
  },

  logo2: {
    flex: 1,
    height: 150,
    width: 250,
    alignSelf: "center",
    marginBottom: 10,
  },

  dishBox: {
    flex: 8,
    margin: 15,
    //alignItems: "left",
    backgroundColor: "#36844E",
    //justifyContent: "center",
    borderRadius: 8,
    justifyContent: "center",
  },
  dishBoxIcons: {
    height: 25,
    width: 25,
    margin: 20,
    tintColor: "white",
    borderColor: "white",
  },
});
