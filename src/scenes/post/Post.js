import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { useRoute } from '@react-navigation/native'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { storage } from '../../components/Storage'
import moment from 'moment'

export default function Post() {
  const route = useRoute()
  const userData = route.params.data
  const from = route.params.from
  const { scheme } = useContext(ColorSchemeContext)
  const [date, setDate] = useState('')

  useEffect(() => {
    console.log('Post screen')
    loadStorage()
  }, [])

  const loadStorage = async() => {
    try {
      await storage
      .load({key: 'date'})
      .then(data => {
        setDate(data)
      })
    } catch (e) {
      const data = {date: 'no data'}
      setDate(data)
    }
  }

  const saveStorage = () => {
    const today = moment().toString()
    storage.save({
      key: 'date',
      data: {
        'date': today
      }
    })
  }

  const removeStorage = () => {
    storage.remove({ key: 'date' })
  }

  const onSavePress = () => {
    saveStorage()
    loadStorage()
  }

  const onRemovePress = () => {
    removeStorage()
    loadStorage()
  }

  return (
    <View style={[styles.container, scheme === 'dark'?style.darkContent:style.lightContent, ]}>
      <SafareaBar />
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Post Screen</Text>
      <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{userData.email}</Text>
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>from</Text>
      <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{from}</Text>
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Latest save date</Text>
      <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{date.date}</Text>
      <View style={{width:'100%'}}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor:colors.primary}]}
          onPress={() => onSavePress()}
        >
          <Text style={styles.buttonText}>Save Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor:colors.secondary}]}
          onPress={() => onRemovePress()}
        >
          <Text style={styles.buttonText}>Remove Date</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  lightContent: {
    backgroundColor: '#e6e6fa'
  },
  darkContent: {
    backgroundColor: '#696969'
  },
})