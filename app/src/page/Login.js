import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'



const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loginError, setloginError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth, credentials.email, credentials.password)

            
            navigate("/home")
        }catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setloginError('Wrong email or password combination');
            console.log(errorCode, errorMessage)
        }

    }

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        
                        <div class="mt-2">
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                autocomplete="email"
                                onChange={handleChange} 
                                value={credentials.email} 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        
                        <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        
                        <div className="mt-2">
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                autocomplete="current-password" 
                                onChange={handleChange}
                                required 
                                value={credentials.password} 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        
                        {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>} {/* Error message */}
                        
                        </div>
                        
                    </div>

                    <div>
                        
                        <button 
                            type="submit" 
                            onClick={onLogin} 
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign in
                        </button>

                    </div>
                
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    
                    <NavLink to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Create new account
                    </NavLink>
                
                </p>
            </div>
        </div>
    )
     
      
}

export default Login