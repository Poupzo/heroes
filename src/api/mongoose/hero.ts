import * as mongoose from "mongoose";

interface IHero extends mongoose.Document { }

const heroSchema = new mongoose.Schema({
  id: Number,
  name: String
});

const Hero = mongoose.model<IHero>("Hero", heroSchema)

export = Hero;
