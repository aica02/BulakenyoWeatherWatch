
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chatbotPeek: {
    position: "absolute",
    bottom: 20,
    right: -66,
    width: 175,
    height: 175,
    resizeMode: "contain",
  },
  
  chatbotStanding: {
    position: "absolute",
    bottom: 5,
    right: -10,
    width: 160,
    height: 160,
    zIndex: 999,
  },

  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  topSection: {
    alignItems: "center",
    marginBottom: 20,
  },

  location: {
    color: "#fff",
    fontSize: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 70,
  },

  locationText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
  },

  temperature: {
    fontSize: 80,
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
  },

  condition: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
  },

  hourlyContainer: {
    marginVertical: 20,
  },

  hourCard: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 15,
    marginRight: 10,
    alignItems: "center",
    width: 75,
  },

  hourText: {
    fontFamily: "Montserrat_400Regular",
    color: "#3498da",
  },

  icon: {
    fontSize: 24,
    marginVertical: 5,
  },

  tempSmall: {
    fontFamily: "Montserrat_400Regular",
    color: "#3498da",
  },

  dailyContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },

  dailyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  dayText: {
    fontFamily: "Montserrat_400Regular",
    color: "#3498da",
  },

  tempRange: {
    fontFamily: "Montserrat_400Regular",
    color: "#3498da",
  },
  
  bottomContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },


  infoCard: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 15,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 5,

    // ios shadow - pls check
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.16,
    // shadowRadius: 4,

  },

  infoText: {
    fontFamily: "Montserrat_700Bold",
    color: "white",
    fontSize: 18,
  },

  label: {
    fontFamily: "Montserrat_400Regular",
    color: "#a0bdd5",
    fontSize: 12,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  chatContainer: {
    width: "90%",
    height: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
  },

  chatHeader: {
    backgroundColor: "#7297b4",
    padding: 10,
  },
  
  headerText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },

  chatScroll: {
    flex: 1,
    padding: 15,
  },

  botBubble: {
    backgroundColor: "#d1e5f4",
    padding: 15,
    borderRadius: 10,
    borderBottomLeftRadius: 2,
    alignSelf: "flex-start",
    width: "80%",
    height: 50,
    marginBottom: 20,
  },

  userBubble: {
    backgroundColor: "#7297b4",
    padding: 15,
    borderRadius: 10,
    borderBottomRightRadius: 2,
    alignSelf: "flex-end",
    width: "60%",
    height: 50,
    marginBottom: 20,
  },

  bubbleAvatar: {
    width: 40,
    height: 40,
    marginTop: 5,
  },
  
  inputArea: {
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  sendIcon: {
    fontSize: 24,
    color: "#7297b4",
  },

  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    fontFamily: "Montserrat_400Regular",
  },

  backButton: {
    position: "absolute",
    top: 5,
    right: 5,

  },
  
  xIcon: {
    fontSize: 30,
    color: "white",
  },

});