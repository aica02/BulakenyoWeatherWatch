import React, {useState} from "react";
import { View, Text, ImageBackground, ScrollView, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles/WeatherScreen";

const WeatherScreen = () => {

  const [isChatVisible, setIsChatVisible] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/morningBG.png")}
      style={styles.container}
      blurRadius={10}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.location}>
            <MaterialCommunityIcons
                name="map-marker"
                size={18}
                color="#3498da"
            />
            <Text style={styles.locationText}>San Agustin, Hagonoy</Text>
            </View>
          <Text style={styles.temperature}>32°</Text>
          <Text style={styles.condition}>Partly Cloudy</Text>
        </View>

        {/* Hourly Forecast */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hourlyContainer}
        >
          {["15:00", "16:00", "17:00", "18:00", "19:00"].map((time, index) => (
            <View key={index} style={styles.hourCard}>
              <Text style={styles.hourText}>{time}</Text>
              <Text style={styles.icon}>
                <MaterialCommunityIcons
                    name="weather-sunny"
                    size={40}
                    color="white"
                />
              </Text>
              <Text style={styles.tempSmall}>32°</Text>
            </View>
          ))}
        </ScrollView>

        {/* Daily Forecast */}
        <View style={styles.dailyContainer}>
          {["Fri", "Sat", "Sun"].map((day, index) => (
            <View key={index} style={styles.dailyRow}>
              <Text style={styles.dayText}>{day}</Text>
              <Text style={styles.icon}>
                <MaterialCommunityIcons
                    name="weather-cloudy"
                    size={40}
                    color="white"
                />
              </Text>
              <Text style={styles.tempRange}>24° / 34°</Text>
            </View>
          ))}
        </View>

        {/* Bottom Info */}
        <View style={styles.bottomContainer}>
          <View style={styles.infoCard}>
            <MaterialCommunityIcons
                name="water-percent"
                size={40}
                color="white"
            />
            <View>
                <Text style={styles.infoText}>58%</Text>
                <Text style={styles.label}>Humidity</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <MaterialCommunityIcons
                name="weather-rainy"
                size={40}
                color="white"
            />
            <View>
                <Text style={styles.infoText}>5%</Text>
                <Text style={styles.label}>Rain Chance</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <MaterialCommunityIcons
                name="thermometer"
                size={40}
                color="white"
            />
            <View>
                <Text style={styles.infoText}>38%</Text>
                <Text style={styles.label}>Feels Like</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <Image source={require("../assets/chatbot-cloud-peek.png")} style={styles.chatbotImage} /> */}

      {!isChatVisible && (
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => setIsChatVisible(true)}
        >
          <Image 
            source={require("../assets/chatbot-cloud-peek.png")} 
            style={styles.chatbotPeek}
          />
        </TouchableOpacity>
      )}

      {/* 2. Chat Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isChatVisible}
        onRequestClose={() => setIsChatVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.chatContainer}>
            {/* Header */}
            <View style={styles.chatHeader}>
              <Text style={styles.headerText}>Nimbus AI</Text>
            </View>

            {/* Chat Body */}
            <ScrollView style={styles.chatScroll}>
              <View style={styles.botBubble} />
              <Image source={require("../assets/chatbot-cloud.png")} style={styles.bubbleAvatar} />
              
              <View style={styles.userBubble} />
              
              <View style={styles.botBubble} />
              <Image source={require("../assets/chatbot-cloud.png")} style={styles.bubbleAvatar} />
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputArea}>
              <TextInput style={styles.textInput} placeholder="Text Input Here..." />
              <TouchableOpacity>
                <MaterialCommunityIcons name="send" style={styles.sendIcon}/>
              </TouchableOpacity>
            </View>
          </View>

          {/* Background Close Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setIsChatVisible(false)}
          >
            <MaterialCommunityIcons name="close-circle" style={styles.xIcon} />
          </TouchableOpacity>

          <Image 
              source={require("../assets/chatbot-cloud.png")} 
              style={styles.chatbotStanding} 
          />
        </View>
      </Modal>

    </ImageBackground>
  );
};

export default WeatherScreen;