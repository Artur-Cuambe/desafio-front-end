import { OpenAPI } from "@/api";
import { ACCESS_TOKEN } from "@/constant"
import { configureApi } from './../plugins/apiConfig'

// Configura a API antes de usar
configureApi()

export default function auth({ next, to }) {

  const token = localStorage.getItem(ACCESS_TOKEN)
console.log({token,to});

  // Se a rota requer autenticação E o usuário não está autenticado
  if (to.meta.requiresAuth && !token) {
    // Redireciona para login apenas se não estiver já indo para lá


    if (to.name !== 'Login') {
      return next({ name: 'Login' })
    }
  }

  // Se o usuário ESTÁ autenticado e tenta acessar página de login
  if (to.name === 'Login' && token) {
    console.log("redireciona pra dentro");
    return next({ name: 'home' })
  }
  if (!token) {
    console.log({ token });

    return next({ name: 'Login' })
  }
  OpenAPI.TOKEN = token || ''
  // Caso contrário, permite a navegação
  return next()
}