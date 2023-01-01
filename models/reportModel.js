const Report = require('../db/schemas/reportSchema');

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

exports.addView = async (next) => {
  try {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const reportData = await Report.findOne({
      date,
      month: monthNames[month],
      year
    });

    if (reportData) {
      reportData.views += 1;
      await reportData.save();
    } else {
      await Report.create({
        date,
        month: monthNames[month],
        year,
        views: 1
      });
    }

    return console.log({ success: true, msg: 'View added in report!' });
  } catch (err) {
    next(err);
  }
};

exports.addDownload = async (next) => {
  try {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const reportData = await Report.findOne({
      date,
      month: monthNames[month],
      year
    });

    if (reportData) {
      reportData.downloads += 1;
      await reportData.save();
    } else {
      await Report.create({
        date,
        month: monthNames[month],
        year,
        downloads: 1
      });
    }

    return console.log({ success: true, msg: 'Download added in report!' });
  } catch (err) {
    next(err);
  }
};

exports.addAdv = async (next) => {
  try {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const reportData = await Report.findOne({
      date,
      month: monthNames[month],
      year
    });

    if (reportData) {
      reportData.adClicked += 1;
      await reportData.save();
    } else {
      await Report.create({
        date,
        month: monthNames[month],
        year,
        adClicked: 1
      });
    }

    return console.log({ success: true, msg: 'Adv added in report!' });
  } catch (err) {
    next(err);
  }
};
