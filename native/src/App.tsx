/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { Root } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TreeUpProvider from "./contexts/treeUp";
import AppContainer from "./navigations/index";
import AuthProvider from "./contexts/Auth";
import ModuleProvider from "./contexts/Module/index";

const App = () => {
  return (
    <Root>
      <SafeAreaProvider>
        <AuthProvider>
          <ModuleProvider>
            <TreeUpProvider>
              <AppContainer />
            </TreeUpProvider>
          </ModuleProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </Root>
  );
};

export default App;
