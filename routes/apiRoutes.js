const db = require("../models"); // connects schema to routes

// connects to rest of app
module.exports = function (app) {
    // getLastWorkout
    app.get("/api/workouts", (req, res) => {
        db.Workout.aggregate([{
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    },
                },
            }, ])
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.sendStatus(500).json(error);
            });
    });

    // addExercise
    app.put("/api/workouts/:id", ({
        body,
        params
    }, res) => {
        db.Workout.findOneAndUpdate({
                _id: params.id
            }, {
                $push: {
                    exercises: body
                },
            },
            (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(data);
                }
                // else res.status(400).json(data);
            }
        );
    });

    // createWorkout
    app.post("/api/workouts", (req, res) => {
        db.Workout.create({}, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
            // else res.status(400).json(data);
        });
    });

    // getWorkoutsInRange
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([{
                    $addFields: {
                        totalDuration: {
                            $sum: "$exercises.duration"
                        },
                    },
                },
                {
                    $limit: 20,
                },
            ])
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json(err);
            });
    });
};