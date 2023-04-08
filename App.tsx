import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation";
import { AppContextProvider } from "./src/global/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <Provider store={store}> */}
        <AppContextProvider>
          <Navigation />
        </AppContextProvider>
        {/* </Provider> */}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
