const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const { order } = request.query;
    const categories = await CategoryRepository.findAll(order);
    return response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.create({ name });

    return response.status(201).json(category);
  }
}

module.exports = new CategoryController();
