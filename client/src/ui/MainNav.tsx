import { Link, NavLink } from "react-router";
import styled from "styled-components";
// import { HiOutlinePlusCircle , HiOutlineUsers ,HiOutlineHome, HiOutlineViewGrid ,HiOutlineDocumentText ,HiOutlineCog    , HiOutlineClipboardList } from "react-icons/hi";
import { HiOutlineUsers, HiOutlineViewGrid, HiOutlineDocumentText, HiOutlineCog, HiOutlineClipboardList, HiPlus } from "react-icons/hi";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    color: oklch(0.373 0.034 259.733);
    font-size: 1.1rem;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: oklch(0.21 0.034 264.665);
    background-color: oklch(0.967 0.003 264.542);
    border-radius: 0.45rem;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: oklch(0.551 0.027 264.364);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: oklch(0.696 0.17 162.48);
  }
`;

function MainNav() {
    return (
        <nav className="space-y-4">
            <Link to={"/app/create/testName"} className="flex items-center px-3 py-2 gap-2 rounded-md border-2 border-gray-900 bg-gray-900 text-gray-100 
                    font-medium  hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-all duration-300">
                <HiPlus className="text-xl" />
                <span>Create a new test</span>
            </Link>

            <NavList>
                {/* <li>
                    <StyledNavLink to="/create">
                        <HiOutlinePlusCircle />
                        <span> Create Test </span>
                    </StyledNavLink>
                </li> */}

                <li>
                    <StyledNavLink to="/app/dashboard">
                        <HiOutlineViewGrid />
                        <span>Home</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink to="/app/tests">
                        <HiOutlineClipboardList />
                        <span>Tests</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink to="/app/questions">
                        <HiOutlineDocumentText />
                        <span>Questions</span>
                    </StyledNavLink>
                </li>

                {/* <li>
                    <StyledNavLink to="/participants">
                        <HiOutlineUsers />
                        <span>Participants</span>
                    </StyledNavLink>
                </li> */}

                <li>
                    <StyledNavLink to="/app/settings">
                        <HiOutlineCog />
                        <span>Settings</span>
                    </StyledNavLink>
                </li>
            </NavList>
        </nav>
    );
}

export default MainNav;