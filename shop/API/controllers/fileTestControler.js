const AmazonS3 = require("../AWS/amazonS3");

exports.getFile = async (req,res,next) => {
    try{
    const filename = req.query.filename;
    const s3 = new AmazonS3;
    const file = await s3.getFileUrl(filename);
    res.send(file);
    next();
    }catch(err){
        res.status(500).send(err);

    }
}

exports.loadFile = async (req,res,next) => {
    try{
    const filename = req.files.file.name;
    const file = req.files.file;
    const s3 = new AmazonS3;
    await s3.saveFile(filename,file);
    res.status(200).send();
    next();
    } catch(err){
        res.status(500).send(err);

    }
}

