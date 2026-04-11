import React, { useState, useEffect } from "react";
import { 
  View, Text, ImageBackground, ScrollView, Image, 
  TouchableOpacity, Modal, TextInput, ActivityIndicator 
} from "react-native";
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles/WeatherScreen";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';

const WeatherIcons: any = {
  cloudy: require("../assets/Cloudy.png"),
  day: require("../assets/Day.png"),
  dayCloudy: require("../assets/Day-Cloudy.png"),
  dayRain: require("../assets/Day-Rain.png"),
  dayWindy: require("../assets/Day-Windy.png"),
  humidity: require("../assets/Humidity.png"),
  location: require("../assets/Location.png"),
  night: require("../assets/Night.png"),
  nightRain: require("../assets/Night-Rain.png"),
  nightThunder: require("../assets/Night-Thunderstorm.png"),
  rainRate: require("../assets/Rain-Rate.png"),
  thermometer: require("../assets/Thermometer.png"),
  windy: require("../assets/Windy.png"),
};

const API_KEY = "sa messenger"; 

interface HourlyData {
  time: string;
  temp: number;
  icon: any; 
}

interface DailyData {
  dayName: string;
  tempMax: number;
  tempMin: number;
  icon: any;
}

interface WeatherData {
  temp: number;
  condition: string;
  humidity: string;
  rainChance: string;
  feelsLike: string;
  isDay: boolean;
  hourly: HourlyData[];
  daily: DailyData[];
}

const genAI = new GoogleGenerativeAI("sa messenger");
const model = genAI.getGenerativeModel(
  { model: "gemini-2.5-flash" },
  { apiVersion: "v1" }
);

const WeatherScreen = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [locationName, setLocationName] = useState("Detecting...");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: string, parts: {text: string}[]}[]>([
    {
      role: "user",
      parts: [{ text: `You are "BulaWatch AI," a specialized weather assistant for Bulacan, Philippines.
        - Use Taglish naturally.
        - Mention landmarks like Barasoain Church or Philippine Arena when relevant.
        - If location is Hagonoy or Calumpit and rainChance > 40%, warn about local flooding.
        - Always emphasize the Heat Index (Feels Like) for safety.
        - If temp > 33°C, recommend hydration.
        - Keep responses short and mobile-friendly. 
        Confirm if you are ready.` }]
    },
    {
      role: "model",
      parts: [{ text: "Hello! Ako si BulaWatch AI, ang iyong weather assistant dito sa Bulacan. Kumusta ang panahon sa inyong lugar?" }]
    }
  ]);
  const [isSending, setIsSending] = useState(false);

  const getCustomIcon = (text: string, isDay: boolean) => {
    const condition = text.toLowerCase();
    
    if (condition.includes("thunder") || condition.includes("storm")) {
      return isDay ? WeatherIcons.dayRain : WeatherIcons.nightThunder;
    }
    if (condition.includes("showers") || condition.includes("rain")) {
      return isDay ? WeatherIcons.dayRain : WeatherIcons.nightRain;
    }
    if (condition.includes("wind")) {
      return isDay ? WeatherIcons.dayWindy : WeatherIcons.windy;
    }
    if (condition.includes("patchy") || condition.includes("partly")) {
      return isDay ? WeatherIcons.dayCloudy : WeatherIcons.night;
    }
    if (condition.includes("cloud") || condition.includes("overcast")) {
      return WeatherIcons.cloudy;
    }
    if (condition.includes("sun") || condition.includes("clear")) {
      return isDay ? WeatherIcons.day : WeatherIcons.night;
    }
    return WeatherIcons.day; 
  };

