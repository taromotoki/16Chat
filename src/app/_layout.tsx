import 'expo-dev-client'
import { Stack } from 'expo-router'

const Layout = (): JSX.Element => {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#467FD3'
    },
    headerTintColor: '#ffffff',
    headerTitle: 'Just Memo',
    headerBackTitle: 'Back',
    headerTitleAlign: 'left',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold'
    }
  }} />
}

export default Layout
