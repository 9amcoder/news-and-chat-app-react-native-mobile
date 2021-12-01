import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
// import {
//   Text,
//   View,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { IconButton, Colors } from 'react-native-paper'
import SafareaBar from '../../components/SafareaBar'
import styles from '../../globalStyles'
import { firebase } from '../../firebase/config'
import { colors } from 'theme'
import { UserDataContext } from '../../context/UserDataContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import {
  Box,
  Center,
  Text,
  ScrollView,
  HStack,
  VStack,
  Stack,
  Flex,
  Heading,
} from 'native-base'
import axios from 'axios'

export default function Home() {
  const navigation = useNavigation()
  const [token, setToken] = useState('')
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
  const [cryptoData, setCryptoData] = useState([])
  const [cryptoStatus, setCryptoStatus] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="cast"
          color={Colors.blue500}
          size={24}
          onPress={() => headerButtonPress()}
        />
      ),
    })
  }, [navigation])

  const headerButtonPress = () => {
    alert('Tapped header button')
  }

  useEffect(() => {
    const tokenListener = firebase
      .firestore()
      .collection('tokens')
      .doc(userData.id)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          const data = doc.data()
          setToken(data)
        } else {
          console.log('No such document!')
        }
      })
    return () => tokenListener()
  }, [])

  useEffect(() => {
    getRequest()
  }, [])

  //axios get request for The Crypto Data
  const getRequest = async () => {
    try {
      const response = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {
          headers: {
            'X-CMC_PRO_API_KEY': '39709afd-1f40-4f7f-884f-0f99774598ce',
          },
        },
      )
      console.log(response.data)
      console.log(typeof response.data)
      //check data type

      setCryptoData(response.data.data)
      setCryptoStatus(response.data.status)
    } catch (error) {
      console.log(error)
    }
  }

  //render object of data
  const renderCryptoData = () => {
    return (
      // <Box>
      //   <Text>{cryptoStatus.timestamp}</Text>
      // </Box>
      <Stack space={3} alignItems="center">
        <HStack space={3} alignItems="center">
          <Center h="40" w="20" bg="primary.500" rounded="md" shadow={3}>
            Hi
          </Center>
          <Center h="40" w="20" bg="secondary.500" rounded="md" shadow={3} />
          <Center h="40" w="20" bg="emerald.500" rounded="md" shadow={3} />
        </HStack>
      </Stack>
    )
  }

  //render array of data
  const renderCryptoDataArray = () => {
    //render only 10 items
    const renderData = cryptoData.slice(0, 5)

    return renderData.map((data, index) => {
      return (
        <Box
          mb={2}
          flex={1}
          flexWrap="wrap"
          flexDirection="row"
          key={index}
          bg={{
            linearGradient: {
              colors: ['lightBlue.300', 'violet.800'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          p="3"
          rounded="xl"
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            textAlign: 'center',
          }}
        >
          <VStack>
            <Text>{data.name}</Text>
            <Text>{data.symbol}</Text>
            <Text>{data.quote.USD.price}</Text>
          </VStack>
        </Box>
      )
    })
  }

  const renderCryptoDataArray2 = () => {
    //render only 10 items
    const renderData = cryptoData.slice(5, 10)

    return renderData.map((data, index) => {
      return (
        <Box
          mb={2}
          flex={1}
          flexWrap="wrap"
          flexDirection="row"
          key={index}
          bg={{
            linearGradient: {
              colors: ['lightBlue.300', 'violet.800'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          p="3"
          rounded="xl"
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            textAlign: 'center',
          }}
        >
          <VStack>
            <Text>{data.name}</Text>
            <Text>{data.symbol}</Text>
            <Text>{data.quote.USD.price}</Text>
          </VStack>
        </Box>
      )
    })
  }

  return (
    <ScrollView>
      <Center flex={1}>
        <Heading mt={3} size="md">
          Crypto Data
        </Heading>
        <HStack space={3} mx={1} my={1}>
          <Box mx={1} my={1} w="40%">
            {renderCryptoDataArray()}
          </Box>
          <Box mx={1} my={1} w="40%">
            {renderCryptoDataArray2()}
          </Box>
        </HStack>
      </Center>
    </ScrollView>
  )
}
