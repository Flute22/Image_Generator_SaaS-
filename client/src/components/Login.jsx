import { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { motion } from "framer-motion"

const Login = () => {
  const [ state, setState ] = useState("Login")
  const { setShowLogin } = useContext(AppContext)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
        document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
        <motion.form 
            className="relative bg-white p-10 rounded-xl text-slate-500"
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}

        >
            <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
            <p className="text-sm">Please fill in this form to create an account.</p>

            { state != "Login" && <div className="border px-5 flex items-center gap-2 rounded-full mt-5 py-2">
                <img 
                    src={assets.user_png} 
                    alt="profile icon"
                    className="w-4 opacity-50"
                />
                <input 
                    type="text" 
                    placeholder="FullName: " 
                    required
                    className="outline-none text-sm"
                />
            </div>}

            <div className="border px-5 flex items-center gap-2 rounded-full mt-4 py-2">
                <img 
                    src={assets.email_icon} 
                    alt="email icon"
                    className=""
                />
                <input 
                    type="text" 
                    placeholder="Email: " 
                    required
                    className="outline-none text-sm"
                />
            </div>

            <div className="border px-5 flex items-center gap-2 rounded-full mt-4 py-2">
                <img 
                    src={assets.lock_icon} 
                    alt="lock icon"
                    className=""
                />
                <input 
                    type="text" 
                    placeholder="Password: " 
                    required
                    className="outline-none text-sm"
                />
            </div>
            
            <p className="text-sm text-blue-600 my-4 cursor-pointer">Forget Password?</p>

            <button className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer">{state === 'LogIn' ? 'LogIn' : 'Create Account'}</button>

            {state === 'Login' ? <p className="mt-5 text-center">
                Don't have account? 
                <span 
                    className="text-blue-600 cursor-pointer" 
                    onClick={() => setState('SignUp')}
                >Sign Up</span>
            </p>
            :
            <p className="mt-5 text-center">
                Already have an account! 
                <span 
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setState('Login')}
                >Login</span>
            </p>}

            <img 
                src={assets.cross_icon} 
                alt="cross icon" 
                className="absolute top-5 right-5 cursor-pointer"
                onClick={() => setShowLogin(false)}
            />
        </motion.form>
    </div>
  )
}
export default Login