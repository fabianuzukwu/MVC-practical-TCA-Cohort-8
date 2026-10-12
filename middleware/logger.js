const { savelogsToDB } = require('../controller/user')

const logger = async (req, res, next) => {
    const date = new Date()
    const formattedDate = date.toLocaleString()
    const data = `\nAPI endpoint: "${req.url}" with the method: "${req.method}" was called at ${formattedDate}`

    await savelogsToDB(data)

    console.log(data)
    next()
}


module.exports = { logger }