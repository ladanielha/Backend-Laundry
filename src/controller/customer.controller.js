const { SearchBackend, FilterBackend, Pagination, GetOr404 } = require("../libs/lib.common");
const { ExceptionHandler } = require("../libs/lib.exception");
const { CustomerModel } = require("../model/customer.model");

async function CustomerList(req, res) {
  try {
    const result = CustomerModel.find();
    const search = SearchBackend(req, result, ['code', 'name', 'phonenumber']);
    const filter = FilterBackend(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging)
  } catch (error) {
    return ExceptionHandler(error, res)
  }
}

async function CustomerCreate(req, res) {
  try {
    // Cari customer terakhir
    const lastCustomer = await CustomerModel.findOne({}, {}, { sort: { 'createdAt': -1 } });

    let lastCustomerNumber = 0;
    if (lastCustomer) {
      const lastCustomerCodeParts = lastCustomer.code.split('-');
      lastCustomerNumber = parseInt(lastCustomerCodeParts[1]);
    }
    // Generate the next Customer number
    const nextCustomerNumber = lastCustomerNumber + 1;
    const nextCustomerCode = generateCustomerCode(nextCustomerNumber);
    // Add the code to the request body
    req.body.code = nextCustomerCode;
    // Create the Customer with the updated body
    const result = await CustomerModel.create(req.body);
    console.log(result);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}

async function CustomerDetail(req, res) {
  try {
    const result = await GetOr404(CustomerModel, {_id: req.params.id});
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res)
  }
}
async function CustomerDetailByNomor(req, res) {
  try {
    const result = await GetOr404(CustomerModel, {nomor: req.params.nomor});
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res)
  }
}
async function CustomerUpdate(req, res) {
  try {
    await GetOr404(CustomerModel, {_id: req.params.id});
    const result = await CustomerModel.findOneAndUpdate(
      { _id: req.params.id },
      req.cleanedData,
      {new: true}
    )
    return res.status(200).json(result);
  } catch (error) {
    return ExceptionHandler(error, res)
  }
}

async function CustomerDelete(req, res) {
  try {
    await GetOr404(CustomerModel, {_id: req.params.id})
    await CustomerModel.findOneAndDelete({_id: req.params.id})
    return res.status(204).json(null);
  } catch (error) {
    return ExceptionHandler(error, res)
  }
}

// Function to generate the item code
function generateCustomerCode(count) {
  const paddedCount = count.toString().padStart(3, '0');
  return `CUS-${paddedCount}`;
}

module.exports = {
  CustomerList,
  CustomerCreate,
  CustomerDetail,
  CustomerUpdate,
  CustomerDelete,
  CustomerDetailByNomor
}
