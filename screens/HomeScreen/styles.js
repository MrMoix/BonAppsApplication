import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 20,
  },
  logo: {
    //flex: 1,
    height: 80,
    width: 400,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
    marginLeft: 0,
  },
  restaurantCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    direction: "ltr",
    backgroundColor: "#ECEFE2",
    marginBottom: 20,
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
    fontStyle: "italic",
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
  },
  restaurantText: {
    marginLeft: 15,
    marginTop: 30,
    fontSize: 18,
    backgroundColor: "#ECEFE2",
  },
});
