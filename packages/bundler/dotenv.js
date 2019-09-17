const dotenv = require('dotenv')
const path = require('path')

const cwd = process.cwd()

loadDotenv(process.env.STAGE)

function loadDotenv (stage) {
  dotenv.parse(path.join(cwd, ))
}
