const File = require('../db/schemas/fileSchema');

exports.saveFile = async (data, next) => {
  try {
    return await File.create(data);
  } catch (err) {
    next(err);
  }
};

exports.getFiles = async (skip, limit, next) => {
  try {
    return await File.find({}).skip(skip).limit(limit).sort({ _id: -1 });
  } catch (err) {
    next(err);
  }
};

exports.getFileInfoByURL = async (infoURL, next) => {
  try {
    return await File.findOne(
      { infoURL },
      {
        name: 1,
        uploadDate: 1,
        size: 1,
        downloadURL: 1,
        downloads: 1
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.getFileInfoByToken = async (downloadURL, next) => {
  try {
    return await File.findOne(
      { downloadURL },
      {
        name: 1,
        uploadDate: 1,
        size: 1,
        directDownloadURL: 1,
        downloads: 1
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.increaseViews = async (infoURL, next) => {
  try {
    return await File.updateOne({ infoURL }, { $inc: { views: 1 } });
  } catch (err) {
    next(err);
  }
};

exports.increaseDownloads = async (downloadURL, next) => {
  try {
    return await File.updateOne({ downloadURL }, { $inc: { downloads: 1 } });
  } catch (err) {
    next(err);
  }
};

exports.increaseAds = async (downloadURL, next) => {
  try {
    return await File.updateOne({ downloadURL }, { $inc: { adClicked: 1 } });
  } catch (err) {
    next(err);
  }
};

exports.getFileDetails = async (fileId, next) => {
  try {
    return await File.findById(fileId);
  } catch (err) {
    next(err);
  }
};

exports.updateFile = async (fileId, data, next) => {
  try {
    return await File.updateOne({ _id: fileId }, data);
  } catch (err) {
    next(err);
  }
};

exports.updateDomain = async (domain, next) => {
  try {
    await (await File.find({})).forEach(async (file) => {
      file.directDownloadURL = file.directDownloadURL.replace(
        'download.fely.online',
        domain
      );
      await file.save();
    });
    const files = await File.find({});
    console.log(files);
    return 'true';
  } catch (err) {
    next(err);
  }
};
