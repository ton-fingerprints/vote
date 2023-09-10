import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import TWA from "@twa-dev/sdk";
import { MainButton } from "@twa-dev/sdk/react";
import { Dao } from "types";
import { parseLanguage } from "utils";

const isEnabled =
  !!TWA.initData || !!new URLSearchParams(window.location.search).get("webapp");

const hapticFeedback = (
  type?: "light" | "medium" | "heavy" | "rigid" | "soft"
) => {
  if (isEnabled) {
    TWA.HapticFeedback.impactOccurred(type || "medium");
  }
};


const mainButton = TWA.MainButton;

const isExpanded = () => TWA.isExpanded;

const expand = () => TWA.expand();

const enableClosingConfirmation = () => TWA.enableClosingConfirmation();
const init = () => {
  enableClosingConfirmation();
  expand();
  TWA.ready();
};

const onDaoSelect = (dao: Dao) => {
  TWA.sendData(
    JSON.stringify({
      name: parseLanguage(dao.daoMetadata.metadataArgs.name),
      address: dao.daoAddress,
      groupId: new URLSearchParams(window.location.search).get("groupId"),
    })
  );
};

export const Webapp = {
  hapticFeedback,
  isExpanded,
  isEnabled,
  expand,
  enableClosingConfirmation,
  isDarkMode: TWA.colorScheme === "dark",
  init,
  onDaoSelect,
  mainButton,
  viewPortHeight: TWA.viewportHeight,
};

export const WebappConnectWalletButton = () => {
  const address = useTonAddress();
  const [tonConnect] = useTonConnectUI();

  if (address) return null;
  return (
    <MainButton
      text={"Connect wallet"}
      onClick={() => tonConnect.connectWallet()}
    />
  );
};

export function WebappButton({
  onClick,
  text,
  progress,
  disabled,
}: {
  onClick: () => void;
  text?: string;
  progress?: boolean;
  disabled?: boolean;
}) {
  const address = useTonAddress();

  if (!address) return null;

  return (
    <MainButton
      disabled={disabled}
      text={text || ""}
      onClick={onClick}
      progress={progress}
    />
  );
}
