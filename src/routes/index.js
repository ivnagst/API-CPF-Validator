import express from "express";
import cpfs from "./cpfsRoutes.js";

const routes = (app) => {
    app.route('/deny-list').get((req, res) => {
        res.status(200).send({ titulo: "Verificador de CPF!" })
    })
    app.use(
        express.json(),
        cpfs
    )
}

export default routes