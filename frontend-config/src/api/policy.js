import axios from 'axios';

export const savePolicy = async (nodes, edges) => {
  const policyData = {
    name: "nomeDaPolicy",
    nodes: nodes,
    edges: edges
  };
  try {
    const response = await axios.post('http://localhost:9000/policy/', policyData);
    
    console.log('Resposta do servidor:', response.data);
  } catch (error) {
    console.log('Ocorreu um erro ao salvar a política:', error);
  }
};

export const getPolicy = async () => {
    try {
      const response = await axios.get('http://localhost:9000/policy/64fe4c4059f7f891749600c2');
      return response.data;
    } catch (error) {
      console.log('Ocorreu um erro ao buscar os dados:', error);
      return null;
    }
};

export const patchPolicy = async (nodes, edges) => {
    const policyData = {
      name: "nomeDaPolicy",
      nodes: nodes,
      edges: edges
    };
    try {
      const response = await axios.patch('http://localhost:9000/policy/64fe4c4059f7f891749600c2', policyData);
      
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.log('Ocorreu um erro ao salvar a política:', error);
    }
  };
