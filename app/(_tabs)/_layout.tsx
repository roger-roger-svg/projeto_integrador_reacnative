import { Tabs, useNavigation, useRouter } from 'expo-router'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity ,Image, ImageBackground} from 'react-native'
import { API } from '../../http/API'
import { Usuario } from '../../models/Usuario'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import SearchBar from '../../components/SearchBar'
import  Constants from 'expo-constants'
const MenuInferior = () => {
  const router = useRouter();
  const nav = useNavigation();
  const [usuario, setUsuario] = useState<Usuario>();
  const idUsuario = useContext(AuthContext)
  const headerHeight = Constants.statusBarHeight * 2

  useEffect(() => {
    API.get<Usuario>(`Usuario/${idUsuario}`).then((response) => setUsuario(response.data))
  }, [])  

  return (

      <Tabs
        
        initialRouteName="(dashboard)"
        screenOptions={{
          headerBackground: () => (
            <ImageBackground source={require('../../assets/data/gradient.png')} resizeMode="stretch" style={{flex:1}}/>
          ),

          
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: '10%',
            paddingBottom: 0,
            marginBottom: 35,
            borderRadius: 20,
            borderColor: 'gray',
            width:'80%',
            alignSelf: 'center',
            maxHeight: 50

            // shadowColor: 'black',
            // shadowRadius: 200,
            // shadowOffset: '5'
          },
          // tabBarItemStyle: {
          //   flex: 1,
          //   justifyContent: 'center',
          //   alignItems: 'center'
          // },
          tabBarShowLabel: false,
          tabBarLabelStyle: {fontSize: 11},
          tabBarInactiveTintColor: '#828282',
          tabBarActiveTintColor:'#F47402',
          headerStatusBarHeight: headerHeight,
          headerTitleAlign: 'center',
          headerTitle: () => (
                <SearchBar/>
          ),
          headerRightContainerStyle: { paddingRight: 10},
          headerRight: () => (
            <Feather
              backgroundColor='transparent'
              onPress={() => router.push('/Mensagens')}
              name='message-square'
              size={24}
              color="black"
              borderRadius={50}
          />
          ),
          headerLeftContainerStyle: { paddingLeft: 10},
          headerLeft: () => (
            <TouchableOpacity onPress={() => nav.openDrawer()}>
              {usuario && <Image
                alt='profilePic'
                style={{height: 40, width: 40, borderRadius: 50}}
                source={{uri: `data:image/png;base64,${usuario.foto}`}}
              />}
              
            </TouchableOpacity>
          )
        }}
      >
        <Tabs.Screen
          name="(dashboard)"
          options={{
            //tabBarLabel: 'Home',
            tabBarIcon: ({size, color}) => (
              <MaterialIcons name="home" size={size} color={color}/>
            )
          }}
        />
        <Tabs.Screen
          name="Calendario"
          options={{
            //tabBarLabel: 'Calendario',
            tabBarIcon: ({size, color}) => (
              <MaterialIcons name="calendar-today" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="Badges"
          options={{
            //tabBarLabel: 'Badges',
            tabBarIcon: ({size, color}) => (
              <Ionicons name="ios-trophy" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="Arquivos"
          options={{
            //tabBarLabel: 'Arquivos',
            tabBarIcon: ({size, color}) => (
              <MaterialIcons name="folder" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="Notificacoes"
          options={{
            tabBarBadge: 3,
            //tabBarLabel: 'Notificações',

            tabBarIcon: ({size, color}) => (
              <MaterialIcons name="notifications" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="Mensagens"
          options={{
            href: null
          }}
        />
      </Tabs>
  )
}

export default MenuInferior
