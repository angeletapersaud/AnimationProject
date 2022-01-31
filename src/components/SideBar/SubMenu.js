import { Link } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import React, { useState } from "react";
import { IconContext } from "react-icons/lib";

const SidebarLink = styled(Link)`
display:flex;
color:white;
justify-content:space-between;
align-items:center;
padding:20px;
list-style:none;
height:60px;
text-decoration:none;
font-size:22px
&:hover{
    background:#252831;
    border-left:4px solid #632ce4;
    cursor:pointer;
}
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  font-size: 20px;
  font-weight: bold;
`;
const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 19px;

  &:hover {
    background: #a893ad;
    cursor: pointer;
  }
`;

const SubMenu = (props) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        to={props.item.path}
        onClick={props.item.subNav && showSubnav}
      >
        <div>
          {props.item.icon}
          <SidebarLabel>{props.item.title}</SidebarLabel>
        </div>
        <div>
          {props.item.subNav && subnav
            ? props.item.iconOpened
            : props.item.subNav
            ? props.item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        props.item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
