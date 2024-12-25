import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";
// import { ClickCountContext } from "./context"; // Import the context

export default function Index() {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const { setUserEmail, setUserPassword, setYourName } =
    useContext(ClickCountContext); // Access context functions
  const router = useRouter(); // Hook for navigation

  const handleSignUp = () => {
    setYourName(name);
    let formValid = true;
    const newErrors: any = {}; // Store errors to display

    // Basic name validation
    if (!name) {
      newErrors.name = "Name is required";
      formValid = false;
    }

    // Basic email validation
    if (!email) {
      newErrors.email = "Email is required";
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      formValid = false;
    }

    // Basic password validation
    if (!password) {
      newErrors.password = "Password is required";
      formValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formValid = false;
    }

    setErrors(newErrors); // Update error state

    if (formValid) {
      // Save email and password in context
      setUserEmail(email);
      setUserPassword(password);
      router.push("/login"); // Navigate to login page
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-vector/space-exploring-cartoon-poster-rocket-outer-galaxy-with-planets-starry-sky-nebula-flying-rocks_107791-6369.jpg?t=st=1735133948~exp=1735137548~hmac=6b3866dc7de67c79e2ae901c47ba4695f6494d4aa43cf691ea35f0f8b83318f5&w=360",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Galaxy Guide
        </Text>
       
        
        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {/* Footer Text */}
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link}>
            <Link href="/login">Login</Link>
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(11, 30, 68, 0.8)", // Space Blue overlay for readability
    padding: 20,
  },
  logoContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: "#FFD700", // Starlight Yellow
    margin: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFD700", // Starlight Yellow
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    color: "#FFFFFF", // Moonlight White
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
    borderColor: "#7F53AC", // Cosmic Purple
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#FF4500", // Rocket Red
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  cardImage: {
    height: 170,
    width: "48%",
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFFFFF", // Moonlight White
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#FFD700", // Starlight Yellow
  },
  link: {
    color: "#FF4500", // Rocket Red
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "#FF4500", // Rocket Red
    fontSize: 12,
    marginBottom: 10,
  },
});
