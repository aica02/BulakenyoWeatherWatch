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
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
    marginLeft: 20,
    marginTop: -10,
    fontSize: 80,
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
  },

  condition: {
    marginTop: -15,
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
  },

  hourlyContainer: {
    marginVertical: 10,
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
    paddingVertical: 10,
    width: '100%',
  },

  columnDay: {
    flex: 1,
    textAlign: 'left',
  },

  columnIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  columnTemp: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600',
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
    height: '85%',
    backgroundColor: '#e9eef2',
    overflow: 'visible',
    borderRadius: 20,

  },

  chatHeader: {
    backgroundColor: '#5f7f99',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },

  chatBody: {
    flex: 1,
    padding: 10,
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'relative', 
    zIndex: 1,
  },

  textInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#f0f4f7',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingRight: 50,
    color: '#333',
    elevation: 1,
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
    right: 25,
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
    borderBottomRightRadius: 2,
    maxWidth: "80%",
    elevation: 1,
  },
  botBubble: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 2,
    maxWidth: "80%",
    elevation: 1,
  },

  inputAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 80, 
    position: 'relative', 
    overflow: 'visible',
  },

  floatingBotInChat: {
    width: 125, 
    height: 165,
    position: 'absolute',
    right: -15, 
    bottom: -25, 
    zIndex: 10, 
  },
});