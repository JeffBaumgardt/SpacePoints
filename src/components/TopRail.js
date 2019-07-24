import React from 'react'
import { makeStyles } from '@material-ui/styles';
import {AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import {useAuth} from 'context/auth'
import {useUser} from 'context/user'

const useStyles = makeStyles(theme => ({
	title: {
		flexGrow: 1
	}
}))

function TopRail() {
	const user = useUser()
	const {logout} = useAuth()
	const classes = useStyles()

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	function handleMenu(event) {
		setAnchorEl(event.currentTarget)
	}

	function handleClose() {
		setAnchorEl(null)
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					Kids Point Tracker
				</Typography>
				{user ? (
					<div>
						<IconButton
							aria-label="Account"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
							transformOrigin={{vertical: 'top', horizontal: 'right'}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={logout}>Sign Out</MenuItem>
						</Menu>
					</div>
				) : null}
			</Toolbar>
		</AppBar>
	)
}

export default TopRail
