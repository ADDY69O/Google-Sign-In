import logo from './logo.svg';
import './App.css';
import { useEffect ,useState} from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  const [user, setuser] = useState({});


  function handleCallbackResponse(response){
    console.log("Encoded jwt id tooken"+response.credential)
    let varObj=jwtDecode(response.credential);
    console.log(varObj)
    setuser(varObj);
    document.getElementById("signIn").hidden=true;
  }
  
  function handleSignOut(e){
    setuser({});
    document.getElementById("signIn").hidden=false;
  }


  useEffect(() => {
   

   /* global google  */
   google.accounts.id.initialize({
     client_id:"544569088275-rkfsir9ijch3uqs6rm0lvpj1lfd9bi81.apps.googleusercontent.com",
     callback:handleCallbackResponse,

   });
    

    google.accounts.id.renderButton(
      document.getElementById("signIn"),{
        theme:"outline",size:"largest"

      }
    )


  }, [])
  


  return (
    <div className="center App">
      <div className="login">
    { Object.keys(user).length==0 ?<h1 className='h'>Login</h1>:<h1 className='h'> Succesfully logged in</h1>}
      
      <div id="signIn">

      </div>

      {user &&
          <div className='main'>
            <img src={user.picture} alt="" />
            <h1>{user.name}</h1>

          </div>
      }

      {Object.keys(user).length!=0 &&
      
      <button onClick={(e)=>handleSignOut(e)}>Sign Out</button>
      }

      </div>
    </div>
  );
}

export default App;
