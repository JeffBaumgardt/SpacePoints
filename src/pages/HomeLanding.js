import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import BottomNav from 'components/BottomNav'

const useStyles = makeStyles(theme => ({
	bottomNav: {
		position: 'fixed',
		bottom: 0,
		width: '100%',
	},
}))

function HomeLanding({familyInfo}) {
	const classes = useStyles()

	return (
		<Container maxWidth="sm">
			<Switch>
				<Route exact path="/" children={<div>Hello Home</div>} />
				<Route exact path="/family" children={<div>Hello Family</div>} />
				<Route exact path="/rewards" children={<div>Hello Rewards</div>} />
			</Switch>
			<BottomNav className={classes.bottomNav} />
		</Container>
	)
}

export default HomeLanding
