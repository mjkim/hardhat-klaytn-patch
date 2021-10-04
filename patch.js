const { GanacheGasMultiplierProvider } = require("hardhat/internal/core/providers/gas-providers");
var originalIsGanache = GanacheGasMultiplierProvider.prototype._isGanache
GanacheGasMultiplierProvider.prototype._isGanache = async function() {
    try {
        return await originalIsGanache.apply(this)
    } catch (error) {
        if (error.message.includes('web3_clientVersion does not exist/is not available')
            || error.message.includes("Unsupported method - web3_clientVersion")) {
            GanacheGasMultiplierProvider.prototype._cachedIsGanache = false
            return false
        }
        throw error
    }
}

const { Formatter } = require("@ethersproject/providers")
var orignialReceipt = Formatter.prototype.receipt
Formatter.prototype.receipt = function(receipt) {
    if (receipt.cumulativeGasUsed == null) {
        receipt.cumulativeGasUsed = receipt.gasUsed
    }
    return orignialReceipt.apply(this, arguments)
}
