import toast from "react-hot-toast";

const changeRateCurrencys = [
  { label: "Bitcon", value: "BTC" },
  { label: "Ethereum ", value: "ETH" },
  { label: "Tether", value: "USDT" },
  { label: "XRP", value: "XRP" },
];

const allowedOrders = [
  { id: 1, orderType: "marketCap" },
  { id: 2, orderType: "price" },
  { id: 3, orderType: "24hVolume" },
  { id: 4, orderType: "change" },
  { id: 5, orderType: "listedAt" },
];

const allowedTags = [
  {
    id: 1,
    tagType: "defi",
  },
  {
    id: 2,
    tagType: "stablecoin",
  },
  {
    id: 3,
    tagType: "nft",
  },
  {
    id: 4,
    tagType: "dex",
  },
  {
    id: 5,
    tagType: "exchange",
  },
  {
    id: 6,
    tagType: "staking",
  },
  {
    id: 7,
    tagType: "dao",
  },
  {
    id: 8,
    tagType: "meme",
  },
  {
    id: 9,
    tagType: "privacy",
  },
  {
    id: 10,
    tagType: "metaverse",
  },
  {
    id: 11,
    tagType: "gaming",
  },
  {
    id: 12,
    tagType: "wrapped",
  },
  {
    id: 13,
    tagType: "layer-1",
  },
  {
    id: 14,
    tagType: "layer-2",
  },
  {
    id: 15,
    tagType: "fan-token",
  },
  {
    id: 16,
    tagType: "football-club",
  },
  {
    id: 17,
    tagType: "web3",
  },
  {
    id: 18,
    tagType: "social",
  },
];

const selectTheme = (theme) => ({
  ...theme,
  borderRadius: "8px",
  colors: {
    ...theme.colors,
    primary: "#CAFF33",
    neutral0: "#59595A",
    neutral80: "#CAFF33",
    primary25: "#BFBFBF",
    primary50: "#D8FF66",
  },
});

const supportedTimeFormats = [
  {
    id: 1,
    timePeriod: "5y",
    fullTimeName: "5 year",
    dateFormat: {
      year: "2-digit",
      month: "2-digit",
    },
  },
  {
    id: 2,
    timePeriod: "3y",
    fullTimeName: "3 year",
    dateFormat: {
      year: "2-digit",
      month: "2-digit",
    },
  },
  {
    id: 3,
    timePeriod: "1y",
    fullTimeName: "1 year",
    dateFormat: {
      year: "2-digit",
      month: "2-digit",
    },
  },
  {
    id: 4,
    timePeriod: "3m",
    fullTimeName: "3 months",
    dateFormat: {
      year: "2-digit",
      month: "2-digit",
    },
  },
  {
    id: 5,
    timePeriod: "30d",
    fullTimeName: "30 days",
    dateFormat: {
      month: "2-digit",
      day: "2-digit",
    },
  },
  {
    id: 6,
    timePeriod: "7d",
    fullTimeName: "7 days",
    dateFormat: {
      weekday: "short",
    },
  },
  {
    id: 7,
    timePeriod: "24h",
    fullTimeName: "24 hours",
    dateFormat: {
      day: "2-digit",
      hour: "2-digit",
    },
  },
  {
    id: 8,
    timePeriod: "12h",
    fullTimeName: "12 hours",
    dateFormat: {
      hour: "2-digit",
    },
  },
  {
    id: 9,
    timePeriod: "3h",
    fullTimeName: "3 hours",
    dateFormat: {
      hour: "2-digit",
    },
  },
  {
    id: 10,
    timePeriod: "1h",
    fullTimeName: "1 hour",
    dateFormat: {
      hour: "numeric",
      minute: "2-digit",
    },
  },
];

const uuids = {
  listOfCoins: [
    {
      name: "bitcoin",
      id: "Qwsogvtv82FCd",
    },
    {
      name: "ethereum",
      id: "razxDUgYGNAdQ",
    },
    {
      name: "tether",
      id: "HIVsRcGKkPFtW",
    },
    {
      name: "xrp",
      id: "-l8Mn2pVlRs-p",
    },
    {
      name: "solana",
      id: "zNZHO_Sjf",
    },
    { name: "render", id: "7C4Mh4xy1yDel" },
    { name: "pepe", id: "03WI8NQPF" },
    { name: "flow", id: "QQ0NCmjVq" },
    { name: "trueUSD", id: "1ZZI6g5k5royD" },
    { name: "binanceCoin", id: "WcwrkfNI4FUAe" },
    { name: "USDC", id: "aKzUVe4Hh_CON" },
    { name: "Cardano", id: "qzawljRxB5bYu" },
    { name: "Dogecoin", id: "a91GCGd_u96cF" },
    { name: "TRON", id: "qUhEFk1I61atv" },
    { name: "Chainlink", id: "VLqpJwogdhHNb" },
    { name: "Polygon", id: "uW2tk-ILY0ii" },
    { name: "stETH", id: "CiixT63n3" },
    { name: "Avalanche", id: "dvUj0CzDZ" },
    { name: "Polkadot", id: "25W7FG7om" },
    { name: "WETH", id: "Mtfb0obXVh59u" },
  ],

  getUIDList: (order) => {
    let uuidQuery = "";

    uuids.listOfCoins.filter(({ id }, index) => {
      if (index <= order) {
        uuidQuery += `uuids[]=${id}&`;
      }
    });

    return uuidQuery;
  },

  getUIDByName: (currencyName) => {
    const currency = uuids.listOfCoins.filter(
      (coin) => coin.name === currencyName
    );

    if (!currency.length) {
      toast.error("unkonw curreny");
      return;
    }

    return currency[0];
  },
};

const developerInfo = {
  name: "Mohammad Arab",
  skills: [
    { skillName: "React.js", level: 3.5 },
    { skillName: "Tailwind css", level: 4 },
    { skillName: "Javascript", level: 3.5 },
    { skillName: "Html Css", level: 4.5 },
    { skillName: "React Hooks", level: 3.5 },
    { skillName: "English", level: 3 },
  ],
  bio: "I am a junior front-end developer with strong skills in developing responsive web pages using HTML/CSS, Tailwind CSS, and Bootstrap. I also have experience in building dynamic applications and working with React and React hooks. JavaScript is the foundation of my programming skills, and I have a good understanding of its core concepts and deeper aspects. Additionally, I am skilled in interacting and communicating with the backend using various libraries such as Axios.",
};

export {
  selectTheme,
  uuids,
  supportedTimeFormats,
  changeRateCurrencys,
  developerInfo,
  allowedOrders,
  allowedTags,
};
