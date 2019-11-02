import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import useFetch from '../hooks/useFetch';

export default ({ navigation }) => {
  const id = navigation.getParam('_id');
  const { loading, data } = useFetch(`https://serverless.estcascor94.now.sh/api/meals/${id}`);

  return (
    <View style={styles.container}>
      {
        loading ? <Text>loading</Text> :

          <>
            <Text>{data._id}</Text>
            <Text>{data.name}</Text>
            <Text>{data.desc}</Text>
            <Button title="Ok" onPress={() => {
              AsyncStorage.getItem('token')
                .then(x => {
                  if (x) {
                    fetch('https://serverless.estcascor94.now.sh/api/orders', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        authorization: x
                      },
                      body: JSON.stringify({
                        meal_id: id,
                      })
                    }).then(x => {
                      if (x.status !== 200) {
                        return alert('order couldnt complete!')
                      }
                      alert('Order saved successfully');
                      navigation.navigate('Meals')
                    })
                  }
                })
            }}/>
            <Button title="Cancel" onPress={() => navigation.navigate('Meals')}/>
          </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
