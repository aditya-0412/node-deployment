exports.paginate = async (model, query, req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const data = await model
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await model.countDocuments(query);

  return {
    data,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};
