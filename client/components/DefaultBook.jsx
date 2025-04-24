import React from 'react'
import { View, Text } from 'react-native'

const DefaultBook = ({ title, otherStyles, color = '#4B0014' }) => {
  return (
    <>
      <View style={{
        width: 100,
        height: 170,
        backgroundColor: '#800020',
        borderRadius: 3,
        flexDirection: 'row',
      }}>

        {/* Spine */}
        <View
          style={{
            width: 10,
            backgroundColor: color,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
        {/* Cover */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={[
              {
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                marginBottom: 5,
              },
              otherStyles,
            ]}
          >
            {title}
          </Text>
        </View>

      </View>
    </>
  )
}

export default DefaultBook
