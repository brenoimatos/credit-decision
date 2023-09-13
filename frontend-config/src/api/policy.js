import axios from 'axios'

const BASE_URL = 'http://localhost:9000/policy'
const POLICY_ID = '64fe4c4059f7f891749600c2'

export const createPolicy = async (nodes, edges) => {
  const policyData = {
    name: 'PolicyName',
    nodes: nodes,
    edges: edges,
  }
  try {
    const response = await axios.post(`${BASE_URL}/`, policyData)
    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error: error }
  }
}

export const getPolicy = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/${POLICY_ID}`)
    return response.data
  } catch (error) {
    console.error('An error occurred while fetching data:', error)
    return null
  }
}

export const patchPolicy = async (nodes, edges) => {
  const policyData = {
    name: 'PolicyName',
    nodes: nodes,
    edges: edges,
  }
  try {
    const response = await axios.patch(`${BASE_URL}/${POLICY_ID}`, policyData)
    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error: error }
  }
}
