const debug = require("debug")("error");
const success = require("debug")("success");
const db = require("./models");

exports.getAll = (req, res) => {
  db.Report.findAndCountAll({
    order: [["createdAt", "DESC"]]
  })
    .then(admins => {
      res.json(admins);
      success("Working");
    })
    .catch(error => {
      debug(error);
      res.status(500).json("Internal Server Error");
    });
};

// exports.getOne = (req, res) => {
//   db.Admin.findOne({
//     where: {
//       email: req.params.email.toLowerCase()
//     }
//   })
//     .then(admin => {
//       res.json(admin);
//       success("Working");
//     })
//     .catch(error => {
//       debug(error);
//       res.status(500).json("Internal Server Error");
//     });
// };

exports.create = async (req, res) => {
  try {
    const report = await db.Report.findOrCreate({
      where: {
        link: req.body.link
      }
    });

    if (!report[1]) {
      // the link exists so increase the counter by one
      const count = report[0].count + 1;
      await db.Report.update(
        { count },
        {
          where: {
            link
          }
        }
      );
    }
  } catch (e) {
    res.status(500).json("internal server error");
  }
};
exports.update = (req, res) => {
  if (
    req.status.app_metadata &&
    req.status.app_metadata.groups[0] === "admin"
  ) {
    const { firstName, lastName, phone } = req.body;
    db.Admin.update(
      {
        firstName,
        lastName,
        phone
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(response => {
        res.json(response);
        success("Working");
      })
      .catch(error => {
        debug(error);
        res.status(500).json(error);
      });
  } else {
    res.status(401).json("Only authorized users allowed ");
  }
};
exports.delete = (req, res) => {
  db.Report.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(response => {
      res.json(response);
      success("Working");
    })
    .catch(error => {
      debug(error);
      res.status(500).json("Internal Server Error");
    });
};
