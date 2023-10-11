import "@/styles/globals.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import {
  arbitrum,
  bsc,
  goerli,
  mainnet,
} from "wagmi/chains";

const chains = [
  mainnet,
  arbitrum,
  bsc,
  goerli,
];

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal v3 + Wagmi",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {

      setReady(true);
    }
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}
    </>
  );
}
