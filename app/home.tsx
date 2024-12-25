import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

export default function Home() {
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext);
  const [articles, setArticles] = useState<any[]>([]);

  // Fetch articles from Spaceflight News API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://api.spaceflightnewsapi.net/v4/articles?limit=10"
        );
        const data = await response.json();
        setArticles(data.results); // Set articles from API response
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  // Handle item clicks
  const handleItemClick = () => {
    setClickCount(clickCount + 1); // Update click count using context
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Hi {" " + yourName} 👋</Text>
      </View>

      {/* Articles List */}
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={handleItemClick}
          >
            <Image source={{ uri: item.image_url }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.summary}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1E44", // Space Blue
  },
  topBar: {
    height: 60,
    backgroundColor: "#FF4500", // Rocket Red
    justifyContent: "center",
    alignItems: "center",
  },
  topBarText: {
    color: "#FFFFFF", // Moonlight White
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    borderColor: "#7F53AC", // Cosmic Purple
    borderWidth: 1,
  },
  cardImage: {
    height: 150,
    width: "100%",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700", // Starlight Yellow
  },
  cardDescription: {
    fontSize: 14,
    color: "#FFFFFF", // Moonlight White
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF4500", // Rocket Red
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#FFFFFF", // Moonlight White
    fontSize: 18,
    fontWeight: "bold",
  },
});
