const tasksModel = require("../models/tasks");

const AddComment = async (req, res) => {
  try {
    if (!req.body.comment) {
      return res.status(404).json({ comment: "Required comment" });
    }
    const data = await tasksModel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            content: req.body.comment,
            by: req.user.id,
          },
        },
      }
    );
    return res.status(201).send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const UpdateComment = async (req, res) => {
  try {
    if (!req.body.comment) {
      return res.status(404).json({ comment: "Required comment" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const DeleteComment = async (req, res) => {
  try {
    const data = await tasksModel.updateOne(
      { _id: req.params.id },
      {
        $pull: {
          comments: {
            _id: req.params.c_id,
          },
        },
      }
    );
    return res.status(201).send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  AddComment,
  UpdateComment,
  DeleteComment,
};
