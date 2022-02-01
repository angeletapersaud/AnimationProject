import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as imIcons from "react-icons/im";

export const SidebarData = [
  {
    title: "General Information",
    path: "/overview",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "About Us",
        path: "/overview/AboutUs",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "About Studio Ghibli",
        path: "/overview/AboutStudioGhibli",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Search",
    path: "/search",
    icon: <imIcons.ImSearch />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Studio Ghibli Search",
        path: "/search/StudioGhibliSearch",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Anime News Search ",
        path: "/search/AnimeNewsSearch",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Connect",
    path: "/connect",
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: "Login",
    path: "/login",
    icon: <IoIcons.IoIosKey />,
  },
];
