import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const CreatePoll = () => {
  const [title, setTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');

  const handleCreatePoll = async () => {
    const db = getFirestore();
    const user = getAuth().currentUser;
    const pollRef = doc(db, 'enquetes', user.uid + '_' + new Date().getTime());
    await setDoc(pollRef, {
      título: title,
      opções: [option1, option2],
      votos: [0, 0],
      dataCriacao: Timestamp.now(),
    });
    alert('Enquete criada com sucesso!');
  };

  return (
    <View>
      <TextInput
        placeholder="Título da Enquete"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Opção 1"
        value={option1}
        onChangeText={setOption1}
      />
      <TextInput
        placeholder="Opção 2"
        value={option2}
        onChangeText={setOption2}
      />
      <Button title="Criar Enquete" onPress={handleCreatePoll} />
    </View>
  );
};

export default CreatePoll;
