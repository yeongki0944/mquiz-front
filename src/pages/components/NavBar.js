import * as React from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";

export const NavBar = (props) => {
    return (
        <BottomNavigation showLabels>
            <BottomNavigationAction label="메뉴1"/>
            <BottomNavigationAction label="메뉴2"/>
            <BottomNavigationAction label="메뉴3"/>
        </BottomNavigation>
    )
}
