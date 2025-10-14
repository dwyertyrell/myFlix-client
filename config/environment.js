

 const getApiUrl = () => {
    
  if(windows.location.hostname.includes('netlify.app')) {

    return "https://secret-eyrie-53650-99dc45662f12.herokuapp.com"
  }

  return 'https://secret-eyrie-53650-99dc45662f12.herokuapp.com'

}

export const API_URL = getApiUrl()

