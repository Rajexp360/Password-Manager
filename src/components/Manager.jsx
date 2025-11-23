import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { FaCopy } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArrray, setPasswordArrray] = useState([])

   const getPasswords  = async()=>{
    let req = await fetch ("http://localhost:3000")
    console.log(req)
     let passwords = await req.json()
    setPasswordArrray (passwords)


   }
   useEffect(() => {
    getPasswords()
    
   }, [])
   

    const showPassword = () => {
        passwordRef.current.type = 'text'
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = 'password'

        }
        else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = 'text'
        }

    }
    const copyText = (text) => {


        navigator.clipboard.writeText(text)
        toast('🦄 Copied to clipboard!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });


    }

    const savePassword = async () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){
            //IF any such id exist in db, delete it 
         await fetch("http://localhost:3000/", {method:"DELETE", headers: {"Content-Type": "application/json"}, 
        body:JSON.stringify({id: form.id})})

        setPasswordArrray([...passwordArrray, { ...form, id: uuidv4() }])
         await fetch("http://localhost:3000/", {method:"POST", headers: {"Content-Type": "application/json"}, 
        body:JSON.stringify({...form, id:uuidv4()})})

        setform({ site: "", username: "", password: "" })
        toast('Password Saved!', {
            position: "top-right",
            autoClose: 1000,
            midprogressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
             draggable: true,
            progress: undefined,
            theme: "light",

        });
    }
    else{
        alert("Please fill all the fields with minimum 3 characters each")
    
    }




    }
    const deletePassword = async(id) => {
        console.log("deleting password with id:", id);
        let x = confirm("Are you sure you want to delete this password?")
        if (x == true) {
            setPasswordArrray(passwordArrray.filter(item => item.id !== id))
let res = await fetch("http://localhost:3000/", {method:"DELETE", headers: {"Content-Type": "application/json"}, 
        body:JSON.stringify({id})})
        }




    }

    const editPassword = (id) => {
        console.log("editing the password", id)
        setform({...passwordArrray.filter(i => i.id == id)[0], id:id})
        setPasswordArrray(passwordArrray.filter(item => item.id !== id))
        toast.warn('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });



    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (


        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="bounce"
            />
            <div className='md:mycontainer h-96'>
                <div className='justify-center '>


                    <div className='mt-5 ' >

                        <h1 className='text-2xl font-bold text-center '>
                            <span className='text-green-700'>&lt;</span>
                            <span>Pass</span><span className='text-green-600'>OP/&gt;</span>
                        </h1>

                        <p className='text-center'>Your Password Manager
                        </p>
                    </div>
                    <div className=' flex  flex-col ml-30 mr-30 items-center p-4 text-black'>
                        <input value={form.site} onChange={handleChange} placeholder='  Enter website URL' className='bg-white w-full border rounded-full border-green-500' id='site' name='site' type="text" />
                        <div className=' mt-2 flex-col  md:flex-row flex w-full gap-3'>
                            <input value={form.username} onChange={handleChange} placeholder='  Enter website Name' className='bg-white w-full border rounded-full border-green-500' id='username' name='username' type="text" />
                            <div className=' w-full relative'>
                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='  Enter Password' className='bg-white w-full border rounded-full border-green-500'id="password" name='password' type="password" />
                                <span className='absolute right-4' >
                                    <img ref={ref} className='mt-1 cursor-pointer ' onClick={showPassword} width={20} src="icons/eye.png" alt="" />
                                </span>

                            </div>



                        </div>
                        <div>


                            <button onClick={savePassword} className='flex justify-center items-center bg-green-400 gap-1  border-black border-1 hover:bg-green-600 hover:cursor-pointer mt-7 rounded-full py-1.5 px-2 w-fit' >


                                <span className='flex justify-center bg-green-200 rounded-full' ><lord-icon
                                    src="https://cdn.lordicon.com/vjgknpfx.json"
                                    trigger="hover"
                                >
                                </lord-icon></span> Save Password  </button>




                        </div>


                    </div>
                    <div className="password">
                        <h2>Your Passwords</h2>
                        {passwordArrray.length == 0 && <div>No password to show</div>}
                        {passwordArrray != 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden">

                                <thead className='bg-green-800 text-white'>
                                    <tr>
                                        <th>Site Name</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-100'>
                                    {passwordArrray.map((item, index) => {
                                        return (


                                            <tr key={index}>

                                                <td className=' text-center w-32 py-2 text-black'>
                                                    <div className='flex justify-center items-center gap-2'>

                                                        <a href={item.site} target='_blank'>{item.site} </a>
                                                        <div className='cursor-pointer' onClick={() => { copyText(item.site) }} >
                                                            <FaCopy />


                                                        </div>
                                                    </div>


                                                </td>

                                                <td className=' text-center w-32 py-2 text-black'>
                                                    <div className='flex justify-center items-center gap-2'>

                                                        <a href={item.site} target='_blank'>{item.username} </a>
                                                        <div className='cursor-pointer' onClick={() => { copyText(item.username) }} >
                                                            <FaCopy />


                                                        </div>
                                                    </div>


                                                </td>

                                                <td className=' text-center w-32 py-2 text-black'>
                                                    <div className='flex justify-center items-center gap-2'>

                                                        <a href={item.site} target='_blank'>{"*".repeat(item.password.length)} </a>
                                                        <div className='cursor-pointer' onClick={() => { copyText(item.password) }} >
                                                            <FaCopy />


                                                        </div>
                                                    </div>


                                                </td>
                                                <td className=' text-center w-32 py-2 cursor-pointer  text-black'>
                                                    <div className='flex gap-2 justify-center' >
                                                        <span onClick={() => { editPassword(item.id) }} >
                                                            <RiEdit2Fill />
                                                        </span>
                                                        <span onClick={() => { deletePassword(item.id) }} >
                                                            <MdDelete />


                                                        </span>

                                                    </div>


                                                </td>


                                            </tr>
                                        )


                                    })}





                                </tbody>
                            </table>}


                    </div>

                </div>


            </div>






        </>

    )
}


export default Manager