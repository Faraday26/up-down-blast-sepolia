import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  OptionContract: p.createTable({
    id: p.string(),
    address: p.string(),
    isPaused: p.boolean(),
    asset: p.string(),
    payoutForUp: p.bigint(),
    payoutForDown: p.bigint(),
    configId: p.string().references("ConfigContract.id"),
    config: p.one("configId"),
  }),
  ConfigContract: p.createTable({
    id: p.string(),
    address: p.bytes(),
    minFee: p.bigint(),
    maxFee: p.bigint(),
    maxPeriod: p.int(),
    minPeriod: p.int(),
    creationWindowContract: p.bytes(),
  }),
  QueuedOptionData: p.createTable({
    id: p.string(),
    optionContractId: p.string().references("OptionContract.id"),
    optionContract: p.one("optionContractId"),
    strike: p.bigint(),
    totalFee: p.bigint(),
    user: p.string(),
    state: p.int(),
    isAbove: p.boolean(),
    queueID: p.bigint(),
    slippage: p.bigint(),
    // depositToken: p.string(),
    reason: p.string().optional(),
    queueTimestamp: p.bigint(),
    cancelTimestamp: p.bigint(),
    lag: p.bigint(),
    processTime: p.bigint(),
    tournamentId: p.bigint().references("Tournament.id"),
    tournament: p.one("tournamentId"),
  }),
  UserOptionData: p.createTable({
    id: p.string(),
    optionContractId: p.string().references("OptionContract.id"),
    optionContract: p.one("optionContractId"),
    optionID: p.bigint(),
    strike: p.bigint().optional(),
    totalFee: p.bigint(),
    user: p.string(),
    creationTime: p.bigint().optional(),
    queuedTimestamp: p.bigint(),
    expirationPrice: p.bigint().optional(),
    payout: p.bigint().optional(),
    state: p.int(),
    amount: p.bigint(),
    expirationTime: p.bigint().optional(),
    isAbove: p.boolean().optional(),
    queueID: p.bigint().optional(),
    settlementFee: p.bigint().optional(),
    lag: p.bigint(),
    tournamentId: p.bigint().references("Tournament.id"),
    tournament: p.one("tournamentId"),
  }),
  Tournament: p.createTable({
    id: p.bigint(),
    state: p.string(),
    lastUpdated: p.bigint(),
  }),
}));