const fetchWeather = async (lat: number, lon: number) => {
  try {
    // 1. Fetch 7 days to satisfy the Daily Forecast requirement
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no`
    );
    const data = await response.json();

    // --- HOURLY LOGIC (24 hours) ---
    const currentHour = new Date().getHours();
    
    const allAvailableHours = [
      ...data.forecast.forecastday[0].hour,
      ...data.forecast.forecastday[1].hour
    ];

    const hourlyForecast = allAvailableHours
      .slice(currentHour, currentHour + 24)
      .map((h: any, index: number) => {
        const timeDate = new Date(h.time);
        return {
          time: index === 0 
            ? "Now" 
            : timeDate.toLocaleTimeString([], { hour: 'numeric', hour12: true }),
          temp: Math.round(h.temp_c),
          icon: getCustomIcon(h.condition.text, h.is_day === 1)
        };
      });

    // --- DAILY LOGIC (7 Days) ---
    const dailyForecast = data.forecast.forecastday.map((d: any) => {
      const date = new Date(d.date);
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return {
        dayName: days[date.getDay()],
        tempMax: Math.round(d.day.maxtemp_c),
        tempMin: Math.round(d.day.mintemp_c),
        icon: getCustomIcon(d.day.condition.text, true)
      };
    });

    // --- UPDATE STATE ---
    setWeatherData({
      temp: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      humidity: `${data.current.humidity}%`,
      rainChance: `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`,
      feelsLike: `${Math.round(data.current.feelslike_c)}°`,
      isDay: data.current.is_day === 1,
      hourly: hourlyForecast,
      daily: dailyForecast
    });

  } catch (err) {
    setErrorMsg("Failed to fetch weather data");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Location permission denied');
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0) {
        const item = address[0];
        setLocationName(`${item.district || item.city || 'Hagonoy'}, ${item.region || 'Bulacan'}`);
      }
      fetchWeather(latitude, longitude);
    })();
  }, []);

  const backgroundImage = weatherData?.isDay
    ? require("../assets/morningBG.png")
    : require("../assets/eveningBG.png");

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', backgroundColor: '#121212' }]}>
        <ActivityIndicator size="large" color="#3498da" />
        <Text style={{ textAlign: 'center', color: 'white', marginTop: 15 }}>Checking Bulacan skies...</Text>
      </View>
    );
  }

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    // Optional: Show a small toast or alert so the user knows it worked
    Alert.alert("Copied", "Message copied to clipboard!");
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isSending) return;

    setHasError(false);
    const userMessage = chatInput;
    setChatInput("");
    setIsSending(true);

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const weatherContext = `
      Current Time: ${currentTime}
      Location: ${locationName}
      Temp: ${weatherData?.temp}°C
      Feels Like: ${weatherData?.feelsLike}
      Condition: ${weatherData?.condition}
      Rain Chance: ${weatherData?.rainChance}
    `;
    const updatedHistory = [...chatHistory, { role: "user", parts: [{ text: userMessage }] }];
    setChatHistory(updatedHistory);

    try {
    
      const prompt = `
        STRICT RULE: Use ONLY the provided weather data below. 
        Do not calculate your own Heat Index. and do not make up any weather details that are not given.
        If the user asks for current weather, use the provided data. 
        If the user asks for advice (e.g. "Should I bring an umbrella?"), base it solely on the provided data.
        Always keep responses concise and relevant to Bulacan's weather.
        Do not use Markdown formatting like asterisks (**) or hashtags (#). 
        Write in plain text only.
         
        Current context:
        
        ${weatherContext}
        
        User says: ${userMessage}
      `;
      
      const historyWithContext = updatedHistory.map((msg, index) => {
        if (index === updatedHistory.length - 1) {
          return {
            role: "user",
            parts: [{ 
              text: `
                STRICT RULES: No markdown (**), no hashtags. Use ONLY this data:
                ${weatherContext}
                
                User Message: ${userMessage}
              ` 
            }]
          };
        }
        return msg;
      });
      
      // We pass the whole history so it remembers the persona
      const result = await model.generateContent({
        contents: historyWithContext
      });

      const response = await result.response;
      const text = response.text();
      
      setChatHistory(prev => [...prev, { role: "model", parts: [{ text }] }]);
    } catch (error) {
      //error message na red
      console.error("BulaWatch Error:", error);
      // Log the full error to your terminal to see if it's an API Key issue
      const friendlyError = "Pasensya na po, medyo busy ang servers ko ngayon. 🤖 Subukan niyo po ulit mamaya nang konti!";
    
      setChatHistory(prev => [...prev, { 
        role: "model", 
        parts: [{ text: friendlyError }] 
      }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container} blurRadius={10}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.location}>
            <Image source={WeatherIcons.location} style={{width: 20, height: 20, marginRight: 5}} />
            <Text style={styles.locationText}>{errorMsg || locationName}</Text>
          </View>
          
          <Image 
            source={getCustomIcon(weatherData?.condition || "", weatherData?.isDay || false)} 
            style={{width: 140, height: 140, marginTop: 10}} 
          />
          
          <Text style={styles.temperature}>{weatherData?.temp}°</Text>
          <Text style={styles.condition}>{weatherData?.condition}</Text>
        </View>

        {/* 24-Hour Forecast */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={[styles.dayText, { fontSize: 18, marginBottom: 10 }]}>24-Hour Forecast</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyContainer}>
          {weatherData?.hourly.map((item, index) => (
            <View key={index} style={styles.hourCard}>
              <Text style={styles.hourText}>{item.time}</Text>
              <Image source={item.icon} style={{width: 40, height: 40}} />
              <Text style={styles.tempSmall}>{item.temp}°</Text>
            </View>
          ))}
        </ScrollView>

        {/* 7-Day Forecast */}
        <View style={styles.dailyContainer}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 10, marginBottom: 10 }}>
            <Text style={[styles.dayText, { fontSize: 18 }]}>7-Day Forecast</Text>
          </View>
          
          {weatherData?.daily.map((day, index) => (
            <View key={index} style={styles.dailyRow}>
              <Text style={styles.dayText}>{index === 0 ? "Today" : day.dayName}</Text>
              <Image source={day.icon} style={{width: 35, height: 35}} />
              <Text style={styles.tempRange}>{day.tempMin}° / {day.tempMax}°</Text>
            </View>
          ))}
        </View>

        {/* Bottom Details */}
        <View style={styles.bottomContainer}>
          <InfoCard customIcon={WeatherIcons.humidity} value={weatherData?.humidity || "0%"} label="Humidity" />
          <InfoCard customIcon={WeatherIcons.rainRate} value={weatherData?.rainChance || "0%"} label="Rain Chance" />
          <InfoCard customIcon={WeatherIcons.thermometer} value={weatherData?.feelsLike || "0°"} label="Feels Like" />
        </View>
      </ScrollView>

      {/* CHATBOT ENTRY ICON */}
      {!isChatVisible && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsChatVisible(true)}
          style={{
            position: 'absolute',
            bottom: 30,
            right: 10,
            zIndex: 100,
            elevation: 100
          }}
        >
          <Image source={require("../assets/chatbot-cloud-peek.png")} style={styles.chatbotPeek} />
        </TouchableOpacity>
      )}

      {/* THE MODAL */}
      <Modal animationType="slide" transparent visible={isChatVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.chatContainer}>

            {/* HEADER */}
            <View style={styles.chatHeader}>
              <Text style={styles.headerText}>BulaWatch AI</Text>
              <TouchableOpacity 
                onPress={() => setIsChatVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialCommunityIcons name="close" size={28} color="white" />
              </TouchableOpacity>
            </View>

            {/* CHAT BODY */}
            <View style={styles.chatBody}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* .slice(1) skips the internal instructions message */}
                {chatHistory.slice(1).map((msg, index) => {
                  // Keep this at [0] to avoid the crash
                  const rawText = msg.parts?.[0]?.text || "";
                  
                  const cleanText = rawText
                    .replace(/STRICT:.*User:/s, "")
                    .replace(/\*\*/g, "");

                  return (
                    <TouchableOpacity 
                      key={index} 
                      onLongPress={() => copyToClipboard(cleanText)}
                      delayLongPress={500}
                      style={msg.role === "user" ? [styles.userRow, { marginVertical: 8 }] : [styles.botRow, { marginVertical: 8 }]}
                    >
                      {msg.role !== "user" && <Image source={require("../assets/chatbot-cloud.png")} style={styles.botIcon} />}
                      <View style={msg.role === "user" ? styles.userBubble : styles.botBubble}>
                        <Text style={{ color: msg.role === "user" ? "white" : "#333" }}>{cleanText}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                {hasError && (
                  <TouchableOpacity onPress={handleSendMessage} style={{ alignSelf: 'center', marginVertical: 10 }}>
                    <Text style={{ color: '#ff6b6b', fontSize: 12, fontWeight: 'bold' }}>⚠️ Connection busy. Tap to retry.</Text>
                  </TouchableOpacity>
                )}
                
                {isSending && <ActivityIndicator color="#5f7f99" style={{ marginTop: 10 }} />}
              </ScrollView>
            </View>

            {/* FIXED INPUT AREA */}
              <View style={styles.inputAreaContainer}> 
                <View style={styles.inputArea}>
                <TextInput 
                  style={styles.textInput}
                  value={chatInput}
                  onChangeText={setChatInput}
                  placeholder="Text Input Here..."
                  placeholderTextColor="#6b8ba4"
                />
                <TouchableOpacity 
                  onPress={handleSendMessage} 
                  style={styles.sendButton}
                  disabled={isSending}
                >
                  <MaterialCommunityIcons 
                    name={isSending ? "dots-horizontal" : "send"} 
                    size={24} 
                    color="#5f7f99" 
                  />
                </TouchableOpacity>
              </View>
              {/* chat bot*/}
              <Image 
                source={require("../assets/chatbot-cloud.png")} 
                style={styles.floatingBotInChat}
              />
            </View>
          </View>
          
        </View>
      </Modal>
    </ImageBackground>
  );
};

// Updated InfoCard Component
interface InfoCardProps {
  customIcon: any;
  value: string;
  label: string;
}

const InfoCard = ({ customIcon, value, label }: InfoCardProps) => (
  <View style={styles.infoCard}>
    <Image source={customIcon} style={{width: 45, height: 45}} />
    <View style={{ marginLeft: 8 }}>
      <Text style={styles.infoText}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  </View>
);

export default WeatherScreen;