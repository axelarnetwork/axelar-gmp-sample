import { EvmChain } from "@axelar-network/axelarjs-sdk";

export const DISTRIBUTION_EXECUTOR = {
  [EvmChain.ETHEREUM]: "0x2bF739f86e437b742b062aA416e3d31a69218923",
  [EvmChain.MOONBEAM]: "0xc5b9CD3b016EaA5710837d95627db431CF50b5C1",
  [EvmChain.AVALANCHE]: "0x3caAf6d2B4266189c030e6435A55B9Ebd826aEed",
};

export const SWAP_EXECUTOR = {
  [EvmChain.ETHEREUM]: "0x8Abfe0b7a8fed8a83767e52bB9bCF2370E4bdbd5",
  [EvmChain.MOONBEAM]: "0x6b53a22833451d9E41757cad5977B3F29e07dF8e",
  [EvmChain.AVALANCHE]: "0xD91F75235726d15988AD6fe35D44D0cAfeC71CBA",
};

export const BATCH_MESSAGE_SENDER = {
  [EvmChain.ETHEREUM]: "0x990D239608222dF86a62c047c7801a2Ebc4924B1",
  [EvmChain.MOONBEAM]: "0x20BD2DDceBbb53B8Aa84C141A40A8995ac5Ab250",
  [EvmChain.AVALANCHE]: "0x06b0740e9bB86f7ACA9ec8f5a81f4c13900d9C0b",
};

export const GATEWAY = {
  [EvmChain.ETHEREUM]: "0xBC6fcce7c5487d43830a219CA6E7B83238B41e71",
  [EvmChain.MOONBEAM]: "0x5769D84DD62a6fD969856c75c7D321b84d455929",
  [EvmChain.AVALANCHE]: "0xC249632c2D40b9001FE907806902f63038B737Ab",
};

export const UNISWAP_ROUTER = {
  [EvmChain.ETHEREUM]: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  [EvmChain.MOONBEAM]: "0xF75F62464fb6ae6E7088b76457E164EeCfB07dB4",
  [EvmChain.AVALANCHE]: "0x2D99ABD9008Dc933ff5c0CD271B88309593aB921",
};

export const UNISWAP_FACTORY = {
  [EvmChain.ETHEREUM]: "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f",
  [EvmChain.MOONBEAM]: "0xf675977cf56720262b85f4e8e73e3c343c1b93ad ",
  [EvmChain.AVALANCHE]: "0xe4a575550c2b460d2307b82dcd7afe84ad1484dd",
};

export const TOKEN = {
  [EvmChain.ETHEREUM]: {
    UST: "0x1487F3faefE78792CDC48D87FF32aaC6650fd85f",
    LUNA: "0x7Aa125543B9D4a361f58aC1Ff3Bea86eAF6D948B",
  },
  [EvmChain.MOONBEAM]: {
    UST: "0xD34007Bb8A54B2FBb1D6647c5AbA04D507ABD21d",
    LUNA: "0xa1cF442E73045F1ea9960499FC8771454a01019D",
  },
  [EvmChain.AVALANCHE]: {
    UST: "0x43F4600b552089655645f8c16D86A5a9Fa296bc3",
    LUNA: "0x50a70aBb7bd6EbBcC46Df7C0d033C568F563cA27",
  },
};
