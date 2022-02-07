import React from 'react'
import { Typography, AppBar as MuiAppBar, Toolbar, FormGroup, FormControlLabel, Switch, Icon } from '@material-ui/core'
import logo from '../../assets/logo2.png'


const AppBar = ({ onToggleTheme: handleToggleTheme, darkMode }) => {
    return (
        <MuiAppBar elevation={1} color="transparent" position="relative">
            <Toolbar>
                <img width={40} alt={"logo"} className="fit-cover" src={logo} />
                <Typography className="ml-10" variant="button">{"Universidades"}</Typography>
                <div className="w-full justify-end flex items-center">
                    <FormGroup onChange={handleToggleTheme}>
                        <FormControlLabel classes={{ label: "flex ml-2" }} control={<Switch checked={darkMode} size="small" />} label={darkMode ? <Icon fontSize="small">light_mode</Icon> : <Icon fontSize="small">dark_mode</Icon>} />
                    </FormGroup>
                </div>
            </Toolbar>
        </MuiAppBar>
    )
}

export default AppBar
