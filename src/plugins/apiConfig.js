// configureApi.js
import { OpenAPI } from '@/api'
import { ACCESS_TOKEN } from '@/constant'

export function configureApi() {
  let baseUrl = import.meta.env.VITE_APP_API_URL || 'http://127.0.0.1:3000'
  
  if (baseUrl.endsWith('/api/v1')) {
    baseUrl = baseUrl.slice(0, -('/api/v1'.length))
  }
  
  OpenAPI.BASE = baseUrl
  OpenAPI.WITH_CREDENTIALS = true
  OpenAPI.CREDENTIALS = 'include'

  // // REMOVA async/await - localStorage é síncrono
  // OpenAPI.TOKEN = () => {
  //   const token = localStorage.getItem(ACCESS_TOKEN)
  //   return token || ''
  // }

  console.log(OpenAPI);
  

  OpenAPI.HEADERS = async () => {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}

// Função para obter token de forma síncrona (para uso no router)
export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN) || ''
}

export default configureApi