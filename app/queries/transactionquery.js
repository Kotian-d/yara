import transactions from "../model/transactions";

export async function getTransactionDetails(filter, limit, skip) {
  const trans = await transactions
    .find({ createdAt: { $gte: new Date().toDateString() } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate([
      { path: "operator", select: "name" },
      { path: "api", select: "name" },
      { path: "userId", select: "name mobile" },
    ])
    .lean();

  const totalPages = await transactions
    .find({ createdAt: { $gte: new Date().toDateString() } })
    .sort({ createdAt: -1 })
    .count({})
    .lean();

  const totalSuccess = await transactions.aggregate([
    {
      $match: {
        status: "success",
      },
    },
    { $group: { _id: "$status", total: { $sum: `$amount` } } },
  ]);
  const totalPending = await transactions.aggregate([
    {
      $match: {
        status: "pending",
      },
    },
    { $group: { _id: "$status", total: { $sum: `$amount` } } },
  ]);
  const totalFail = await transactions.aggregate([
    {
      $match: {
        status: "failed",
      },
    },
    { $group: { _id: "$status", total: { $sum: `$amount` } } },
  ]);

  const successCount = await transactions.count({ status: "success" });
  const pendingCount = await transactions.count({ status: "pending" });
  const failCount = await transactions.count({ status: "failed" });

  return {
    trans,
    successCount,
    failCount,
    pendingCount,
    totalSuccess,
    totalFail,
    totalPending,
    totalPages
  };
}
