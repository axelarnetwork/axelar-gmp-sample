// Initial state: 0.01 AVAX, 10 UST on Avalanche
// Goal: Added LP 0.01 AVAX / 10 UST on Moonbeam
import "dotenv/config";
import { EvmChain } from "@axelar-network/axelarjs-sdk";
import { ethers } from "ethers";
import { TOKEN, UNISWAP_ROUTER } from "./constants/address";
import { getProvider } from "./providers";
import uniswapRouterAbi from "./abi/uniswapRouter.json";
import { approveAll, getBalance } from "./utils/token";
import { evmWallet } from "./wallet";
import { EXPLORER_TX } from "./constants/endpoint";

// Config your own here.
const chain = EvmChain.AVALANCHE;
const destChain = EvmChain.MOONBEAM;
const srcProvider = getProvider(chain);
const destProvider = getProvider(destChain);
const ustAmountForLP = ethers.utils.parseUnits("10", 6).toString();
const lunaAmountForLP = ethers.utils.parseUnits("2", 5).toString();
const ustAmountForSwap = ethers.utils.parseUnits("2", 6).toString();
const ust = "UST";
const luna = "LUNA";

(async () => {
  // Check balance both source chain and destination chain
  console.log(`==== Your source chain balance (${chain}) ==== `);
  const sourceUstBalance = await getBalance(TOKEN[chain].UST, chain);
  console.log(ethers.utils.formatUnits(sourceUstBalance, 6), ust);
  const sourceLunaBalance = await getBalance(TOKEN[chain].LUNA, chain);
  console.log(ethers.utils.formatUnits(sourceLunaBalance, 6), luna);

  console.log(`\n==== Your destination chain balance (${destChain}) ==== `);
  const destinationUstBalance = await getBalance(
    TOKEN[destChain].UST,
    destChain
  );
  console.log(ethers.utils.formatUnits(destinationUstBalance, 6), ust);
  const destinationLunaBalance = await getBalance(
    TOKEN[destChain].LUNA,
    destChain
  );
  console.log(ethers.utils.formatUnits(destinationLunaBalance, 6), luna);

  if (destinationLunaBalance.lt(lunaAmountForLP)) {
    return console.log(
      `\nNot enough ${luna}, needed ${ethers.utils.formatUnits(
        lunaAmountForLP,
        6
      )} ${luna}`
    );
  }
  if (destinationUstBalance.lt(ustAmountForLP)) {
    return console.log(
      `\nNot enough ${ust}, needed ${ethers.utils.formatUnits(
        ustAmountForLP,
        6
      )} ${ust}`
    );
  }

  // Approve UST and LUNA to Uniswap Router at the destination chain if needed.
  await approveAll(
    [
      { name: ust, address: TOKEN[destChain].LUNA },
      { name: luna, address: TOKEN[destChain].LUNA },
    ],
    UNISWAP_ROUTER[destChain],
    destChain
  );

  // Add liquidity
  const contract = new ethers.Contract(
    UNISWAP_ROUTER[destChain],
    uniswapRouterAbi,
    evmWallet.connect(destProvider)
  );
  const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 20;
  const receipt = await contract
    .addLiquidity(
      TOKEN[destChain].LUNA,
      TOKEN[destChain].UST,
      lunaAmountForLP,
      ustAmountForLP,
      0,
      0,
      evmWallet.address,
      deadline
    )
    .then((tx) => tx.wait());
  console.log(
    `Added LP transaction ${EXPLORER_TX[destChain] + receipt.transactionHash}`
  );
})();