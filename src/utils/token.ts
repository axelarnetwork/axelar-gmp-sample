import { EvmChain } from "@axelar-network/axelarjs-sdk";
import { ethers } from "ethers";
import { getProvider } from "../providers";
import { evmWallet } from "../wallet";
import erc20Abi from "../abi/erc20.json";
import { BATCH_MESSAGE_SENDER, GATEWAY } from "../constants/address";
import { EXPLORER_TX } from "../constants/endpoint";

export function getBalance(address: string, chain: EvmChain) {
  const provider = getProvider(chain);
  const contract = new ethers.Contract(address, erc20Abi, provider);
  return contract.balanceOf(evmWallet.address);
}

export async function isRequireApprove(
  address: string,
  spender: string,
  chain: EvmChain
) {
  const provider = getProvider(chain);
  const contract = new ethers.Contract(address, erc20Abi, provider);
  const allowance: ethers.BigNumber = await contract.allowance(
    evmWallet.address,
    spender
  );
  return allowance.isZero();
}

export async function approve(
  tokenAddress: string,
  spender: string,
  chain: EvmChain
) {
  const provider = getProvider(chain);
  const contract = new ethers.Contract(
    tokenAddress,
    erc20Abi,
    evmWallet.connect(provider)
  );
  return contract.approve(spender, ethers.constants.MaxUint256);
}

export async function approveAll(
  tokens: { address: string; name: string }[],
  spender: string,
  chain: EvmChain
) {
  for (const token of tokens) {
    const requiredApprove = await isRequireApprove(
      token.address,
      spender,
      chain
    );
    if (requiredApprove) {
      console.log(`\n==== Approving ${token.name}... ====`);
      const receipt = await approve(token.address, spender, chain).then((tx) =>
        tx.wait()
      );
      console.log(
        `${token.name} has been approved`,
        EXPLORER_TX[chain] + receipt.transactionHash
      );
    }
  }
}
