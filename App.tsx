import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation";
import { AppContextProvider } from "./src/global/AppContext";

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      {/* <Provider store={store}> */}
      <AppContextProvider>
        <Navigation />
      </AppContextProvider>
      {/* </Provider> */}
    </SafeAreaProvider>
  );
}

export default App;
