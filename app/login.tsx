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

export default function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const { userEmail, userPassword, setIsAuthenticated } =
    useContext(ClickCountContext); // Access context values
  const router = useRouter(); // Hook for navigation

  const handleLogin = () => {
    let formValid = true;
    const newErrors: any = {}; // Store errors to display

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
      // Check if credentials match with context values
      if (email === userEmail && password === userPassword) {
        setIsAuthenticated(true); // Update authentication status
        router.push("/home"); // Redirect to home page
      } else {
        setErrors({ ...newErrors, password: "Invalid credentials" }); // Show error if credentials don't match
      }
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-vector/spacecraft_52683-7131.jpg?t=st=1735134291~exp=1735137891~hmac=a8c9419ca2683296c40a6fc4c96408fd2fdd22d2ce999814fe2193c04cc02012&w=740",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Galaxy Guide</Text>
       
      
        <TextInput
          placeholderTextColor="#fff"
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          placeholderTextColor="#fff"
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Create Your Own Account?{" "}
          <Text style={styles.link}>
            <Link href="/">Sign Up</Link>
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
    padding: 20,
    backgroundColor: "rgba(11, 30, 68, 0.8)", // Space Blue overlay for readability
  },
  logoContainer: {
    flexDirection: "row",
    marginBottom: 30,
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
  cardImage: {
    height: 170,
    width: "48%",
    borderRadius: 30,
  },
});
