import { TouchableOpacity, Text, StyleSheet, Alert, View } from 'react-native'
import { signOut, deleteUser } from 'firebase/auth'
import { router } from 'expo-router'

import { auth } from '../config'

const handleLogOut = (): void => {
  const signOutFunc = (): void => {
    signOut(auth)
      .then(() => {
        router.replace('/auth/log_in')
      })
      .catch(() => {
        Alert.alert('ログアウトに失敗しました')
      })
  }

  if (auth?.currentUser?.isAnonymous === true) {
    Alert.alert('ログアウトすると同じゲストアカウントにはログインできません。', 'ログアウトしますか？', [
      {
        text: 'キャンセル'
      },
      {
        text: 'ログアウト',
        style: 'destructive',
        onPress: () => {
          signOutFunc()
        }
      }
    ])
  } else {
    signOutFunc()
  }
}

const handleDeleateAccount = (): void => {
  Alert.alert('アカウントを削除します。', '本当に削除しますか？', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除',
      style: 'destructive',
      onPress: () => {
        if (auth?.currentUser !== null) {
          deleteUser(auth?.currentUser)
            .then(() => {
              router.replace('/auth/log_in')
              Alert.alert('アカウントを削除しました。')
            })
            .catch(() => {
              Alert.alert('削除に失敗しました。')
            })
        }
      }
    }
  ])
}

const LogOutButton = (): JSX.Element => {
  return (
    <View style={styles.menuArea}>
      <TouchableOpacity onPress={handleDeleateAccount}>
        <Text style={[styles.text, { color: 'rgba(255,255,255,0.7)' }]}>アカウントを削除</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogOut}>
        <Text style={styles.text}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  menuArea: {
    flexDirection: 'row',
    columnGap: 16,
    marginLeft: 16
  },
  text: {
    fontSize: 12,
    lineHeight: 24,
    color: 'rgba(255,255,255,1)'
  }
})

export default LogOutButton
