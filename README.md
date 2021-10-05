**(resoulutions 처리를 위해 npm 대신 yarn 사용 필요.)**


EIP-2718 에서 tx/receipt 에 type 이라는 변수가 추가되었는데, 기존 klaytn에서 type이라는 항목을 이미 지정하여 쓰고있으므로 에러 발생.  
EIP-2718이 적용되기 직전 버전인 ethers 5.0.32 를 사용하여 회피한다.

- "ethers" 버전은 5.0.32 이하만 가능.
- "@ethereum-waffle/chai" 버전은 3.4.0 이하만 가능.


package.json
```
{
  "name": "sample",
  "version": "1.0.0",
  "license": "MIT",
  "devDependencies": {
    "@nomiclabs/hardhat-ethers": "^2.0.0",
    "@nomiclabs/hardhat-waffle": "^2.0.0",
    "chai": "^3.4.0",
    "ethereum-waffle": "^3.0.0",
    "ethers": "5.0.32",
    "hardhat": "^2.6.4",
    "hardhat-klaytn-patch": "^0.0.2"
  },
  "resolutions": {
    "ethers": "5.0.32",
    "@ethereum-waffle/chai": "3.4.0",
  }
}
```

"hardhat-klaytn-patch" 디펜던시 추가.  
ethereum 호환성 맞추기 위한 각종 패치 

- klaytn에서 지원하지 않는 web3_clientVersino patch
- ethereum에 추가된 cumulativeGasUsed 를 gasUsed 로 대체
- 

`npx hardhat` 으로 프로젝트 설정 이후 생기는 hardhat.config.js 파일 상단에 `require("hardhat-klaytn-patch");` 추가 필요.
ex)

```
require("hardhat-klaytn-patch");
require("@nomiclabs/hardhat-waffle");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
//...
```
