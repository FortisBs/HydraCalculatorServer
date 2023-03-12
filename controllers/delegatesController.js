const Delegate = require('../models/Delegate');

class DelegatesController {
  async addDelegate(req, res) {
    try {
      const { name, shareRate, userId } = req.body;
      const existingDel = await Delegate.findOne({ name });

      if (existingDel) {
        return res.status(400).json({ message: 'Delegate with this name already exists' });
      }

      const newDelegate = new Delegate({ name, shareRate, userId });
      await newDelegate.save();

      return res.json(newDelegate);

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error during adding a delegate' });
    }
  }

  async getDelegates(req, res) {
    try {
      const delegates = await Delegate.find();
      return res.json(delegates);

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Fetch delegates failed' });
    }
  }

  async getDelegateByQuery(req, res) {
    try {
      const name = req.query.name;
      const userId = req.query.userId;

      if (name) {
        const delegate = await Delegate.findOne({ name });
        return res.json(delegate);
      }

      if (userId) {
        const delegates = await Delegate.find({ userId });
        return res.json(delegates);
      }

      return res.status(400).json({ message: 'Cannot find a delegate' });

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Cannot find a delegate' });
    }
  }

  async updateDelegate(req, res) {
    try {
      const { name, shareRate } = req.body;
      const updatedDelegate = await Delegate.findOneAndUpdate({ name }, { shareRate }, { new: true });
      res.json(updatedDelegate);

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Cannot update a delegate' });
    }
  }

  async deleteDelegate(req, res) {
    try {
      const _id = req.params.id;
      await Delegate.findOneAndDelete({ _id });
      res.json({ message: 'Delegate deleted' });

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Cannot delete a delegate' });
    }
  }
}

module.exports = new DelegatesController();
