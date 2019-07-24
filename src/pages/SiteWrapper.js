import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import TopRail from 'components/TopRail'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
	},
}))

function SiteWrapper({children}) {
	const classes = useStyles()

	return (
		<Grid
			container
			className={classes.root}
			direction="column"
			justify="center"
			alignItems="center"
		>
			<TopRail />
			{children}
		</Grid>
	)
}

export default SiteWrapper
