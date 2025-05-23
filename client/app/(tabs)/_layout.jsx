import { StatusBar } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import TabIcon from '../../components/TabIcon'

import HomeIcon from '../../assets/icons/home.svg'
import SearchIcon from '../../assets/icons/search.svg'
import FavoritesIcon from '../../assets/icons/book-heart.svg'
import LibraryIcon from '../../assets/icons/square-library.svg'

import { useGlobalContext } from '../../context/GlobalProvider'

const TabsLayout = () => {
  // get loading and logged in state from context
  const { loading, isLogged } = useGlobalContext()

  // if there is no loading and current user is not logged in redirect to sign in
  if (!loading && !isLogged) return <Redirect href="/sign-in" />

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#E5A000",
          tabBarInactiveTintColor: "black",
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={SearchIcon}
                color={color}
                name="Search"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={HomeIcon}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={LibraryIcon}
                color={color}
                name="Library"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={FavoritesIcon}
                color={color}
                name="Favorites"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default TabsLayout