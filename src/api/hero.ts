import * as express from "express";
import * as Hero from "./mongoose/hero";


export function heroes(app: express.Express) {

  app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
  }
  );

  //GET
  app.get('/api/heroes', function (req, res, next) {
    Hero.find(function (err, heroes) {

      // if there is an error retrieving, send the error. 
      // nothing after res.send(err) will execute
      if (err)
        res.json({ info: 'error finding hero', error: err });

      res.json(heroes); // return all heroes in JSON format
    });
  });

  //DELETE
  app.delete('/api/heroes/:id', function (req, res, next) {
    const id = req.params.id;

    Hero.findByIdAndRemove(id, function (err, heroes) {
      if (err) {
        res.statusCode = 404;
        res.json({ error: err });
      }
      else
        res.json(heroes);
    });
  });

  //UPDATE
  app.put('/api/heroes/:id', function (req, res, next) {
    const id = req.params.id;

    Hero.findByIdAndUpdate(id, function (err, heroes) {
      if (err) {
        res.statusCode = 404;
        res.json({ error: err });
      }
      else
        res.json(heroes);
    });
  });

  //ADD
  app.post('/api/heroes', function (req, res, next) {
    var tmp = req.body;

    if (!tmp.name) {
      res.status(400);
      res.json({
        "error": "Invalid Data"
      });
    } else {
      const tmphero = new Hero({
        id: tmp.id,
        name: tmp.name
      });

      tmphero.save(function (err, result) {
        if (err) {
          res.json({ info: 'error during user create', error: err });
        } else {
          res.json({ info: 'user created successfully', data: result });
        }
      })
    }
  });

}
