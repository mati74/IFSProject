import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './Routes';

const Stack = createStackNavigator()
const AppNavigator = () => (
  <Stack.Navigator>
    {
      Routes.map((Route) => {
        return (
          <Stack.Screen name={Route.name} component={Route.component} options={Route.options} key={Route.name} />
        )
      })
    }
  </Stack.Navigator>
)

export default AppNavigator
