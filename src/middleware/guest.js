export default function auth ({ next, store }){
  console.log({store});
  
  if (localStorage.activeUser) {
    return next({name: 'home'})
  } 
  return next()
}