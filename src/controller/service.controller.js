const { ExceptionHandler } = require("../libs/lib.exception");
const { ServiceModel } = require("../model/service.model");
const { SearchBackend, FilterBackend, Pagination, GetOr404 } = require("../libs/lib.common");

async function ServiceList(req, res) {
    try {
      const result = ServiceModel.find();
      const search = SearchBackend(req, result, ['code', 'name']);
      const filter = FilterBackend(req, search);
      const paging = await Pagination(req, res, filter);
      return res.status(200).json(paging)
    } catch (error) {
      return ExceptionHandler(error, res)
    }
  }

  async function ServiceCreate(req, res) {
    try {
      const result = await ServiceModel.create(req.body)
      return res.status(201).json(result);
    } catch (error) {
      console.log(error);
      return ExceptionHandler(error, res)
    }
  }

  async function ServiceDetail(req, res) {
    try {
      const result = await GetOr404(ServiceModel, {_id: req.params.id});
      return res.status(200).json(result);
    } catch (error) {
      return ExceptionHandler(error, res)
    }
  }

  async function ServiceUpdate(req, res) {
    try {
      await GetOr404(ServiceModel, {_id: req.params.id});
      const result = await ServiceModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {new: true}
      )
      return res.status(200).json(result);
    } catch (error) {
      return ExceptionHandler(error, res)
    }
  }
  
  async function ServiceDelete(req, res) {
    try {
      await GetOr404(ServiceModel, {_id: req.params.id})
      await ServiceModel.findOneAndDelete({_id: req.params.id})
      return res.status(204).json(null);
    } catch (error) {
      return ExceptionHandler(error, res)
    }
  }

  module.exports = {
    ServiceList,
    ServiceCreate,
    ServiceDetail,
    ServiceUpdate,
    ServiceDelete,
  }