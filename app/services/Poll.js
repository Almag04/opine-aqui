import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();

const createPoll = async (title, option1, option2) => {
  const user = getAuth().currentUser;  
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const pollRef = await addDoc(collection(db, 'enquetes'), {
      titulo: title,
      opcoes: [option1, option2],
      votos: [0, 0],  
      dataCriacao: new Date(),
      userId: user.uid,  
    });
    return pollRef.id;  
  } catch (error) {
    console.error("Erro ao criar enquete: ", error);
    throw error;
  }
};

const getPolls = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'enquetes'));
    const pollsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return pollsData; 
  } catch (error) {
    console.error("Erro ao obter enquetes: ", error);
    throw error;
  }
};

const getPollDetails = async (pollId) => {
  try {
    const docRef = doc(db, 'enquetes', pollId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };  
    } else {
      throw new Error('Enquete não encontrada');
    }
  } catch (error) {
    console.error("Erro ao obter detalhes da enquete: ", error);
    throw error;
  }
};

const voteInPoll = async (pollId, optionIndex) => {
  try {
    const docRef = doc(db, 'enquetes', pollId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const pollData = docSnap.data();
      const newVotes = [...pollData.votos];  
      newVotes[optionIndex] += 1;  

      await updateDoc(docRef, { votos: newVotes });  
      return newVotes; 
    } else {
      throw new Error('Enquete não encontrada');
    }
  } catch (error) {
    console.error("Erro ao votar na enquete: ", error);
    throw error;
  }
};

export { createPoll, getPolls, getPollDetails, voteInPoll };
