const fb = require("firebase-admin")
const fs = require("fs")
const os = require("os")
const path = require("path")
const db = fb.firestore()
const axios = require("axios")
const mime = require("mime-types")
const formatImage = require("../helpers/formatImage")
function base64MimeType(encoded) {
    var result = null
    if (typeof encoded !== "string") return result
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
    if (mime && mime.length) result = mime[1]
    return result
}
const writeFile = async (base64Raw, fname, iname, tname) => {
    const fpath = path.join(os.tmpdir(), fname)
    const ipath = path.join(os.tmpdir(), iname)
    const base64Data = base64Raw
        .replace(/^data:image\/png;base64,/, "")
        .replace(/^data:image\/jpeg;base64,/, "")
    console.log(base64Data)
    await new Promise(res =>
        fs.writeFile(fpath, base64Data, "base64", err => {
            console.log(err)
            res()
        })
    )
    await formatImage(fpath, ipath)
    console.log(fpath, ipath)
    await bucket.upload(ipath, {
        destination: tname,
    })
}
const writeFiles = async (files, docname) => {
    if (!fs.existsSync(path.join(os.tmpdir(), docname))) {
        fs.mkdirSync(path.join(os.tmpdir(), docname))
    }
    await Promise.all(
        files.map((file, idx) => {
            return writeFile(
                file[0],
                path.join(docname, `${idx + 1}.${file[1]}`),
                path.join(docname, `${idx + 1}-out.jpg`),
                path.join(docname, `${idx + 1}.jpg`)
            )
        })
    )
}

module.exports = async (docname) => {
    const parsedImages = imageDataURL
            .map(imgd => {
                const mimeType = base64MimeType(imgd)
                if (!mimeType) {
                    res.status(400).send({
                        status: 702,
                        error: "image mime type not found or invalid",
                    })
                    return false
                }
                let extension = mime.extension(mimeType)
                if (extension === "jpeg") extension = "jpg"
                if (extension !== "png" && extension !== "jpg") {
                    res.status(400).send({
                        status: 702,
                        error: "invalid extension"
                    })
                    return false
                }
                return [imgd, extension]
            })
            .filter(ret => ret !== false)
        if (parsedImages.length !== imageDataURL.length) return
        return await writeFiles(parsedImages, firestoreSnap.id)
}