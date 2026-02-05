import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';






export default function MedicalChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [novoInput,setNovoInput] = useState('')

  // Prompt inicial que "define" a IA como um médico experiente
  const initialPrompt = 
    "Você é um medico experiente e possui todo o conhecimento de todas as doenças do mundo, ira responder a soluçao para o paciente em portugues baseado em seus sintomas"

  const callCohereAPI = async () => {
    try {
      const prompt = `${initialPrompt}\nPaciente: ${input}\nMédico:`;

      const res = await fetch('https://api.cohere.ai/generate', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer',
          'Content-Type': 'application/json',
          'Cohere-Version': '2022-12-06'
        },
        body: JSON.stringify({
          model: 'command',
          prompt: prompt,
          max_tokens: 150,
          temperature: 0,
          stop_sequences: ["Paciente:", "Médico:"]
        })
      });

      const data = await res.json();

      if (data && data.generations && data.generations.length > 0) {
        setResponse(data.generations[0].text.trim());
      
      } else {
        setResponse('Sem resposta da IA.');
      }
    } catch (error) {
      setResponse('Erro ao chamar API: ' + error.message);
    }
    
  };
function Colocar(){

setNovoInput (input)


}
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <TextInput
        placeholder="Descreva seu sintoma ou dúvida médica"
        value={input}
        onChangeText={setInput}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Perguntar ao médico" onPress={()=>{callCohereAPI();Colocar();}} />
        <View   style={styles.Container}>    <Text style={styles.texto}>{novoInput}</Text> </View>
   
      <Text style={{ marginTop: 20, fontSize: 16 ,backgroundColor:'rgb(33, 150, 243);', color:'black', fontWeight:'bold'}}>{response}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  Container:{
flex:1,
  },
texto:{
  marginTop:5,
  fontFamily:'arial',
  fontWeight:'bold',
backgroundColor:'rgb(33, 150, 243)',
color:'white',
fontSize:15, 
borderRadius:2,
width:120





}







})
