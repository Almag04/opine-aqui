import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ViewPolls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'enquetes'));
      const pollsData = querySnapshot.docs.map(doc => doc.data());
      setPolls(pollsData);
    };
    fetchPolls();
  }, []);

  return (
    <View>
      <FlatList
        data={polls}
        renderItem={({ item }) => (
          <View>
            <Text>{item.título}</Text>
            <Button title="Votar" onPress={() => {}} />
          </View>
        )}
      />
    </View>
  );
};

export default ViewPolls;
