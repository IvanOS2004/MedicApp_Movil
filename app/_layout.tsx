import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import "../global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
