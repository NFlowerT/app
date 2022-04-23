export const sliceAccount = (account) => {
	if(account!== undefined && account!== "0x0"){
		let short = ""
		short = account.slice(0, 4)
		short+="..."
		short += account.slice(account.length-3, account.length)
		return short
	}
	return ""
}
