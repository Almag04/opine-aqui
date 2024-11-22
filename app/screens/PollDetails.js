import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const PollDetails = ({ route }) => {
  const [poll, setPoll] = useState(null);
  const { pollId } = route.params;

  useEffect(() => {
    const fetchPoll = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'enquetes', pollId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPoll(docSnap.data());
      }
    };
    fetchPoll();
  }, [pollId]);

  const handleVote = async (optionIndex) => {
    const db = getFirestore();
    const docRef = doc(db, 'enquetes', pollId);
    const newVotes = [...poll.votos];
    newVotes[optionIndex] += 1;
    await updateDoc(docRef, { votos: newVotes });
    setPoll({ ...poll, votos: newVotes });
  };

  return (
    <View>
      {poll && (
        <>
          <Text>{poll.título}</Text>
          <View>
            <Button
              title={poll.opções[0]}
              onPress={() => handleVote(0)}
            />
            <Button
              title={poll.opções[1]}
              onPress={() => handleVote(1)}
            />
          </View>
          <Text>Votos: {poll.votos[0]} x {poll.votos[1]}</Text>
        </>
      )}
    </View>
  );
};

export default PollDetails;
