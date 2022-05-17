import dbConnect from "../../lib/dbConnect"
import User from "../../models/User"

const handler = async (req, res) => {
	try {
		await dbConnect()
		switch (req.method){
		case "POST":

			const object = await User.create(JSON.parse(req.body))
			res.json(object)
			break
		}
	}
	catch (err) {
		res.end(err)
	}
}

export default handler