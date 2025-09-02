import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function TabsLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: "orange",
            headerStyle: {
                backgroundColor: "#25292e"
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            tabBarStyle: {
                backgroundColor: "#25292e"
            },
        }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          headerTitle: "StickerSmash",
          tabBarIcon: ({focused, color}) => (
          <Ionicons 
            name={focused ? "home-sharp" : "home-outline"}
            color={color}
            size={24}
          />),
        }}
      />
      <Tabs.Screen 
        name="about" 
        options={{
          headerTitle: "About",
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
                name={focused ? "information-circle" : "information-circle-outline"}
                color={color}
                size={24}
            />
          )
        }}
      />
    </Tabs>
  )
}
