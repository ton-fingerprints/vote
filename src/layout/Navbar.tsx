import {
  Chip,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AppTooltip, Github } from "components";
import { StyleConnectdButton, StyledFlexRow, StyledGrid } from "styles";
import { useAppNavigation } from "router/navigation";
import { useAppSettings, useCurrentRoute, useDevFeatures } from "hooks/hooks";
import { APP_NAME } from "config";
import _ from "lodash";
import LogoImg from "assets/logo.svg";
import { MOBILE_WIDTH, routes } from "consts";
import { getBorderColor } from "theme";
import { FiMoon, FiSun } from "react-icons/fi";
import { Webapp } from "WebApp";

export function Navbar() {
  const mobile = useMediaQuery("(max-width:600px)");
  const { daosPage } = useAppNavigation();
  const route = useCurrentRoute()

  if (Webapp.isEnabled || route === routes.webappSpaces) return null;

  return (
    <StyledContainer>
      <StyledNav>
        <StyledLogo onClick={daosPage.root}>
          <img src={LogoImg} />
          <Typography style={{ marginTop: 5 }}>{APP_NAME}</Typography>
        </StyledLogo>
        <StyledFlexRow style={{ width: "fit-content" }}>
          <EnvModeIndication />
          <StyleConnectdButton />
          <ThemeToggle />
          {!mobile && <Github />}
        </StyledFlexRow>
      </StyledNav>
    </StyledContainer>
  );
}

const EnvModeIndication = () => {
  const devFeatures = useDevFeatures();
  const { setBeta, beta } = useAppSettings();

  const onClick = () => {
    if (beta) {
      setBeta(false);
    }
  };

  if (devFeatures) {
    return <StyledDev label="Dev" onClick={onClick} />;
  }
  return null;
};

const ThemeToggle = () => {
  const { toggleTheme, isDarkMode } = useAppSettings();
  return (
    <AppTooltip text={isDarkMode ? "Light mode" : "Dark more"}>
      <StyledThemeToggle onClick={toggleTheme}>
        {isDarkMode ? <FiSun /> : <FiMoon />}
      </StyledThemeToggle>
    </AppTooltip>
  );
};

const StyledThemeToggle = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.primary.main : "black",
  [`@media (max-width: ${MOBILE_WIDTH}px)`]: {
    padding: 3,
  },
}));

const StyledDev = styled(Chip)({
  [`@media (max-width: ${MOBILE_WIDTH}px)`]: {
    fontSize: 10,
    ".MuiChip-label": {
      padding: "0px 8px",
    },
  },
});

const StyledLogo = styled("button")(({ theme }) => ({
  background: "transparent",
  border: "unset",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  margin: 0,
  padding: 0,
  gap: 10,
  p: {
    fontWeight: 800,
    position: "relative",
    color: theme.palette.text.secondary,
    fontSize: 20,
    top: -3,
  },
  img: {
    height: 40,
  },
  [`@media (max-width: ${MOBILE_WIDTH}px)`]: {
    p: {
      fontSize: 14,
    },
    img: {
      height: 25,
    },
  },
}));

const StyledContainer = styled(StyledFlexRow)(({ theme }) => ({
  background: theme.palette.background.paper,
  height: 70,
  position: "fixed",
  left: "50%",
  transform: "translate(-50%)",
  top: 0,
  zIndex: 20,
  borderBottom: `0.5px solid ${getBorderColor(theme.palette.mode)}`,
  [`@media (max-width: ${MOBILE_WIDTH}px)`]: {
    height: 60,
  },
}));

const StyledNav = styled(StyledGrid)({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
});
