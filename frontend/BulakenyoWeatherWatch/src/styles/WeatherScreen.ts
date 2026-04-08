import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chatbotPeek: {
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  chatContainer: {
    width: '90%',
    height: '75%',
    backgroundColor: '#e9eef2',
    borderRadius: 25,
    overflow: 'hidden'
  },

  chatHeader: {
    backgroundColor: '#5f7f99',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',       // Align items horizontally
    justifyContent: 'space-between', // Push title and X apart
    alignItems: 'center',       // Center them vertically
  },

  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },

  chatBody: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-around'
  },

  botRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 8, 
    paddingHorizontal: 2,
  },

  botIcon: {
    width: 40,
    height: 40,
    marginRight: 8
  },

  botBubbleLarge: {
    flex: 1,
    height: 80,
    backgroundColor: '#a9c0d4',
    borderRadius: 20,
  },

  centerButton: {
    alignSelf: 'center',
    width: '60%',
    height: 45,
    backgroundColor: '#5f7f99',
    borderRadius: 15
  },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'relative', 
  },

  textInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#f0f4f7',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingRight: 50, // This creates space so text doesn't go under the button
    color: '#333',
  },

  floatingBot: {
    width: 70, 
    height: 70, 
    position: 'absolute', 
    right: -5, 
    bottom: 10,
    zIndex: 10 
  },

  sendButton: {
    position: 'absolute',
    right: 25, // Adjusted to sit inside the input bar
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userRow: {
    flexDirection: "row-reverse",
    alignItems: 'flex-end',
    marginVertical: 8, 
    paddingHorizontal: 10,
  },

  userBubble: {
    backgroundColor: "#5f7f99",
    padding: 12,
    borderRadius: 18,
    borderTopRightRadius: 2, // Gives it a "speech bubble" look
    maxWidth: "80%",
  },
  botBubble: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 18,
    borderTopLeftRadius: 2,
    maxWidth: "80%",
    elevation: 1, // Slight shadow for bot messages
  },
  // Add or update these specific styles:
  inputAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 60, // Create space for the robot icon on the right
    position: 'relative',
  },
  floatingBotInChat: {
    width: 80, 
    height: 80,
    position: 'absolute',
    right: -10, // Moves it slightly outside the chat container
    bottom: -10, // Aligns it with the bottom of the input area
  },

});