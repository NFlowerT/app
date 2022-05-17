import React, {useContext, useState} from "react"
import style from "../../styles/user/userSettings.module.scss"
import {AccountContext} from "../../pages/_app"

const UserSettings = () => {
	const [name, setName] = useState("")
	const {account} = useContext(AccountContext)

	const clickHandler = async () => {
		let res = await fetch("api/user", {method: "POST", body: JSON.stringify({name: name, address: account})})
		res = res.json()
		alert(res)
	}

	return (
		<div className={style.container}>
			<div>
				<label>
					<p>Your name:</p>
					<input onChange={e => setName(e.target.value)}/>
				</label>
			</div>
			<button onClick={() => clickHandler()}>Change name</button>
		</div>
	)
}

export default UserSettings