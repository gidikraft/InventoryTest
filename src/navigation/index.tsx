import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./RootNavigation";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}
