let API_URL = "https://secret-eyrie-53650-99dc45662f12.herokuapp.com"

const initializeApiUrl = async () => {
  const EC2_API_URL = "http://35.179.161.79:3000"
  const HEROKU_API_URL = "https://secret-eyrie-53650-99dc45662f12.herokuapp.com"

  /* the hosted Netlify server does not allow requests over HTTP- therefore 
  EC2 HTTP request will not work in production mode  */
  try {
    // ping the index endpoint
    const response = await fetch(`${EC2_API_URL}`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    }) 

    if(response.ok) {
      API_URL = EC2_API_URL
      console.log('EC2 API running- using ec2 instance')
    }else{
      console.log('Response from EC2 instance is not ok - using Herkou API endpoint')
    }
  }catch(error) {
      console.log('EC2 is not reachable, using Heroku as API endpoint')
    }
  }

  initializeApiUrl()

  export { API_URL }
