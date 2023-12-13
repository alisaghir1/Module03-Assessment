import Example from '../models/ArticleModel.js';

class Controller {

  static async createExample(req, res) {
    try {
      const image = req.file.filename;
        const newexample = await Example.create({ ...req.body, image: image });
        if (!newexample) {
          return res.status(400).json('error creating example');
        }
        return res.status(201).json(newexample);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAllExamples(req, res) {
    try {
      const examples = await Example.findAll();
      if (examples.length === 0) {
        return res.status(404).json('there are no available examples');
      }
      return res.status(200).json(examples);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async updateExample(req, res) {
    try {
      const [updatedexample] = await Example.update(req.body, {where: {id: req.params.id}});
      if (!updatedexample) {
        return res.status(404).json('please enter the fields you want to edit');
      }
      const example = await Example.findByPk(req.params.id);
      return res.status(200).json(example);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteExample(req, res) {
    try {
      const deletedexample = await Example.findByPk(req.params.id);
      if (!deletedexample) {
        return res.status(404).json('the example was not found');
      }
      await Example.destroy({where: {id: req.params.id}});
      return res.status(200).json({ deletedexample });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findExampleById(req, res) {
    try {
      const example = await Example.findByPk(req.params.id);
      if (!example) {
        return res.status(404).json('example not found');
      }
      return res.status(200).json(example);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default Controller;
