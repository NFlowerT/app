import React, {useState} from "react"

const Admin = ({mint}) => {
	const [password, setPassword] = useState("")
	const [auth, setAuth] = useState(false)
	const login = () => {
		if (password === "alamakota")
			setAuth(true)
	}
	if (!auth){
		return (
			<>
				<input type={"text"} onChange={e => setPassword(e.target.value)}/>
				<button onClick={login}> Login </button>
			</>
		)
	} else {
		return (
			<>
				<h1> Witaj Adminie</h1>
				<p> fsafa </p>
				<button onClick={async() => await mint()}>mint</button>
			</>
		)
	}

}

export default Admin
