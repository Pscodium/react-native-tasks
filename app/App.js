import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

export default () => {
  return (
    <>
      <Input 
      placeholder="Task" 
      secureTextEntry={true}
      containerStyle={{
        marginHorizontal:50,
        marginVertical: 40,
        width: 300,
        top:200
      }} 
      />
      
      <Input 
      placeholder="Item" 
      secureTextEntry={true}
      containerStyle={{
        marginHorizontal:50,
        marginVertical:10,
        width: 300,
      }} 
      />
      
    </>
  );
};