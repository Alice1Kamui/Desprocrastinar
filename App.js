import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import AddInput from "./components/AddInput";
import { View, StatusBar, FlatList } from "react-native";
import styled from 'styled-components/native'
import TodoList from "./components/TodoList";
import Header from "./components/Header";

const getFonts =()=> 
  Font.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf")
  })

export default function App() {
  const [data, setData] = useState([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
const submitHandler = (value) => {
 setData((prevTodo) => {
   return [
     {
       value: value,
       key: Math.random().toString(),
     },
     ...prevTodo,
   ];
 });
 }

 const deleteItem = (key)=>{
    setData((prevTodo)=>{
      return prevTodo.filter((todo)=>todo.key != key);
    })
 }
 if (fontsLoaded){
  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content"
           backgroundColor="midnightblue" />
      </View>
     <View>
       <FlatList 
         data={data}
         ListHeaderComponent={()=> <Header />}
         keyExtractor={(item)=> item.key}
         renderItem={({item})=>(
           <TodoList item={item} deleteItem={deleteItem}/>
         )}
       />
     </View>
      <View>
        <AddInput submitHandler={submitHandler} />
      </View>
    </ComponentContainer>
  );
 } else {
  return (
    <AppLoading 
      startAsync={getFonts}
      onFinish={()=>{
        setFontsLoaded(true);
      }}
      onError={console.warn}
    />

  )
 }

}


const ComponentContainer = styled.View`
 background-color: midnightblue;
 height: 100%;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;
