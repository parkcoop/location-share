const { createWriteStream } = require( 'fs')
const { mkdirp } = require( 'mkdirp')
const { shortid } = require( 'shortid')


const uploadDir = './uploads'


const processUpload = async upload => {
    const { createReadStream, filename, mimetype, encoding } = await upload
    const stream = createReadStream()
    const { id, path } = await storeUpload({ stream, filename })
    return {
      id,
      path,
      mimetype,
      encoding
    }
    // return recordFile({ id, filename, mimetype, encoding, path })
  }

  const storeUpload = async ({ stream, filename }) => {
    const id = shortid.generate()
    const path = `${uploadDir}/${id}-${filename}`
  
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on('finish', () => resolve({ id, path }))
        .on('error', reject),
    )
  }
module.exports = {
    processUpload
}